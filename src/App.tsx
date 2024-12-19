import { Route, Routes, useLocation } from "react-router-dom";
import { TodoPage } from "./pages/TodoPage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import Header from "./components/Header";
import BotAddButton from "./components/BotAddButton";
import { MyInfoPage } from "./pages/MyInfoPage";

function App() {
  const location = useLocation();
  const showHeader = ["/", "/mypage"].includes(location.pathname);
  const showBottom = ["/"].includes(location.pathname);

  return (
    <div className="App overflow-y-hidden mx-auto my-0 bg-white max-w-full w-full min-h-screen shadow-none rounded-none md:h-[calc(100vh - 4rem)] md:my-4 md:relative md:max-w-[600px] md:min-h-[calc(100vh-2rem)] md:rounded-2xl md:shadow-2xl">
      {showHeader && <Header />}

      <Routes>
        <Route path="/" element={<TodoPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/mypage" element={<MyInfoPage />} />
      </Routes>

      {showBottom && <BotAddButton />}
    </div>
  );
}

export default App;
