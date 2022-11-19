import axios from "axios";
import React, { useEffect, useState } from "react";
import { server } from "../index";
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

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const { data } = await axios.get(
          `${server}/coins/markets?vs_currency=${currency}&page=${page}`
        );
        setCoins(data)
        console.log(data);
        setLoading(false);
      } catch (error) {
        setError(true);
      }
    };
    fetchCoins();
  }, [currency]);

  if (error) return <Error msg={"Error while fetching coins"} />;

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <>
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
        </>
      )}
    </div>
  );
};

export default Coins;