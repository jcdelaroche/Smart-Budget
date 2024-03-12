import Cookies from "js-cookie";
import { Navigate, Outlet } from "react-router-dom";

export default function IfAuth() {
    const token = Cookies.get("auth");
    return (
        <>
            {!token ? <Outlet /> : <Navigate to="/" />}
        </>
    );
}