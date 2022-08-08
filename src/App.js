
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from "./components/Header"
import CoinDashboard from './components/Pages/CoinDashboard';
import HomePage from './components/Pages/HomePage';
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { useDispatch, useSelector } from 'react-redux';
import { asyncGetAllCoinsData, asyncGetTrendingCoinsData } from './redux/actions/coinsActions';
import { useEffect } from 'react';


function App() {
  const theme = createTheme({
    palette: {
      type: 'light',
      // primary: {
      // main: '#66FCF1',
      //   main: '#FCA311',
      // },
      // secondary: {
      //   main: '#45A29E',
      // },

    }
  })

  const currency = useSelector((state) => {
    return state.coinsDetails.currency
  })

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(asyncGetTrendingCoinsData(currency.currencyType))
    dispatch(asyncGetAllCoinsData(currency.currencyType))
  }, [currency, dispatch]);





  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Header />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/coins/:id' element={<CoinDashboard />} />
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
