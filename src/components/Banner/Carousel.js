import AliceCarousel from "react-alice-carousel";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export const numberFormatter = (value) => {
    //formatting number with commas
    return value?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const Carousel = (props) => {

    const trendingList = useSelector((state) => {
        return state.coinsDetails.trendingCoins
    })
    const currency = useSelector((state) => {
        return state.coinsDetails.currency
    })

    const styles = {
        carousel: {
            height: "50%",
            display: "flex",
            alignItems: "center",
        },
        carouselItem: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            cursor: "pointer",
            textTransform: "uppercase",
            color: "white",
        },
    }

    const items = trendingList.coins.map((coin) => {
        let profit = coin?.price_change_percentage_24h >= 0;

        return (
            <Link style={styles.carouselItem} to={`/coins/${coin.id}`}>
                <img
                    src={coin?.image}
                    alt={coin.name}
                    height="80"
                    style={{ marginBottom: 10 }}
                />
                <span>
                    {coin?.symbol}
                    &nbsp;
                    <span
                        style={{
                            color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                            fontWeight: 500,
                        }}
                    >
                        {profit && "+"}
                        {coin?.price_change_percentage_24h?.toFixed(2)}%
                    </span>
                </span>
                <span style={{ fontSize: 22, fontWeight: 500 }}>
                    {currency.symbol} {numberFormatter(coin?.current_price.toFixed(2))}
                </span>
            </Link>
        );
    });

    // items to display per view
    const responsive = {
        0: {
            items: 2,
        },
        512: {
            items: 4,
        },
    };

    return (
        <div style={styles.carousel}>
            <AliceCarousel
                mouseTracking
                infinite
                autoPlayInterval={1000}
                animationDuration={1500}
                disableDotsControls
                disableButtonsControls
                responsive={responsive}
                items={items}
                autoPlay
            />
        </div>
    );
};

export default Carousel;