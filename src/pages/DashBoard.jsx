import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function Home() {
    const [, setDado] = useState([]);
    const [, setIsLoading] = useState(false);

    const getUsers = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get("https://consultas-server.vercel.app/users");
            setDado(response.data);
        } catch (error) {
            toast.error("Erro ao carregar usuários" + error.message);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getUsers();
    }, [])

    return (
        <>
            <h1>DashBoard</h1>
        </>
    )
}

export default Home;