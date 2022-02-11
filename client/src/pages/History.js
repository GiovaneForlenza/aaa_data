import React, { useState, useEffect } from "react";
import Axios from "axios";
import "../style/history.scss";

function History() {
  const herokuURL = "https://aaa-data.herokuapp.com/";
  const localhost = "http://localhost:3005";
  const [history, setHistory] = useState([]);
  console.log(history);
  useEffect(() => {
    Axios.get(herokuURL).then((data) => {
      setHistory(data.data);
    });
  }, []);
  return (
    <div className="history_container">
      {history.length > 0
        ? history.map((entry, id) => {
            return (
              <div className="history_item" key={id}>
                <div className="num1">{entry.club_code_1}</div>
                <div className="num2">{entry.club_code_2}</div>
                <div className="zipcode">{entry.zipcode}</div>
                <div className="state">{entry.state_name}</div>
              </div>
            );
          })
        : null}
    </div>
  );
}

export default History;
