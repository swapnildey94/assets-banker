import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes';
import { AuthProvider } from './utilities/AuthService';
import registerServiceWorker from './registerServiceWorker';
import Amplify from 'aws-amplify';

Amplify.configure({
    Auth: {
        identityPoolId: 'us-east-1:a82c6a6b-fc89-41cc-b41b-efe5e2cf5b42', //REQUIRED - Amazon Cognito Identity Pool ID
        region: 'us-east-1', // REQUIRED - Amazon Cognito Region
    },
    Storage: {
        bucket: 'assets-banker-application-uploads', //REQUIRED -  Amazon S3 bucket
        region: 'us-east-1', //OPTIONAL -  Amazon service region
    }
});

ReactDOM.render(
    <AuthProvider>
        <Routes/>
    </AuthProvider>,
    document.getElementById('root')
);
registerServiceWorker();
