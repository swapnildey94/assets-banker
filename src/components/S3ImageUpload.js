import React from 'react';
import { Storage } from 'aws-amplify';
import { S3Image } from 'aws-amplify-react';

class S3ImageUpload extends React.Component {

    constructor(props) {
        super(props);

        Storage.get('4398641b-8be9-41e9-a08c-c3520ad981e4/home_insurance.pdf')
            .then(result => console.log(result))
            .catch(err => console.log(err));
    }

    onChange(e) {
        const file = e.target.files[0];
        Storage.put('example.png', file, {
            contentType: 'image/png'
        })
            .then (result => console.log(result))
            .catch(err => console.log(err));
    }

    render() {
        return (
            <div>
                <input
                    type="file" accept='image/png'
                    onChange={(e) => this.onChange(e)}
                />

                {/* <S3Image imgKey={'4398641b-8be9-41e9-a08c-c3520ad981e4/home_insurance.pdf'} /> */}
            </div>
        )
    }
}

export default S3ImageUpload;