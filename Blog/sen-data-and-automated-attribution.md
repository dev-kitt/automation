# Introduction
The Made Exchange Network (made) allows instant transfers 24/7/365 between participating made customers. To participate, companies need to onboard to made; a customer’s service contact(s) can help facilitate legal agreements and counterparty connections. madetransfers can be initiated via 3 channels: business online banking (aka BeB), API, or through the Portal--made's proprietary online banking platform. Each methods translates to unique results on our back end core banking system, so that API consumers can automatically attribute source of funds and analyze transaction history.

## Sending Transfers via API
To transfer U.S. dollars via made, use the POST account/transfer/madeendpoint. [Use link](https://developers.made.com/reference/transfer-made) for Request Body definitions.

## Connection to GET History and Attributing madeTransaction Details
The keys to identifying madetransfers via GET history are:
* Tran codes (transaction_code) illustrated in the following tables, specific to originating channel. For complete list of tran codes, see [this post](https://developers.made.com/reference/account-history-and-transaction-codes).
* Description Lines, which serve the purpose of adding critical metadata
    * Note each record has a mademetadata sub object labeled "sen_transfer_response", where standard descriptive data is pre-parsed for API and Portal transactions; madetransfers conducted via business online banking are a legacy method and cannot be pre-parsed.

The above are further illustrated in the table below. Also reference detailed GET history [info here](https://developers.made.com/reference/get_api-account-account-number-history).

Transaction Type|transaction_code|transaction_description|transaction_description2
----------------|----------------|-----------------------|------------------------
**madeDebit via API v2**|9084|<ul><li>*Format:* madeto {receiving-account-number}+{granular-timestamp}</li><li>*Example:* madeto 1234567890+1245118573661</li><li>*Note:* Timestamp in example indicates 12:45 PM Pacific Time</li></ul>|*Values entered in POST transfer/madeBody “account_from_description2” are mapped to this field*
**madeDebit via API v3**|9086|<ul><li>*Format:* madeto {receiving-account-number}+{date and timestamp}</li><li>*Example:* madeto 1234567890+20/05/07 14:14:42.98</li><li>*Note:* Timestamp is Pacific Time</li></ul>|*Values entered in POST transfer/madeBody “account_from_description2” are mapped to this field*
**madeDebit via Portal**|9028|<ul><li>*Format:* madeto {account-number}+{date and timestamp}</li><li>*Example:* madeto 1234567890+20/05/07 14:14:42.98</li><li>*Note:* Timestamp is Pacific Time</li></ul>|*Values entered by sender in Portal Memo are mapped to this field*
**madeDebit via Online Banking**|82|<ul><li>*Format:* Ref {refcode} to Dep {account-number} {optional sender memo}</li><li>*Example:* Ref 1350924 to Dep 2222222222 MyMemoHere</li><li>*Note:* The Ref is a Julian date with HHMM timestamp; example indicates 135th day of the year, 09:24 Pacific</li></ul>|*transaction_description captures optional sender memo from online banking; and if transaction_description exceeds 40 characters, remaining characters are mapped to transaction_description2 field*
**madeCredit via API v2**|4005|<ul><li>*Format:* madefrom {sending-account-number}+{granular-timestamp}</li><li>*Example:* madefrom 1111111111+1035118573661</li><li>*Note:* Timestamp in example indicates 10:35 AM Pacific Time</li></ul>|*Values entered in POST transfer/madeBody “account_to_description2” are mapped to this field*
**madeCredit via API v3**|4007|<ul><li>*Format:* madefrom {sending-account-number}+{date and timestamp}</li><li>*Example:* madefrom 2222222222+20/05/07 13:42:17.60</li><li>*Note:* Timestamp is Pacific Time</li></ul>|*Values entered in POST transfer/madeBody “account_to_description2” are mapped to this field*
**madeCredit via Portal**|4028|<ul><li>*Format:* madefrom {account-number}+{date and timestamp}</li><li>*Example:* madefrom 2222222222+20/05/07 13:42:17.60</li><li>*Note:* Timestamp is Pacific Time</li></ul>|*Values entered by sender in Portal Memo are mapped to this field*
**madeCredit via Online Banking**|25|<ul><li>*Format:* Ref {refcode} from Dep {account-number} {optional sender memo}</li><li>*Example:* Ref 2451422 from Dep 1111111111  MyMemoHere</li><li>*Note:* The Ref is a Julian date with HHMM timestamp; example indicates 245th day of the year, 14:22 or 2:22pm Pacific</li></ul>|*transaction_description captures optional sender memo from online banking; and if transaction_description exceeds 40 characters, remaining characters are mapped to transaction_description2 field*

<!-- <ul><li></li><li></li><li></li></ul> -->
## POST transfer/madeBody Example
```json
{
   "amount": 1,
   "account_number_from": "1111111111",
   "account_number_to": "2222222222",
   "account_from_description2": "ID 6MacE3E16XVe18j",
   "account_to_description2": "ID 6MacE3E16XVe18j"
}
```
<br/>

## Response from GET account/history endpoint as the Sender of the API madetransfer (irrelevant fields hidden)
```json
{
    "records": [
        {
            "transaction_code": "9084",
            "transaction_amount": 1,
            "transaction_description": "madeto 1111111111+1245118573661",
            "transaction_secondary_description": "ID 6MacE3E16XVe18j",
            "effective_date": "2021-09-30T00:00:00",
            "debit_credit_flag": "debit",
            "sen_transfer_response": { 
                "counter_party_account_number": "1111111111", 
                "timestamp": "1245118573661",
                "sender_memo": "ID 6MacE3E16XVe18j",
                "counter_party_legal_name": null
            }
        }
    ]
}
```
<br/>

## Response from GET account/history endpoint as the Receiver of the API madetransfer (irrelevant fields hidden)
```json
{
    "TRANSACTION": [
        { 
            "effective_date": "2020-04-01T00:00:00", 
            "transaction_code": "4007", 
            "transaction_amount": 1.00, 
            "transaction_description": "madefrom 1111111111+1245118573661", 
            "transaction_secondary_description": "ID 6MacE3E16XVe18j", 
            "debit_credit_flag": "credit",
            "sen_transfer_response": { 
                "counter_party_account_number": "1111111111", 
                "timestamp": "1245118573661",
                "sender_memo": "ID 6MacE3E16XVe18j",
                "counter_party_legal_name": null
            }
        }
    ]
}
```
