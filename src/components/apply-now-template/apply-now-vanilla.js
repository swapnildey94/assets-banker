import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.min.css';
import './css/style.css';
import './css/fontello.css';
import ApplyNow from "../apply-now";

class ApplyNowVanilla extends React.Component {
    constructor(props) {
        super(props);
    };

    render() {

        return (
            <div>
                <div className="container" style={{paddingTop: '20px'}}>
                    <div className="row">
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                            <div className="wrapper-content bg-white pinside40">
                                <div className="contact-form mb60">
                                    <div className=" ">
                                        <div
                                            className="offset-xl-2 col-xl-8 offset-lg-2 col-lg-8 col-md-12 col-sm-12 col-12">
                                            <div className="mb60  section-title text-center  ">
                                                {/* section title start*/}
                                                <h1>Get In Touch</h1>
                                                <p>Reach out to us &amp; we will respond as soon as we can.</p>
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