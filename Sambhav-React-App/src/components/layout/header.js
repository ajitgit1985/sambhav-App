import React from "react";
import Prayas_logo from "../../assets/images/Pragyan_logo.svg";
import NER from "../../assets/images/NER_logo.png";
import Sambhav from "../../assets/images/sambhav logo.png";
import user from "../../assets/images/user-ic.png";
import { Image } from "react-bootstrap";

const Header = () => {
  return (
    <>
      <div className="PR__header prayas__ml_250">
        <section className="BI__header__container">
          <div className="container-fluid">
            <div className="row BI__Ver_center">
              <div className="order-1 order-lg-1 col-3 col-sm-2 col-md-3 col-lg-3">
                <a href="/home"><Image src={NER} alt="NER Logo" /></a>
              </div>
              <div className="order-2 order-lg-2 col-6 col-sm-8 col-md-6 col-lg-6 text-center">
                <div className="CKR__name">
                {/* <h3 className="PR_heading">Data Visualisation Platform</h3> */}
                  <Image src={Sambhav} alt="Sambhav Logo" />
                </div>
              </div>
              <div className="order-3 order-lg-3 col-3 col-sm-2 col-md-3 col-lg-3">
                <div className="BI__justify_end" style={{display:'flex'}}>
                  <a href="/"><Image src={Prayas_logo} alt="Pragyan Logo"style={{height:'60px'}} /></a>
                </div>
                
                {/* <ul className="BI__header_right BI__justify_end BI__Ver_center">
                    <li>
                        <div className="user">
                            <button title="user" className="user_img"><span className="user_name">Username</span>&nbsp;<Image src={user} alt="Login" /></button>
                              <div className="user_box">
                              <div className="box_content">
                                <p className="mb-0"><a href="#" alt="a">Profile</a></p><hr style={{ margin:"0.3rem 0"}}/>
                                <p className="mb-0"><a href="#" alt="a">Logout</a></p>
                              </div>
                            </div>
                        </div>
                    </li>
                  </ul> */}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Header;
