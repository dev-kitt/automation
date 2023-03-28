﻿/***************************************************************
Name: CommonSQL
Description: Backend database calls - SSMS
Author: Keith Hudson
Creation Date: 08/24/2021
***************************************************************/

function sqlDatabaseHandler(db){
  switch (db){
    case "sqldb-connections-qa":
      ProjectSuite.Variables.dboDatabaseUser = ProjectSuite.Variables.dboEntitlementsUser;
      ProjectSuite.Variables.dboDatabasePass = ProjectSuite.Variables.dboEntitlementsPassQA;
      break;
    case "sqldb-connections-stg":
      ProjectSuite.Variables.dboDatabaseUser = ProjectSuite.Variables.dboEntitlementsUser;
      ProjectSuite.Variables.dboDatabasePass = ProjectSuite.Variables.dboEntitlementsPassSTG;
      break;
    
    case "sqldb-entitlements-qa":
      ProjectSuite.Variables.dboDatabaseUser = ProjectSuite.Variables.dboEntitlementsUser;
      ProjectSuite.Variables.dboDatabasePass = ProjectSuite.Variables.dboEntitlementsPassQA;
      break;
    case "sqldb-entitlements-stg":
      ProjectSuite.Variables.dboDatabaseUser = ProjectSuite.Variables.dboEntitlementsUser;
      ProjectSuite.Variables.dboDatabasePass = ProjectSuite.Variables.dboEntitlementsPassSTG;
      break;
      
    case "sqldb-fx-qa":
      ProjectSuite.Variables.dboDatabaseUser = ProjectSuite.Variables.dboFXUser;
      ProjectSuite.Variables.dboDatabasePass = ProjectSuite.Variables.dboFXPassQA;
      break;
    case "sqldb-fx-stg":
      ProjectSuite.Variables.dboDatabaseUser = ProjectSuite.Variables.dboFXUser;
      ProjectSuite.Variables.dboDatabasePass = ProjectSuite.Variables.dboFXPassSTG;
      break;
      
    case "sqldb-payments-qa":
      ProjectSuite.Variables.dboDatabaseUser = ProjectSuite.Variables.dboPaymentsUser;
      ProjectSuite.Variables.dboDatabasePass = ProjectSuite.Variables.dboPaymentsPassQA;
      break;
    case "sqldb-payments-stg":
      ProjectSuite.Variables.dboDatabaseUser = ProjectSuite.Variables.dboPaymentsUser;
      ProjectSuite.Variables.dboDatabasePass = ProjectSuite.Variables.dboPaymentsPassSTG;
      break;
      
    case "sqldb-transactions-qa":
      ProjectSuite.Variables.dboDatabaseUser = ProjectSuite.Variables.dboTransactionsUser;
      ProjectSuite.Variables.dboDatabasePass = ProjectSuite.Variables.dboTransactionsPassQA;
      break;
    case "sqldb-transactions-stg":
      ProjectSuite.Variables.dboDatabaseUser = ProjectSuite.Variables.dboTransactionsUser;
      ProjectSuite.Variables.dboDatabasePass = ProjectSuite.Variables.dboTransactionsPassSTG;
      break;
  }
  
  // use active node url for STG regional connections (AKS/HA)
  if (equal(ProjectSuite.Variables.Environment, "STG")) {
    ProjectSuite.Variables.dboDatabaseServer = "fg-sql-silvergate-apis-shared-stg"
  }
  ProjectSuite.Variables.dboDatabase = db;
}

// executes sql statement without capturing results (ex:update)
function sqlQueryNone(query) {
  // set log and variables
  Log.Message("SQL Query: " + query);
  var AConnection, recSet;
  
  // create a connection object
  AConnection = ADO.CreateConnection();
  
  // specify the connection string
  AConnection.ConnectionString = "Provider=SQLNCLI11;"
    + "Server=tcp:" + ProjectSuite.Variables.dboDatabaseServer + ".database.windows.net;"
    + "Database=" + ProjectSuite.Variables.dboDatabase + ";"
    + "Uid=" + ProjectSuite.Variables.dboDatabaseUser + ";" 
    + "Pwd=" + ProjectSuite.Variables.dboDatabasePass.DecryptedValue + ";";
      
  // open the connection
  AConnection.Open();
  
  // execute a simple query
  recSet = AConnection.Execute(query);
  
  // close the connection
  AConnection.Close();
}

// executes sql statement capturing single result
function sqlQueryOne(query) {
  // set log and variables
  Log.Message("SQL Query: " + query);
  var AConnection, recSet, result;
  
  // create a connection object
  AConnection = ADO.CreateConnection();
  
  // specify the connection string
  AConnection.ConnectionString = "Provider=SQLNCLI11;"
    + "Server=tcp:" + ProjectSuite.Variables.dboDatabaseServer + ".database.windows.net;"
    + "Database=" + ProjectSuite.Variables.dboDatabase + ";"
    + "Uid=" + ProjectSuite.Variables.dboDatabaseUser + ";" 
    + "Pwd=" + ProjectSuite.Variables.dboDatabasePass.DecryptedValue + ";";
  
  // open the connection
  AConnection.Open();
  
  // execute a simple query
  recSet = AConnection.Execute(query);
  
  // validate results  
  if (!equal(recSet.Fields.Item(0).Value, "0")) {
    result = recSet.Fields.Item(0).Value;
    Log.Message("SQL Query Result: " + result);
  }
  else {
    Log.Warning("WARNING: no records found");
  }
  return result;
  
  // close the connection
  AConnection.Close();
}

// executes sql statement capturing results in array
function sqlQueryArray(query) {
  // set log, variables, & array
  Log.Message("SQL Query: " + query);
  var AConnection, recSet, results;
  var dataSet = [];
  
  // create a connection object
  AConnection = ADO.CreateConnection();
  
  // specify the connection string
    AConnection.ConnectionString = "Provider=SQLNCLI11;"
    + "Server=tcp:" + ProjectSuite.Variables.dboDatabaseServer + ".database.windows.net;"
    + "Database=" + ProjectSuite.Variables.dboDatabase + ";"
    + "Uid=" + ProjectSuite.Variables.dboDatabaseUser + ";" 
    + "Pwd=" + ProjectSuite.Variables.dboDatabasePass.DecryptedValue + ";";
  
  // open the connection
  AConnection.Open();
  
  // execute a simple query
  recSet = AConnection.Execute(query);
   
  // iterate through query results and insert data into the test log
  for (i = 0; i <= recSet.RecordCount - 1; i++) {
    dataSet.push(" " + recSet.Fields.Item(0).Value);
    recSet.MoveNext();
  }  
  ProjectSuite.Variables.DynamicVarInt = recSet.RecordCount; // track number of records in array
  return dataSet;
  
  // close the connection
  AConnection.Close();
}

// executes sql statement with expected boolean result
function sqlQueryBool(query) {
  // set log and variables
  Log.Message("SQL Query: " + query);
  var AConnection, recSet, result;
  
  // create a connection object
  AConnection = ADO.CreateConnection();
  
  // specify the connection string
  AConnection.ConnectionString = "Provider=SQLNCLI11;"
    + "Server=tcp:" + ProjectSuite.Variables.dboDatabaseServer + ".database.windows.net;"
    + "Database=" + ProjectSuite.Variables.dboDatabase + ";"
    + "Uid=" + ProjectSuite.Variables.dboDatabaseUser + ";" 
    + "Pwd=" + ProjectSuite.Variables.dboDatabasePass.DecryptedValue + ";";
  
  // open the connection
  AConnection.Open();
  
  // execute a simple query
  recSet = AConnection.Execute(query);
  
  // validate results  
  if (recSet.Fields.Item(0).Value >= "0") {
    result = recSet.Fields.Item(0).Value;
    Log.Message("SQL Query Result: " + result);
  }
  else {
    Log.Warning("WARNING: no records found");
  }
  return result;
  
  // close the connection
  AConnection.Close();
}

function sqlSaveRecordSet(query)
{
  // set log and variables
  Log.Message("SQL Query: " + query);
  var AConnection, result;
  
  // Get the sheet of the Excel file
  var excelFile = Excel.Open("C:\\Users\\KeithHudson\\Downloads\\testRecordSet.xlsx");
  var excelSheet = excelFile.SheetByTitle("Sheet1");
  
  // create a connection object
  AConnection = ADO.CreateConnection();
  
  // specify the connection string
  AConnection.ConnectionString = "Provider=SQLNCLI11;"
    + "Server=tcp:" + ProjectSuite.Variables.dboDatabaseServer + ".database.windows.net;"
    + "Database=" + ProjectSuite.Variables.dboDatabase + ";"
    + "Uid=" + ProjectSuite.Variables.dboDatabaseUser + ";" 
    + "Pwd=" + ProjectSuite.Variables.dboDatabasePass.DecryptedValue + ";";
  
  // open the connection
  AConnection.Open();
  
  // Create a new Recordset object
  var Rs = ADO.CreateRecordset();
  Rs.Open(AConnection.Execute(query));
  
  // Read data from the recordset and post them to the test log
  Log.AppendFolder("SQL Record Set");
  Rs.MoveFirst();
  while(! Rs.EOF)
  {
    Log.Message(Rs.Fields.Item(0).Value);
    result = Rs.Fields.Item(0);
    
    // Write the obtained data into a new row of the file
    var rowIndex = excelSheet.RowCount + 1;
    excelSheet.Cell("A", rowIndex).Value = result;
    excelFile.Save();

    Rs.MoveNext();
  }
  return result;
  
  // Close the recordset and connection
  Rs.Close();
  AConnection.Close();
}