import React from 'react';
import _ from 'lodash';
import axios from 'axios';
import moment from 'moment';
import { Storage } from 'aws-amplify';
import JSZip from 'jszip';
import JSZipUtils from 'jszip-utils';
import { saveAs } from 'file-saver/FileSaver';
import jsonexport from 'jsonexport/dist';
import {Dimmer, Loader, Icon, Table, Label, Button, Header, Form} from 'semantic-ui-react';
import {Container, Col, Row} from 'reactstrap';
import 'semantic-ui-css/semantic.css';
import '../../index.css';

const containerPadding = {
    marginTop: '30px'
};

class ApplicationsTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            loadingMessage: 'Fetching Loan Applications',
            application: [],
            applicationDetails: {},
            showDetails: false,
            viewLoanStatus: 'Applied'
        };
    };

    componentDidMount() {
        this.loadApplications();
    }

    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value,
        });
    };

    loadApplications = () => {
        axios.get('https://raw0z9bmf4.execute-api.us-east-1.amazonaws.com/DEV/applications')
          .then((response) => {
            this.setState({
                loading: false,
                applications: response.data
            });
          })
          .catch((error) => {
            console.log(JSON.stringify(error));
            this.setState({
                loading: false
            });
          });
    }

    onDetails = (application) => {
        this.setState({
            applicationDetails: application,
            showDetails: true
        });
    }

    onBack = () => {
        this.setState({
            applicationDetails: {},
            showDetails: false
        });
    }

    downloadApplicationDocuments = () => {
        if (this.state.applicationDetails.assetDetails.files) {

            this.setState({
                loading: true,
                loadingMessage: 'Fetching Documents'
            });

            let zip = new JSZip();
            let fileCount = this.state.applicationDetails.assetDetails.files.length;
            this.state.applicationDetails.assetDetails.files.forEach((file, idx) => {
                Storage.get(file)
                    .then(url => {
                        let filename = file.split("/")[1];
                        zip.file(filename, this.urlToPromise(url), {binary:true});
                    })
                    .catch(err => console.log(err));
            });

            setTimeout(() => {
                // when everything has been downloaded, we can trigger the dl
                zip.generateAsync({type:"blob"}, (metadata) => {
                    var msg = "progression : " + metadata.percent.toFixed(2) + " %";
                    if(metadata.currentFile) {
                        msg += ", current file = " + metadata.currentFile;
                    }
                })
                .then((blob) => {
                    // see FileSaver.js
                    saveAs(blob, this.state.applicationDetails.applicationId + ".zip");

                    this.setState({
                        loading: false
                    });
                }, (e) => {
                    console.log(e);

                    this.setState({
                        loading: false
                    });
                });
            }, 4000 * fileCount);
        }
    }

    urlToPromise = (url) => {
        return new Promise((resolve, reject) => {
            JSZipUtils.getBinaryContent(url, (err, data) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }

    downloadApplication = () => {
        let application = _.cloneDeep(this.state.applicationDetails);
        application.createdAt = moment(application.createdAt).format("MMM Do YYYY h:mm A");

        jsonexport(application, {verticalOutput: false}, (err, csv) => {
            if(err) return console.log(err);
            var blob = new Blob([csv], {type: "text/csv;charset=utf-8"});
            saveAs(blob, application.applicationId + ".csv");
        });
    }

    render() {

        if (this.state.loading) {
            return (
                <Dimmer active>
                    <Loader>{this.state.loadingMessage}</Loader>
                </Dimmer>
            )
        }

        if (this.state.showDetails && this.state.applicationDetails) {
            return (
                <div className="app">
                    <Container>
                        <Row style={containerPadding}>
                            <Col sm="8" md="8">
                                <h1>Review Application</h1>
                            </Col>
                            <Col sm="4" md="4">
                                <Button floated='right' icon labelPosition='left' onClick={this.onBack} primary size='small'>
                                    <Icon name='arrow left' /> Back
                                </Button>
                            </Col>

                            <Col sm="12" md="12" style={{marginTop: '25px', marginBottom: '30px'}}>
                                <Row>
                                    <Col sm="8" md="8">
                                        <Header as='h4'>
                                            <Header.Content>
                                                Application ID
                                            </Header.Content>
                                            <Header.Subheader>
                                                {this.state.applicationDetails.applicationId}
                                            </Header.Subheader>
                                        </Header>
                                    </Col>
                                    <Col sm="4" md="4">
                                        <Button floated='right' icon labelPosition='left' negative size='small'>
                                            <Icon name='cancel' /> Reject
                                        </Button>
                                        <Button floated='right' icon labelPosition='left' positive size='small'>
                                            <Icon name='check' /> Approve
                                        </Button>
                                    </Col>
                                </Row>

                                <hr/>

                                <Row style={{marginTop: '30px'}}>
                                    <Col sm="4" md="4">
                                        <Header as='h4'>
                                            <Header.Content>
                                                Applicant Information
                                            </Header.Content>
                                            <Header.Subheader>
                                                Please verify the applicant's information
                                            </Header.Subheader>
                                        </Header>

                                        <Header
                                            as='h6'
                                            content='Name'
                                            subheader={this.state.applicationDetails.contact.fullName}
                                            style={{margin: '5px', marginTop: '10px'}}
                                        />

                                        <Header
                                            as='h6'
                                            content='Email Address'
                                            subheader={this.state.applicationDetails.contact.email}
                                            style={{margin: '5px', marginTop: '10px'}}
                                        />

                                        <Header
                                            as='h6'
                                            content='Phone Number'
                                            subheader={this.state.applicationDetails.contact.mobileNumber}
                                            style={{margin: '5px', marginTop: '10px'}}
                                        />

                                        <Header
                                            as='h6'
                                            content='Address'
                                            subheader={this.state.applicationDetails.contact.address}
                                            style={{margin: '5px', marginTop: '10px'}}
                                        />

                                        <Header
                                            as='h6'
                                            content='Zip Code'
                                            subheader={this.state.applicationDetails.contact.zipCode}
                                            style={{margin: '5px', marginTop: '10px'}}
                                        />

                                        <Header
                                            as='h6'
                                            content='Type of Loan'
                                            subheader={this.state.applicationDetails.contact.loanType}
                                            style={{margin: '5px', marginTop: '10px'}}
                                        />

                                        <Header
                                            as='h6'
                                            content='Applicant Type'
                                            subheader={this.state.applicationDetails.contact.applicantType}
                                            style={{margin: '5px', marginTop: '10px'}}
                                        />

                                        <Button floated='left' 
                                                icon 
                                                labelPosition='left' 
                                                primary 
                                                size='small'
                                                style={{margin: '5px', marginTop: '10px'}}
                                                onClick={this.downloadApplication}>
                                            <Icon name='download' /> Download Application
                                        </Button>
                                    </Col>

                                    <Col sm="8" md="8">
                                        <Header as='h4'>
                                            <Header.Content>
                                                Asset Information
                                            </Header.Content>
                                            <Header.Subheader>
                                                Please review the asset details and documents
                                            </Header.Subheader>
                                        </Header>

                                        <Table celled>
                                            <Table.Header>
                                                <Table.Row>
                                                    <Table.HeaderCell>Type</Table.HeaderCell>
                                                    <Table.HeaderCell>Brand</Table.HeaderCell>
                                                    <Table.HeaderCell>Category</Table.HeaderCell>
                                                    <Table.HeaderCell>Description</Table.HeaderCell>
                                                    <Table.HeaderCell>Uploaded Documents</Table.HeaderCell>
                                                    <Table.HeaderCell>Download</Table.HeaderCell>
                                                </Table.Row>
                                            </Table.Header>

                                            <Table.Body>
                                                <Table.Row>
                                                    <Table.Cell>
                                                        <Label ribbon color='blue'>{this.state.applicationDetails.assetDetails.name}</Label>
                                                    </Table.Cell>
                                                    <Table.Cell>{this.state.applicationDetails.assetDetails.brand}</Table.Cell>
                                                    <Table.Cell>{this.state.applicationDetails.assetDetails.type}</Table.Cell>
                                                    <Table.Cell>{this.state.applicationDetails.assetDetails.description}</Table.Cell>
                                                    <Table.Cell>
                                                        <ul>
                                                            {
                                                                this.state.applicationDetails.assetDetails.files.map((file, index) => {
                                                                    return (
                                                                        <li key={index}>{file.split("/")[1]}</li>
                                                                    );
                                                                })
                                                            }
                                                        </ul>
                                                    </Table.Cell>
                                                    <Table.Cell>
                                                    <Button circular primary icon='download' onClick={this.downloadApplicationDocuments} />
                                                    </Table.Cell>
                                                </Table.Row>
                                            </Table.Body>
                                        </Table>
                                    </Col>
                                    
                                </Row>
                            </Col>

                        </Row>
                    </Container>
                </div>
            )
        }

        return (
            <div className="App">

                <Row style={{marginTop: '30px'}}>
                    <Col sm={{size: 2}} />
                    <Col sm={{size: 2}}>
                        <Form.Field>
                            <select id="viewLoanStatus"
                                    onChange={this.handleChange}
                                    value={this.state.viewLoanStatus}>
                                <option value="">Select</option>
                                <option value="APPLIED">Applied</option>
                                <option value="APPROVED">Approved</option>
                                <option value="REJECTED">Rejected</option>
                            </select>
                        </Form.Field>
                    </Col>
                    <Col sm={{size: 4}}>
                        <Header as='h2' textAlign={'center'}>
                            <Header.Content>
                                Loan Applications
                            </Header.Content>
                            <Header.Subheader>
                                View the applications submitted by Users for Asset Loans.
                            </Header.Subheader>
                        </Header>
                    </Col>
                    <Col sm={{size: 4}}>
                        <Button floated='right' 
                                icon 
                                labelPosition='left'
                                primary
                                size='small'
                                style={{margin: '5px', marginTop: '10px', marginRight: '10px'}}
                                onClick={this.loadApplications}>
                            <Icon name='refresh' /> Refresh
                        </Button>
                    </Col>
                </Row>

                <Container style={containerPadding}>
                    <Row>
                        <Col sm="12" md="12">
                            <Table celled compact definition>
                                <Table.Header fullWidth>
                                <Table.Row textAlign='center'>
                                    <Table.HeaderCell>Name</Table.HeaderCell>
                                    <Table.HeaderCell>Application Date</Table.HeaderCell>
                                    <Table.HeaderCell>E-mail address</Table.HeaderCell>
                                    <Table.HeaderCell>Mobile Number</Table.HeaderCell>
                                    <Table.HeaderCell>Loan Type</Table.HeaderCell>
                                    <Table.HeaderCell>Loan Purpose</Table.HeaderCell>
                                    <Table.HeaderCell>Loan Status</Table.HeaderCell>
                                    <Table.HeaderCell>Last Updated</Table.HeaderCell>
                                    <Table.HeaderCell>
                                        Action
                                    </Table.HeaderCell>
                                </Table.Row>
                                </Table.Header>

                                <Table.Body>
                                
                                {
                                    this.state.applications.map((application, index) => {
                                        return (
                                            <Table.Row key={index} textAlign='center'>
                                                <Table.Cell>{application.contact.fullName}</Table.Cell>
                                                <Table.Cell>{moment(application.createdAt).format("MMM Do YYYY h:mm A")}</Table.Cell>
                                                <Table.Cell>{application.contact.email}</Table.Cell>
                                                <Table.Cell>{application.contact.mobileNumber}</Table.Cell>
                                                <Table.Cell>{application.contact.loanType}</Table.Cell>
                                                <Table.Cell>{application.contact.loanPurpose}</Table.Cell>
                                                <Table.Cell>
                                                    <Label color='blue'>{application.applicationStatus}</Label>
                                                </Table.Cell>
                                                <Table.Cell>{moment(application.createdAt).format("MMM Do YYYY h:mm A")}</Table.Cell>
                                                <Table.Cell>
                                                    <Button circular primary icon='eye' onClick={() => this.onDetails(application)} />
                                                </Table.Cell>
                                            </Table.Row>
                                        )
                                    })
                                }
                                
                                </Table.Body>
                            </Table>
                        </Col>
                    </Row>

                </Container>

            </div>
        );
    }
}

export default ApplicationsTable;