import {
  Routes,
  Route,
  Outlet,
  Redirect,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { Login } from "../components/Login/Login";
import { Register } from "../components/Register/Register";
import HomePage from "../pages/HomePage";

function Navigator() {
  return (
    <Routes>
      <Route path="/" /* element={<Layout />} */>
        <Route index element={<HomePage />}></Route>
        <Route path="login" element={<Login />}></Route>
        <Route path="register" element={<Register />}></Route>
      </Route>
    </Routes>
  );
}
export default Navigator