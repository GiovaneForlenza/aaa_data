import React, { useState } from "react";
import "../style/requestType.scss";
function RequestType({
  id,
  url,
  serviceType,
  setRequestType,
  activeRequest,
  setActiveRequest,
}) {
  return (
    <div
      className={`request_type ${
        setActiveRequest[id] == 1 && "request-active"
      }`}
      id={`service-${id}`}
      onClick={() => {
        if (activeRequest[id] === 0) {
          for (let index = 0; index < activeRequest.length; index++) {
            setActiveRequest[index] = 0;
          }
          setActiveRequest[id] = 1;
          setRequestType(serviceType);
        } else {
          setActiveRequest[id] = 0;
          setRequestType("");
        }
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
