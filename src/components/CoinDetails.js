import axios from "axios";
import React, { useEffect, useState } from "react";
import { server } from "..";
import Loader from "./Loader";
import { useParams } from "react-router-dom";
import Error from "./Error";
import { height } from "@mui/system";

const CoinDetails = () => {
  const [coin, setCoin] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currency, setCurrency] = useState("inr");

  const currentSymbol =
    currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

  const params = useParams();

  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const { data } = await axios.get(`${server}/coins/${params.id}`);
        console.log(data);
        setCoin(data);
        setLoading(false);
      } catch (error) {
        setError(true);
      }
    };
    fetchCoin();
  }, [params.id]);

  if (error) return <Error msg={"Error while fetching coins"} />;

  return (
    <div className="container">
      {loading ? (
        <Loader />
      ) : (
        <>
          <div
            className="radio-group d-flex justify-content-center"
            style={{
              marginTop: "2rem",
              marginBottom: "2rem",
              fontWeight: "bolder",
              fontSize: "2rem",
            }}
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            <input
              type="radio"
              value={"inr"}
              style={{ marginLeft: "5%", width: "1.5rem" }}
            />
            ₹ INR
            <input
              type="radio"
              value={"usd"}
              style={{ marginLeft: "5%", width: "1.5rem" }}
            />
            $ USD
            <input
              type="radio"
              value={"eur"}
              style={{ marginLeft: "5%", width: "1.5rem" }}
            />
            € EUR
          </div>
          <div className="d-flex justify-content-center">
            <text>
              Last update On {Date(coin.market_data.last_updated).split("G")[0]}
            </text>
          </div>
          <div className="">
            <img src={coin.image.large} width="70px" height="70px" />
            <h4>{coin.name}</h4>
            <h3>
              {currentSymbol}
              {coin.market_data.current_price[currency]}
            </h3>
            <h6
              style={{
                color:
                  coin.market_data.price_change_percentage_24h > 0
                    ? "green"
                    : "red",
              }}
            >
              {coin.market_data.price_change_percentage_24h}%
            </h6>
            <h6
              className=""
              style={{
                backgroundColor: "black",
                color: "white",
                width: "2rem",
                paddingLeft: "5px",
              }}
            >{`#${coin.market_cap_rank}`}</h6>
          </div>
          <div>
            <CustomBar
              high={`${currentSymbol}${coin.market_data.high_24h[currency]}`}
              low={`${currentSymbol}${coin.market_data.low_24h[currency]}`}
            />
          </div>
          <div className="mt-5">
            <Items title={"Max Supply:"} value={coin.market_data.max_supply} />
            <Items
              title={"Circulating Supply:"}
              value={coin.market_data.circulating_supply}
            />
            <Items
              title={"Market Cap:"}
              value={`${currentSymbol}${coin.market_data.market_cap[currency]}`}
            />
            <Items
              title={"All Time Low:"}
              value={`${currentSymbol}${coin.market_data.atl[currency]}`}
            />
            <Items
              title={"All Time High:"}
              value={`${currentSymbol}${coin.market_data.ath[currency]}`}
            />
          </div>
        </>
      )}
    </div>
  );
};

const CustomBar = ({ high, low }) => (
  <>
    <div className="progress">
      <div
        className="progress-bar"
        role="progressbar"
        style={{ width: "25%" }}
        aria-valuenow="25"
        aria-valuemin="0"
        aria-valuemax="100"
      ></div>
    </div>
    <div className="mt-2">
      <div
        className=""
        style={{
          display: "inline",
          backgroundColor: "#f6b4b4",
          padding: "0 5px 0 5px",
          borderRadius: "3px",
          color: "red",
        }}
      >
        {low}
      </div>
      <div
        className=""
        style={{
          display: "inline",
          float: "right",
          backgroundColor: "rgb(160 233 165)",
          padding: "0 5px 0 5px",
          borderRadius: "3px",
          color: "green",
        }}
      >
        {high}
      </div>
      <div className="d-flex justify-content-center">24H Range</div>
    </div>
  </>
);

const Items = ({ title, value }) => (
  <div className="row">
    <div className="col-6" style={{ fontFamily: "Roboto Slab, serif" }}>
      {title}
    </div>
    <div
      className="col-6"
      style={{ fontFamily: "Roboto Slab, serif", color: "#4ca2f9" }}
    >
      {value}
    </div>
  </div>
);

export default CoinDetails;
