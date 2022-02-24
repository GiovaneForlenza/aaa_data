import React, { useState, useEffect } from "react";
import Chart from "react-google-charts";

import Axios from "axios";
import "../style/data.scss";

function Data() {
  const [calls, setCalls] = useState([]);

  const options = {
    region: "US",
    displayMode: "regions",
    resolution: "provinces",
    colorAxis: { colors: ["#DAE3F3", "#2F5597"] },
    datalessRegionColor: "#f8bbd0",
    defaultColor: "#f5f5f5",
  };

  const [showMap, setShowMap] = useState(false);

  const herokuURL = "https://aaa-data.herokuapp.com";
  const localhost = "http://localhost:3001";
  const netiflyURL = "https://aaa-data.netlify.app";
  useEffect(() => {
    Axios.post(herokuURL + "/getRequests").then((data) => {
      setCalls(data.data);
    });
    console.log(calls);
    setShowMap(true);
  }, []);

  const header = [["State", "Requests"]];

  const states = [
    ["Alabama", 0],
    ["Alaska", 0],
    ["Arizona", 0],
    ["Arkansas", 0],
    ["California", 0],
    ["Colorado", 0],
    ["Connecticut", 0],
    ["Delaware", 0],
    ["Florida", 0],
    ["Georgia", 0],
    ["Hawaii", 0],
    ["Idaho", 0],
    ["Illinois", 0],
    ["Indiana", 0],
    ["Iowa", 0],
    ["Kansas", 0],
    ["Kentucky", 0],
    ["Louisiana", 0],
    ["Maine", 0],
    ["Maryland", 0],
    ["Massachusetts", 0],
    ["Michigan", 0],
    ["Minnesota", 0],
    ["Mississippi", 0],
    ["Missouri", 0],
    ["Montana", 0],
    ["Nebraska", 0],
    ["Nevada", 0],
    ["New Hampshire", 0],
    ["New Jersey", 0],
    ["New Mexico", 0],
    ["New York", 0],
    ["North Carolina", 0],
    ["North Dakota", 0],
    ["Ohio", 0],
    ["Oklahoma", 0],
    ["Oregon", 0],
    ["Pennsylvania", 0],
    ["Rhode Island", 0],
    ["South Carolina", 0],
    ["South Dakota", 0],
    ["Tennessee", 0],
    ["Texas", 0],
    ["Utah", 0],
    ["Vermont", 0],
    ["Virginia", 0],
    ["Washington", 0],
    ["West Virginia", 0],
    ["Wisconsin", 0],
    ["Wyoming", 0],
  ];

  function countRequests() {
    calls.map((call) => {
      let index = [].concat
        .apply([], [].concat.apply([], states))
        .indexOf(call.state_name);
      if (index === -1) {
        return false;
      }
      let numColumns = states[0].length;
      let row = parseInt(index / numColumns);
      states[row][1] = states[row][1] + 1;
    });
  }

  const concatArray = [].concat(header, states);
  // console.log(concatArray);

  const statesRequests = [
    ["State", "Requests", "something"],
    ["Alabama", 0, 10],
    ["Alaska", 0, 20],
    ["Arizona", 0, 30],
    ["Arkansas", 0],
    ["California", 0],
    ["Colorado", 0],
    ["Connecticut", 0],
    ["Delaware", 0],
    ["Florida", 0],
    ["Georgia", 0],
    ["Hawaii", 0],
    ["Idaho", 0],
    ["Illinois", 0],
    ["Indiana", 0],
    ["Iowa", 0],
    ["Kansas", 0],
    ["Kentucky", 0],
    ["Louisiana", 0],
    ["Maine", 0],
    ["Maryland", 0],
    ["Massachusetts", 0],
    ["Michigan", 0],
    ["Minnesota", 0],
    ["Mississippi", 0],
    ["Missouri", 0],
    ["Montana", 0],
    ["Nebraska", 0],
    ["Nevada", 0],
    ["New Hampshire", 0],
    ["New Jersey", 0],
    ["New Mexico", 0],
    ["New York", 0],
    ["North Carolina", 0],
    ["North Dakota", 0],
    ["Ohio", 0],
    ["Oklahoma", 0],
    ["Oregon", 0],
    ["Pennsylvania", 0],
    ["Rhode Island", 0],
    ["South Carolina", 0],
    ["South Dakota", 0],
    ["Tennessee", 0],
    ["Texas", 0],
    ["Utah", 0],
    ["Vermont", 0],
    ["Virginia", 0],
    ["Washington", 0],
    ["West Virginia", 0],
    ["Wisconsin", 0],
    ["Wyoming", 0],
  ];

  countRequests();
  return (
    <div className="data-container">
      {showMap ? (
        <Chart
          options={options}
          data={concatArray}
          height="100%"
          width="100%"
          chartType="GeoChart"
        />
      ) : (
        <p>Loading...</p>
      )}
      <div className="states-request">
        {concatArray.map((request, id) => {
          if (id > 0) {
            return (
              <div className="container">
                <div className="state">{request[0]}</div>
                <div className="state">{request[1]}</div>
              </div>
            );
          }
        })}
      </div>

      <Chart
        options={options}
        data={concatArray}
        height="100%"
        width="100%"
        chartType="GeoChart"
      />
    </div>
  );
}

export default Data;
