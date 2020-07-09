import React, {useState, useEffect} from 'react';
import {baseUrl} from './config/api';
import {
  StatusBar,
  ScrollView,
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import Header from './components/Header';
import Styles from './components/Styles';
import Sellers from './components/Sellers';
import SearchBar from './components/SearchBar';
const App = () => {
  const [sellers, setSellers] = useState([]);
  const [filteredSellers, setFilleredSellers] = useState([]);
  const searchHandler = (key) => {
    if (key !== '') {
      let filteredSellers = sellers.filter((seller) => {
        if (seller.name.indexOf(key) > -1) return seller;
      });
      setFilleredSellers(filteredSellers);
    } else {
      setFilleredSellers(sellers);
    }
  };
  const fetchSellers = async () => {
    try {
      let url = baseUrl + '/sellers/';
      console.log(url);
      const data = await fetch(url);
      const sellers = await data.json();
      setSellers(sellers);
      setFilleredSellers(sellers);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchSellers();
  }, []);

  return (
    <>
      <StatusBar />
      <Header title="Tazweed" />
      <SearchBar searchHandler={searchHandler} />
      <Sellers sellers={filteredSellers} />
    </>
  );
};

export default App;
