import { useEffect, useState } from "react";

import axios from "axios";
import toast from "react-hot-toast";

function Agendamentos() {
    const [dado, setDado] = useState([]);
    const [, setIsLoading] = useState(false);

    const getSchedule = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get("https://consultas-server.vercel.app/schedule");
            setDado(response.data);
        } catch (error) {
            toast.error("Erro ao carregar as consultas" + error.message);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getSchedule();
    }, [])

    const deleteSchedule = async (id) => {
        try {
            await axios.delete(`https://consultas-server.vercel.app/schedule/${id}`);
            getSchedule();
            toast.success("Agendamento deletado");
        } catch (error) {
            if (error.response && error.response.status === 500) {
                toast.success(`Agendamento deletado com sucesso!`);
                getSchedule();
            } else {
                toast.error(error.message);
            }
        }
    }

    return (
        <>
            <h2>Agendamentos</h2>
            <table className="table-users">
                <tr className="table-header">
                    <th>Nome</th>
                    <th>Tipo</th>
                    <th>Data</th>
                    <th>Horário</th>
                </tr>
                {dado.map(data => (
                    <tr className="table-body" key={data.id}>
                        <td>{data.name}</td>
                        <td>{data.type}</td>
                        <td>{data.date}</td>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <td>{data.time}</td>
                            <button onClick={() => deleteSchedule(data.id)}>Excluir</button>
                        </div>
                    </tr>
                ))}
            </table>
        </>
    )

}

export default Agendamentos;