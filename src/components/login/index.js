import React from 'react';
import _ from 'lodash';
import { Redirect } from 'react-router-dom';
import { Grid, Button, Form, Container, Image, Header } from 'semantic-ui-react'
import ReCAPTCHA from 'react-google-recaptcha';
import { AuthConsumer } from '../../utilities/AuthService';

const users = [
    {
        username: 'admin',
        password: 'Xmaple$2018'
    },
    {
        username: 'loanadmin',
        password: 'Asset$2018'
    }
];

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                username: '',
                password: ''
            },
            redirectToReferrer: false
        };
    }

    login = (login) => {
        let idx = _.findIndex(users, { 'username': this.state.user.username, 'password': this.state.user.password });
        if (idx > -1) {
            login();
            this.setState({
                redirectToReferrer: true
            });
        };
    };

    handleChange = (event) => {
        this.setState({
            user: { ...this.state.user, [event.target.id]: event.target.value },
        });
    };

    render() {

        const { from } = this.props.location.state || { from: { "pathname": "/applications" } };

        if (this.state.redirectToReferrer) {
            return <Redirect to={from}/>
        }

        return (
            <AuthConsumer>
                {
                    ({login}) => (
                        <div>
                            {/* <Image
                                src={'http://luxebanker.com/wp-content/uploads/2018/07/Asset-Banker-logo-03.jpg'}
                                size='medium'
                                centered
                                style={{ marginTop: '20px', marginBottom: '20px' }} /> */}
                            <Container style={{ marginTop: '20px', marginBottom: '20px' }}>
                                <Grid columns='equal'>
                                    <Grid.Column />
                                    <Grid.Column width={8}>
                                        <Form>
                                            <Form.Field required>
                                                <label>Username</label>
                                                <input  id="username"
                                                        type="text" 
                                                        placeholder='Username' 
                                                        value={this.state.user.username}
                                                        onChange={this.handleChange} />
                                            </Form.Field>
                                            <Form.Field required>
                                                <label>Password</label>
                                                <input  id="password"
                                                        type="password" 
                                                        placeholder='Password'
                                                        value={this.state.user.password}
                                                        onChange={this.handleChange} />
                                            </Form.Field>
                                            <Button type="button" primary onClick={() => this.login(login)}>Login</Button>
                                        </Form>
                                    </Grid.Column>
                                    <Grid.Column />
                                </Grid>
                            </Container>
                        </div>
                    )
                }
            </AuthConsumer>
        );
    }
}

export default Login;