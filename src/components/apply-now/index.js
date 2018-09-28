import React, { Fragment } from 'react';
import update from 'immutability-helper';
import _ from 'lodash';
import uuid4 from 'uuid/v4';
import axios from 'axios';
import { Storage } from 'aws-amplify';
import {Dimmer, Loader, Form as SemForm, Step, Image, Header, Message} from 'semantic-ui-react';
import {Container, Col, Row} from 'reactstrap';
import SelectGrid from "../select-grid";
import ApplyNowButton from '../apply-now-template/apply-now-button';
import { AssetInfo } from './asset-info';
import 'bootswatch/dist/litera/bootstrap.min.css';
import 'semantic-ui-css/semantic.css';
import '../../index.css';
import './style.css';

const containerPadding = {
    paddingRight: '60px'
};

class ApplyNow extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeStep: '',
            firstStep: '',
            lastStep: '',
            key: 0,
            loading: false,
            loadingMessage: 'Loading',
            failureMessage: '',
            steps: [
                {
                    "key": "user_contact_info",
                    "active": false,
                    "disabled": true,
                    "completed": false,
                    "icon": "user",
                    "title": "Contact Info",
                    "description": "Fill in your contact information"
                },
                {
                    "key": "user_choose_asset",
                    "active": false,
                    "disabled": true,
                    "completed": false,
                    "icon": "money",
                    "title": "Choose Asset",
                    "description": "Select Asset for Loan"
                },
                {
                    "key": "user_review_info",
                    "active": false,
                    "disabled": true,
                    "completed": false,
                    "icon": "suitcase",
                    "title": "Review & Submit",
                    "description": "Submit your Application"
                },
                {
                    "key": "user_final_submit",
                    "active": false,
                    "disabled": true,
                    "completed": false,
                    "icon": "puzzle",
                    "title": "Status",
                    "description": "Know your Next Steps"
                }
            ],
            showAssetDetails: false,
            assetDetailsUserConfirmation: false,
            assetDetails: {
                name: '',
                type: '',
                nameOfType: '',
                assetDescription: '',
                ageInYears: '',
                workingCondition: '',
                generalCondition: '',
                weight: '',
                yearAcquired: '',
                certifications: '',
                mounting: '',
                color: '',
                modelNumber: '',
                material: '',
                originalStrap: '',
                files: [],
                estimatedValue: ''
            },
            assets: AssetInfo,
            values: {
                fullName: '',
                email: '',
                mobileNumber: '',
                zipCode: '',
                applicantType: '',
                address: '',
                loanType: '',
                loanPurpose: '',
                loanAmount: '',
                businessName: ''
            },
            touched: {}
        };
    };

    componentDidMount() {
        this.setState({
            steps: update(this.state.steps, {[this.state.key]: {active: {$set: true}, disabled: {$set: false}}}),
            firstStep: this.state.steps[this.state.key].key,
            lastStep: this.state.steps[this.state.steps.length - 1].key,
            activeStep: this.state.steps[this.state.key].key
        });
    }

    nextStep = () => {
        this.validate();
        if (!this.state.errors) {
            const key = this.state.key + 1;
            this.setState({
                steps: update(this.state.steps, {
                    [this.state.key]: {
                        active: {$set: false},
                        disabled: {$set: true},
                        completed: {$set: true}
                    },
                    [key]: {
                        active: {$set: true},
                        disabled: {$set: false}
                    }
                }),
                activeStep: this.state.steps[key].key,
                key: key
            });
        }
    };

    prevStep = () => {

        if (this.state.activeStep === 'user_choose_asset' && this.state.assetDetails) {
            this.unSelectAsset();
        }

        const key = this.state.key - 1;
        this.setState({
            steps: update(this.state.steps, {
                [this.state.key]: {
                    active: {$set: false},
                    disabled: {$set: true}
                },
                [key]: {
                    active: {$set: true},
                    disabled: {$set: false},
                    completed: {$set: false}
                }
            }),
            activeStep: this.state.steps[key].key,
            key: key
        });
    };

    submit = () => {
        this.setState({
            loading: true,
            loadingMessage: 'Submitting Application. Please wait!',
            failureMessage: ''
        });

        const applicationId = uuid4();
        this.setState({
            values: { ...this.state.values, applicationId: applicationId },
        });

        let assetDetails = this.state.assetDetails;
        this.createApplication(applicationId, this.state.values, assetDetails);

        this.nextStep();
    };

    createApplication = (applicationId, contact, assetDetails) => {
        
        const files = [];

        //TODO: implement asycn await for S3 upload. Application should be submitted 
        //when S3 is success
        for (let i = 0; i < assetDetails.files.length; i++) {
            this.uploadFileToS3(applicationId, assetDetails.files[i]).then();
            files.push(applicationId + "/" + assetDetails.files[i].name);
        }

        let assetInfo = _.cloneDeep(assetDetails);

        assetInfo.name = assetDetails.asset.name;
        assetInfo.files = files;
        assetInfo = _.omit(assetInfo, ['asset']);
        assetInfo = _.pickBy(assetInfo, _.identity);

        const payload = {
            applicationId: applicationId,
            contact: _.pickBy(contact, _.identity),
            assetDetails: assetInfo
        };

        axios.post('https://raw0z9bmf4.execute-api.us-east-1.amazonaws.com/PROD/applications', payload)
          .then((response) => {
            console.log(JSON.stringify(response));
            this.setState({
                loading: false
            });
          })
          .catch((error) => {
            console.log(JSON.stringify(error));
            this.setState({
                loading: false,
                failureMessage: 'Failed to submit your Application. Please try again!'
            });
            this.prevStep();
          });
    };

    uploadFileToS3 = async(applicationId, file) => {
        let fileName = applicationId + '/' + file.name;
        await Storage.put(fileName, file)
            .then (result => {
                console.log(result);
                return result;
            })
            .catch(err => {
                console.log(err);
            });
    };

    selectAsset = (asset) => {
        this.setState({
            assetDetails: {...this.state.assetDetails, asset},
            showAssetDetails: true
        });
    };

    selectedAsset = (assets) => {
        this.setState({
            assets: assets,
            showAssetDetails: true,
            selectedAssets: _.filter(assets, function(o) { return o.isSelected; })
        });
    };

    unSelectAsset = () => {
        this.setState({
            showAssetDetails: false
        });
    };

    handleChange = (event) => {
        this.setState({
            values: { ...this.state.values, [event.target.id]: event.target.value },
        });
    };

    handlePhoneChange = (event) => {
        // 1
        var input = event.target.value;
        
        // 2
        input = input.replace(/[\W\s\._\-]+/g, '');
        
        // 3
        var split = 3;
        var chunk = [];
        
        for (var i = 0, len = input.length; i < len; i += split) {
            split = ( i <= 3 && i <= 6 ) ? 3 : 4;
            chunk.push( input.substr( i, split ) );
        }
        
        // 4
        this.setState({
            values: { ...this.state.values, [event.target.id]: chunk.join("-") },
        })
    }

    handleCurrencyValueChange = (event) => {
        var loanAmount = event.target.value.replace(/[^a-zA-Z0-9]/g,'');

        var checkNumbers = /^-?\d+\.?\d*$/;
        if (checkNumbers.test(loanAmount)) {
            const currencyFormatter = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 0
            });
            
            this.setState({
                values: { ...this.state.values, [event.target.id]: currencyFormatter.format(loanAmount) },
            });
        }
    };

    handleAssetDetailsChange = (event) => {
        this.setState({
            assetDetails: { ...this.state.assetDetails, [event.target.id]: event.target.value}
        })
    };

    handleAssetDetailsCurrencyValueChange = (event) => {
        var loanAmount = event.target.value.replace(/[^a-zA-Z0-9]/g,'');

        var checkNumbers = /^-?\d+\.?\d*$/;
        if (checkNumbers.test(loanAmount)) {
            const currencyFormatter = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 0
            });
            
            this.setState({
                assetDetails: { ...this.state.assetDetails, [event.target.id]: currencyFormatter.format(loanAmount) }
            });
        }
    }

    handleFiles = (event) => {
      this.setState({
          assetDetails: {...this.state.assetDetails, files: event.target.files}
      });
    };

    handleBlur = (event) => {
        this.setState({
            touched: { ...this.state.touched, [event.target.id]: true },
        });
    };

    handleCheckbox = (event, data) => {
        this.setState({
            assetDetailsUserConfirmation: data.checked
        });
    }

    validate = () => {
        const errors = {};

        if (this.state.activeStep === 'user_contact_info') {
            if (!this.state.values.email) {
                errors.email = 'Required';
            } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(
                    this.state.values.email
                )
            ) {
                errors.email = 'Invalid email address';
            }

            if (!this.state.values.fullName) {
                errors.fullName = 'Required';
            } else if (this.state.values.fullName.length > 35) {
                errors.fullName = 'Too Long';
            }

            if (!this.state.values.mobileNumber) {
                errors.mobileNumber = 'Required';
            } else if (
                !/\d{3}[\-]\d{3}[\-]\d{4}/.test(
                    this.state.values.mobileNumber
                ) || this.state.values.mobileNumber.length > 12
            ) {
                errors.mobileNumber = 'Invalid Mobile Number'
            }

            if (!this.state.values.zipCode) {
                errors.zipCode = 'Required';
            } else if (
                !/(\d{5}([\-]\d{4})?)/.test(
                    this.state.values.zipCode
                ) || this.state.values.zipCode.length > 5
            ) {
                errors.zipCode = 'Invalid Zip Code'
            }

            if (!this.state.values.address) {
                errors.address = 'Required';
            } else if (this.state.values.address.length > 60) {
                errors.fullName = 'Too Long';
            }

            if (!this.state.values.applicantType) {
                errors.applicantType = 'Required';
            } else if (this.state.values.applicantType === 'Business') {
                if(!this.state.values.businessName) {
                    errors.businessName = 'Required';
                }
            }

            if (!this.state.values.loanType) {
                errors.loanType = 'Required';
            }

            if (!this.state.values.loanPurpose) {
                errors.loanPurpose = 'Required';
            } else if (this.state.values.loanPurpose.length > 120) {
                errors.fullName = 'Too Long';
            }

            if (this.state.values.loanAmount === '') {
                errors.loanAmount = 'Please enter your loan value'
            }
        } else if (this.state.activeStep === 'user_choose_asset') {

            if (!this.state.assetDetails.type) {
                errors.type = 'Required';
            }

            if (!this.state.assetDetails.assetDescription) {
                errors.assetDescription = 'Required';
            } else if (this.state.assetDetails.assetDescription.length > 50) {
                errors.assetDescription = 'Too Long';
            }
            
            var numberReg = new RegExp('^[0-9]+$');
            var yearAcqReg = new RegExp('^[0-9]{4}$');

            if (!this.state.assetDetails.ageInYears) {
                errors.ageInYears = 'Required';
            } else if (numberReg.test(this.state.assetDetails.ageInYears)) {
                errors.ageInYears = 'Numbers only';
            }

            if (!this.state.assetDetails.workingCondition) {
                errors.workingCondition = 'Required';
            }

            if (!this.state.assetDetails.generalCondition) {
                errors.generalCondition = 'Required';
            }

            if (!this.state.assetDetailsUserConfirmation) {
                errors.assetDetailsUserConfirmation = 'Please acknowledge';
            }

            if (this.state.assetDetails.asset) {
                if (this.state.assetDetails.asset.name === 'Gold' 
                || this.state.assetDetails.asset.name === 'Silver') {
                    var floatReg = new RegExp('^[0-9]*[.]*[0-9]+$');

                    if (!this.state.assetDetails.weight) {
                        errors.weight = 'Required';
                    } else if (!floatReg.test(this.state.assetDetails.weight)) {
                        errors.weight = 'Numbers only';
                    } 

                    if (!this.state.assetDetails.yearAcquired) {
                        errors.yearAcquired = 'Required';
                    } else if (!yearAcqReg.test(this.state.assetDetails.yearAcquired)) {
                        errors.yearAcquired = 'invalid year';
                    }
                }
    
                if (this.state.assetDetails.asset.name === 'Diamond') {
                    var floatReg = new RegExp('^[0-9]*[.]*[0-9]+$');

                    if (!this.state.assetDetails.weight) {
                        errors.weight = 'Required';
                    } else if (!floatReg.test(this.state.assetDetails.weight)) {
                        errors.weight = 'Please enter a valid number';
                    } else if (!(parseFloat(this.state.assetDetails.weight) > -1 && parseFloat(this.state.assetDetails.weight) < 6)) {
                        errors.weight = 'Please enter a valid carat';
                    }
    
                    if (!this.state.assetDetails.certifications) {
                        errors.certifications = 'Required';
                    }
    
                    if (!this.state.assetDetails.mounting) {
                        errors.mounting = 'Required';
                    }
    
                    if (!this.state.assetDetails.color) {
                        errors.color = 'Required';
                    }
                }

                if (this.state.assetDetails.asset.name === 'Watches') {
                    if (!this.state.assetDetails.modelNumber) {
                        errors.modelNumber = 'Required';
                    }
    
                    if (!this.state.assetDetails.material) {
                        errors.material = 'Required';
                    }

                    if (!this.state.assetDetails.originalStrap) {
                        errors.originalStrap = 'Required';
                    }
                }

                if (this.state.assetDetails.asset.name === 'Asset' 
                && this.state.assetDetails.type === 'Other') {
                    if(!this.state.assetDetails.nameOfType) {
                        errors.nameOfType = 'Required';
                    }
                }
            }

            if (this.state.assetDetails.estimatedValue === '') {
                errors.estimatedValue = 'Required';
            }

            // attaching files for assets is not mandatory
            /* if (!this.state.assetDetails.files.length > 0) {
                errors.files = 'Required';
            } */
        }

        return errors;
    };

    canBeSubmitted() {
        const errors = this.validate();
        const isDisabled = Object.keys(errors).some(x => errors[x]);
        return !isDisabled;
    }

    render() {

        const errors = this.validate();

        if (this.state.loading) {
            return (
                <Dimmer active>
                    <Loader>{this.state.loadingMessage}</Loader>
                </Dimmer>
            )
        }

        return (
            <div className="App">

                <Row style={{marginTop: '30px'}}>
                    <Col sm={{size: 12}}>
                        <Step.Group items={this.state.steps} style={{marginBottom: '20px'}} stackable='tablet'/>
                    </Col>
                </Row>

                {
                    this.state.activeStep === 'user_contact_info' ? (
                        <Container style={containerPadding}>
                            <Row>
                                <Col sm="12" md={{size: 11, offset: 1}}>
                                    <SemForm>
                                        <SemForm.Group widths='equal'>
                                            <SemForm.Field required>
                                                <label>Enter your Full name</label>
                                                <input
                                                    id="fullName"
                                                    placeholder="Full Name"
                                                    type="text"
                                                    value={this.state.values.fullName}
                                                    onChange={this.handleChange}
                                                    onBlur={this.handleBlur}
                                                    style={
                                                        errors.fullName && this.state.touched.fullName ? (
                                                            {borderColor: 'red'}
                                                        ) : ({})
                                                    }
                                                />
                                                {errors.fullName && this.state.touched.fullName && (
                                                    <div className="error-feedback">{errors.fullName}</div>
                                                )}
                                            </SemForm.Field>
                                            <SemForm.Field required>
                                                <label>Enter your Email Address</label>
                                                <input
                                                    id="email"
                                                    placeholder="Email"
                                                    type="text"
                                                    value={this.state.values.email}
                                                    onChange={this.handleChange}
                                                    onBlur={this.handleBlur}
                                                    style={
                                                        errors.email && this.state.touched.email ? (
                                                            {borderColor: 'red'}
                                                        ) : ({})
                                                    }
                                                />
                                                {errors.email && this.state.touched.email && (
                                                    <div className="error-feedback">{errors.email}</div>
                                                )}
                                            </SemForm.Field>
                                        </SemForm.Group>
                                        <SemForm.Group widths='equal'>
                                            <SemForm.Field required>
                                                <label>Enter your Address</label>
                                                <input
                                                    id="address"
                                                    placeholder="Address"
                                                    value={this.state.values.address}
                                                    onChange={this.handleChange}
                                                    onBlur={this.handleBlur}
                                                    style={
                                                        errors.address && this.state.touched.address ? (
                                                            {borderColor: 'red'}
                                                        ) : ({})
                                                    }
                                                />
                                                {errors.address && this.state.touched.address && (
                                                    <div className="error-feedback">{errors.address}</div>
                                                )}
                                            </SemForm.Field>
                                            <SemForm.Field required>
                                                <label>Enter your Zip Code</label>
                                                <input
                                                    id="zipCode"
                                                    placeholder="US Zip Code"
                                                    type="text"
                                                    value={this.state.values.zipCode}
                                                    onChange={this.handleChange}
                                                    onBlur={this.handleBlur}
                                                    style={
                                                        errors.zipCode && this.state.touched.zipCode ? (
                                                            {borderColor: 'red'}
                                                        ) : ({})
                                                    }
                                                />
                                                {errors.zipCode && this.state.touched.zipCode && (
                                                    <div className="error-feedback">{errors.zipCode}</div>
                                                )}
                                            </SemForm.Field>
                                        </SemForm.Group>
                                        <SemForm.Group widths='equal'>
                                            <SemForm.Field required>
                                                <label>Enter your US Phone Number</label>
                                                <input
                                                    id="mobileNumber"
                                                    placeholder="123-123-1234"
                                                    type="text"
                                                    value={this.state.values.mobileNumber}
                                                    onChange={this.handlePhoneChange}
                                                    onBlur={this.handleBlur}
                                                    style={
                                                        errors.mobileNumber && this.state.touched.mobileNumber ? (
                                                            {borderColor: 'red'}
                                                        ) : ({})
                                                    }
                                                />
                                                {errors.mobileNumber && this.state.touched.mobileNumber && (
                                                    <div className="error-feedback">{errors.mobileNumber}</div>
                                                )}
                                            </SemForm.Field>
                                            <SemForm.Field required>
                                                <label>Type of Loan</label>
                                                <select id="loanType"
                                                        onChange={this.handleChange}
                                                        onBlur={this.handleBlur}
                                                        value={this.state.values.loanType}
                                                        className={
                                                            errors.loanType && this.state.touched.loanType ? (
                                                                'text-input error'
                                                            ) : (
                                                                'text-input'
                                                            )
                                                        }>
                                                    <option value="">Select</option>
                                                    <option value="Bridge Loan">Bridge Loan</option>
                                                    <option value="Sale Advance Loan">Sale Advance Loan</option>
                                                    <option value="Line of Credit">Line of Credit</option>
                                                </select>
                                                {errors.loanType && this.state.touched.loanType && (
                                                    <div className="input-feedback">{errors.loanType}</div>
                                                )}
                                            </SemForm.Field>
                                        </SemForm.Group>
                                        <SemForm.Group widths='equal'>
                                            <SemForm.Field required>
                                                <label>Applicant Type</label>
                                                <select id="applicantType"
                                                        onChange={this.handleChange}
                                                        onBlur={this.handleBlur}
                                                        value={this.state.values.applicantType}
                                                        className={
                                                            errors.applicantType && this.state.touched.applicantType ? (
                                                                'text-input error'
                                                            ) : (
                                                                'text-input'
                                                            )
                                                        }>
                                                    <option value="">Select</option>
                                                    <option value="Individual">Individual</option>
                                                    <option value="Business">Business</option>
                                                </select>
                                                {errors.applicantType && this.state.touched.applicantType && (
                                                    <div className="input-feedback">{errors.applicantType}</div>
                                                )}
                                            </SemForm.Field>
                                            <SemForm.Field required>
                                                <label>Loan Amount (in Dollars)</label>
                                                <input
                                                    id="loanAmount"
                                                    placeholder="Loan Amount"
                                                    type="text"
                                                    value={this.state.values.loanAmount}
                                                    onChange={this.handleCurrencyValueChange}
                                                    onBlur={this.handleBlur}
                                                    style={
                                                        errors.loanAmount && this.state.touched.loanAmount ? (
                                                            {borderColor: 'red'}
                                                        ) : ({})
                                                    }
                                                />
                                                {errors.loanAmount && this.state.touched.loanAmount && (
                                                    <div className="input-feedback">{errors.loanAmount}</div>
                                                )}
                                            </SemForm.Field>
                                        </SemForm.Group>
                                        <SemForm.Group widths='equal'>
                                        <SemForm.Field required>
                                                <label>Purpose of Loan</label>
                                                <input
                                                    id="loanPurpose"
                                                    placeholder="What will you do with the Loan?"
                                                    type="text"
                                                    value={this.state.values.loanPurpose}
                                                    onChange={this.handleChange}
                                                    onBlur={this.handleBlur}
                                                    style={
                                                        errors.loanPurpose && this.state.touched.loanPurpose ? (
                                                            {borderColor: 'red'}
                                                        ) : ({})
                                                    }
                                                />
                                                {errors.loanPurpose && this.state.touched.loanPurpose && (
                                                    <div className="input-feedback">{errors.loanPurpose}</div>
                                                )}
                                            </SemForm.Field>

                                            {
                                                this.state.values.applicantType === 'Business' ? (
                                                    <SemForm.Field required>
                                                        <label>Business Name</label>
                                                        <input
                                                            id="businessName"
                                                            placeholder="Registered Name of your Business"
                                                            type="text"
                                                            value={this.state.values.businessName}
                                                            onChange={this.handleChange}
                                                            onBlur={this.handleBlur}
                                                            style={
                                                                errors.businessName && this.state.touched.businessName ? (
                                                                    {borderColor: 'red'}
                                                                ) : ({})
                                                            }
                                                        />
                                                        {errors.businessName && this.state.touched.businessName && (
                                                            <div className="input-feedback">{errors.businessName}</div>
                                                        )}
                                                    </SemForm.Field>
                                                ) : null
                                            }
                                        </SemForm.Group>
                                    </SemForm>
                                </Col>
                            </Row>
                        </Container>
                    ) : (
                        this.state.activeStep === 'user_choose_asset' ? (
                            <Container style={{paddingLeft: '50px'}}>
                                <Row>
                                    {
                                        !this.state.showAssetDetails ? (
                                            <Col sm="12" md={{size: 12/* , offset: 1 */}}>
                                                <SelectGrid images={this.state.assets}
                                                            selectAsset={this.selectAsset}
                                                            selectedAssets={this.selectedAsset} />
                                            </Col>
                                        ) : (
                                            <Col sm="12" md={{size: 12/* , offset: 1 */}}>
                                                <Container>
                                                    <Header as='h2' textAlign={'center'} dividing>
                                                        <Header.Content>
                                                            What are you looking to loan?
                                                        </Header.Content>
                                                        <Header.Subheader>
                                                            Click on a category to get started. Our
                                                            application process is quick, secure and
                                                            convenient.
                                                        </Header.Subheader>
                                                    </Header>
                                                    <Row>
                                                        <Col sm="4" md="4">
                                                            <Header as='h5'>
                                                                <Header.Content>
                                                                    Tell us about your Asset
                                                                </Header.Content>
                                                                <Header.Subheader>
                                                                    Answer a few questions and tell us about your item.
                                                                    You're only a few steps away from getting money.
                                                                </Header.Subheader>
                                                            </Header>
                                                            <Image src={this.state.assetDetails.asset.src} />
                                                        </Col>

                                                        <Col sm="4" md="4">
                                                            <SemForm>
                                                                <SemForm.Field required>
                                                                    <label>Type of {this.state.assetDetails.asset.name}</label>
                                                                    <select id="type"
                                                                            onChange={this.handleAssetDetailsChange}
                                                                            onBlur={this.handleBlur}
                                                                            value={this.state.assetDetails.type}
                                                                            className={
                                                                                errors.type && this.state.touched.type ? (
                                                                                    'text-input error'
                                                                                ) : (
                                                                                    'text-input'
                                                                                )
                                                                            }>
                                                                        <option value="">Select</option>
                                                                        {
                                                                            this.state.assetDetails.asset.types.map((type, index) => {
                                                                                return (<option value={type.value} key={index}>{type.text}</option>)
                                                                            })
                                                                        }
                                                                    </select>
                                                                    {errors.type && this.state.touched.type && (
                                                                        <div className="input-feedback">{errors.type}</div>
                                                                    )}
                                                                </SemForm.Field>

                                                                {
                                                                    this.state.assetDetails.asset.name === 'Asset' && this.state.assetDetails.type === 'Other' ? (
                                                                        <SemForm.Field>
                                                                            <input id="nameOfType"
                                                                                        value={this.state.assetDetails.nameOfType}
                                                                                        onChange={this.handleAssetDetailsChange}
                                                                                        onBlur={this.handleBlur}
                                                                                        placeholder={`Please name your Asset`}
                                                                                        className={
                                                                                            errors.nameOfType && this.state.touched.nameOfType ? (
                                                                                                'text-input error'
                                                                                            ) : (
                                                                                                'text-input'
                                                                                            )
                                                                                        }/>
                                                                            {errors.nameOfType && this.state.touched.nameOfType && (
                                                                                <div className="input-feedback">{errors.nameOfType}</div>
                                                                            )}
                                                                        </SemForm.Field>
                                                                    ) : null
                                                                }

                                                                <SemForm.Field required>
                                                                    <label>Age in Years</label>
                                                                    <select id="ageInYears"
                                                                            onChange={this.handleAssetDetailsChange}
                                                                            onBlur={this.handleBlur}
                                                                            value={this.state.assetDetails.ageInYears}
                                                                            className={
                                                                                errors.ageInYears && this.state.touched.ageInYears ? (
                                                                                    'text-input error'
                                                                                ) : (
                                                                                    'text-input'
                                                                                )
                                                                            }>
                                                                        <option value="">Select</option>
                                                                        {
                                                                            this.state.assetDetails.asset.ageInYears.map((ageInYears, index) => {
                                                                                return (<option value={ageInYears.value} key={index}>{ageInYears.text}</option>)
                                                                            })
                                                                        }
                                                                    </select>
                                                                    {errors.ageInYears && this.state.touched.ageInYears && (
                                                                        <div className="input-feedback">{errors.ageInYears}</div>
                                                                    )}
                                                                </SemForm.Field>

                                                                <SemForm.Field required>
                                                                    <label>Working Condition</label>
                                                                    <select id="workingCondition"
                                                                            onChange={this.handleAssetDetailsChange}
                                                                            onBlur={this.handleBlur}
                                                                            value={this.state.assetDetails.workingCondition}
                                                                            className={
                                                                                errors.workingCondition && this.state.touched.workingCondition ? (
                                                                                    'text-input error'
                                                                                ) : (
                                                                                    'text-input'
                                                                                )
                                                                            }>
                                                                        <option value="">Select</option>
                                                                        {
                                                                            this.state.assetDetails.asset.workingCondition.map((workingCondition, index) => {
                                                                                return (<option value={workingCondition.value} key={index}>{workingCondition.text}</option>)
                                                                            })
                                                                        }
                                                                    </select>
                                                                    {errors.workingCondition && this.state.touched.workingCondition && (
                                                                        <div className="input-feedback">{errors.workingCondition}</div>
                                                                    )}
                                                                </SemForm.Field>

                                                                <SemForm.Field required>
                                                                    <label>General Condition</label>
                                                                    <select id="generalCondition"
                                                                            onChange={this.handleAssetDetailsChange}
                                                                            onBlur={this.handleBlur}
                                                                            value={this.state.assetDetails.generalCondition}
                                                                            className={
                                                                                errors.generalCondition && this.state.touched.generalCondition ? (
                                                                                    'text-input error'
                                                                                ) : (
                                                                                    'text-input'
                                                                                )
                                                                            }>
                                                                        <option value="">Select</option>
                                                                        {
                                                                            this.state.assetDetails.asset.generalCondition.map((generalCondition, index) => {
                                                                                return (<option value={generalCondition.value} key={index}>{generalCondition.text}</option>)
                                                                            })
                                                                        }
                                                                    </select>
                                                                    {errors.generalCondition && this.state.touched.generalCondition && (
                                                                        <div className="input-feedback">{errors.generalCondition}</div>
                                                                    )}
                                                                </SemForm.Field>
                                                            </SemForm>

                                                        </Col>

                                                        <Col sm="4" md="4">
                                                            <SemForm>
                                                                <SemForm.Field required>
                                                                    <label>Description of {this.state.assetDetails.asset.name}</label>
                                                                    <input id="assetDescription"
                                                                              value={this.state.assetDetails.assetDescription}
                                                                              onChange={this.handleAssetDetailsChange}
                                                                              onBlur={this.handleBlur}
                                                                              placeholder={`Tell us about your ${this.state.assetDetails.asset.name}`}
                                                                              className={
                                                                                  errors.assetDescription && this.state.touched.assetDescription ? (
                                                                                      'text-input error'
                                                                                  ) : (
                                                                                      'text-input'
                                                                                  )
                                                                              }/>
                                                                    {errors.assetDescription && this.state.touched.assetDescription && (
                                                                        <div className="input-feedback">{errors.assetDescription}</div>
                                                                    )}
                                                                </SemForm.Field>

                                                                {
                                                                    this.state.assetDetails.asset.name === 'Gold' || this.state.assetDetails.asset.name === 'Silver' ? (
                                                                        <Fragment>
                                                                            <SemForm.Field required>
                                                                                <label>Weight (in grams)</label>
                                                                                <input id="weight"
                                                                                        value={this.state.assetDetails.weight}
                                                                                        onChange={this.handleAssetDetailsChange}
                                                                                        onBlur={this.handleBlur}
                                                                                        placeholder='Weight in grams'
                                                                                        className={
                                                                                            errors.weight && this.state.touched.weight ? (
                                                                                                'text-input error'
                                                                                            ) : (
                                                                                                'text-input'
                                                                                            )
                                                                                        }/>
                                                                                {errors.weight && this.state.touched.weight && (
                                                                                    <div className="input-feedback">{errors.weight}</div>
                                                                                )}
                                                                            </SemForm.Field>

                                                                            <SemForm.Field required>
                                                                                <label>Year Acquired</label>
                                                                                <input id="yearAcquired"
                                                                                        value={this.state.assetDetails.yearAcquired}
                                                                                        onChange={this.handleAssetDetailsChange}
                                                                                        onBlur={this.handleBlur}
                                                                                        placeholder='Year Acquired'
                                                                                        className={
                                                                                            errors.yearAcquired && this.state.touched.yearAcquired ? (
                                                                                                'text-input error'
                                                                                            ) : (
                                                                                                'text-input'
                                                                                            )
                                                                                        }/>
                                                                                {errors.yearAcquired && this.state.touched.yearAcquired && (
                                                                                    <div className="input-feedback">{errors.yearAcquired}</div>
                                                                                )}
                                                                            </SemForm.Field>
                                                                        </Fragment>
                                                                    ) : null
                                                                }

                                                                {
                                                                    this.state.assetDetails.asset.name === 'Diamond' ? (
                                                                        <Fragment>
                                                                            <SemForm.Field required>
                                                                                <label>Weight (in carat)</label>
                                                                                <input id="weight"
                                                                                        value={this.state.assetDetails.weight}
                                                                                        onChange={this.handleAssetDetailsChange}
                                                                                        onBlur={this.handleBlur}
                                                                                        placeholder='Weight in carat (0.0 - 5.0)'
                                                                                        className={
                                                                                            errors.weight && this.state.touched.weight ? (
                                                                                                'text-input error'
                                                                                            ) : (
                                                                                                'text-input'
                                                                                            )
                                                                                        }/>
                                                                                {errors.weight && this.state.touched.weight && (
                                                                                    <div className="input-feedback">{errors.weight}</div>
                                                                                )}
                                                                            </SemForm.Field>

                                                                            <SemForm.Field required>
                                                                                <label>Mounting</label>
                                                                                <select id="mounting"
                                                                                        onChange={this.handleAssetDetailsChange}
                                                                                        onBlur={this.handleBlur}
                                                                                        value={this.state.assetDetails.mounting}
                                                                                        className={
                                                                                            errors.mounting && this.state.touched.mounting ? (
                                                                                                'text-input error'
                                                                                            ) : (
                                                                                                'text-input'
                                                                                            )
                                                                                        }>
                                                                                    <option value="">Select</option>
                                                                                    {
                                                                                        this.state.assetDetails.asset.mounting.map((mounting, index) => {
                                                                                            return (<option value={mounting.value} key={index}>{mounting.text}</option>)
                                                                                        })
                                                                                    }
                                                                                </select>
                                                                                {errors.mounting && this.state.touched.mounting && (
                                                                                    <div className="input-feedback">{errors.mounting}</div>
                                                                                )}
                                                                            </SemForm.Field>

                                                                            <SemForm.Field required>
                                                                                <label>Color</label>
                                                                                <select id="color"
                                                                                        onChange={this.handleAssetDetailsChange}
                                                                                        onBlur={this.handleBlur}
                                                                                        value={this.state.assetDetails.color}
                                                                                        className={
                                                                                            errors.color && this.state.touched.color ? (
                                                                                                'text-input error'
                                                                                            ) : (
                                                                                                'text-input'
                                                                                            )
                                                                                        }>
                                                                                    <option value="">Select</option>
                                                                                    {
                                                                                        this.state.assetDetails.asset.color.map((color, index) => {
                                                                                            return (<option value={color.value} key={index}>{color.text}</option>)
                                                                                        })
                                                                                    }
                                                                                </select>
                                                                                {errors.color && this.state.touched.color && (
                                                                                    <div className="input-feedback">{errors.color}</div>
                                                                                )}
                                                                            </SemForm.Field>

                                                                            <SemForm.Field required>
                                                                                <label>Certifications</label>
                                                                                <input id="certifications"
                                                                                        value={this.state.assetDetails.certifications}
                                                                                        onChange={this.handleAssetDetailsChange}
                                                                                        onBlur={this.handleBlur}
                                                                                        placeholder='Certifications'
                                                                                        className={
                                                                                            errors.certifications && this.state.touched.certifications ? (
                                                                                                'text-input error'
                                                                                            ) : (
                                                                                                'text-input'
                                                                                            )
                                                                                        }/>
                                                                                {errors.certifications && this.state.touched.certifications && (
                                                                                    <div className="input-feedback">{errors.certifications}</div>
                                                                                )}
                                                                            </SemForm.Field>
                                                                        </Fragment>
                                                                    ) : null
                                                                }

                                                                {
                                                                    this.state.assetDetails.asset.name === 'Watches' ? (
                                                                        <Fragment>
                                                                            <SemForm.Field required>
                                                                                <label>Model Number</label>
                                                                                <input id="modelNumber"
                                                                                        value={this.state.assetDetails.modelNumber}
                                                                                        onChange={this.handleAssetDetailsChange}
                                                                                        onBlur={this.handleBlur}
                                                                                        placeholder='Model Number'
                                                                                        className={
                                                                                            errors.modelNumber && this.state.touched.modelNumber ? (
                                                                                                'text-input error'
                                                                                            ) : (
                                                                                                'text-input'
                                                                                            )
                                                                                        }/>
                                                                                {errors.modelNumber && this.state.touched.modelNumber && (
                                                                                    <div className="input-feedback">{errors.modelNumber}</div>
                                                                                )}
                                                                            </SemForm.Field>

                                                                            <SemForm.Field required>
                                                                                <label>Strap Material</label>
                                                                                <select id="material"
                                                                                        onChange={this.handleAssetDetailsChange}
                                                                                        onBlur={this.handleBlur}
                                                                                        value={this.state.assetDetails.material}
                                                                                        className={
                                                                                            errors.material && this.state.touched.material ? (
                                                                                                'text-input error'
                                                                                            ) : (
                                                                                                'text-input'
                                                                                            )
                                                                                        }>
                                                                                    <option value="">Select</option>
                                                                                    {
                                                                                        this.state.assetDetails.asset.material.map((material, index) => {
                                                                                            return (<option value={material.value} key={index}>{material.text}</option>)
                                                                                        })
                                                                                    }
                                                                                </select>
                                                                                {errors.material && this.state.touched.material && (
                                                                                    <div className="input-feedback">{errors.material}</div>
                                                                                )}
                                                                            </SemForm.Field>

                                                                            <SemForm.Field required>
                                                                                <label>Original Strap</label>
                                                                                <select id="originalStrap"
                                                                                        onChange={this.handleAssetDetailsChange}
                                                                                        onBlur={this.handleBlur}
                                                                                        value={this.state.assetDetails.originalStrap}
                                                                                        className={
                                                                                            errors.originalStrap && this.state.touched.originalStrap ? (
                                                                                                'text-input error'
                                                                                            ) : (
                                                                                                'text-input'
                                                                                            )
                                                                                        }>
                                                                                    <option value="">Select</option>
                                                                                    {
                                                                                        this.state.assetDetails.asset.originalStrap.map((originalStrap, index) => {
                                                                                            return (<option value={originalStrap.value} key={index}>{originalStrap.text}</option>)
                                                                                        })
                                                                                    }
                                                                                </select>
                                                                                {errors.originalStrap && this.state.touched.originalStrap && (
                                                                                    <div className="input-feedback">{errors.originalStrap}</div>
                                                                                )}
                                                                            </SemForm.Field>
                                                                        </Fragment>
                                                                    ) : null
                                                                }

                                                                <SemForm.Field required>
                                                                    <label>Estimated Value (in Dollars)</label>
                                                                    <input
                                                                        id="estimatedValue"
                                                                        type="text"
                                                                        onChange={this.handleAssetDetailsCurrencyValueChange}
                                                                        onBlur={this.handleBlur}
                                                                        value={this.state.assetDetails.estimatedValue}
                                                                        placeholder='Loan Amount (in Dollars)'
                                                                        className={
                                                                            errors.estimatedValue && this.state.touched.estimatedValue ? (
                                                                                'text-input error'
                                                                            ) : (
                                                                                'text-input'
                                                                            )
                                                                        }/>
                                                                    {errors.estimatedValue && this.state.touched.estimatedValue && (
                                                                        <div className="input-feedback">{errors.estimatedValue}</div>
                                                                    )}
                                                                </SemForm.Field>
                                                                <SemForm.Field required>
                                                                    <label>Asset Document (Image/Invoice/Document)</label>
                                                                    <input  id="files"
                                                                            type="file"
                                                                            onBlur={this.handleBlur}
                                                                            onChange={this.handleFiles}
                                                                            multiple/>
                                                                    {errors.files && this.state.touched.files && (
                                                                        <div className="input-feedback">{errors.files}</div>
                                                                    )}
                                                                </SemForm.Field>
                                                                <SemForm.Checkbox 
                                                                            label='Please check the box to enable the review screen and to confirm that 
                                                                            the above information is accurate to the best of your knowledge.'
                                                                            onChange={this.handleCheckbox} />
                                                            </SemForm>
                                                        </Col>
                                                    </Row>
                                                </Container>
                                            </Col>
                                        )
                                    }
                                </Row>
                            </Container>
                        ) : (
                            this.state.activeStep === 'user_review_info' ? (
                                <Container style={containerPadding}>
                                    <Row>
                                        <Col sm="12" md={{size: 11, offset: 1}}>
                                            <Header as='h3' textAlign={'center'} color='red'>
                                                <Header.Content>
                                                    {this.state.failureMessage}
                                                </Header.Content>
                                            </Header>
                                            <Header as='h2' textAlign={'center'} dividing>
                                                <Header.Content>
                                                    Review your Application
                                                </Header.Content>
                                                <Header.Subheader>
                                                    Your application is not yet submitted. Please verify all
                                                    information below and once your are satisfied, click Next.
                                                </Header.Subheader>
                                            </Header>
                                            <Row>
                                                <Col sm="3" md="3">
                                                    <Header as='h4'>
                                                        <Header.Content>
                                                            Review Asset Information
                                                        </Header.Content>
                                                        <Header.Subheader>
                                                            Please verify the asset information provided by you.
                                                        </Header.Subheader>
                                                    </Header>
                                                    <Image src={this.state.assetDetails.asset.src} />
                                                </Col>

                                                <Col sm="4" md="4">
                                                    <Header
                                                        as='h6'
                                                        content='Name'
                                                        subheader={this.state.assetDetails.asset.name}
                                                    />

                                                    <Header
                                                        as='h6'
                                                        content={`Type of ${this.state.assetDetails.asset.name}`}
                                                        subheader={this.state.assetDetails.type}
                                                    />

                                                    <Header
                                                        as='h6'
                                                        content='Estimated Value'
                                                        subheader={this.state.assetDetails.estimatedValue}
                                                    />

                                                    <Header
                                                        as='h6'
                                                        content='Description'
                                                        subheader={this.state.assetDetails.assetDescription}
                                                    />

                                                    <Header
                                                        as='h6'
                                                        content='Attachments'
                                                        subheader={`${this.state.assetDetails.files.length} files`}
                                                    />

                                                    {/*<a onClick={() => {
                                                                this.unSelectAsset()
                                                            }} href="">Click to go back</a>*/}
                                                </Col>

                                                <Col sm="5" md="5">
                                                    <Message>
                                                        <Message.Header>Your Information</Message.Header>

                                                        <Header
                                                            as='h6'
                                                            content='Name'
                                                            subheader={this.state.values.fullName}
                                                            style={{margin: '5px', marginTop: '10px'}}
                                                        />

                                                        <Header
                                                            as='h6'
                                                            content='Email Address'
                                                            subheader={this.state.values.email}
                                                            style={{margin: '5px', marginTop: '10px'}}
                                                        />

                                                        <Header
                                                            as='h6'
                                                            content='Phone Number'
                                                            subheader={this.state.values.mobileNumber}
                                                            style={{margin: '5px', marginTop: '10px'}}
                                                        />

                                                        <Header
                                                            as='h6'
                                                            content='Address'
                                                            subheader={this.state.values.address}
                                                            style={{margin: '5px', marginTop: '10px'}}
                                                        />

                                                        <Header
                                                            as='h6'
                                                            content='Zip Code'
                                                            subheader={this.state.values.zipCode}
                                                            style={{margin: '5px', marginTop: '10px'}}
                                                        />

                                                        <Header
                                                            as='h6'
                                                            content='Type of Loan'
                                                            subheader={this.state.values.loanType}
                                                            style={{margin: '5px', marginTop: '10px'}}
                                                        />

                                                        <Header
                                                            as='h6'
                                                            content='Applicant Type'
                                                            subheader={this.state.values.applicantType}
                                                            style={{margin: '5px', marginTop: '10px'}}
                                                        />
                                                    </Message>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Container>
                            ) : (
                                this.state.activeStep === 'user_final_submit' ? (
                                    <Container style={containerPadding}>
                                        <Row>
                                            <Col sm="12" md="12">
                                                <Header as='h2' textAlign={'center'} dividing>
                                                    <Header.Content>
                                                        Thank you for Applying
                                                    </Header.Content>
                                                    <Header.Subheader>
                                                        Our Customer Executives will reach out to you to 
                                                        process your Loan application within 48 hours.
                                                    </Header.Subheader>
                                                </Header>

                                                <Header as='h3' textAlign={'center'}>
                                                    <Header.Content>
                                                        Next Steps in our Process
                                                    </Header.Content>
                                                </Header>

                                                <Row style={{marginTop: '50px'}}>
                                                    <Col sm="4" md="4">
                                                        {/* <Header as='h2' textAlign={'center'} style={{marginTop: '100px'}}>
                                                            <Header.Content>Application ID</Header.Content>
                                                            <Header.Subheader style={{marginTop: '20px', color: 'red'}}>{this.state.values.applicationId}</Header.Subheader>
                                                        </Header> */}
                                                    </Col>
                                                    <Col sm="6" md={{size: 6}}>
                                                        <Step.Group vertical ordered>
                                                            <Step>
                                                                <Step.Content>
                                                                    <Step.Title>Initial Offer</Step.Title>
                                                                    <Step.Description>We will send you an initial offer</Step.Description>
                                                                </Step.Content>
                                                            </Step>

                                                            <Step>
                                                                <Step.Content>
                                                                    <Step.Title>Shipping</Step.Title>
                                                                    <Step.Description>Get your free FedEx Label and Ship your Assets</Step.Description>
                                                                </Step.Content>
                                                            </Step>

                                                            <Step>
                                                                <Step.Content>
                                                                    <Step.Title>Final Offer</Step.Title>
                                                                    <Step.Description>We will evaulate assets and provide the Final offer</Step.Description>
                                                                </Step.Content>
                                                            </Step>

                                                            <Step>
                                                                <Step.Content>
                                                                    <Step.Title>Contract & Loan</Step.Title>
                                                                    <Step.Description>Sign our Contract and Money will be Wired</Step.Description>
                                                                </Step.Content>
                                                            </Step>
                                                        </Step.Group>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                    </Container>
                                ) : (null)
                            )
                        )
                    )
                }

                {
                    this.state.activeStep !== '' ? (
                        <Container style={{marginTop: '20px'}}>
                            <Row>
                                <Col sm="6" md={{size: 8, offset: 2}}>
                                    {
                                        this.state.activeStep !== this.state.firstStep 
                                        && this.state.activeStep !== this.state.lastStep ? (
                                            <ApplyNowButton click={this.prevStep}
                                                            text={"Previous"}
                                                            submit={true}
                                                            buttonType="secondary" />
                                        ) : (null)
                                    }

                                    {
                                        this.state.activeStep !== this.state.lastStep
                                        && this.state.activeStep !== 'user_review_info'
                                        && (this.state.activeStep !== 'user_choose_asset' 
                                        || this.state.showAssetDetails) ? (
                                            <ApplyNowButton click={this.nextStep}
                                                            text={"Next"}
                                                            buttonType="primary"
                                                            submit={this.canBeSubmitted(this.state.activeStep)} />
                                        ) : (null)
                                    }

                                    {
                                        this.state.activeStep === 'user_review_info' ? (
                                            <ApplyNowButton click={this.submit} 
                                                            text={"Submit"} 
                                                            buttonType="primary"
                                                            submit />
                                        ) : (null)
                                    }
                                </Col>
                            </Row>
                        </Container>
                    ) : (
                        null
                    )
                }

            </div>
        );
    }
}

export default ApplyNow;