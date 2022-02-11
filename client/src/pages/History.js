import React, { useState, useEffect } from "react";
import Axios from "axios";

function History() {
  const herokuURL = "https://aaa-data.herokuapp.com/";
  const localhost = "hhtp://localhost:3002";
  const [history, setHistory] = useState([]);
  console.log(history);
  useEffect(() => {
    Axios.get(herokuURL).then((data) => {
      setHistory(data.data);
      console.log(data.data);
    });
  }, []);
  return (
    <div>
      {history.length > 0
        ? history.map((smt) => {
            return <p>{smt.club_code_1}</p>;
          })
        : null}
    </div>
  );
}

export default History;
