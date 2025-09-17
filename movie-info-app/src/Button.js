import PropTypes from "prop-types";
import styles from "./Button.module.css"

const Button = ({text}) => {
    return <button
    className={styles.btn}
    >{text}</button>
}
export default Button;

Button.propTypes = {
    text: PropTypes.string.isRequired,
}