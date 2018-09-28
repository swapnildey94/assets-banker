'use strict';

var AWS = require('aws-sdk'),
	uuid = require('uuid/v4'),
	documentClient = new AWS.DynamoDB.DocumentClient();

var lambda = new AWS.Lambda({
  region: 'us-east-1'
});

exports.handler = (event, context, callback) => {
    var params = {
		Item : {
			"applicationId" : event.applicationId,
			"contact": event.contact,
			"assetDetails": event.assetDetails,
			"applicationStatus": "APPLIED",
			"createdAt": Date.now()
		},
		TableName : process.env.TABLE_NAME
	};
	documentClient.put(params, function(error, data){
        // Return status code 500 on error
        if (error) {
            callback(error);
        } else {
        	lambda.invoke({
			  FunctionName: 'send-assets-banker-email',
			  Payload: JSON.stringify(event) // pass params
			}, function(error, data) {
			  if (error) {
			    callback(error);
			  }
			  if(data.Payload) {
				callback(null, {"applicationId": params.Item.applicationId});
			  }
			});
        }
	});
};
