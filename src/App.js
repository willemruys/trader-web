import React, { useState, useEffect, useCallback } from "react";
import BuySell from "./components/molecules/BuySell";
import Exchange from "./components/organisms/Exchange";
import Header from "./components/organisms/Header";
import OrderBook from "./components/organisms/OrderBook";
import Alert from "@material-ui/lab/Alert";

import axios from "axios";
import AlertComponent from "./components/molecules/Alert";
function App() {
  const [coinData, setCoinData] = useState([]);
  const [handlingPurchase, setHandlingPurchase] = useState(false);
  const [handlingSales, setHandlingSales] = useState(false);
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);
  const [salesSuccess, setSalesSuccess] = useState(false);
  const [salesError, setSalesError] = useState(false);
  const [purchaseError, setPurchaseError] = useState(false);
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

  const snooze = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });
  };

  const handlePurchase = async () => {
    setHandlingPurchase(true);
    getData(); // update latest coin data
    const res = await axios.post(
      process.env.REACT_APP_API_ENDPOINT + "/order",
      {
        orderDate: new Date(Date.now()),
        priceRateUSD: coinData[0].rate,
        priceRateGBP: coinData[1].rate,
        priceRateEUR: coinData[2].rate,
      }
    );

    if (res.status === 201) {
      setHandlingPurchase(false);
      setPurchaseSuccess(true);
      getOrderData(); // update list
      await snooze();
      setPurchaseSuccess(false); // set to false again so it can be re-opened
    } else {
      setPurchaseError(true);
      await snooze();
      setPurchaseError(false); // set to false again so it can be re-opened
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
      await snooze();
      setSalesSuccess(false); // set to false again so it can be re-opened
    } else {
      setSalesError(true);
      await snooze();
      setSalesError(false); // set to false again so it can be re-opened
    }
  };

  return (
    <>
      <Header />
      {purchaseError && (
        <AlertComponent severity="error" message="Error with your purchase" />
      )}
      {salesError && (
        <AlertComponent severity="error" message="Error with your sales" />
      )}
      {salesSuccess && (
        <AlertComponent
          severity="success"
          message="You have sold successfully"
        />
      )}
      {purchaseSuccess && (
        <AlertComponent
          severity="success"
          message="You have purchased successfully"
        />
      )}
      <Exchange coinData={coinData} />
      <BuySell handlePurchase={handlePurchase} />
      <OrderBook orderData={orderData} handleSale={handleSale} />
    </>
  );
}

export default App;
