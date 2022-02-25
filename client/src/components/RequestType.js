import React, { useState } from "react";
import "../style/requestType.scss";
function RequestType({ id, url, serviceType, setRequestType, activeRequest }) {
  return (
    <div
      className={`request_type ${activeRequest[id] == 1 && "request-active"}`}
      id={`service-${id}`}
      onClick={() => {
        if (activeRequest[id] === 0) {
          // for (let index = 0; index < activeRequest.length; index++) {
          //   activeRequest[index] = 0;
          // }
          activeRequest[id] = 1;
          setRequestType(serviceType);
        } else {
          activeRequest[id] = 0;
          setRequestType("");
        }
        console.log(activeRequest);
      }}
    >
      <div className="img">
        <img src={url} alt="" />
      </div>
      <div className="type">{serviceType}</div>
    </div>
  );
}

export default RequestType;
