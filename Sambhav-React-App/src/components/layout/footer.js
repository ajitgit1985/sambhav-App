import React from "react";
import CEDA_logo from "../../assets/images/CEDA-logo.svg";
import nicsi_logo from "../../assets/images/nicsi_logo.svg";

const Footer = () => {
  return (
    <>
    <div className="BI__footer__line"></div>
      <footer className="footer__container mt-1">
        <div className="container-fluid">
            <div className="row BI__Ver_center">
                <div className="col-12 col-md-3">
                    <ul>
                      <li><a href="https://nicsi.com/ceda/index.html" target="_blank">
                          <img src={CEDA_logo} alt="NICSI Logo" /></a>
                      </li>
                    </ul>
                </div>
                <div className="col-12 col-md-6">
                    <p className="pragyan__footer__text">
                        Data Analytics Platform, Designed &amp; Developed by<br />
                        <b>CENTRE OF EXCELLENCE FOR DATA ANALYTICS</b>
                    </p>
                </div>
                <div className="col-12 col-md-3">
                    <ul className="BI__logos_sec BI__justify_end">
                        <li><a href="https://nicsi.com/" target="_blank">
                          <img src={nicsi_logo} alt="NIC Logo" /></a></li>
                    </ul>
                </div>
            </div>
        </div>
    </footer>
    </>
  );
};

export default Footer;
