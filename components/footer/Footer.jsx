/* eslint-disable no-unused-vars */
import React from 'react';
import "./footer.css";

const Footer = () => {
  return (
    <footer className="footer">
        <div className="footer__container container">
            <h1 className="footer__title">&lt;Saurav Kumar Singh/&gt;</h1>

            <div className="footer__social">
                <a href="https://www.instagram.com/saurav_singh_2999" className="footer__social-link" target="_blank">
                    <i className="bx bxl-instagram"></i>
                </a>

                <a href="https://www.linkedin.com/in/sauravkumarsingh1688" className="footer__social-link" target="_blank">
                    <i className="bx bxl-linkedin"></i>
                </a>

                <a href="https://github.com/Saurav-KumarSingh" className="footer__social-link" target="_blank">
                    <i className="bx bxl-github"></i>
                </a>
            </div>

            <span className="footer__copy">&#169; Saurav Kumar Singh. All rigths reserved</span>
        </div>
    </footer>
  )
}

export default Footer