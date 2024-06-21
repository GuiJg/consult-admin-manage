import { Menu } from "antd";
import { HomeOutlined, ScheduleOutlined, UserAddOutlined, SettingOutlined, FormOutlined, UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const MenuList = ({ darkTheme }) => {

    return (
        <Menu
            theme={darkTheme ? "dark" : "light"}
            mode="inline" className="menu-bar"
        >
            <Menu.Item className="menu-item" key="home" icon={<HomeOutlined />}>
                <Link to={"/"} className="sidebar-link">Dashboard</Link>
            </Menu.Item>
            <Menu.Item className="menu-item" key="schedule" icon={<ScheduleOutlined />}>
                <Link to={"/agendamentos"}>Agendamentos</Link>
            </Menu.Item>
            <Menu.Item className="menu-item" key="formSchedule" icon={<FormOutlined />}>
                <Link to={"/agendar"}>Agendar</Link>
            </Menu.Item>
            <Menu.Item className="menu-item" key="createClients" icon={<UserAddOutlined />}>
                <Link to={"/cadastrar-clientes"}>Cadastrar Pacientes</Link>
            </Menu.Item>
            <Menu.Item className="menu-item" key="clients" icon={<UserOutlined />}>
                <Link to={"/usuarios-dados"}>Pacientes</Link>
            </Menu.Item>
            <Menu.Item className="menu-item" key="settings" icon={<SettingOutlined />}>
                <Link to={"/configuracoes"}>Configurações</Link>
            </Menu.Item>
        </Menu>
    )
}

export default MenuList;