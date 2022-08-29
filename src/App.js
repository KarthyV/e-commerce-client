import "./styles/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import AddProduct from "./pages/AddProduct";
import ProductPage from "./pages/ProductPage";
import AllProductPage from "./pages/AllProductPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cart from "./pages/Cart";
import MyOrders from "./pages/MyOrders";
import AdminDashboard from "./pages/AdminDashBoard";
import EditProduct from "./pages/EditProduct";
import { useEffect } from "react";
import { io } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { addNotification } from "./redux/actions/userAction";
import ViewOrder from "./pages/ViewOrder";
import NotFound from "./pages/404/NotFound";

function App() {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    const socket = io("ws://e-app-server.herokuapp.com");
    socket.off("notification").on("notification", (msgObj, user_id) => {
      if (user_id === user._id) {
        dispatch(addNotification(msgObj));
      }
    });

    socket.off("new-order").on("new-order", (msgObj) => {
      if (user.isAdmin) {
        dispatch(addNotification(msgObj));
      }
    });
    // eslint-disable-next-line
  }, [dispatch]);
  return (
    <div className="App">
      <BrowserRouter>
        <Navigation />
        <ToastContainer />
        <Routes>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/products/:category" element={<AllProductPage />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate replace to="/404" />} />
          {!user?.isAdmin && (
            <>
              <Route path="/cart" element={<Cart />} />
              <Route path="/orders/:id" element={<MyOrders />} />
            </>
          )}
          {user?.isAdmin && (
            <>
              <Route path="/add-product" element={<AddProduct />} />
              <Route path="/product/edit/:id" element={<EditProduct />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/viewOrder/:id" element={<ViewOrder />} />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
