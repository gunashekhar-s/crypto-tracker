import { Container, Typography } from '@mui/material';
import Carousel from "./Carousel";

const styles = {
    banner: {
        backgroundImage: "url(./b5.jpg)",
    },
    bannerContent: {
        height: 400,
        display: "flex",
        flexDirection: "column",
        paddingTop: 5,
        justifyContent: "space-around",
    },
    tagline: {
        display: "flex",
        height: "40%",
        flexDirection: "column",
        justifyContent: "center",
        textAlign: "center",
    },
    carousel: {
        height: "50%",
        display: "flex",
        alignItems: "center",
    },
}

const Banner = (props) => {

    return (
        <div style={styles.banner}>
            <Container maxWidth="md" sx={styles.bannerContent}>
                <div tyle={styles.tagline}>
                    <Typography
                        variant="h2"
                        style={{
                            color: "white",
                            fontWeight: "bold",
                            marginBottom: 15,
                            fontFamily: "Montserrat",
                        }}
                    >
                        Crypto Dashboard
                    </Typography>
                    <Typography
                        variant="subtitle2"
                        style={{
                            color: "darkgrey",
                            textTransform: "capitalize",
                            fontFamily: "Montserrat",
                        }}
                    >
                        Most Trusted Crypto Currency Tracker
                    </Typography>
                </div>
                <Carousel />
            </Container>
        </div>
    )
}

export default Banner
