import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
        
      </Routes>
    </BrowserRouter>
  );
};

export default App;
