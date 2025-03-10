import { Route, Routes } from "react-router-dom";
// import TodoPage from "./pages/TodoPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import GlobalStyle from "./GlobalStyle";
import Layout from "./layout/Layout";

function App() {
  return (
    <>
      <GlobalStyle />
      <Layout>
        <Routes>
          {/* <Route path="/" element={<TodoPage />} /> */}
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
