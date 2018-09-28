'use strict';

var AWS = require('aws-sdk'),
	documentClient = new AWS.DynamoDB.DocumentClient(); 

exports.handler = (event, context, callback) => {
	var params = {
		TableName : process.env.TABLE_NAME
	};
	documentClient.scan(params, function(err, data){
		if(err){
		    callback(err, null);
		    //callback(null, 'Hello from Lambda');
		}else{
		    callback(null, data.Items);
		}
	});
}
