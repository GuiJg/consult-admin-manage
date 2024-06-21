import { useEffect, useState } from "react";

import axios from "axios";
import toast from "react-hot-toast";

function UsersData() {
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
            if (error.response && error.response.status === 500) {
                toast.success(`Usuario deletado com sucesso!`);
                getUsers();
            } else {
                toast.error(error.message);
            }
        }
    }

    return (
        <>
            <h2>Dados dos usuários</h2>
            <table className="table-users">
                <tr className="table-header">
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Telefone</th>
                </tr>
                {dado.map(data => (
                    <tr className="table-body" key={data.id}>
                        <td>{data.name}</td>
                        <td>{data.email}</td>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <td>{data.tel}</td>
                            <button onClick={() => deleteUsers(data.id)}>Excluir</button>
                        </div>
                    </tr>
                ))}
            </table>
        </>
    );
}

export default UsersData;