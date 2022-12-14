import React, { useEffect, useState } from "react";
import axios from "axios";
import { server } from "../index";
import Loader from "./Loader";
import ExchangeCard from "./ExchangeCard";
import Error from "./Error";


const Exchange = () => {
  const [exchanges, setExchanges] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchExchanges = async () => {
      try {
        const { data } = await axios.get(`${server}/exchanges`);

        console.log(data);
        setLoading(false);
        setExchanges(data);


      } catch (error) {
        setError(true);
      }
    };
    fetchExchanges();
  }, []);

  if(error){
    return (<Error msg={"Error while fetching Exchanges"} />)
  }

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div>
          {exchanges.map((i) => (
            <ExchangeCard
              key={i.id}
              name={i.name}
              img={i.image}
              rank={i.trust_score_rank}
              url={i.url}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Exchange;
