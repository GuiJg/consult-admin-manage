import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

// const VITE_DATABASE_URL = import.meta.env.VITE_DATABASE_URL;

function Home() {   
    const [, setDado] = useState([]);
    const [, setIsLoading] = useState(false);

    const getUsers = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`https://consult-manage-admin-backend.vercel.app/users`);
            setDado(response.data);
        } catch (error) {
            toast.error("Erro ao carregar usuários");
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getUsers();
    }, [])

    return (
        <>
            <h1>Dashboard</h1>
        </>
    )
}

export default Home;