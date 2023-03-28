function onLogTest_OnLogError(Sender, LogParams)
{
  
}

function onLogTest_OnLogWarning(Sender, LogParams)
{
  // Check if the message includes the desired substring
  var locked = aqString.Find(LogParams.Str, "Improve your test performance");
  var tooLong = aqString.Find(LogParams.Str, "The text specified in the edit box has been truncated, since it was too long");
  if (locked != -1 || tooLong != -1)
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