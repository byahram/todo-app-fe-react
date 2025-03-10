import { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import api from "../utils/api";
import LoadingSpinner from "../components/LoadingSpinner";
import { useTodoStore } from "../utils/zustand";

export default function LoginPage() {
  const navigate = useNavigate();
  const setCurrentUser = useTodoStore((state) => state.setCurrentUser);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await api.post("/users/login", { email, password });
      if (response.status === 200) {
        setCurrentUser(response.data.user);
        sessionStorage.setItem("token", response.data.token);
        api.defaults.headers["authorization"] = `Bearer ${response.data.token}`;

        setError("");
        navigate("/");
      }
      setError(response?.data?.message);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "An unexpected error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginPageContainer>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <LoginForm onSubmit={handleLogin}>
          <h1>Login</h1>
          <p>Welcome, let’s get started!</p>

          <FormGroup>
            <label>Email address</label>
            <input
              type="email"
              value={email}
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <label>Password</label>
            <input
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormGroup>

          {error && <ErrorMessage>{error}</ErrorMessage>}

          <LoginButton type="submit">Login</LoginButton>

          <RegisterTxt>
            Don't have an account? <Link to="/register">Sign up</Link>
          </RegisterTxt>
        </LoginForm>
      )}
    </LoginPageContainer>
  );
}

const LoginPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const LoginForm = styled.form`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  width: 100%;
  max-width: 500px;

  h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    font-weight: 600;
  }

  p {
    font-size: 1.1rem;
  }
`;

const FormGroup = styled.div`
  width: 100%;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;

  &:first-of-type {
    margin-top: 2rem;
  }

  label {
    margin-bottom: 5px;
    font-weight: bold;
    color: #69665c;
  }

  input {
    width: auto;
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 1rem;
  }

  input:focus {
    border-color: #3e3c36;
    outline: none;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;

const LoginButton = styled.button`
  width: 50%;
  padding: 12px;
  background-color: #9aa6b2;
  margin-top: 1rem;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #707881;
  }
`;

const RegisterTxt = styled.span`
  margin-top: 1rem;

  a {
    color: #9d3773;
    text-decoration: underline;
    text-underline-offset: 4px;
  }
`;
