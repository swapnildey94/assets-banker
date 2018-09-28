var AWS = require('aws-sdk');
var ses = new AWS.SES();

var sender = 'admin@assetbanker.com';

exports.handler = (event, context, callback) => {
    sendEmail(event, function (err, data) {
        context.done(err, null);
    });
};

function sendEmail (event, done) {
    var params = {
        Destination: {
            ToAddresses: [
                event.contact.email
            ]
        },
        Template: 'AssetsBankerLoanApplication',
        TemplateData: JSON.stringify(event),
        Source: sender
    };
    
    var internalParams = {
        Destination: {
            ToAddresses: [
                'apply@assetbanker.com'
            ]
        },
        Template: 'AssetsBankerLoanApplicationInternal',
        TemplateData: JSON.stringify(event),
        Source: sender
    };
    
    // Create the promise and SES service object
    var sendPromise = new AWS.SES({apiVersion: '2010-12-01'}).sendTemplatedEmail(params).promise();
    var internalSendPromise = new AWS.SES({apiVersion: '2010-12-01'}).sendTemplatedEmail(internalParams).promise();

    // Handle promise's fulfilled/rejected states
    sendPromise.then(
      function(data) {
        done();
        internalSendPromise.then(
            function(data) {
                done();
            }
        ).catch(
            function(err) {
                console.error(err, err.stack);   
            }
        );
      }).catch(
        function(err) {
        console.error(err, err.stack);
      });
}
