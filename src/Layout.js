import App from './App';

import User from './components/User/User';
import Admin from './components/Admin/Admin';
import HomePage from './components/Home/HomePage';
import ManagerUser from './components/Admin/Content/ManageUser';
import DashBoard from './components/Admin/Content/DashBoard';
import Login from './components/Auth/Login';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Register from './components/Auth/Register';
import ListQuiz from './components/User/ListQuiz';
import DetailQuiz from './components/User/DetailQuiz';
import ManagerQuiz from './components/Admin/Content/Quiz/ManagerQuiz';

const NotFound = () => {
    return (
        <div className='container mt-3 alert alert-danger'>404. Not found data with your current URL</div>
    )
}
const Layout = (props) => {
    return (
        <>
            <Routes>
                <Route path="/" element={<App />}>
                    <Route index element={<HomePage />} />
                    <Route path="/user" element={<ListQuiz />} />

                    <Route path="/quiz/:id" element={<DetailQuiz />} />
                </Route>
                <Route path="/admin" element={<Admin />}>
                    <Route index element={<DashBoard />} />
                    <Route path="manager-user" element={<ManagerUser />} />
                    <Route path="manager-quiz" element={<ManagerQuiz />} />
                </Route>

                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
            <ToastContainer
                position="bottom-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover={false}
                theme="light"

            />
        </>
    )
}
export default Layout