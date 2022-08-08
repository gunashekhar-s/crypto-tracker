import { COINS_LIST_UPDATE, SELECTED_COIN_HISTORY_UPDATE, SELECTED_COIN_RESET, SELECTED_COIN_UPDATE, TRENDING_COINS_LIST_UPDATE, UPDATE_CURRENCY } from "../actions/coinsActions"
const initialValue = {

    coinsList: {
        isLoading: true,
        error: {
            message: ""
        },
        coins: []
    },
    selectedCoin: {
        isLoading: true,
        error: {
            message: ""
        },
        coinDetails: {},
        history: {
            isLoading: true,
            error: {},
            data: {}
        }
    },
    trendingCoins: {
        isLoading: true,
        error: {
            message: ""
        },
        coins: []
    },
    currency: {
        currencyType: "inr",
        symbol: "₹"
    }
}

const coinsReducer = (state = initialValue, action) => {
    switch (action.type) {

        case COINS_LIST_UPDATE: {
            return { ...state, coinsList: { isLoading: false, error: { message: "" }, coins: action.payload } }
        }

        case SELECTED_COIN_UPDATE: {
            return { ...state, selectedCoin: { ...state.selectedCoin, isLoading: false, error: { message: "" }, coinDetails: action.payload } }
        }

        case SELECTED_COIN_HISTORY_UPDATE: {
            return { ...state, selectedCoin: { ...state.selectedCoin, history: { isLoading: false, data: action.payload } } }
        }

        case TRENDING_COINS_LIST_UPDATE: {
            return { ...state, trendingCoins: { isLoading: false, error: { message: "" }, coins: action.payload } }
        }
        case UPDATE_CURRENCY: {
            return { ...state, currency: action.payload }
        }
        case SELECTED_COIN_RESET: {

            return {
                ...state, selectedCoin: {
                    ...state.selectedCoin, isLoading: true, coinDetails: {}, history: { isLoading: true, error: {}, data: {} }
                }
            }
        }
        default: {
            return { ...state }
        }

    }
}
export default coinsReducer