function kw_negBackOfficeSecurityTest()
{
  //Launches the specified browser and opens the specified URL in it.
  Browsers.Item(btChrome).Run("https://backoffice-qa.silvergate.com/", 5);
  //Maximizes the specified Window object.
  Aliases.Browser.BrowserWindow.Maximize();
  //Simulates a left-button single click in a window or control as specified (relative position, shift keys).
  Aliases.Browser.BrowserWindow.Click();
  //Delays the script execution until the specified property equals the specified value or until the specified time limit elapses.
  Aliases.Browser.sgbID.sectionEmail.panelEmail.WaitProperty(Aliases.Browser.sgbID.sectionEmail.panelEmail.Visible, true, 5);
  //Clicks the 'textboxEmail' control.
  Aliases.Browser.sgbID.Auth.textboxEmail.Click();
  //Enters text in the text box.
  Aliases.Browser.sgbID.Auth.textboxEmail.SetText(Project.Variables.varUser1.Value("Email"));
  //Simulates one or several keypresses.
  Aliases.Browser.sgbID.Auth.textboxEmail.Keys("[Tab]");
  //Clicks the 'passwordboxPassword' control.
  Aliases.Browser.sgbID.Auth.passwordboxPassword.Click();
  //Enters text in the text box.
  Aliases.Browser.sgbID.Auth.passwordboxPassword.SetText(Project.Variables.varUser1.Value("Pass"));
  //Clicks the 'submitbuttonLogIn' button.
  Aliases.Browser.sgbID.Auth.submitbuttonLogIn.ClickButton();
  //Waits until the browser loads the page and is ready to accept user input.
  Aliases.Browser.sgbBO_Main.Wait();
  Project.Variables.varSecInput.Reset();
  for(; !Project.Variables.varSecInput.IsEOF();)
  {
    //Opens the specified URL in a running instance of the specified browser.
    Browsers.Item(btChrome).Navigate("https://backoffice-qa.silvergate.com/profiles");
    //Clicks the 'linkSidebarLink2' link.
    Aliases.Browser.sgbBO_Profiles.asideProfiles.navProfiles.textnodeAccounts.linkSidebarLink2.Click();
    //Waits until the browser loads the page and is ready to accept user input.
    Aliases.Browser.sgbBO_Main.Wait();
    //Clicks the 'addAccount' button.
    Aliases.Browser.sgbBO_Accounts.addAccount.ClickButton();
    //Clicks the 'textboxAccountNumber' control.
    Aliases.Browser.sgbBO_Accounts.formAccountNumber.textboxAccountNumber.Click();
    //Enters text in the text box.
    Aliases.Browser.sgbBO_Accounts.formAccountNumber.textboxAccountNumber.SetText(Project.Variables.varSecInput.Value("negInput"));
    //Clicks the 'buttonSubmit' button.
    Aliases.Browser.sgbBO_Accounts.formAccountNumber.buttonSubmit.ClickButton();
    //Checks whether the 'contentText' property of the Aliases.Browser.sgbBO_Accounts.panelAccountnumberContainsInvali object equals 'AccountNumber contains invalid characters.'.
    aqObject.CheckProperty(Aliases.Browser.sgbBO_Accounts.panelAccountnumberContainsInvali, "contentText", cmpEqual, "AccountNumber contains invalid characters.");
    //Clicks the 'panelDismiss' control.
    Aliases.Browser.sgbBO_Accounts.panelDismiss.Click();
    //Clicks the 'textnodeClose' control.
    Aliases.Browser.sgbBO_Accounts.textnodeClose.Click();
    //Clicks the 'linkSidebarLink0' link.
    Aliases.Browser.sgbBO_Profiles.asideProfiles.navProfiles.textnodeProfiles.linkSidebarLink0.Click();
    //Waits until the browser loads the page and is ready to accept user input.
    Aliases.Browser.sgbBO_Main.Wait();
    //Clicks the 'addProfile' button.
    Aliases.Browser.sgbBO_Profiles.addProfile.ClickButton();
    //Clicks the 'textboxProfileName' control.
    Aliases.Browser.sgbBO_Profiles.formProfileName.textboxProfileName.Click();
    //Enters text in the text box.
    Aliases.Browser.sgbBO_Profiles.formProfileName.textboxProfileName.SetText(Project.Variables.varSecInput.Value("negInput"));
    //Clicks the 'buttonContinue' button.
    Aliases.Browser.sgbBO_Profiles.formProfileName.buttonContinue.ClickButton();
    //Checks whether the 'contentText' property of the Aliases.Browser.sgbBO_Accounts.panelAccountnumberContainsInvali object equals 'Name contains invalid characters.'.
    aqObject.CheckProperty(Aliases.Browser.sgbBO_Accounts.panelAccountnumberContainsInvali, "contentText", cmpEqual, "Name contains invalid characters.");
    //Clicks the 'panelDismiss' control.
    Aliases.Browser.sgbBO_Accounts.panelDismiss.Click();
    //Clicks the 'textnodeClose' control.
    Aliases.Browser.sgbBO_Profiles.textnodeClose.Click();
    //Clicks the 'textbox' control.
    Aliases.Browser.sgbBO_Profiles.textbox.Click();
    //Enters text in the text box.
    Aliases.Browser.sgbBO_Profiles.textbox.SetText(Project.Variables.varSecInput.Value("negInput"));
    //Checks whether the 'ChildCount' property of the Aliases.Browser.sgbBO_Main.FindElement("//div[contains(@class, 'list-table-responsive')]") object equals 1.
    aqObject.CheckProperty(Aliases.Browser.sgbBO_Main.FindElement("//div[contains(@class, 'list-table-responsive')]"), "ChildCount", cmpEqual, 1);
    //Checks whether the 'contentText' property of the Aliases.Browser.sgbBO_Main.FindElement("//div[contains(@class, 'list-table-responsive')]") object equals 'Profile Name
    //Profile ID
    //Date Activated
    //Status'.
    aqObject.CheckProperty(Aliases.Browser.sgbBO_Main.FindElement("//div[contains(@class, 'list-table-responsive')]"), "contentText", cmpEqual, "Profile Name\nProfile ID\nDate Activated\nStatus");
    //Clicks the 'linkSidebarLink5' link.
    Aliases.Browser.sgbBO_Profiles.asideProfiles.navProfiles.textnodeCustomerComms.linkSidebarLink5.Click();
    //Waits until the browser loads the page and is ready to accept user input.
    Aliases.Browser.sgbBO_Main.Wait();
    //Clicks the 'buttonNewCommunication' button.
    Aliases.Browser.sgbBO_Main.buttonNewCommunication.ClickButton();
    //Clicks the 'textboxSubject' control.
    Aliases.Browser.sgbBO_Main.formSubject.textboxSubject.Click();
    //Enters text in the text box.
    Aliases.Browser.sgbBO_Main.formSubject.textboxSubject.SetText(Project.Variables.varSecInput.Value("negInputTrim"));
    //Clicks the 'textboxDescription' control.
    Aliases.Browser.sgbBO_Main.formSubject.textboxDescription.Click();
    //Enters text in the text box.
    Aliases.Browser.sgbBO_Main.formSubject.textboxDescription.SetText(Project.Variables.varSecInput.Value("negInput"));
    //Clicks the 'buttonContinue' button.
    Aliases.Browser.sgbBO_Main.formSubject.buttonContinue.ClickButton();
    //Checks whether the 'contentText' property of the Aliases.Browser.sgbBO_Main.formSubject.panelTitleMustNotContainSpecial object contains 'Title must not contain special characters'.
    aqObject.CheckProperty(Aliases.Browser.sgbBO_Main.formSubject.panelTitleMustNotContainSpecial, "contentText", cmpContains, "Title must not contain special characters", false);
    //Checks whether the 'contentText' property of the Aliases.Browser.sgbBO_Main.formSubject.panelDescriptionMustNotContain object equals 'Description must not contain special characters.'.
    aqObject.CheckProperty(Aliases.Browser.sgbBO_Main.formSubject.panelDescriptionMustNotContain, "contentText", cmpEqual, "Description must not contain special characters.");
    //Clicks the 'textnodeClose' control.
    Aliases.Browser.sgbBO_Main.textnodeClose.Click();
    Project.Variables.varSecInput.Next();
  }
  //Clicks the 'panelSuperAdmin' control.
  Aliases.Browser.sgbBO_Main.Menu.panelSuperAdmin.Click();
  //Clicks the 'linkNavbarLogout' link.
  Aliases.Browser.sgbBO_Main.Menu.linkNavbarLogout.Click();
  //Checks whether the 'value' property of the Aliases.Browser.sgbID.Auth.submitbuttonLogIn object equals 'Log in'.
  aqObject.CheckProperty(Aliases.Browser.sgbID.Auth.submitbuttonLogIn, "value", cmpEqual, "Log in");
  //Closes the specified Window object.
  Aliases.Browser.BrowserWindow.Close();
}