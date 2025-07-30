import 'react-pro-sidebar/dist/css/styles.css';
import {
    ProSidebar,
    Menu,
    MenuItem,
    SubMenu,
    SidebarHeader,
    SidebarFooter,
    SidebarContent,

} from 'react-pro-sidebar';
import { FiBox } from "react-icons/fi";
import { Link } from 'react-router-dom';
import { FaTachometerAlt, FaGem, FaList, FaGithub, FaRegLaughWink, FaHeart } from 'react-icons/fa';
import { SiQuizlet } from "react-icons/si";
import { TfiJoomla } from "react-icons/tfi";
import { MdOutlineDashboard } from "react-icons/md";

const SideBar = (props) => {
    const { image, collapsed, toggled, handleToggleSidebar } = props;
    return (
        <>
            <ProSidebar

                collapsed={collapsed}
                toggled={toggled}
                breakPoint="md"
                onToggle={handleToggleSidebar}
            >
                <SidebarHeader>
                    <div
                        style={{
                            padding: '15px 20px',
                            textTransform: 'uppercase',
                            fontWeight: 'bold',
                            fontSize: 14,
                            letterSpacing: '1px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        <div className={`sidebar-header-custom ${collapsed ? 'collapsed' : ''}`}>
                            <div className="logo-left">
                                <Link to='/'>
                                    <TfiJoomla size={24} color='#333'/>
                                </Link>

                            </div>
                            <div className="title-center">
                                QUIZZZZ
                            </div>
                        </div>

                    </div>
                </SidebarHeader>

                <SidebarContent>
                    <Menu iconShape='circle' color='#333'>
                        <MenuItem
                            icon={<MdOutlineDashboard />}
                        // suffix={<span className="badge red">New</span>}
                        >
                            Dashboard
                            <Link to='/admin' />
                        </MenuItem>

                    </Menu>
                    <Menu iconShape="circle">
                        <SubMenu
                            // suffix={<span className="badge yellow">Features</span>}
                            icon={<FaRegLaughWink />}
                            title='Features'
                        >

                            <MenuItem>
                                Manage User
                                <Link to='/admin/manager-user' />
                            </MenuItem>
                            <MenuItem>
                                Manage Quiz
                                <Link to='/admin/manager-quiz' />
                            </MenuItem>
                            <MenuItem> Manage Question</MenuItem>
                        </SubMenu>

                    </Menu>
                </SidebarContent>

                <SidebarFooter style={{ textAlign: 'center' }}>
                    <div
                        className="sidebar-btn-wrapper"
                        style={{
                            padding: '20px 24px',
                        }}
                    >
                        <a
                            href="https://github.com/azouaoui-med/react-pro-sidebar"
                            target="_blank"
                            className="sidebar-btn"
                            rel="noopener noreferrer"
                        >
                            <FaGithub />
                            <span style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                                viewSource
                            </span>
                        </a>
                    </div>
                </SidebarFooter>
            </ProSidebar>
        </>
    )
}

export default SideBar;