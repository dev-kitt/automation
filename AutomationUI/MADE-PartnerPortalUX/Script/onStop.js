﻿//USEUNIT Logs
//USEUNIT Main
//USEUNIT onLog

/***************************************************************
Name: onStop
Description: General onStop event controls
Author: Keith Hudson
Creation Date: 11/20/2022
***************************************************************/

function EventControls_OnStopTest(Sender)
{
  Logs.saveFiles_MHT();
  var attachment = Logs.getFiles_MHT();
  
  switch(Project.Variables.sgbEnvironment) {
    case "qa":
      var alertRecipient = "khudson@silvergate.com";
      break;
    case "stg":
      //var alertRecipient = "SEtestingalerts@silvergate.com";
      break;
  }
    
  // send alert email w/screenshot   
  if (onLog.SummaryEmail("noreply@silvergate.com", alertRecipient, "PartnerPortal Automation Summary Report",
           "Please open the attached report in MS Edge.", attachment)) {
    Log.Checkpoint("| Alert Email Sent |");
  }
  else {
    Log.Warning("WARNING: alert email unsuccessful");
  }
}