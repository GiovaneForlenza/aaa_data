import React, { useState } from "react";
import Axios from "axios";
import "../style/home.scss";
import RequestType from "../components/RequestType";

function Home() {
  const [membershipNumber, setMembershipNumber] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [requestType, setRequestType] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isRequestActive, setIsRequestActive] = useState(false);
  const [activeRequest, setActiveRequest] = useState([0, 0, 0, 0, 0, 0, 0, 0]);

  const herokuURL = "https://aaa-data.herokuapp.com";
  const localhost = "http://localhost:3005";

  const ZIP_API_KEY = "f51d56d33e3fb8f1b5094821c1125ad9";
  const ZIP_API_URL = "https://service.zipapi.us/zipcode/";

  const serviceName = [
    "BATTERY",
    "FLAT_TIRE",
    "FUEL",
    "LOCKED",
    "STUCK",
    "ACCIDENT",
    "WONT_START",
    "TOW",
  ];
  const serviceTypes = [
    "Battery",
    "Flat Tire",
    "Fuel",
    "Locked",
    "Stuck",
    "Accident",
    "Jump",
    "Tow",
  ];
  const iconURL = {
    BATTERY: "https://drrweb.national.aaa.com/assets/images/icons/battery.svg",
    FLAT_TIRE:
      "https://drrweb.national.aaa.com/assets/images/icons/flat%20tire.svg",
    FUEL: "https://drrweb.national.aaa.com/assets/images/icons/fuel.svg",
    LOCKED:
      "https://drrweb.national.aaa.com/assets/images/icons/locked%20out.svg",
    STUCK: "https://drrweb.national.aaa.com/assets/images/icons/stuck.svg",
    ACCIDENT:
      "https://drrweb.national.aaa.com/assets/images/icons/accident.svg",
    WONT_START:
      "https://drrweb.national.aaa.com/assets/images/icons/car%20wont%20start.svg",
    TOW: "https://drrweb.national.aaa.com/assets/images/icons/tow-small.svg",
  };

  function handleSubmit(e) {
    e.preventDefault();
    setHasSubmitted(true);

    const url = `${ZIP_API_URL}${zipCode}/?X-API-KEY=[${ZIP_API_KEY}]`;

    // Axios.get(url).then((res) => {
    //   console.log(res);
    // });

    // fetch(url)
    //   .then((response) => response.json())
    //   .then((data) => console.log(data))
    //   .catch((err) => console.error(err));

    Axios.post(`${herokuURL}/add`, {
      membership: membershipNumber,
      zipcode: zipCode,
      requestType: requestType,
    }).then((res) => {
      console.log(res);
      alert("posted");
    });
  }

  return (
    <div className="home_container">
      <form action="">
        <div className="line">
          <label htmlFor="input_membership_num">Membership Number:</label>
          <input
            type="text"
            name="membership_num"
            id="input_membership_num"
            onChange={(e) => setMembershipNumber(e.target.value)}
          />
          {hasSubmitted && membershipNumber.length === 0 ? (
            <div className="error" id="membership_error">
              Membership is required
            </div>
          ) : null}
        </div>
        <div className="line">
          <label htmlFor="input_zipcode">Zip Code:</label>
          <input
            type="text"
            name="zipcode"
            id="input_zipcode"
            onChange={(e) => {
              setZipCode(e.target.value);
            }}
          />
          {hasSubmitted && zipCode.length === 0 ? (
            <div className="error" id="zipcode_error">
              Zip code is required
            </div>
          ) : null}
        </div>
        <div className="line">
          <label htmlFor="input_zipcode">Request: {requestType}</label>
          <div className="request_type_container">
            {serviceName.map((service, id) => {
              return (
                <RequestType
                  key={id}
                  id={id}
                  url={iconURL[service]}
                  serviceType={serviceTypes[id]}
                  setRequestType={setRequestType}
                  activeRequest={activeRequest}
                  setActiveRequest={setActiveRequest}
                />
              );
            })}
          </div>
        </div>
        <div className="line">
          <input
            type="submit"
            value="Submit"
            className="submit"
            onClick={(e) => {
              handleSubmit(e);
            }}
          />
        </div>
      </form>
    </div>
  );
}

export default Home;
