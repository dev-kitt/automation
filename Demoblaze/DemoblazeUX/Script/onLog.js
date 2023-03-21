/***************************************************************
Name: onLog
Description: General onLog event controls
Author: Keith Hudson
Creation Date: 03/20/2023
***************************************************************/


// ignores erroneous warnings
function EventControls_OnLogWarning(Sender, LogParams)
{
  // Check if the message includes the desired substring
  var locked = aqString.Find(LogParams.Str, "Improve your test performance");
  if (locked != -1)
  {
    // If found, block the message
    LogParams.Locked = true;
  }
  else
  {
    // Else, post the message
    LogParams.Locked = false;
  }  
}

function EventControls_OnLogError(Sender, LogParams)
{                   
  var page = Aliases.Browser.Page("*"); 
  switch(ProjectSuite.Variables.Environment) {
    case "QA":
      var alertRecipient = ProjectSuite.Variables.TacoKing;
      break;
// PENDING APPROVAL
//    case "STG":
//      var alertRecipient = "stakeholders@email.com";
//      break;
  }
  
  LogParams.Locked = false;
  LogParams.Priority = pmHighest;
  LogParams.FontStyle.Bold = true;
  LogParams.FontColor = clSilver;
  LogParams.Color = clRed;
    
  // send alert email w/screenshot   
  if (EventControls_SummaryEmail(ProjectSuite.Variables.AlertEmail, alertRecipient, "Demoblaze Automation Failure",
           "Failure in " + ProjectSuite.Variables.Environment + " - " + aqTestCase.CurrentTestCase.Name
           + " ERROR: " + LogParams.MessageText, Log.Picture(Sys.Desktop.Picture(), "Image of the error"))) {
    Log.Checkpoint("| Alert Email Sent |");
    page.Refresh();             
  }
  else {
    Log.Warning("WARNING: alert email unsuccessful");
  }
}

function EventControls_SummaryEmail(mFrom, mTo, mSubject, mBody, mAttach)
{
  var schema, mConfig, mMessage;

  try
  {
    schema = "http://schemas.microsoft.com/cdo/configuration/";
    mConfig = getActiveXObject("CDO.Configuration");
    mConfig.Fields.$set("Item", schema + "sendusing", 2); // cdoSendUsingPort
    mConfig.Fields.$set("Item", schema + "smtpusessl", 1); // Use SSL 

    // sgb relay server
    mConfig.Fields.$set("Item", schema + "smtpserver", "smtp.gmail.com");
    mConfig.Fields.$set("Item", schema + "smtpserverport", 465)
    mConfig.Fields.$set("Item", schema + "smtpauthenticate", 1); // Authentication mechanism

    // credentials
    mConfig.Fields.$set("Item", schema + "sendusername", "noreply@silvergate.com");
    mConfig.Fields.$set("Item", schema + "sendpassword", ProjectSuite.Variables.EmailPass.DecryptedValue); 

    mConfig.Fields.Update();

    mMessage = getActiveXObject("CDO.Message");
    mMessage.Configuration = mConfig;
    mMessage.From = mFrom;
    mMessage.To = mTo;
    mMessage.Subject = mSubject;
    mMessage.HTMLBody = mBody;

    aqString.ListSeparator = ",";
    for(let i = 0; i < aqString.GetListLength(mAttach); i++)
      mMessage.AddAttachment(aqString.GetListItem(mAttach, i));
    mMessage.Send();
  }
  catch (exception)
  {
    Log.Error("Email cannot be sent", exception.message);
    return false;
  }
  Log.Message("Message to <" + mTo + "> was successfully sent");
  return true;
}



