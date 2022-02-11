import React, { useState } from "react";
import Axios from "axios";
import "../style/home.scss";

function Home() {
  const [membershipNumber, setMembershipNumber] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [requestType, setRequestType] = useState("battery");
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const herokuURL = "https://aaa-data.herokuapp.com/";
  const localhost = "http://localhost:3005";

  const ZIP_API_KEY = "f51d56d33e3fb8f1b5094821c1125ad9";
  const ZIP_API_URL = "https://service.zipapi.us/zipcode/";

  function handleSubmit(e) {
    e.preventDefault();
    setHasSubmitted(true);

    const url = `${ZIP_API_URL}${zipCode}/?X-API-KEY=[${ZIP_API_KEY}]`;

    // Axios.get(url).then((res) => {
    //   console.log(res);
    // });

    fetch(url)
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((err) => console.error(err));

    Axios.post(`${herokuURL}/add`, {
      membership: membershipNumber,
      zipcode: zipCode,
      requestType: requestType,
    }).then((res) => {
      console.log(res);
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
          <label htmlFor="input_zipcode">Request:</label>
          <select id="cars">
            <option value="battery" defaultValue>
              Battery
            </option>
            <option value="jump">Jump</option>
            <option value="tow">Tow</option>
            <option value="stuck">Stuck</option>
            <option value="flat">Flat</option>
            <option value="fuel">Fuel</option>
            <option value="accident">Accident</option>
            <option value="locked">Locked out</option>
          </select>
        </div>
        <div className="lin">
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
