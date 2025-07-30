import Sidebar from "./Sidebar"
import './Admin.scss'
import { FaBars } from 'react-icons/fa';
import { useState } from "react";
import { Outlet } from "react-router";
import { ToastContainer, toast } from 'react-toastify';
import AdminHeader from "./AdminHeader";
const Admin = (props) => {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <div className="admin-container">
            <div className="admin-header">
                      <AdminHeader/>
            </div>
      
            <div className="admin-content">
                <div className="admin-main">
                    <Outlet />
                </div>

            </div>
           
        </div>
    )
}
export default Admin