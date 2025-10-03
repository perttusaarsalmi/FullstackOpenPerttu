import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client/react";
import { LOGIN } from "../queries";

const LoginForm = ({ setError, setToken }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      setError("Login failed");
    },
  });

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      setToken(token);
      localStorage.setItem("library-user-token", token);
      setError(null); // Clear error on successful login
    }
  }, [result.data, setToken, setError]);

  const submit = async (event) => {
    event.preventDefault();
    login({ variables: { username, password } });
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    setError(null); // Clear error directly
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setError(null); // Clear error directly
  };

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          username <input value={username} onChange={handleUsernameChange} />
        </div>
        <div>
          password{" "}
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default LoginForm;
