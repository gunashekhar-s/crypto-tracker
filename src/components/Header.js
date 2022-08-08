
import { AppBar, Container, FormControl, MenuItem, Select, Toolbar, Typography } from '@mui/material';
import { useDispatch, useSelector } from "react-redux"
import React from 'react';
import { useNavigate } from "react-router-dom"
import { updateCurrency } from '../redux/actions/coinsActions';



const styles = {
    select: {
        width: "100px",
        height: "40px",
        marginLeft: "15px"
    },
    title: {
        flex: 1,
        color: "primary.main",
        fontFamily: "Montserrat",
        fontWeight: "bold",
        cursor: "pointer"
    }
}


const Header = (props) => {

    const dispatch = useDispatch()
    const currency = useSelector((state) => {
        return state.coinsDetails.currency.currencyType
    })
    const handleChange = (e) => {
        dispatch(updateCurrency(e.target.value))
    }
    const navigate = useNavigate()
    return (

        <AppBar color='transparent' position='static'>
            <Container maxWidth="md">
                <Toolbar>
                    <Typography variant='h5' sx={styles.title} onClick={() => navigate("/")}>Crypto Dashboard</Typography>
                    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                        <Select
                            id="select-small"
                            label="Currency"
                            value={currency}
                            onChange={handleChange}
                            sx={styles.select}
                        >
                            <MenuItem value={"inr"}>INR</MenuItem>
                            <MenuItem value={"usd"}>USD</MenuItem>
                        </Select>
                    </FormControl>
                </Toolbar>
            </Container>
        </AppBar>

    );
}

export default Header