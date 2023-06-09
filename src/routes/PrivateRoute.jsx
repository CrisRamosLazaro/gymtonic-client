import { useContext } from "react"
import { AuthContext } from "./../contexts/auth.context"
import { Link, Navigate, Outlet } from 'react-router-dom'
import Loader from "../components/Loader/Loader"

const PrivateRoute = ({ admittedRoles }) => {

    const { user, isLoading } = useContext(AuthContext)

    if (isLoading) {
        return <Loader />
    }

    if (!user) {
        return <Navigate to="/login" />
    }
    if (!admittedRoles.includes(user.role)) {
        return (
            <div className="container">
                <p>User not authorized</p>
                <Link to="/">Home</Link>
            </div>
        )
    }

    return <Outlet />
}

export default PrivateRoute