import React, { useState, useEffect } from "react";
import Axios from "axios";
import "../style/history.scss";

function History({ herokuURL }) {
  const localhost = "http://localhost:3001";
  const [history, setHistory] = useState([]);
  // console.log(history);
  useEffect(() => {
    Axios.get(herokuURL + "/getHistory").then((data) => {
      setHistory(data.data);
      // console.log(data.data);
    });
  }, []);

  const firstColors = {
    429: "#00FFFF",
    438: "#FF99FF",
    620: "#FFFF00",
  };

  const secondColors = {
    //? 014
    "005": "#191970",
    "006": "#0000cd",
    "014": "#4169e1",
    "020": "#6495ed",
    "023": "#00bfff",
    115: "#008080",
    "069": "#5F9EA0",
    "057": "#66CDAA",
    "049": "#00FA9A",
    "047": "#48D1CC",
    //? 438
    113: "#663399",
    130: "#9400D3",
    176: "#BA55D3",
    212: "#DA70D6",
    270: "#800080",
    260: "#C71585",
    238: "#FF69B4",
    234: "#ff69b4",
    //? 620
    "001": "#DAA520",
    "004": "#CC8500",
    "011": "#D2691E",
    "036": "#FF6347",
    "065": "#FF0000",
    "084": "#CC0000",
    258: "#EEC600",
    252: "#FFA500",
    240: "#FF8C00",
    219: "#DC143C",
    215: "#B22222",
    111: "#8B0000",
  };

  return (
    <div className="history_container">
      {history.length > 0 ? (
        history.map((entry, id) => {
          return (
            <div className="history_item" key={id}>
              <div
                className="num1"
                style={{ backgroundColor: firstColors[entry.club_code_1] }}
              >
                {entry.club_code_1}
              </div>
              <div
                className="num2"
                style={{
                  backgroundColor: secondColors[entry.club_code_2.toString()],
                  color: "white",
                }}
              >
                {entry.club_code_2}
              </div>
              <div className="zipcode">{entry.zipcode}</div>
              <div className="state">{entry.state_name}</div>
              <div className="state">{entry.service_type || "N/A"}</div>
            </div>
          );
        })
      ) : (
        <div className="loading">Loading....</div>
      )}
    </div>
  );
}

export default History;
