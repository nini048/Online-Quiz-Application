import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";


const PrivateRoute = ({ children, adminOnly = false }) => { 
  const account = useSelector(state => state.user.account);
    const isAuthenticated = useSelector(state => state.user.isAuthenticated);
    const navigate = useNavigate()

    if (!isAuthenticated) {
       return <Navigate to ='/login'></Navigate>
    }
  if (adminOnly && account?.role !== "ADMIN") {
    return <Navigate to ='/user/quiz'/>
  }
    return(
        <>
          {children}
        </>
    )
}
export default PrivateRoute