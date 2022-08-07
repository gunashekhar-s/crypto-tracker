import { cloneDeep } from "lodash"
const initialValue = {
    isLoading: true,
    error: {
        message: ""
    },
    coins: []
}

const coinsReducer = (state = initialValue, action) => {
    switch (action.type) {


        default: {
            return cloneDeep(state)
        }

    }
}
export default coinsReducer