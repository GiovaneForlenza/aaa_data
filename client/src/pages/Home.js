import React, { useState } from "react";
import Axios from "axios";
import "../style/home.scss";
import RequestType from "../components/RequestType";

function Home({ herokuURL }) {
  const [membershipNumber, setMembershipNumber] = useState("");
  const [zipCode, setZipCode] = useState("11111");
  const [requestType, setRequestType] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isRequestActive, setIsRequestActive] = useState(false);
  const activeRequest = [0, 0, 0, 0, 0, 0, 0, 0];
  const localhost = "http://localhost:3001";

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

    if (membershipNumber.length === 6 && zipCode.length === 5) {
      let stateName = "aa";
      fetch("http://api.zippopotam.us/us/" + zipCode)
        .then(function (response) {
          return response.json();
        })
        .then(function (jsonResponse) {
          stateName = jsonResponse.places[0].state;
          Axios.post(`${herokuURL}/add`, {
            membership: membershipNumber,
            zipcode: zipCode,
            stateName: stateName,
            requestType: requestType,
          }).then((res) => {
            console.log(res);
          });
          document.getElementById("input_membership_num").value = "";
          document.getElementById("input_zipcode").value = "";
          setRequestType("");
          // activeRequest.forEach((request) => {
          //   activeRequest[request] = 0;
          // });
        });
    }
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
                  // setActiveRequest={setActiveRequest}
                />
              );
            })}
          </div>
        </div>
        <div className="line submit">
          <input
            type="submit"
            value="Submit"
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
