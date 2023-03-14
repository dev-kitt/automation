DELETE FROM [PortalApprovalQueueItem] WHERE [SubmittedBy] IN (SELECT [OKTAId] FROM [dbo].[User]
    WHERE [FirstName] = 'Test Compelte' AND [LastName] LIKE 'User %')
DELETE FROM [BackOfficeApprovalQueueItem] WHERE [SubmittedBy] IN (SELECT [OKTAId] FROM [dbo].[User]
    WHERE [FirstName] = 'Test Compelte' AND [LastName] LIKE 'User %')


UPDATE [ProfileService] SET [ServiceTransactionLimit] = 8000.00000, 
[ServiceDailyLimit] = 80000.00000, [Enabled] = 1 WHERE [ProfileId] IN (SELECT [ProfileId] 
FROM [Profile] WHERE [Name] = 'TestCompelte Automation')
  
UPDATE [ProfileEntitlement] SET [TransactionLimit] = 80.00000,
[DailyLimit] = 800.00000, [Enabled] = 1 WHERE [ChangedBy] != 'entitlements_sa' AND [ProfileSubServiceId]
    IN (SELECT [ProfileSubServiceId] FROM [ProfileSubService] WHERE [ProfileServiceId] IN (SELECT [ProfileServiceId]
	  FROM [ProfileService] WHERE [ProfileId] IN (SELECT [ProfileId] FROM [Profile]
	  WHERE [Name] = 'TestCompleteAutomation')))
  
UPDATE [ProfileUserEntitlement] SET [TransactionLimit] = 80.00000,
	  [DailyLimit] = 800.00000, [Enabled] = 1, [ApprovalsRequired] = 0 WHERE [ChangedBy] != 'entitlements_sa'
    AND [ProfileEntitlementId] IN (SELECT [ProfileEntitlementId] FROM [ProfileEntitlement] WHERE [ProfileSubServiceId]
    IN (SELECT [ProfileSubServiceId] FROM [ProfileSubService] WHERE [ProfileServiceId] IN (SELECT [ProfileServiceId]
	  FROM [ProfileService] WHERE [ProfileId] IN (SELECT [ProfileId] FROM [Profile]
    WHERE [Name] = 'TestCompleteAutomation'))))
  
UPDATE [ProfileSubscriptionEntitlement] SET [TransactionLimit] = 80.00000,
	  [DailyLimit] = 800.00000, [Enabled] = 1 WHERE [ProfileEntitlementId] IN (SELECT [ProfileEntitlementId]
    FROM [ProfileEntitlement] WHERE [ProfileSubServiceId] IN (SELECT [ProfileSubServiceId]	FROM [ProfileSubService]
	  WHERE [ProfileServiceId] IN (SELECT [ProfileServiceId] FROM [ProfileService] WHERE [ProfileId] IN (SELECT
	  [ProfileId] FROM [Profile] WHERE [Name] = 'TestCompleteAutomation'))))

--add new and edit existing = 3
UPDATE [ProfileUser] SET [ProfileConnectionPermissionEnum] = 3
     WHERE [ProfileId] IN (
		SELECT [ProfileId] FROM [Profile] WHERE [Name] = 'TestComplete Automation')


-- none = 0; add new = 1; edit existing = 2; add new and edit existing = 3
UPDATE [ProfileUser] SET [ProfileConnectionPermissionEnum] = 0 
     WHERE [ProfileUserId] IN (SELECT [ProfileUserId] FROM [ProfileUser] WHERE [ProfileId] IN (
		SELECT [ProfileId] FROM [Profile] WHERE [Name] = 'TestComplete Automation')
	)

BEGIN /*1*/ DELETE FROM [ProfileEntitlement] WHERE [ProfileAccountId] IN (SELECT [ProfileAccountId] FROM [ProfileAccount]
  WHERE [ProfileId] IN (SELECT [ProfileId] FROM [Profile] WHERE [Name] = '" + x ' AND [ActivationDate] IS NULL AND [Enabled] = 0));
  /*2*/ DELETE FROM [ProfileAccount] WHERE [ProfileId] IN (SELECT [ProfileId] FROM [Profile] WHERE [Name] = '" + x ' AND [ActivationDate] IS NULL AND [Enabled] = 0);
  /*3*/ DELETE FROM [ProfileSubService] WHERE [ProfileServiceId] IN (SELECT [ProfileServiceId] FROM [ProfileService] WHERE [ProfileId] IN (SELECT [ProfileId] FROM [Profile]
  WHERE [Name] = '" + x ' AND [ActivationDate] IS NULL AND [Enabled] = 0)); /*4*/ DELETE FROM [ProfileService] WHERE [ProfileId] IN (SELECT [ProfileId] FROM [Profile]
  WHERE [Name] = '" + x ' AND [ActivationDate] IS NULL AND [Enabled] = 0); /*5*/ DELETE FROM [Profile] WHERE [Name] = '" + x ' AND [ActivationDate] IS NULL AND [Enabled] = 0; END

