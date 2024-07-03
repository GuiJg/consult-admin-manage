import { Menu } from "antd";
import { HomeOutlined, ScheduleOutlined, UserAddOutlined, FormOutlined, UserOutlined } from "@ant-design/icons";
import { Link, useLocation, useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const MenuList = ({ darkTheme }) => {
    const location = useLocation();
    const navigate = useNavigate();

    const handleMenuItemClick = (path) => {
        navigate(path);
    }

    return (
        <Menu
            theme={darkTheme ? "dark" : "light"}
            mode="inline" className="menu-bar"
            defaultSelectedKeys={[location.pathname]}
            onClick={({ key }) => handleMenuItemClick(key)}
        >
            <Menu.Item className="menu-item" key="/" icon={<HomeOutlined />}>
                <Link to="/" className="sidebar-link">Dashboard</Link>
            </Menu.Item>
            <Menu.Item className="menu-item" key="/agendamentos" icon={<ScheduleOutlined />}>
                <Link to="/agendamentos">Agendamentos</Link>
            </Menu.Item>
            <Menu.Item className="menu-item" key="/usuarios" icon={<UserOutlined />}>
                <Link to="/usuarios" onClick={handleMenuItemClick}>Pacientes</Link>
            </Menu.Item>
            <Menu.Item className="menu-item" key="/cadastrar-pacientes" icon={<UserAddOutlined />}>
                <Link to="/cadastrar-pacientes">Cadastrar Pacientes</Link>
            </Menu.Item>
            <Menu.Item className="menu-item" key="/agendar" icon={<FormOutlined />}>
                <Link to="/agendar">Agendar Consultas</Link>
            </Menu.Item>
        </Menu>
    )
}

export default MenuList;

