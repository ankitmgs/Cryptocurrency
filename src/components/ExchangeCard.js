import React from "react";
import "../css/ExchangeCard.css";

const ExchangeCard = ({ key, img, name, rank, url }) => {
  return (
    <div className="container">
      <div className="exchangecard">
        <div className="exchange-img-top mx-auto">
          <a className="" href={url} target={"blank"}>
            <img className="exchange-img" src={img} alt="exchange" />
          </a>
        </div>
        <div className="exchange-rank">{rank}</div>
        <div className="exchange-name">
          {name}
        </div>
      </div>
      {/* <div className="card coinexchangecard" style={{ width: "15rem", margin: "2rem" }}>
        <a href={url} target={"blank"}>
          <div className="card-img-top d-flex justify-content-center">
            <img src={img} className="mt-5" alt="exchanges" style={{ width: "8rem", borderRadius: "10px" }} />
          </div>
          <h6>{key}</h6>
          <div className="card-body">
            <div className="card-title">
              <div className=" d-flex justify-content-center">
                <h6>{rank}</h6>
              </div>
              <div className=" d-flex justify-content-center">
                <h5>{name}</h5>
              </div>
            </div>
          </div>
        </a>
      </div> */}
    </div>
  );
};

export default ExchangeCard;
