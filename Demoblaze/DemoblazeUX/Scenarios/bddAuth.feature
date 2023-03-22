#***************************************************************
#Name: bddAuth
#Description: Gherkin Feature file for bddAuth
#Author: Keith Hudson
#Creation Date: 03/20/2023
#***************************************************************

Feature: bddAuth

  Background: Initial Setup 
    Given The user has an open Browser on the homepage
   
	Scenario: Verify Demoblaze SignUp
  	Given The user has an active session in "https://demoblaze.com/"   
    When The user navbar menu is verified
    Then The user can signup
     
	Scenario: Verify Demoblaze Login
  	Given The user has an active session in "https://demoblaze.com/"   
    When The user navbar menu is verified
    Then The user can login
      
  Scenario: Verify Demoblaze Logout
    Given The user has an active session in "https://demoblaze.com/"   
    When The user navbar menu is verified
    Then The user can logout
    
	Scenario Outline: Verify Demoblaze SignUp and LogIn
  	Given The user has an active session in <url>  
    And The user clicks the <auth> menu
    When The user enters their <username> and <password> into the <auth> form for <alert> validation
    And The <auth> button has been clicked
  	Then The user should be verified on <auth> 
    And The appropriate <alert> is displayed 
  
  # passwords are refs to the excrypted source    
  @ex-authHappy
  Examples:
    | url                      | auth     | username          | password     | alert     |
    | "https://demoblaze.com/" | "SignUp" | "kitt0"           | "p@$$word00" | "Success" |
    | "https://demoblaze.com/" | "SignUp" | "user01"          | "p@$$word01" | "Success" |
    | "https://demoblaze.com/" | "SignUp" | "user02"          | "p@$$word02" | "Success" |
    | "https://demoblaze.com/" | "SignUp" | "user03"          | "p@$$word03" | "Success" |
    | "https://demoblaze.com/" | "LogIn"  | "kitt0"           | "p@$$word00" | "Success" |
    | "https://demoblaze.com/" | "LogIn"  | "user01"          | "p@$$word01" | "Success" |
    | "https://demoblaze.com/" | "LogIn"  | "user02"          | "p@$$word02" | "Success" |
    | "https://demoblaze.com/" | "LogIn"  | "user03"          | "p@$$word03" | "Success" |
    
  @ex-authSad
  Examples:
    | url                      | auth     | username        | password     | alert     |
    | "https://demoblaze.com/" | "SignUp" | "1234"          | "1234"       | "Failure" |
    | "https://demoblaze.com/" | "SignUp" | ""              | "p@ssword00" | "Failure" |
    | "https://demoblaze.com/" | "SignUp" | "kitt0"         | ""           | "Failure" |
    | "https://demoblaze.com/" | "SignUp" | ""              | ""           | "Failure" |
    | "https://demoblaze.com/" | "Login"  | "1234"          | "p@ssword00" | "Failure" |
    | "https://demoblaze.com/" | "Login"  | ""              | "1234"       | "Failure" |
    | "https://demoblaze.com/" | "Login"  | "kitt0"         | ""           | "Failure" |
    | "https://demoblaze.com/" | "Login"  | ""              | ""           | "Failure" |
    
# ISSUE
# Alert message is not readible from the web driver so the contentText cannot be read to understand what the alert message is e.g. user already exists VS enter username and password VS 
# SOLUTION
# Consider alternative solutions for alert messaging, re-purposeing existing modal instead of Browser.Alert
# or
# Database access to refresh the DatabaseName.dbo.Users table to avoid duplicate account creation 