import { useState } from "react"
import { Routes, Route } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import { Breadcrumb, Button, Layout } from "antd"
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons"

//pages
import Home from "./pages/DashBoard"
import CadClientes from "./pages/CadClientes"
import Agendamentos from "./pages/SchedulesData"
import UsersData from "./pages/UsersData"
import CadConsult from "./pages/CadConsult"

//components
import Logo from "./components/Logo"
import MenuList from "./components/MenuList"
import ToggleThemeButton from "./components/ToggleThemeButton"


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
                        <Route path="/agendar" element={<CadConsult />} />
                        <Route path="/agendamentos" element={<Agendamentos />} />
                        <Route path="/cadastrar-pacientes" element={<CadClientes />} />
                        <Route path="/usuarios" element={<UsersData />} />
                    </Routes>
                    <Toaster
                        position="top-right"
                        reverseOrder={false}
                        timeout={30000}
                    />
                </Layout>
            </Layout>
        </>
    )
}

export default App
