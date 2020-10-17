import React, { useState, useEffect, useCallback } from "react";
import BuySell from "./components/molecules/BuySell";
import Exchange from "./components/organisms/Exchange";
import Header from "./components/organisms/Header";
import OrderBook from "./components/organisms/OrderBook";
import Alert from "@material-ui/lab/Alert";

import axios from "axios";
function App() {
  const [coinData, setCoinData] = useState([]);
  const [handlingPurchase, setHandlingPurchase] = useState(false);
  const [handlingSales, setHandlingSales] = useState(false);
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);
  const [salesSuccess, setSalesSuccess] = useState(false);
  const [salesError, setSalesError] = useState(false);
  const [purchaseError, setPurchaseError] = useState(false);
  const [purchaseData, setPurchaseData] = useState([]);
  const [retrieveOrderDataError, setRetrieveOrderDataError] = useState(false);
  const [orderData, setOrderData] = useState([]);
  // retrieve bitcoin data
  useEffect(() => {
    const getData = async () => {
      const res = await axios.get(
        "https://api.coindesk.com/v1/bpi/currentprice.json",
        {
          headers: {
            "Content-type": "application/json",
          },
        }
      );

      const keys = Object.keys(res.data.bpi);
      let input = [];
      keys.forEach((key) => {
        input.push(res.data.bpi[key]);
      });
      setCoinData(input);
    };

    getData();
  }, []);

  const handlePurchase = async () => {
    setHandlingPurchase(true);

    const res = await axios.post("http://localhost:3000/order", {
      orderDate: Date.now(),
      priceRateUSD: coinData[0].rate,
      priceRateGBP: coinData[1].rate,
      priceRateEUR: coinData[2].rate,
    });

    if (res.status === 201) {
      setHandlingPurchase(false);
      setPurchaseSuccess(true);
    } else {
      setPurchaseSuccess(false);
    }
  };

  useEffect(() => {
    const getOrderData = async () => {
      const res = await axios.get("http://localhost:3000/order");

      let input = [];
      res.data.forEach((obj) => {
        input.push(obj);
      });
      setOrderData(input);
    };
    getOrderData();
  }, []);

  const handleSale = async (id) => {
    setHandlingSales(true);
    const res = await axios.delete(`http://localhost:3000/order/${id}`);

    if (res.status === 200) {
      setHandlingSales(false);
      setSalesSuccess(true);
    } else {
      setSalesError(false);
    }
  };

  return (
    <>
      <Header />
      {purchaseError && (
        <Alert severity="error">Error with your purchase</Alert>
      )}
      {salesError && <Alert severity="error">Error with your sales</Alert>}
      {salesSuccess && (
        <Alert severity="success">You have sold successfully</Alert>
      )}
      {purchaseSuccess && (
        <Alert severity="success">You have purchased successfully</Alert>
      )}
      <Exchange coinData={coinData} />
      <BuySell handlePurchase={handlePurchase} />
      <OrderBook orderData={orderData} handleSale={handleSale} />
    </>
  );
}

export default App;
