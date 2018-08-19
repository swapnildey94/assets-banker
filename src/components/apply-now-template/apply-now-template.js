import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.min.css';
import './css/style.css';
import './css/fontello.css';
import ApplyNow from "../apply-now";

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

class ApplyNowTemplate extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            menu: []
        };
    };

    componentDidMount() {
        fetch('http://luxebanker.com/wp-json/wp-api-menus/v2/menus/24')
            .then(function (response) {
                return response.json();
            })
            .then((myJson) => {
                this.setState({
                    menu: myJson.items
                });
            });
    }

    render() {

        const renderNodes = menu => {
            return menu.map(item => (
                <li>
                    <a href={item.url} title={item.title} className="animsition-link">{item.title}</a>
                    <ul>
                        {item.children && item.children.length ? renderChildren(item.children) : ""}
                    </ul>
                </li>
            ));
        };

        const renderChildren = children => {
            return children.map(child => (
                <li><a href={child.url} title={child.title} className="animsition-link">{child.title}</a></li>
            ))
        };

        return (
            <div>
                <div className="top-bar">
                    {/* top-bar */}
                    <div className="container">
                        <div className="row">
                            <div
                                className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 d-none d-xl-block d-lg-block d-md-block">
                                <p className="mail-text">Welcome to our Borrow Loan Website Templates</p>
                            </div>
                            <div
                                className="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12 d-none d-xl-block d-lg-block d-md-block">
                                <p className="mail-text text-center">Call us at 1-800-123-4567</p>
                            </div>
                            <div
                                className="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12 d-none d-xl-block d-lg-block d-md-block">
                                <p className="mail-text text-center">Mon to fri 10:00am - 06:00pm</p>
                            </div>
                            <div
                                className="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12 d-none d-xl-block d-lg-block d-md-block">
                                <p className="mail-text text-center">Get started today</p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* /.top-bar */}
                <div className="header-2">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
                                {/* logo */}
                                <div className="logo">
                                    <a href="../borrow-web/index.html">
                                        <img src="http://luxebanker.com/wp-content/uploads/2018/07/Asset-Banker-logo-03.jpg"
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
                                    <a href="" className="btn btn-primary" style={buttonMargin}>Apply Now</a>
                                    <a href="" className="btn btn-default " style={buttonMargin}>Contact Us</a></div>
                                </div>
                        </div>
                    </div>
                    <div className="navigation-2">
                        <div className="container">
                            <div className="row">
                                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                    <div id="navigation">
                                        {/* navigation start*/}
                                        <ul>
                                            {
                                                renderNodes(this.state.menu)
                                            }
                                        </ul>
                                    </div>
                                    {/* /.navigation start*/}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="page-header">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                <div className="bg-white pinside30">
                                    <div className="row">
                                        <div className="col-xl-4 col-lg-4 col-md-9 col-sm-12 col-12">
                                            <h1 className="page-title">Apply Now</h1>
                                        </div>
                                        <div className="col-xl-8 col-lg-8 col-md-3 col-sm-12 col-12">
                                            <div className="row">
                                                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                    {/*<div class="btn-action"> <a href="" class="btn btn-default">How To Apply</a> </div>*/}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    {/* content start */}
                    <div className="container">
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
                                                <p className="lead">Various versions have evolved over the years
                                                    sometimes by accident sometimes on purpose injected humour and the
                                                    like.</p>
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
                <div className="footer section-space100" style={{color: 'white'}}>
                    {/* footer */}
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                                <div className="footer-logo">
                                    {/* Footer Logo */}
                                    <img src="http://luxebanker.com/wp-content/uploads/2018/07/Asset-Banker-vertical-logo-06-e1531942840800.png"
                                         alt="Borrow - Loan Company Website Templates"
                                         style={logoStyle}
                                    />
                                </div>
                                {/* /.Footer Logo */}
                            </div>
                            <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-12">
                            </div>
                            <hr className="dark-line"/>
                            <div className="row">
                                <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                                    <div className="widget-text mt40">
                                        {/* widget text */}
                                        <p>Our goal at Asset Banker is to provide access to personal loans 
                                            and business loans for your own assets at competitive interest 
                                            rates  with complete confidentiality.</p>
                                        <div className="row" style={{marginTop: '40px'}}>
                                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6">
                                                <p className="address-text"><span><i
                                                    className="icon-placeholder-3 icon-1x"/> </span>800 Brickell Avenue, Miami, FL</p>
                                            </div>
                                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6">
                                                <p className="call-text"><span><i className="icon-phone-call icon-1x"/></span>+1 305-789-8976
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    {/* /.widget text */}
                                </div>
                                <div className="col-xl-2 col-lg-2 col-md-2 col-sm-6 col-6">
                                    <div className="widget-footer mt40">
                                        {/* widget footer */}
                                        <ul className="listnone">
                                            <li><a href="">Home</a></li>
                                            <li><a href="">How it Works</a></li>
                                            <li><a href="">About Us</a></li>
                                            <li><a href="">Luxury Assets</a></li>
                                            <li><a href="">Invest with Us</a></li>
                                            <li><a href="">Privacy &amp; Legal</a></li>
                                        </ul>
                                    </div>
                                    {/* /.widget footer */}
                                </div>
                                <div className="col-xl-2 col-lg-2 col-md-2 col-sm-6 col-6">
                                    <div className="widget-footer mt40">
                                        {/* widget footer */}
                                        <ul className="listnone">
                                            <li><a href="">Diamonds</a></li>
                                            <li><a href="">Gold</a></li>
                                            <li><a href="">Jewelry</a></li>
                                            <li><a href="">Watches</a></li>
                                            <li><a href="">Luxury Cars</a></li>
                                            <li><a href="">Art Works</a></li>
                                        </ul>
                                    </div>
                                    {/* /.widget footer */}
                                </div>
                                <div className="col-xl-2 col-lg-2 col-md-2 col-sm-6 col-6">
                                    <div className="widget-footer mt40">
                                        {/* widget footer */}
                                        <ul className="listnone">
                                            <li><a href="">Bridge Loan</a></li>
                                            <li><a href="">Line of Credit</a></li>
                                            <li><a href="">Sale Advance Loan</a></li>
                                            <li><a href="">Prepaid Debit Card</a></li>
                                        </ul>
                                    </div>
                                    {/* /.widget footer */}
                                </div>
                                <div className="col-xl-2 col-lg-2 col-md-2 col-sm-6 col-6">
                                    <div className="widget-social mt40">
                                        {/* widget footer */}
                                        <ul className="listnone">
                                            <li><a href=""><i className="fa fa-facebook"/>Facebook</a></li>
                                            <li><a href=""><i className="fa fa-twitter"/>Twitter</a></li>
                                            <li><a href=""><i className="fa fa-linkedin"/>Linked In</a></li>
                                        </ul>
                                    </div>
                                    {/* /.widget footer */}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* /.footer */}
                    <div className="tiny-footer" style={{marginTop: '20px'}}>
                        {/* tiny footer */}
                        <div className="container">
                            <div className="row">
                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6">
                                    <p>© Copyright 2018 | Assets Banker Inc.</p>
                                </div>
                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6 text-right">
                                    <p>Terms of use | Privacy Policy</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ApplyNowTemplate;