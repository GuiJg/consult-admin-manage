import { useState } from "react"
import { Routes, Route } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import { Breadcrumb, Button, Layout } from "antd"
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons"

//pages
import Home from "./pages/Inicio"
import CadClientes from "./pages/CadClientes"
import Agendar from "./pages/Agendar"

//components
import Logo from "./components/Logo"
import MenuList from "./components/MenuList"
import ToggleThemeButton from "./components/ToggleThemeButton"
import Agendamentos from "./pages/Agendamentos"
import LoginAdm from "./pages/LoginAdm"
import Settings from "./pages/Settings"
import Profile from "./pages/ProfileAdm"
import UsersData from "./pages/UsersData"

const { Sider } = Layout

function App() {

    const [darkTheme, setDarkTheme] = useState(false)
    const [collaped, setCollaped] = useState(false)

    const toggleTheme = () => {
        setDarkTheme(!darkTheme);
    }

    return (
        <>
            <Layout>
                <Sider collapsed={collaped} collapsible trigger={null} className="sidebar" theme={darkTheme ? "dark" : "light"}>
                    <Logo />
                    <MenuList darkTheme={darkTheme} />
                    <ToggleThemeButton darkTheme={darkTheme} toggleTheme={toggleTheme} />
                </Sider>
                <Layout className="layout-main">
                    <Button
                        className="toggle"
                        onClick={() => setCollaped(!collaped)}
                        type="text"
                        icon={collaped ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />
                        } />
                    <Breadcrumb
                        items={[
                            {
                                href: "/",
                                title: "Home",
                                onClick: () => setCollaped(false),
                            }
                        ]} />
                    <Routes>
                        <Route index element={<Home />} />
                        <Route path="/agendar" element={<Agendar />} />
                        <Route path="/agendamentos" element={<Agendamentos />} />
                        <Route path="/cadastrar-clientes" element={<CadClientes />} />
                        <Route path="/Login" element={<LoginAdm />} />
                        <Route path="/configuracoes" element={<Settings />} /> 
                        <Route path="/perfil-adm" element={<Profile />} />
                        <Route path="/usuarios-dados" element={<UsersData />} />
                    </Routes>
                    <Toaster
                        position="top-right"
                        reverseOrder={false}
                    />
                </Layout>
            </Layout>
        </>
    )
}

export default App
