# Overview
The made APIs provide a RESTful interface designed to make automating access to banking services easy. Common use cases include payment initiation (SEN, wires, international payments, FX), automated attribution, reconciliation, and custom system integrations. 

## Sandbox and how to get started
Our API tools are available for customers and business partners only. To get started in our Sandbox, email integrations@made.com. You will need to provide a name and email of a designated Sandbox Profile Admin, email, and source IPs which will be required for API access.

If you require a banking relationship first, please <a href="https://www.made.com/get-started/fintech" target="_blank">apply online</a>.

## Postman Public Workspace
To assist our clients in getting acquainted with our API Sandbox, we’ve created a Postman public workspace for made’s Partner API v3, which you can access via the button below. Pre-request scripts built into the Postman Collection take care of the [authentication model](https://developers.made.com/reference/authentication) for you; simply add your sandbox subscription key and client secret into the assigned variables in the Sandbox Environment, and the signature should be built and sent properly upon each subsequent call. (To obtain Sandbox subscription keys and secret, be sure you have followed the above instructions on how to get started with Sandbox.)

[![Run in Postman](https://run.pstmn.io/button.svg)](https://god.gw.postman.com/run-collection/00000000-0000-0000-0000-000000000000)

We hope this helps fast track your adoption of our API endpoints! 

## Production and how to get started
We require that customers successfully integrate with our Sandbox endpoints prior to any production migration. Once ready, customers should again reach out to integrations@made.com. 

## Common links and urls
* <a href="https://portal-stg.made.com/" target="_blank">made Portal Sandbox</a>
* `https://api-sandbox.made.com/v3/` (Sandbox target URL)
* <a href="https://portal.made.com/" target="_blank">made Portal Production</a>
* `https://api.made.com/v3` (Production target URL)
* <a href="https://developers.made.com/reference/2023-scheduled-maintenance" target="_blank">Maintenance Window List</a>