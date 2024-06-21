import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function Home() {
    const [dado, setDado] = useState([]);
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

    const deleteUsers = async (id) => {
        try {
            await axios.delete(`https://consultas-server.vercel.app/users/${id}`);
            getUsers();
            toast.success("Usuário deletado");
        } catch (error) {
            toast.error("Erro ao deletar usuário");
        }
    }

    return (
        <>
            <h1>DashBoard</h1>
            {dado.map(data => (
                <div key={data.id}>
                    <p>{data.name}</p>
                    <p>{data.email}</p>
                    <p>{data.tel}</p>
                    <button onClick={() => deleteUsers(data.id)}>Excluir</button>
                </div>
            ))}
        </>
    )
}

export default Home;