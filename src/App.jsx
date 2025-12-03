import { Toaster } from "react-hot-toast";
import { Link, Route, Routes, useNavigate, Navigate } from "react-router-dom";
import Add from "./pages/Add";
import Edit from "./pages/Edit";
import List from "./pages/List";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { useEffect, useState } from "react";

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUser({ email: "user@example.com" });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  const token = localStorage.getItem("token");

  return (
    <>
      <nav className="bg-blue-600 text-white shadow">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="text-xl font-semibold">
            <strong>WEB501 App</strong>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="hover:text-gray-200">
              Trang chủ
            </Link>
            <Link to="/tours" className="hover:text-gray-200">
              Danh sách
            </Link>
            <Link to="/tours/add" className="hover:text-gray-200">
              Thêm mới
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            {user ? (
              <>
                <span className="hover:text-gray-200">{user.email}</span>
                <button onClick={handleLogout} className="hover:text-gray-200">
                  Đăng xuất
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-gray-200">
                  Đăng nhập
                </Link>
                <Link to="/register" className="hover:text-gray-200">
                  Đăng ký
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto mt-10 px-4">
        <Routes>
          <Route
            path="/"
            element={
              <div className="text-center">
                <h1 className="text-4xl font-bold mb-4">
                  Chào mừng đến với WEB501
                </h1>
                <p className="text-lg text-gray-600">
                  Ứng dụng quản lý dữ liệu
                </p>
              </div>
            }
          />
          <Route
            path="/tours"
            element={token ? <List /> : <Navigate to="/login" />}
          />
          <Route
            path="/tours/add"
            element={token ? <Add /> : <Navigate to="/login" />}
          />
          <Route
            path="/tours/:id/edit"
            element={token ? <Edit /> : <Navigate to="/login" />}
          />
          <Route path="/login" element={<LoginPage setUser={setUser} />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </div>

      <Toaster />
    </>
  );
}

export default App;
