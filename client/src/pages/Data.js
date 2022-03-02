import React, { useState, useEffect } from "react";
import Chart from "react-google-charts";

import Axios from "axios";
import "../style/data.scss";

function Data({ herokuURL }) {
  const [calls, setCalls] = useState([]);
  const API_KEY = "AIzaSyCo2BGpJE5iXC5XTYqynsX650bnbAUV8kQ";
  const options = {
    region: "US",
    displayMode: "regions",
    resolution: "provinces",
    colorAxis: { colors: ["#DAE3F3", , "#92D050"] },
    datalessRegionColor: "#f8bbd0",
    defaultColor: "#f5f5f5",
    sliceVisibilityThreshold: 0.05,
  };

  const [showMap, setShowMap] = useState(false);
  useEffect(() => {
    Axios.post(herokuURL + "/getRequests").then((data) => {
      setCalls(data.data);
    });
    setShowMap(true);
  }, []);

  const stateGeoChartHeader = [["State", "Requests"]];

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

  const statesa = [
    [
      "Requests",
      "Tow",
      "Jump",
      "Flat",
      "Locked",
      "Fuel",
      { role: "annotation" },
    ],
    ["Alabama", 10, 20, 30, 40, 10, ""],
    ["Alaska", 10, 20, 30, 40, 0, ""],
    ["Arizona", 10, 20, 30, 40, 50, ""],
    ["Arkansas", 10, 20, 30, 40, 50, ""],
    ["California", 10, 20, 30, 40, 50, ""],
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
  const concatArray = [].concat(stateGeoChartHeader, states);

  countRequests();
  return (
    <div className="data-container">
      {showMap ? (
        <div>
          <div className="map">
            <Chart
              options={options}
              data={concatArray}
              height="100%"
              width="100%"
              chartType="GeoChart"
              mapsApiKey={API_KEY}
            />
          </div>
          <div className="map">
            <Chart
              options={{
                legend: { position: "top", maxLines: 3 },
                bar: { groupWidth: "75%" },
                // isStacked: "percent",
                isStacked: true,
                // hAxis: {
                //   minValue: 0,
                //   ticks: [0, 0.3, 0.6, 0.9, 1],
                // },
              }}
              data={statesa}
              height="100%"
              width="100%"
              chartType="BarChart"
              mapsApiKey={API_KEY}
            />
          </div>
          <div className="map">
            <Chart
              options={{
                // legend: { position: "top", maxLines: 3 },
                // bar: { groupWidth: "75%" },
                // isStacked: "percent",
                // hAxis: {
                //   minValue: 0,
                //   ticks: [0, 0.3, 0.6, 0.9, 1],
                // },
                bars: "horizontal", // Required for Material Bar Charts.
              }}
              data={statesa}
              height="100%"
              width="100%"
              chartType="Bar"
              mapsApiKey={API_KEY}
            />
          </div>
          <div className="map">
            <Chart
              options={{
                title: "Requests per State",
                is3D: true,
                // slices: {
                //   8: { offset: 0.2 },
                //   9: { offset: 0.3 },
                //   12: { offset: 0.4 },
                //   13: { offset: 0.5 },
                //   21: { offset: 0.5 },
                // },
                sliceVisibilityThreshold: 0.05,
              }}
              data={concatArray}
              height="100%"
              width="100%"
              chartType="PieChart"
            />
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      {/* <div className="states-request">
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
      </div> */}
    </div>
  );
}

export default Data;
