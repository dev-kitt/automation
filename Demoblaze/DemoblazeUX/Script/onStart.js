//USEUNIT Main

/***************************************************************
Name: onStart
Description: General onStart event controls
Author: Keith Hudson
Creation Date: 03/20/2023
***************************************************************/
  
function EventControls_OnStartTest(Sender)
{
  let startTime = aqDateTime.Now();
  Log.Checkpoint("START | " + startTime);
  ProjectSuite.Variables.CurrentDate = Main.getCurrentDate();
  Main.verifyFiles_MHT();
  //Main.launchChromeBrowser(); 
}