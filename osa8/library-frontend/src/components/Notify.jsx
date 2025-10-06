import PropTypes from "prop-types";

const Notify = ({ errorMessage }) => {
  Notify.propTypes = {
    errorMessage: PropTypes.string,
  };

  if (!errorMessage) {
    return null;
  }
  return <div style={{ color: "red" }}>{errorMessage}</div>;
};

export default Notify;
