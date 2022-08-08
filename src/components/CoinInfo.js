import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { CircularProgress, useMediaQuery } from "@mui/material";
import SelectButton from "./SelectButton";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'

import { useDispatch, useSelector } from "react-redux";
import { asyncGetSelectedCoinHistory } from "../redux/actions/coinsActions";
import { useTheme } from "@emotion/react";
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)

const CoinInfo = ({ coin }) => {
    const [days, setDays] = useState(1)

    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down("md"))

    const styles = {
        container: {
            width: "75%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 25,
            padding: 40,
            ...(isMobile && {
                width: "100%",
                marginTop: 0,
                padding: 20,
                paddingTop: 0,
            }),
        },
    }

    const chartDays = [
        {
            label: "24 Hours",
            value: 1,
        },
        {
            label: "30 Days",
            value: 30,
        },
        {
            label: "3 Months",
            value: 90,
        },
        {
            label: "1 Year",
            value: 365,
        },
    ]

    const historicData = useSelector((state) => {
        return state.coinsDetails.selectedCoin.history
    })
    console.log("historicData", historicData)
    const currency = useSelector((state) => {
        return state.coinsDetails.currency
    })
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(asyncGetSelectedCoinHistory(coin.id, currency.currencyType, days))
    }, [coin.id, currency.currencyType, days])



    return (
        <div style={styles.container}>
            {historicData.isLoading ? (
                <CircularProgress
                    sx={{ color: "primary.main" }}
                    size={250}
                    thickness={1}
                />
            ) : (
                <>
                    <Line
                        data={{
                            labels: historicData.data.prices.map((coin) => {
                                let date = new Date(coin[0])
                                let time =
                                    date.getHours() > 12
                                        ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                                        : `${date.getHours()}:${date.getMinutes()} AM`
                                return days === 1 ? time : date.toLocaleDateString()
                            }),

                            datasets: [
                                {
                                    data: historicData.data.prices.map((coin) => coin[1]),
                                    label: `Price ( Past ${days} Days ) in ${currency?.currencyType?.toUpperCase()}`,
                                    borderColor: "#1976D2",
                                },
                            ],
                        }}
                        options={{
                            elements: {
                                point: {
                                    radius: 1,
                                },
                            },
                        }}
                    />
                    <div
                        style={{
                            display: "flex",
                            marginTop: 20,
                            justifyContent: "space-around",
                            width: "100%",
                        }}
                    >
                        {chartDays.map((day) => (
                            <SelectButton
                                key={day.value}
                                onClick={() => {
                                    setDays(day.value)
                                }}
                                selected={day.value === days}
                            >
                                {day.label}
                            </SelectButton>
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}

export default CoinInfo