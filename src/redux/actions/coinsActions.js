import axios from "axios"
export const COINS_LIST_UPDATE = "COINS_LIST_UPDATE"
export const TRENDING_COINS_LIST_UPDATE = "TRENDING_COINS_LIST_UPDATE"
export const SELECTED_COIN_UPDATE = "SELECTED_COIN_UPDATE"
export const SELECTED_COIN_HISTORY_UPDATE = "SELECTED_COIN_HISTORY_UPDATE"
export const UPDATE_CURRENCY = "UPDATE_CURRENCY"
export const SELECTED_COIN_RESET = "SELECTED_COIN_RESET"


export const updateAllCoinsList = (data) => {
    return {
        type: COINS_LIST_UPDATE,
        payload: data
    }
}

export const asyncGetAllCoinsData = (currency) => {
    return (dispatch) => {
        axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`)
            .then((response) => {
                const result = response.data
                dispatch(updateAllCoinsList(result))
            })
            .catch((err) => {
                console.log(err)
            })
    }
}

export const updateSelectedCoin = (data) => {
    return {
        type: SELECTED_COIN_UPDATE,
        payload: data
    }
}

export const resetSelectedCoin = () => {
    return {
        type: SELECTED_COIN_RESET,
    }
}

export const asyncGetSelectedCoinData = (coinId) => {
    return (dispatch) => {
        axios.get(`https://api.coingecko.com/api/v3/coins/${coinId}`)
            .then((response) => {
                const result = response.data
                dispatch(updateSelectedCoin(result))
            })
            .catch((err) => {
                console.log(err)
            })
    }
}

export const updateSelectedCoinsData = (data) => {
    return {
        type: SELECTED_COIN_HISTORY_UPDATE,
        payload: data
    }
}

export const asyncGetSelectedCoinHistory = (coinId, currency, days = 365) => {
    return (dispatch) => {
        axios.get(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency}&days=${days}`)
            .then((response) => {
                const result = response.data
                dispatch(updateSelectedCoinsData(result))
            })
            .catch((err) => {
                console.log(err)
            })
    }
}


export const updateTrendingCoinsList = (data) => {
    return {
        type: TRENDING_COINS_LIST_UPDATE,
        payload: data
    }
}

export const asyncGetTrendingCoinsData = (currency) => {
    return (dispatch) => {
        axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`)
            .then((response) => {
                const result = response.data
                dispatch(updateTrendingCoinsList(result))
            })
            .catch((err) => {
                console.log(err)
            })
    }
}

export const updateCurrency = (currency) => {

    if (currency === "inr") {
        return {
            type: UPDATE_CURRENCY,
            payload: {
                currencyType: "inr",
                symbol: "₹"
            }
        }
    } else if (currency === "usd") {
        return {
            type: UPDATE_CURRENCY,
            payload: {
                currencyType: "usd",
                symbol: "$"
            }
        }
    }
}





