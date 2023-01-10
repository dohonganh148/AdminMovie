import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "page/Login";
import Signup from "page/Signup";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchProfileAction } from "redux/actions/authenAction";
import LayoutAdmin from "components/Layout";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProfileAction());
  }, [dispatch]);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<LayoutAdmin />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
