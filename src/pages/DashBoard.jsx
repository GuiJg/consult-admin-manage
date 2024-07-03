import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

// const VITE_DATABASE_URL = import.meta.env.VITE_DATABASE_URL;

function Home() {       
    const [dado, setDado] = useState([]);
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
            {dado.map((user) => (
                <div key={user.id}>
                    <br />
                    <p>Nome: {user.name}</p>
                    <p>Email: {user.email}</p>
                    <p>CPF: {user.cpf}</p>
                    <p>Telefone: {user.tel}</p>
                    <hr />
                </div>
            ))}
        </>
    )
}

export default Home;