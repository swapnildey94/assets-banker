import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.min.css';
import './css/style.css';
import './css/fontello.css';
import ApplyNow from "../apply-now";

const assetBackground = {
    background: 'url(\'http://assetbanker.com/wp-content/uploads/2018/09/advt-new.jpg\') no-repeat center center fixed',
    backgroundSize: 'cover'
};

const buttonMargin = {
    margin: '2px'
};

const logoStyle = {
    width: 'auto',
    maxWidth: '100%',
    height: 'auto',
    margin: 0,
    padding: 0,
    border: 'none',
    lineHeight: 'normal',
    verticalAlign: 'middle'
};

class ApplyNowVanilla extends React.Component {
    constructor(props) {
        super(props);
    };

    render() {

        return (
            <div style={assetBackground}>
                <div className="header-2" style={{backgroundColor: '#000', paddingBottom: '20px'}}>
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
                                {/* logo */}
                                <div className="logo">
                                    <a href="http://assetbanker.com/">
                                        <img src="http://assetbanker.com/wp-content/uploads/2018/08/asset-banker-white-21.png"
                                                alt="Borrow - Loan Company Website Template"
                                                style={logoStyle}
                                        />
                                    </a>
                                </div>
                            </div>
                            {/* logo */}
                            <div
                                className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12 text-right d-none d-xl-block d-lg-block ">
                                <div className="header-action">
                                    <a href="http://assetbanker.com/#Services" className="btn btn-primary" style={buttonMargin}>Services</a>
                                    <a href="http://assetbanker.com/#Contact" className="btn btn-default " style={buttonMargin}>Contact Us</a></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container" style={{paddingTop: '20px', marginTop: '20px'}}>
                    <div className="row">
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                            <div className="wrapper-content bg-white pinside40">
                                <div className="contact-form mb60">
                                    <div className=" ">
                                        <div
                                            className="offset-xl-2 col-xl-8 offset-lg-2 col-lg-8 col-md-12 col-sm-12 col-12">
                                            <div className="mb60  section-title text-center  ">
                                                {/* section title start*/}
                                                <h1>Apply Now with No Obligation</h1>
                                                <p>Use your luxury asset for a short term loan at the best interest rate. 
                                                    <br/>Our loan officer will contact you within 2 Business days.</p>
                                            </div>
                                        </div>

                                        <ApplyNow/>

                                    </div>
                                </div>
                                {/* /.section title start*/}
                            </div>
                            <div className="contact-us mb60 bg-white pinside40">
                                <div className="row">
                                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                        <div className="mb60  section-title">
                                            {/* section title start*/}
                                            <h1>We are here to help you </h1>
                                        </div>
                                        {/* /.section title start*/}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                                        <div className="bg-boxshadow pinside60 outline text-center mb30">
                                            <div className="mb40"><i
                                                className="icon-briefcase icon-2x icon-default"/></div>
                                            <h2 className="capital-title">Branch Office</h2>
                                            <p>800 Brickell Avenue
                                                <br/> Miami, FL 33131</p>
                                        </div>
                                    </div>
                                    <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                                        <div className="bg-boxshadow pinside60 outline text-center mb30">
                                            <div className="mb40"><i
                                                className="icon-phone-call icon-2x icon-default"/></div>
                                            <h2 className="capital-title">Call us at </h2>
                                            <h1 className="text-big">305-789-8976</h1>
                                        </div>
                                    </div>
                                    <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                                        <div className="bg-boxshadow pinside60 outline text-center mb30">
                                            <div className="mb40"><i className="icon-letter icon-2x icon-default"/>
                                            </div>
                                            <h2 className="capital-title">Email Address</h2>
                                            <h2 className="text-big" style={{paddingBottom: '10px'}}>info@assetbanker.com</h2>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ApplyNowVanilla;