import React, { useState } from "react";
import landing from "../assets/images/landing_bg.png";
import sambhav from "../assets/images/sambhav_main.png";
import emblem from "../assets/images/emblem.svg";
import Header from "../components/layout/header";
import Footer from "../components/layout/footer";

function Option({ background, image, main, sub, isActive, onClick }) {
  return (
    <div
      className={`option ${isActive ? "active" : ""}`}
      style={{ "--optionBackground": `url(${background})` }}
      onClick={onClick}
    >
      <div className="shadow"></div>
      <div className="label">
        <div className="custom-icon">
          <img src={image} alt="Option Icon" />
        </div>
        <div className="info">
          <div className="main">{main}</div>
          <div className="sub">{sub}</div>
        </div>
      </div>
    </div>
  );
}

const Home = () => {
  const [activeOption, setActiveOption] = useState(0);

  const handleOptionClick = (index) => {
    setActiveOption(index);
  };

  const options = [
    {
      background: require("../assets/images/arunachal_p.jpg"),
      image: require("../assets/images/AR.svg").default, // Adjust the path accordingly
      main: "Arunachal Pradesh",
      sub: "AR",
    },
    {
      background: require("../assets/images/assam.jpg"),
      image: require("../assets/images/AS.svg").default,
      main: "Assam",
      sub: "AS",
    },
    {
      background: require("../assets/images/meghalaya.jpg"),
      image: require("../assets/images/ML.svg").default,
      main: "Meghalaya",
      sub: "ML",
    },
    {
      background: require("../assets/images/manipur.jpg"),
      image: require("../assets/images/MN.svg").default,
      main: "Manipur",
      sub: "MN",
    },
    {
      background: require("../assets/images/mizoram.jpg"),
      image: require("../assets/images/MZ.svg").default,
      main: "Mizoram",
      sub: "MZ",
    },
    {
      background: require("../assets/images/nagaland.jpg"),
      image: require("../assets/images/NL.svg").default,
      main: "Nagaland",
      sub: "Omuke trughte a otufta",
    },
    {
      background: require("../assets/images/sikkim.jpg"),
      image: require("../assets/images/SK.svg").default,
      main: "Sikkim",
      sub: "SK",
    },
    {
      background: require("../assets/images/tripura.jpg"),
      image: require("../assets/images/TR.svg").default,
      main: "Tripura",
      sub: "TR",
    },
  ];

  return (
    <>
      <Header />
      <div className="home_container">
        <section className="landing">
          <img className="w-100" src={landing} alt="Sambhav" />
          <div className="landing_container">
            <div className="container-fluid">
              <div className="row align-items-center">
                <div className="col-md-7">
                  <div className="landing_text">
                    <img
                      className="mb-4"
                      src={emblem}
                      style={{ width: "113px" }}
                      alt="satyamev jayate"
                    />
                    <h4 className="text_hn">
                      उत्तर पूर्वी क्षेत्र विकास मंत्रालय
                    </h4>
                    <h3 className="mb-3">
                      MINISTRY OF DEVELOPMENT OF NORTH EASTERN REGION
                    </h3>
                    <a className="view_db" href="/dashboard">
                      View Dashboard
                    </a>
                  </div>
                </div>
                <div className="col-md-5">
                  <div className="landing_img">
                    <img src={sambhav} alt="Sambhav" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="about_container">
          <div className="container">
            <div className="sec_about text-align-center">
              <h2 className="pg_heading">ABOUT SAMBHAV</h2>
              <div className="btm_line"></div>
              <p>
                The Ministry of Development of North Eastern Region is
                responsible for the matters relating to the planning, execution
                and monitoring of development schemes and projects in the North
                Eastern Region. Its vision is to accelerate the pace of
                socio-economic development of the Region so that it may enjoy
                growth parity with the rest of the country.
              </p>
            </div>
          </div>
        </section>
        <section className="NER_states">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="NER_content">
                  <h2 className="pg_heading">NER States</h2>
                  <div className="btm_line"></div>
                  <div className="options">
                    {options.map((option, index) => (
                      <Option
                        key={index}
                        background={option.background}
                        image={option.image}
                        main={option.main}
                        sub={option.sub}
                        isActive={activeOption === index}
                        onClick={() => handleOptionClick(index)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <img className="w-100" src={bg2} alt="Sambhav"/>
              <div className='NER_c'>
                
                </div> */}
        </section>
      </div>
      <Footer className="overview_pad prayas__ml_250" />
    </>
  );
};

export default Home;
