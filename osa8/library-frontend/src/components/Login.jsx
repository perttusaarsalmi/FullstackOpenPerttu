import { useApolloClient } from "@apollo/client/react";
import PropTypes from "prop-types";
import Notify from "./Notify";
import LoginForm from "./LoginForm";

const Login = ({ show, token, setToken, errorMessage, setError }) => {
  const client = useApolloClient();

  Login.propTypes = {
    show: PropTypes.bool.isRequired,
    token: PropTypes.string,
    setToken: PropTypes.func.isRequired,
    errorMessage: PropTypes.string,
    setError: PropTypes.func.isRequired,
  };

  if (!show) {
    return null;
  }

  const logout = () => {
    setToken(null);
    localStorage.removeItem("library-user-token");
    client.resetStore();
  };

  if (!token) {
    console.log("Login errorMessage:", errorMessage);

    return (
      <div>
        <h2>Login</h2>
        <LoginForm setToken={setToken} setError={setError} />
        <Notify errorMessage={errorMessage} />
      </div>
    );
  }

  return (
    <div>
      <p>Logged in</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Login;
