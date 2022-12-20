import axios from "axios";
import React, { useEffect, useState } from "react";
import { server } from "..";
import Loader from "./Loader";
import { useParams } from "react-router-dom";
import Error from "./Error";
import Chart from "./Chart";

const CoinDetails = () => {
  const params = useParams();
  const [coin, setCoin] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currency, setCurrency] = useState("inr");
  const [days, setDays] = useState("24h");
  const [chartArray, setChartArray] = useState([]);

  const currentSymbol =
    currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

  const btns = ["24h", "7d", "14d", "30d", "60d", "90d", "365d", "Max"];

  const switchChartStats = (key) => {
    switch (key) {
      case "24h":
        setDays("24h");
        setLoading(true);
        break;
      case "7d":
        setDays("7d");
        setLoading(true);
        break;
      case "14d":
        setDays("14d");
        setLoading(true);
        break;
      case "30d":
        setDays("30d");
        setLoading(true);
        break;
      case "60d":
        setDays("60d");
        setLoading(true);
        break;
      case "90d":
        setDays("90d");
        setLoading(true);
        break;
      case "365d":
        setDays("365d");
        setLoading(true);
        break;
      case "Max":
        setDays("Max");
        setLoading(true);
        break;

      default:
        setDays("24h");
        setLoading(true);
        break;
    }
  };

  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const { data } = await axios.get(`${server}/coins/${params.id}`);
        console.log(data);

        const { data: chartData } = await axios.get(
          `${server}/coins/${params.id}/market_chart?vs_currency=${currency}&days=${days}`
        );
        console.log(chartData.prices);
        setCoin(data);
        setChartArray(chartData.prices);
        setLoading(false);
      } catch (error) {
        setError(true);
      }
    };
    fetchCoin();
  }, [params.id, currency, days]);

  if (error) return <Error msg={"Error while fetching coins"} />;

  return (
    <div className="container">
      {loading ? (
        <Loader />
      ) : (
        <div>
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
          <div>
            <Chart arr={chartArray} currency={currentSymbol} days={days} />
          </div>
          <div
            className="container d-flex justify-content-around"
            style={{ overflowX: "auto" }}
          >
            {btns.map((i) => (
              <button
                style={{ border: "1px solid gray" }}
                key={i}
                onClick={() => switchChartStats(i)}
                className="px-2 btn btn-light"
              >
                {i}
              </button>
            ))}
          </div>
          <div className="d-flex justify-content-center">
            <span>
              Last Updated On
              {Date(coin.market_data.last_updated)}
            </span>
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
        </div>
      )}
    </div>
  );
};

const CustomBar = ({ high, low }) => (
  <div>
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
  </div>
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
