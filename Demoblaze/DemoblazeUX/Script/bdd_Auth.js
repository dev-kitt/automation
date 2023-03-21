//USEUNIT Main

/***************************************************************
Name: bdd_Auth
Description: Step definitions for bdd_Auth
Author: Keith Hudson
Creation Date: 03/20/2023
***************************************************************/

Given("The user has an open Browser on the homepage", function (){
  Aliases.browser.ToUrl(Project.Variables.EnvtURL);
  if(Aliases.browser.pageStore.WaitAliasChild("mainBanner")) {
    Log.Checkpoint("| Browser Launched & Maximized | - " + Project.Variables.EnvtURL);
  } else {
    Log.Warning("WARNING | Page not found");
  }
});

Given("The user has an active session in {arg}", function (url){
  Aliases.browser.ToUrl(url);
  if(Aliases.browser.pageStore.WaitAliasChild("mainBanner")) {
    Log.Checkpoint("| Demoblaze Webpage Active |");
  } else {
    Log.Warning("WARNING | Page not found");
  }
});

When("The user navbar menu is verified", function (){
  var aliasObj = Aliases.browser.pageStore.mainBanner;
  if(aliasObj.WaitAliasChild("menu").Exists) {
    if (aliasObj.menu.WaitAliasChild("user").VisibleOnScreen) {
      aliasObj.menu.logOut.Click();
      Log.Message("LOG: orphan user logged out");
    }
    Log.Checkpoint("| Nav Menu Verified |");
  } else {
    Log.Warning("WARNING | Menu not found");
  }
});

Then("The user can signup", function (){
  // append random guid to avoid duplicates
  var randInt = Main.getRandomFloat();
  var randStr = Main.getRandomString();
  var aliasObj = Aliases.browser.pageStore.mainBanner.menu.signUp;
  Project.Variables.varUser = Project.Variables.varUser + randStr; 
  Project.Variables.varPass = Project.Variables.varPass.DecryptedValue + randInt;
  
  if(equal(aliasObj.Exists, true)) {
    aliasObj.Click();
    Aliases.browser.pageStore.modalSignUp.username.SetText(Project.Variables.varUser);
    Aliases.browser.pageStore.modalSignUp.password.SetText(Project.Variables.varPass.DecryptedValue);
    Aliases.browser.pageStore.modalSignUp.buttonSignUp.Click();
    Main.alertHandler();
    Log.Checkpoint("| SignUp Verified |");
  } else {
    Log.Warning("WARNING | SignUp not found");
  }
});

Then("The user can login", function (){
  var aliasObj = Aliases.browser.pageStore.mainBanner.menu;
  if(aliasObj.WaitAliasChild("logIn").Exists) {
    aliasObj.logIn.Click();
    Aliases.browser.pageStore.modalLogIn.username.SetText(Project.Variables.User);
    Aliases.browser.pageStore.modalLogIn.password.SetText(Project.Variables.Pass.DecryptedValue);
    Aliases.browser.pageStore.modalLogIn.buttonLogIn.Click();
    Log.Checkpoint("| LogOut Verified |");
  } 
});

Then("The user can logout", function (){
  var aliasObj = Aliases.browser.pageStore.mainBanner.menu;
  if(aliasObj.WaitAliasChild("logOut").Exists) {
    aliasObj.logOut.Click();
    Log.Checkpoint("| LogOut Verified |");
  } 
});

Given("The user clicks the {arg} menu", function (auth){
  Main.checkOrphanedUser();
  switch(auth) {
    case "SignUp":
      Aliases.browser.pageStore.mainBanner.menu.signUp.Click();
      break;
    case "LogIn":
      Aliases.browser.pageStore.mainBanner.menu.logIn.Click();
      break;
  }
  Log.Checkpoint("| " + auth + " Menu Verified |");
});

When("The user enters their {arg} and {arg} into the {arg} form for {arg} validation", function (username, password, auth, alert){
    Main.checkOrphanedUser();
    var randInt = Main.getRandomFloat();
    var randStr = Main.getRandomString();
    var aliasObj = Aliases.browser.pageStore;
    
    // negative test - if null, error alert is triggered
    if ((equal(username, "") || equal(username, null)) && equal(alert, "Failure")) {
      Project.Variables.varUser = ""; 
    } else if ((equal(password, "") || equal(password, null)) && equal(alert, "Failure")) {
      Project.Variables.varPass = "";
    } else if (equal(alert, "Failure")) {
      // append random string to avoid duplicates
      Project.Variables.varUser = username + randStr; 
      Project.Variables.varPass = password + randInt;
    } else {
      // positive test
      Project.Variables.varUser = username; 
      Project.Variables.varPass = password;  
    }
    
    switch(auth) {
    case "SignUp": 
      if(aliasObj.WaitAliasChild("modalSignUp").Exists) {
        aliasObj.modalSignUp.username.SetText(Project.Variables.varUser); 
        aliasObj.modalSignUp.password.SetText(Project.Variables.varPass); 
        Log.Checkpoint("| " + auth + " Info Entered |");
      } else {
        Log.Warning("WARNING | " + auth + " form not found");
      }
      break;
    case "LogIn":
      if(aliasObj.WaitAliasChild("modalLogIn").Exists) {
        aliasObj.modalLogIn.username.SetText(Project.Variables.User); 
        aliasObj.modalLogIn.password.SetText(Project.Variables.Pass); 
        Log.Checkpoint("| " + auth + " Info Entered |");
      } else {
        Log.Warning("WARNING | " + auth + " form not found");
      }
      break;
  }
});

When("The {arg} button has been clicked", function (auth){
  var aliasObj = Aliases.browser.pageStore;
  switch(auth) {
    case "SignUp":
      if(aliasObj.modalSignUp.WaitAliasChild("buttonSignUp").Exists) {
        Aliases.browser.pageStore.modalSignUp.buttonSignUp.Click();
        Aliases.browser.pageStore.WaitAlert(5);
        Log.Checkpoint("| " + auth + " Successful |");
      } else {
        Log.Warning("WARNING | " + auth + " button not found");
      }
      break;
    case "LogIn":
      if(aliasObj.modalLogIn.WaitAliasChild("buttonLogIn").Exists) {
        aliasObj.modalLogIn.buttonLogIn.Click();
        aliasObj.WaitAlert(5);
        Log.Checkpoint("| " + auth + " Successful |");
      } else {
        Log.Warning("WARNING | " + auth + " button not found");
      }
      break;
  }
});

Then("The user should be verified on {arg}", function (auth){
  var aliasObj = Aliases.browser.pageStore;
  switch(auth) {
    case "SignUp":
      if(aliasObj.WaitAliasChild("Alert").Exists) {
        Log.Checkpoint("| " + auth + " Successful |");
      } 
      break;
    case "LogIn":
      if(aliasObj.mainBanner.menu.WaitAliasChild("user").Exists) {
        Log.Checkpoint("| " + auth + " Successful |");
      } 
      break;
  }
});

Then("The appropriate {arg} is displayed", function (alert){
  Main.alertHandler();
});
