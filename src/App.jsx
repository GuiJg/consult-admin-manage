import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Breadcrumb, Button, Layout } from "antd";
import { HomeOutlined, MenuFoldOutlined, MenuUnfoldOutlined, ScheduleOutlined, UserAddOutlined, UserOutlined } from "@ant-design/icons";

// pages
import Home from "./pages/DashBoard";
import CadClientes from "./pages/CadClientes";
import Agendamentos from "./pages/SchedulesData";
import UsersData from "./pages/UsersData";
import CadConsult from "./pages/CadConsult";

// components
import Logo from "./components/Logo";
import MenuList from "./components/MenuList";
import ToggleThemeButton from "./components/ToggleThemeButton";

const { Sider } = Layout;

const pagesHierarchy = {
    '/': { name: 'Dashboard', icon: <HomeOutlined /> },
    '/agendamentos': { name: 'Agendamentos', icon: <ScheduleOutlined />, parent: '/' },
    '/pacientes': { name: 'Pacientes', icon: <UserOutlined />, parent: '/agendamentos' },
    '/cadastrar-pacientes': { name: 'Cadastrar Pacientes', icon: <UserAddOutlined />, parent: '/pacientes' },
};

const generateBreadcrumbItems = (currentPath) => {
    const items = [];
    let path = currentPath;

    while (path) {
        const page = pagesHierarchy[path];
        if (page) {
            items.unshift({
                href: path,
                title: (
                    <>
                        {page.icon}
                        <span style={{ fontWeight: path === currentPath ? 'bold' : 'normal' }}>{page.name}</span>
                    </>
                ),
            });
            path = page.parent;
        } else {
            path = null;
        }
    }

    return items;
};

function App() {
    const [darkTheme, setDarkTheme] = useState(false);
    const [collaped, setCollaped] = useState(false);

    const toggleTheme = () => {
        setDarkTheme(!darkTheme);
    };

    const location = useLocation();
    const currentPath = location.pathname;
    const breadcrumbItems = generateBreadcrumbItems(currentPath);

    return (
        <>
            <Layout>
                <Sider collapsed={collaped} collapsible trigger={null} className="sidebar" theme={darkTheme ? "dark" : "light"}>
                    <div className="div-toggle">
                        <Button
                            className={`toggle ${collaped ? "collapsed" : ""}`}
                            onClick={() => setCollaped(!collaped)}
                            type="text"
                            icon={collaped ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        />
                    </div>
                    <Logo />
                    <MenuList darkTheme={darkTheme} />
                    <ToggleThemeButton darkTheme={darkTheme} toggleTheme={toggleTheme} />
                </Sider>
                <Layout className="layout-main">
                    <Breadcrumb className="breadcrumb" items={breadcrumbItems} />
                    <Routes>
                        <Route index element={<Home />} />
                        <Route path="/agendar" element={<CadConsult />} />
                        <Route path="/agendamentos" element={<Agendamentos />} />
                        <Route path="/cadastrar-pacientes" element={<CadClientes />} />
                        <Route path="/pacientes" element={<UsersData />} />
                    </Routes>
                    <Toaster
                        position="top-right"
                        reverseOrder={false}
                        gutter={10}
                        toastOptions={{
                            duration: 3000
                        }}
                    />
                </Layout>
            </Layout>
        </>
    );
}

export default App;