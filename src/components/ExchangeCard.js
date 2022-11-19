import React from "react";
import "../css/ExchangeCard.css";

const ExchangeCard = ({ img, name, rank, url }) => {
  return (
    <div className="container">
      <div className="top-card">
        <div className="exchangecard">
          <div className="exchange-img-top mx-auto">
            <a className="" href={url} target={"blank"}>
              <img className="exchange-img" src={img} alt="exchange" />
            </a>
          </div>
          <div className="exchange-rank">{rank}</div>
          <div className="exchange-name">{name}</div>
        </div>
      </div>
    </div>
  );
};

export default ExchangeCard;
