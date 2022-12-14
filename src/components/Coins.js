import axios from "axios";
import React, { useEffect, useState } from "react";
import { server } from "../index";
import "../css/Coins.css";
import CoinsCard from "./CoinsCard";
import Error from "./Error";
import Loader from "./Loader";

const Coins = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [coins, setCoins] = useState([]);
  const [currency, setCurrency] = useState("inr");
  const [page, setPage] = useState(1);

  const currentSymbol =
    currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

  const btns = new Array(130).fill(1);

  const changePage = (page) => {
    setPage(page);
    setLoading(true);
  };

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const { data } = await axios.get(
          `${server}/coins/markets?vs_currency=${currency}&page=${page}`
        );
        setCoins(data);
        console.log(data);
        setLoading(false);
      } catch (error) {
        setError(true);
      }
    };
    fetchCoins();
  }, [currency, page]);

  if (error) return <Error msg={"Error while fetching coins"} />;

  return (
    <div>
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
          {coins.map((i) => (
            <CoinsCard
              id={i.id}
              name={i.name}
              price={i.current_price}
              img={i.image}
              symbol={i.symbol}
              coin_price={i.current_price}
              currentSymbol={currentSymbol}
            />
          ))}
          <div className="pagination">
            <footer>
              {btns.map((items, index) => (
                <button
                  className="pagination-btn"
                  onClick={() => changePage(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
            </footer>
          </div>
        </>
      )}
    </div>
  );
};

export default Coins;
