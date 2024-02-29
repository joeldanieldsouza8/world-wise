import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Homepage from "./pages/Homepage";
import Pricing from "./pages/Pricing";
import PageNotFound from "./pages/PageNotFound";
import Product from "./pages/Product";
import AppLayout from "./pages/AppLayout";
import Login from "./pages/Login";
import CityList from "./components/list/CityList/CityList";
import CountryList from "./components/list/CountryList/CountryList";
import City from "./components/list/City/City";
import Form from "./components/Form/Form";
import useAuth from "./hooks/useAuth";

function App() {
  const { authState } = useAuth();
  const { isAuthenticated } = authState;

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Homepage />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="product" element={<Product />} />
        <Route path="login" element={<Login />} />
        <Route
          path="app"
          element={
            isAuthenticated ? <AppLayout /> : <Navigate replace to="/" />
          }
        >
          <Route index element={<Navigate replace to="cities" />} />

          <Route path="cities" element={<CityList />} />
          <Route path="cities/:cityID" element={<City />} />
          <Route path="countries" element={<CountryList />} />
          <Route path="form" element={<Form />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
