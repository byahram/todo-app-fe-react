import { Route, Routes } from "react-router-dom";
import TodoPage from "./pages/TodoPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import GlobalStyle from "./GlobalStyle";
import Layout from "./layout/Layout";
import { useCallback, useEffect } from "react";
import api from "./utils/api";
import PrivateRoute from "./route/PrivateRoute";
import { useTodoStore } from "./utils/zustand";

function App() {
  const setCurrentUser = useTodoStore((state) => state.setCurrentUser);

  const getUser = useCallback(async () => {
    try {
      const token = sessionStorage.getItem("token");
      if (token) {
        const response = await api.get("/users/getUser");
        setCurrentUser(response.data.user);
      }
    } catch (error) {
      console.error("Error occurred while fetching user: ", error);
      setCurrentUser(null);
    }
  }, [setCurrentUser]);

  useEffect(() => {
    getUser();
  }, [getUser]);

  return (
    <>
      <GlobalStyle />
      <Layout>
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <TodoPage />
              </PrivateRoute>
            }
          />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
