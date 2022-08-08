import React, { useEffect, useState } from "react";
import Pagination from '@mui/material/Pagination';
import {
    Container,
    TableCell,
    LinearProgress,
    Typography,
    TextField,
    TableBody,
    TableRow,
    TableHead,
    TableContainer,
    Table,
    Paper,
} from '@mui/material';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { asyncGetAllCoinsData } from "../redux/actions/coinsActions";
import { numberFormatter } from "./Banner/Carousel";


const CoinsTable = (props) => {
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);


    const styles = {
        row: {
            // backgroundColor: "#16171a",
            cursor: "pointer",
            "&:hover": {
                backgroundColor: "#131111",
            },
            fontFamily: "Montserrat",
        },
        pagination: {
            "& .MuiPaginationItem-root": {
                color: "primary.dark",
            },
        }
    }

    const coinsData = useSelector((state) => {
        return state.coinsDetails.coinsList
    })

    const currency = useSelector((state) => {
        return state.coinsDetails.currency
    })


    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(asyncGetAllCoinsData(currency.currencyType))
    }, [currency, dispatch]);
    const navigate = useNavigate();






    const handleSearch = () => {
        return coinsData.coins.filter(
            (coin) =>
                coin.name.toLowerCase().includes(search) ||
                coin.symbol.toLowerCase().includes(search)
        );
    };

    return (
        <Container style={{ textAlign: "center" }}>
            <Typography
                variant="h4"
                sx={{ mt: 4, mb: 2, fontFamily: "Montserrat" }}
            >
                Crypto Currency Prices by Market Cap
            </Typography>
            <TextField
                label="Search Crypto Currency"
                variant="outlined"
                style={{ marginBottom: 20, width: "100%" }}
                onChange={(e) => setSearch(e.target.value)}
            />
            <TableContainer component={Paper}>
                {coinsData.isLoading ? (
                    <LinearProgress sx={{ backgroundColor: "primary.main" }} />
                ) : (
                    <Table aria-label="simple table">
                        <TableHead sx={{ backgroundColor: "primary.main", color: "white" }}>
                            <TableRow>
                                {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                                    <TableCell
                                        style={{
                                            color: "white",
                                            fontWeight: "700",
                                            fontFamily: "Montserrat",
                                        }}
                                        key={head}
                                        align={head === "Coin" ? "inherit" : "right"}
                                    >
                                        {head}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {handleSearch()
                                .slice((page - 1) * 10, (page - 1) * 10 + 10)
                                .map((row) => {
                                    const profit = row.price_change_percentage_24h > 0;
                                    return (
                                        <TableRow
                                            onClick={() => navigate(`/coins/${row.id}`)}
                                            style={styles.row}
                                            key={row.name}
                                        >
                                            <TableCell
                                                component="th"
                                                scope="row"
                                                style={{
                                                    display: "flex",
                                                    gap: 15,
                                                }}
                                            >
                                                <img
                                                    src={row?.image}
                                                    alt={row.name}
                                                    height="50"
                                                    style={{ marginBottom: 10 }}
                                                />
                                                <div
                                                    style={{ display: "flex", flexDirection: "column" }}
                                                >
                                                    <span
                                                        style={{
                                                            textTransform: "uppercase",
                                                            fontSize: 22,
                                                        }}
                                                    >
                                                        {row.symbol}
                                                    </span>
                                                    <span style={{ color: "darkgrey" }}>
                                                        {row.name}
                                                    </span>
                                                </div>
                                            </TableCell>
                                            <TableCell align="right">
                                                {currency.symbol}{" "}
                                                {numberFormatter(row.current_price.toFixed(2))}
                                            </TableCell>
                                            <TableCell
                                                align="right"
                                                style={{
                                                    color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                                                    fontWeight: 500,
                                                }}
                                            >
                                                {profit && "+"}
                                                {row.price_change_percentage_24h.toFixed(2)}%
                                            </TableCell>
                                            <TableCell align="right">
                                                {currency.symbol}{" "}
                                                {numberFormatter(
                                                    row.market_cap.toString().slice(0, -6)
                                                )}
                                                M
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                )}
            </TableContainer>

            {/* Comes from @material-ui/lab */}
            <Pagination
                count={Number((handleSearch()?.length / 10).toFixed(0))}
                style={{
                    padding: 20,
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                }}
                sx={{ ul: styles.pagination }}
                onChange={(_, value) => {
                    setPage(value);
                    window.scroll(0, 450);
                }}
            />
        </Container>
    )
}

export default CoinsTable