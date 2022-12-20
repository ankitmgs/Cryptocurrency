import { motion } from "framer-motion";
import React from "react";

const Home = () => {
  return (
    <div style={{ backgroundColor: "black" }}>
      <div className="container">
        <motion.div
          className="d-flex justify-content-center m-0"
          animate={{ translateY: "20px" }}
          style={{}}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          <img
            style={{ width: "60%", filter: "grayscale(100%)" }}
            src="https://www.freepnglogos.com/uploads/bitcoin-png/bitcoinpaygate-bitcoin-payment-gateway-payment-processor-7.png"
          />
        </motion.div>
        <div className="d-flex justify-content-center pb-5 cryp-text">
          <p style={{ color: "white", fontSize: "5vw" }}>Crypocurrency</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
