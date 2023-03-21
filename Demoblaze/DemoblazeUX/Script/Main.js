/***************************************************************
Name: Main
Description: General common functions
Author: Keith Hudson
Creation Date: 03/20/2023
***************************************************************/

function killBrowser() {
  while (Aliases.Browser.Exists) {
    Aliases.Browser.Terminate()
  }
  Log.Checkpoint("| Browser Closed |");    
}

function incognitoBrowser() {
  var batch = Sys.OleObject("WScript.Shell");  
  var runMockService = batch.Run(Project.Path + "\\Stores\\Files\\Run_ChromeIncognito.bat");
  if(Sys.Process("cmd", 2).Window("ConsoleWindowClass", "Administrator:  CHROME INCOGNITO", 1).Exists)
  { 
    Log.Checkpoint("| Chrome Incognito Launched |");
    Sys.Process("cmd", 2).Close();
  }
}

function launchChromeBrowser() {
  Sys.Refresh(); 
  if (equal(Sys.WaitBrowser("chrome").Exists, false)) {
    Browsers.Item(btChrome).Run("https://google.com/", 2500);
    Aliases.Browser.BrowserWindow(0).Maximize();
    Aliases.Browser.Page("*").Click();
  }
}

function refreshChromeBroswer() {
  runBatchFile("killBrowsers.bat");
}

function clearChromeCookies() {
  runBatchFile("clearInternetData.bat");
}

function runBatchFile(file) {
  var batch = Sys.OleObject("WScript.Shell");
  var batFile = batch.Run(Project.Path + "\\Stores\\Files\\" + file);
  Sys.Refresh();
}

function wait(timeInSeconds) {
  Delay(timeInSeconds * 1000);
}

function getRandomInteger(min, max) {
  var intMin = min;
  var intMax = max;
  if (equal(intMin, null) && equal(intMin, null)) {
    intMin = 1;
    intMax = 10;
  }
  return Math.round(Math.random()*(intMax-intMin)+intMin);
}

function getRandomFloat(max) {
  return Math.round((Math.random()*(max-0)+0) * 100) / 100;
}

function getRandomString() {
  return Math.random().toString(16).substr(2, 8);
}

function utcDate() {
  var date = aqDateTime.Today();
  var time = aqDateTime.Time();  
  var gmtTime = aqString.Replace(aqConvert.DateTimeToFormatStr(date, "%Y/%m/%d"), "/", "-") 
    + " " + aqConvert.DateTimeToFormatStr(time, "%H:%M:%S");
  
  Log.Checkpoint("| GMT/UTC DateTime | - " + gmtTime);  
  return gmtTime;
}

function getCurrentDate() {
  var currentDate = aqDateTime.Today(); 
  var today = aqConvert.DateTimeToFormatStr(currentDate, "%m/%d/%y");
  ProjectSuite.Variables.CurrentDate = today;
  return today;
}

function closeBrowser() {
  Aliases.Browser.Close();
  Log.Checkpoint("| Test Automation Complete | - Enjoy Some TACOS!!!");   
}

// Verify Test Run Summary Files (.MHT)
function verifyFiles_MHT()
{
  var foundFiles, aFile;
  foundFiles = aqFileSystem.FindFiles(Project.Path + "SummaryReports\\", "*.mht");
  if (foundFiles != null) {
    while (foundFiles.HasNext())
    {
      aFile = foundFiles.Next();
      deleteFiles_MHT(aFile);
    }
  }
  else {
    Log.Message("No files were found.");
  }
}

// Delete Test Run Summary Files (.MHT) Older Than 5 Minutes
function deleteFiles_MHT(aFile){
  var DateTime = aqDateTime.Now();
  var DateTimeMinusXMinutes = aqDateTime.AddMinutes(DateTime, -5);
  Log.Message("NOW: " + DateTime + " | THEN: " + DateTimeMinusXMinutes);
  
  if (aFile.DateLastModified < DateTimeMinusXMinutes) {
    FilePathString = aqConvert.VarToStr(aFile.Path)
    aqFileSystem.DeleteFile(FilePathString);
    Log.Message(FilePathString + " deleted" );
  }
  else {
    Log.Message("No files were deleted");
  }
}

function alertHandler() {
  var aliasObj = Aliases.browser.pageStore
  if(aliasObj.WaitAliasChild("Alert").Exists) {
    aliasObj.Alert.buttonOk.Click();
    Log.Checkpoint("| Alert Message Verified |");
  }    
}

function checkOrphanedUser() {
  var aliasObj = Aliases.browser.pageStore.mainBanner.menu;
  if(aliasObj.WaitAliasChild("user").Exists && aliasObj.WaitAliasChild("user").VisibleOnScreen) {
    aliasObj.logOut.Click();
  }
}