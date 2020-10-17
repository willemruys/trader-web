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
  useEffect(() => {
    getData();
  }, []);

  const getOrderData = async () => {
    const res = await axios.get(process.env.REACT_APP_API_ENDPOINT + "/order");

    let input = [];
    res.data.forEach((obj) => {
      input.push(obj);
    });
    setOrderData(input);

    return;
  };

  const handlePurchase = async () => {
    setHandlingPurchase(true);
    getData(); // update latest coin data
    const res = await axios.post(
      process.env.REACT_APP_API_ENDPOINT + "/order",
      {
        orderDate: Date.now(),
        priceRateUSD: coinData[0].rate,
        priceRateGBP: coinData[1].rate,
        priceRateEUR: coinData[2].rate,
      }
    );

    if (res.status === 201) {
      setHandlingPurchase(false);
      setPurchaseSuccess(true);
      getOrderData(); // update list
    } else {
      setPurchaseSuccess(false);
    }
  };

  useEffect(() => {
    const res = getOrderData();
    console.log(res);
  }, []);

  const handleSale = async (id) => {
    setHandlingSales(true);
    const res = await axios.delete(
      process.env.REACT_APP_API_ENDPOINT + `/order/${id}`
    );

    if (res.status === 200) {
      setHandlingSales(false);
      setSalesSuccess(true);
      getOrderData();
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
