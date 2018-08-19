import React from 'react';
import {Icon, Header} from 'semantic-ui-react';
import {Container, Col, Row} from 'reactstrap';
import 'semantic-ui-css/semantic.css';
import '../../index.css';

const containerPadding = {
    marginTop: '30px'
};

class NotFound extends React.Component {
    render() {
        return (
            <div className="App">
                <Container style={containerPadding}>
                    <Row>
                        <Col sm="12" md="12">
                            <Header as='h2' icon textAlign={'center'}>
                                <Icon name='gamepad' />
                                404
                                <Header.Subheader>How about some good old atari?</Header.Subheader>
                            </Header>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default NotFound;