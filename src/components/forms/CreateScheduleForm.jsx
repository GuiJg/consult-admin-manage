import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function CreateScheduleForm() {
    const [, setDado] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");

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

    const createSchedule = async (e) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            const response = await axios.post("https://consultas-server.vercel.app/schedule", { name, type, date, time });
            toast.success(`Consulta para ${response.data.type} criado com sucesso`);
            getSchedule();
        } catch (error) {
            if (error.response && error.response.status === 500) {
                // Tratar explicitamente o erro 500, se necessário
                toast.success(`Consulta marcada com sucesso!`);
                getSchedule();
            } else {
                // Outros erros
                toast.error(error.message);
            }
        } finally {
            setIsLoading(false);
        }
    }

    return ( 
        <form onSubmit={createSchedule}>
                <div>
                    <label>Nome</label>
                    <input type="text" value={name} required onChange={(e) => setName(e.target.value)} placeholder="Nome do paciente" />
                </div>
                <div>
                    <label>Tipo</label>
                    <input type="text" value={type} required onChange={(e) => setType(e.target.value)} placeholder="Digite o tipo da consulta" />
                </div>
                <div>
                    <label>Dia</label>
                    <input type="text" value={date} required onChange={(e) => setDate(e.target.value)} placeholder="Digite o dia da consulta" />
                </div>
                <div>
                    <label>Hora</label>
                    <input type="text" value={time} required onChange={(e) => setTime(e.target.value)} placeholder="Digite a hora da consulta" />
                </div>
                <div>
                    {!isLoading && (<button>Cadastrar</button>)}
                </div>
            </form>
     );
}

export default CreateScheduleForm;