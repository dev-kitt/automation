//USEUNIT Main

/***************************************************************
Name: onStop
Description: General onStop event controls
Author: Keith Hudson
Creation Date: 03/20/2023
***************************************************************/

function EventControls_OnStopTest(Sender) {   
  let stopTime = aqDateTime.Now();
  Log.Checkpoint("STOP | " + stopTime);
  Main.refreshChromeBroswer();
  Main.clearChromeCookies();
}
