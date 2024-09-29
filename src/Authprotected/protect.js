import { Navigate, Outlet } from "react-router-dom";

const ProtedRoutes = () => {
 const isUserLogged = window.sessionStorage.getItem('isUserLogged')
    return (isUserLogged) ? <Outlet /> : <Navigate to='/Pagenotfound' />
}

export default ProtedRoutes;