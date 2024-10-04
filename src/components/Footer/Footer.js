import React from "react";
import './Footer.css'
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer>
            <div>
                <div className="row text-center mt-5">
                    <div className="col-12 align-items-center justify-content-center footer">
                        <Link to="about-us" > About Us </Link> |
                        <Link to="history" > Payment History </Link> |
                        <Link to="terms-and-conditions" > T & C </Link> |
                        <Link to="privacy-policy" > Privacy Policy </Link>|
                        <Link to="refund-policy" > Refund Policy </Link> |
                        <Link to="mailto:support@billwill.com"> Contact Us</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;