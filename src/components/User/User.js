import { Outlet } from "react-router"

const User = (props) => {
    return (
        <div className="user-container">
            <Outlet/>
       </div>
    )
}
export default User