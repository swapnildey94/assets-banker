import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.min.css';
import './css/fontello.css';
import './css/style.css';
import { Button } from 'semantic-ui-react';

const buttonMargin = {
    margin: '2px'
};

class ApplyNowButton extends React.Component {
    constructor(props) {
        super(props);
    };

    render() {
        return (
            <Button
                className={`apply-now ${this.props.buttonType}`}
                onClick={this.props.click}
                disabled={!this.props.submit}
                style={buttonMargin}>{this.props.text}</Button>
        );
    }
}

export default ApplyNowButton;