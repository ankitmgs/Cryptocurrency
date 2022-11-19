import React from "react";
import { NavLink } from "react-router-dom";
import "../css/CoinsCard.css";

const CoinsCard = ({
  id,
  name,
  coin_price,
  img,
  symbol,
  currentSymbol = "₹",
}) => {
  return (
    <div className="container">
      <div className="coin-top-card">
        <div className="coincard">
          <div className="coin-img-top mx-auto">
            <NavLink className="" to={`/coin/${id}`}>
              <img className="coin-img" src={img} alt="exchange" />
            </NavLink>
          </div>
          <div className="coin-name">{name}</div>
          <div className="coin-symbol">{symbol}</div>
          <div className="coin-current-symbol">{currentSymbol}{" "}{coin_price}</div>
        </div>
      </div>
    </div>
  );
};

export default CoinsCard;
