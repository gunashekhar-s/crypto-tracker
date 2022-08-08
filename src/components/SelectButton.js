
const SelectButton = ({ children, selected, onClick }) => {
    const styles = {
        selectbutton: {
            border: "1px solid #1976D2",
            borderRadius: 5,
            padding: 10,
            paddingLeft: 20,
            paddingRight: 20,
            fontFamily: "Montserrat",
            cursor: "pointer",
            backgroundColor: selected ? "#1976D2" : "",
            color: selected ? "white" : "",
            fontWeight: selected ? 700 : 500,
            "&:hover": {
                backgroundColor: "#1976D2",
                color: "white",
            },
            width: "22%",
        }
    }
    return (
        <span onClick={onClick} style={styles.selectbutton}>
            {children}
        </span>
    )
}

export default SelectButton