**<h1> TheoremOne Automation Project </h1>**

![KittMade Automation](../Src/readme-banner.png)

## <span style="color:#555555"><u> **OVERVIEW** </u></span>
Given the time constraints and specifications of the requirements, I am recommending for the focus of this 8hr project to be centered around the base project setup and design, understanding the behavioral approach to development, identifiying the overall test stratedgy, and implimenting test coverage of Account related testing only (e.g. SignUp/Login). 

While the specifications call for additional test coverage, there are descrepencies in the overall design and behavior of the application that should be discussed in more detail (noted below). 

Using the BDD methodologies to focus on the specific functionaliy of user authentification will provide a critical baseline for the overall test project design and help us to create more reliable, streamlined, and robust tests moving forward.

- [BDD Scenarios](DemoblazeUX/Scenarios)
  - [bddAuth](DemoblazeUX/Scenarios/bddAuth.feature)
- [BDD Step Definitions](DemoblazeUX/Script/Bdd)
  - [bdd_Auth](DemoblazeUX/Script/Bdd/bdd_Auth.js)
- [Common Scripts](DemoblazeUX/Script/Common/Main.js)
- [Event Handlers](DemoblazeUX/Script/Events)
- [Object Mapping](DemoblazeUX/NameMapping)
  - [Reference Doc](DemoblazeUX/NameMapping/tc-name-mapping.md)
- [Support Batch Files](DemoblazeUX/Stores/Files)
- [<span style="color:gold"> VIDEO: Testrun Example MP4 </span>](../Src/testrunEX.mp4)

## <span style="color:#555555"><u> **NOTES** </u></span>
 Auth (Login/SignUp): 
- Day 1
  - Currently validating the form and not via input fields (e.g. username = null, password = valid | result = "Please fill out Username and Password" | expected = "Please fill out Username")
  - What are the acceptable values and data types needed for SignUp/Login?
  - What should occur after SignUp? 
  - Should the user be automatically logged in with the page refreshed w/profile info? 
  - Are we worried about cross-site scripting (e.g. username = `<img/src/onerror=prompt(8)>`, password = `<iframe src iframe src="javascript:javascript:alert(1)"></iframe src>`)
  - Message syntax, what verbiage should be displayed in positive/negative tests? (e.g. when user already exists, message says "This user already exist."
  - Are there any design mock-ups or elements to reference or consider?
  - How does SignUp/LogIn behvaior effect subseqent functionality around the browsing and shopping experiences?

- Day 2
  - I've decided to go ahead and map out the object references for the entire webpage, as I think this will help with build out of the tests foing forward and creates a structured and logical naming convention and organization segmentation for easier management.
  - ISSUE: Current web drivers are unable to recognize the contentText of Alert messages, so it is impossible to validate the appropriate message is displayed. (e.g. please enter username and password VS unername already exists VS signup successful) 
    - SOLUTIONS:
      - Consider handling alert messaging differently, perhaps reusing existing modal functionality to display alert messages?
      - Grant access to the Database.dbo.Users table to refresh test data on tearddown event (when the test stops) to avoid duplicate account creation and false/positive alert messages.

## <span style="color:#555555"><u> **POINTS OF CONTACT** </u></span>
When issues arise for any of the below mentioned areas, please contact the associated personnel for support and troubleshooting.
- **Anything:** Keith Hudson kitt@made.llc


## <span style="color:#555555"><u> **SPECIFICATIONS** </u></span>

* These are the areas that the client requested coverage for:
  * Account creation
  * Login
  * Browsing the store’s main categories (Phones, Laptops, Monitors)
  * Play About Us video
  * Send a message through Contact
  * Shopping cart
  * Checkout
  
* The framework and tool selection is up to you, but here are some ideas that might help the implementation to serve as an example of good practices:
  * Including a way to pass along custom data for tests where needed, as the catalog is going to be changing frequently.
  * Having comments put in place to help with the handover of the code to the client.

* Any scenarios and needs outside of what the client has requested that you feel should be included can be documented and optionally added to the automated suite, if time allows it.

* Finally, what would you do differently if you had more time? A few sentences in the README of the repository are enough.


## <span style="color:#555555"><u> **CORE SOLUTIONS** </u></span>
I've decided to leverage my access to the Smartbear automation frameworks to create the base project in TestComplete, which allows for a quick, easy, and robust solution and can be easily adopted to open-source models. [Reference](https://support.smartbear.com/testcomplete/docs/index.html)

1. TestComplete 15 – IDE & Test Runner
2. TestComplete License Manager – Activating/Deactivating Licenses
3. TestComplete Web Extension – Chromium Based Web Runner
4. SQL Server Management Studio – SQL Server DBMS
5. ODBC Data Sources (64-bit) – API for Accessing DBMS
6. Git – Distributed Version Control System


## <span style="color:#555555"><u> **TIMELINE** </u></span>

Below is a 4 DAY timeline of all completed, current, and automation efforts conducted by...well, me.


``` mermaid
gantt
title 3/20 - 3/23
dateFormat YYYY-MM-DD


section Day 1
Product Testing :a1, 2023-03-20, 1d
Test Plan/Strategy (readme.md) :a1, 2023-03-20, 1d
Baseline Project Framework :a1, 2023-03-20, 1d
Init Commit/Push :a1, 2023-03-20, 1d
Account Auth Feature :a1, 2023-03-20, 36h
Account Auth Examples :a1, 2023-03-20, 36h

section Day 2
Account Auth Feature :a1, 2023-03-21, 1d
Account Auth Scenario Outline :a1, 2023-03-21, 1d
Account Auth Step Definitions :a1, 2023-03-21, 1d
Testing :a1, 2023-03-21, 1d
CleanUp Scripts and Docs :a1, 2023-03-21, 1d
Latest Commit/Push :a1, 2023-03-21, 1d

section Day 3
Final Commit/Push :a1, 2023-03-22, 1d
Updates as Needed :a1, 2023-03-22, 1d
Merge w/Main Branch :a1, 2023-03-22, 1d

```

DAY 1 (3 hrs)
- **Product Testing (hands-on)** <span style="color:green"> **COMPLETE** </span>
- **Test Plan/Strategy (readme.md)** <span style="color:green"> **COMPLETE** </span>
- **Baseline Project Framework** <span style="color:green"> **COMPLETE** </span>
- **Account Auth Feature** <span style="color:green"> **COMPLETE** </span>
- **Account Auth Examples** <span style="color:green"> **COMPLETE** </span>
- **Init Commit/Push** <span style="color:green"> **COMPLETE** </span>

DAY 2 (4 hrs)
- **Baseline Project Framework** <span style="color:green"> **COMPLETE** </span>
- **DOM NameMapping** <span style="color:green"> **COMPLETE** </span>
- **Account Auth Feature** <span style="color:green"> **COMPLETE** </span>
- **Account Auth Scenario Outline** <span style="color:green"> **COMPLETE** </span>
- **Testing** <span style="color:gold"> **IN-PROGRESS** </span>
- **CleanUp Scripts and Docs** <span style="color:gold"> **IN-PROGRESS** </span>
- **Latest Commit/Push** 


DAY 3 (TBD)
- **Final Commit/Push** 
- **Updates as Needed** 
- **Merge w/Main Branch** 


## <span style="color:#555555"><u> **INFRASTRUCTURE** </u></span> 
Below is the BDD flow-chart of the Feature and Scenario Outline for testing the [https://www.demoblaze.com/](https://www.demoblaze.com/) website.

``` mermaid
graph TD
A[KITT-MADE] --> |Keith's Workspace| E
B[THEOREM-ONE] --> |Co-pilot's Workspace| E
E{Demoblaze Website} --> |git/theoremone-assessments| F
F[WebProject] -->|One| H[Login]
F -->|Two| I[SignUp]
F -->|Three| J[AboutUs]
F -->|Four| U[ContactUs]
F -->|Five| G[BrowseCatalog]
F -->|Six| O[ShoppingCart]
F -->|Seven| Q[Checkout]
```

## <span style="color:#555555"><u> **BDD REFERENCES** </u></span>
- [Azure - BDD Test Case Template](https://cucumber.io/docs/gherkin/reference/)
- [Cucumber - Gherkin Reference](https://cucumber.io/docs/gherkin/reference/)
- [Cucumber - Tags Reference](https://cucumber.io/docs/cucumber/api/?lang=java#tags) 
- [TestComplete - BDD Reference](https://support.smartbear.com/testcomplete/docs/bdd/index.html) 

## <span style="color:#555555"><u> **AUTH SCENARIO EXAMPLE** </u></span>
This is a concrete example that illustrates a business rule. It consists of a list of steps. You can have as many steps as you like, but we recommend 3-5 steps per example. Having too many steps will cause the example to lose its expressive power as a specification and documentation. Each step starts with _Given, When, Then, And,_ or _But_. Each step in a scenario is executed one at a time, in the sequence you’ve written them in.

```
@Auth
Feature: bddAuth

  Background: Initial Setup 
    Given The test data has been refreshed and Browser is open and maximized
   
  @authSignUp
	Scenario: Verify Demoblaze SignUp
  	Given The user has an active session in "https://demoblaze.com/"   
    When The user navbar menu is verified
    Then The user can signup
     
  @authLogIn
	Scenario: Verify Demoblaze Login
  	Given The user has an active session in "https://demoblaze.com/"   
    When The user navbar menu is verified
    Then The user can login
    
  @authLogOut  
  Scenario: Verify Demoblaze Logout
    Given The user has an active session in "https://demoblaze.com/"   
    When The user navbar menu is verified
    Then The user can logout
    
  @authAccount
	Scenario Outline: Verify Demoblaze SignUp and LogIn
    Given The user has an active session in <url>  
    And The user clicks the <auth> menu
    When The user enters their <email> and <password> into the <auth> form for <alert> validation
    And The <auth> button has been clicked
    Then The user should be validated on <auth> 
    And The appropriate <alert> is displayed 
  
  # passsword are refs to the encrypted source
  @ex-authHappy
    | url                     | auth     | email           | password    | message   |
    |"https://demoblaze.com/" | "SignUp" | "kitt0"         | "password0" | "Success" |
    |"https://demoblaze.com/" | "SignUp" | "user1"         | "password1" | "Success" |
    |"https://demoblaze.com/" | "SignUp" | "user2"         | "password2" | "Success" |
    |"https://demoblaze.com/" | "SignUp" | "user3"         | "password3" | "Success" |
    |"https://demoblaze.com/" | "Login"  | "kitt0"         | "password0" | "Success" |
    |"https://demoblaze.com/" | "Login"  | "user1"         | "password1" | "Success" |
    |"https://demoblaze.com/" | "Login"  | "user2"         | "password2" | "Success" |
    |"https://demoblaze.com/" | "Login"  | "user3"         | "password3" | "Success" |

  @ex-authSad
    | url                     | auth     | email   | password    | message   |
    |"https://demoblaze.com/" | "SignUp" | "kitt0" | "password1" | "Failure" |
    |"https://demoblaze.com/" | "SignUp" | ""      | "password0" | "Failure" |
    |"https://demoblaze.com/" | "SignUp" | "kitt0" | ""          | "Failure" |
    |"https://demoblaze.com/" | "SignUp" | ""      | ""          | "Failure" |
    |"https://demoblaze.com/" | "Login"  | "kitt0" | "password1" | "Failure" |
    |"https://demoblaze.com/" | "Login"  | ""      | "password0" | "Failure" |
    |"https://demoblaze.com/" | "Login"  | "kitt0" | ""          | "Failure" |
    |"https://demoblaze.com/" | "Login"  | ""      | ""          | "Failure" |
```

**NOTE:** _tags can be assigned to Features and Scenarios to organize and run them by some criteria, as shown above. These are **NOT** related to the tags used within Azure's query based test suites._



## <span style="color:#555555"><u> **STEP DEFINITIONS EXAMPLE** </u></span>
This is a JavaScript method with an expression that links it to one or more Gherkin steps. When executing a Gherkin step within a scenario (like the example above), the test runner will look for a matching step definition to execute.

``` js
//USEUNIT Main

/*************************************************
Name: bdd_Auth
Description: Step definitions for bdd_Auth
Author: Keith Hudson
Creation Date: 03/20/2023
**************************************************/

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

```