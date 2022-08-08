import { LinearProgress, Typography, useMediaQuery } from '@mui/material';
import { useParams } from "react-router-dom";
import CoinInfo from "../CoinInfo";
import { numberFormatter } from "../Banner/Carousel"
import { useDispatch, useSelector } from "react-redux"
import { asyncGetSelectedCoinData, resetSelectedCoin } from "../../redux/actions/coinsActions";
import { useTheme } from '@mui/material/styles';
import { useEffect } from 'react';
import parse from 'html-react-parser';

const CoinDashboard = (props) => {
    const { id } = useParams();
    const dispatch = useDispatch()

    const currency = useSelector((state) => {
        return state.coinsDetails.currency
    })

    const coin = useSelector((state) => {
        return state.coinsDetails.selectedCoin.coinDetails
    })

    useEffect(() => {
        dispatch(asyncGetSelectedCoinData(id))
    }, []);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"))

    const styles = {
        container: {
            display: "flex",
            ...(isMobile && {
                flexDirection: "column",
                alignItems: "center",
            }),
        },
        sidebar: {
            width: "30%",
            ...(isMobile && {
                width: "100%",
                border: "none",
            }),
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            margin: 25,
            border: "1px solid grey",
            borderRadius: "12px",
            paddingTop: 15


        },
        heading: {
            fontWeight: "bold",
            fontFamily: "Montserrat",
        },
        description: {
            width: "100%",
            fontFamily: "Montserrat",
            padding: 3,
            paddingBottom: 1,
            textAlign: "justify",
        },
        marketData: {
            alignSelf: "start",
            padding: 25,
            paddingTop: 10,
            width: "100%",
            ...(isMobile && {
                display: "flex",
                justifyContent: "space-around",
            }),
            ...(isMobile && {
                flexDirection: "column",
                alignItems: "center",
            }),
            ...(isMobile && {
                alignItems: "start",
            }),
        },
    }
    useEffect(() => {
        return () => {
            console.log("here")
            dispatch(resetSelectedCoin())
        }
    }, [])


    if (Object.keys(coin).length === 0) return <LinearProgress style={{ backgroundColor: "darkgray" }} />;

    return (
        <div style={styles.container}>
            <div style={styles.sidebar}>
                <img
                    src={coin?.image.large}
                    alt={coin?.name}
                    height="200"
                    style={{ marginBottom: 20 }}
                />
                <Typography variant="h4" sx={styles.heading}>
                    {coin?.name}
                </Typography>

                <Typography variant="subtitle1" sx={styles.description}>
                    {parse(coin?.description.en.split(". ")[0])}{"."}
                </Typography>
                <div style={styles.marketData}>
                    <span style={{ display: "flex" }}>
                        <Typography variant="h6" sx={styles.heading}>
                            Rank:
                        </Typography>
                        &nbsp; &nbsp;
                        <Typography
                            variant="h6"
                            sx={{
                                fontFamily: "Montserrat",
                            }}
                        >
                            {numberFormatter(coin?.market_cap_rank)}
                        </Typography>
                    </span>

                    <span style={{ display: "flex" }}>
                        <Typography variant="h6" sx={styles.heading}>
                            Current Price:
                        </Typography>
                        &nbsp; &nbsp;
                        <Typography
                            variant="h6"
                            sx={{
                                fontFamily: "Montserrat",
                            }}
                        >
                            {currency.symbol}{" "}
                            {numberFormatter(
                                coin?.market_data.current_price[currency.currencyType.toLowerCase()]
                            )}
                        </Typography>
                    </span>
                    <span style={{ display: "flex" }}>
                        <Typography variant="h6" sx={styles.heading}>
                            Market Cap:
                        </Typography>
                        &nbsp; &nbsp;
                        <Typography
                            variant="h6"
                            sx={{
                                fontFamily: "Montserrat",
                            }}
                        >
                            {currency.symbol}{" "}
                            {numberFormatter(
                                coin?.market_data.market_cap[currency.currencyType.toLowerCase()]
                                    .toString()
                                    .slice(0, -6)
                            )}
                            M
                        </Typography>

                    </span>

                </div>
            </div>
            <CoinInfo coin={coin} />
        </div>
    );
};

export default CoinDashboard;