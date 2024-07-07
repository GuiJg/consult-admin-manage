import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import InputMask from "react-input-mask";
import axios from "axios";
import toast from "react-hot-toast";
import { Select } from "antd";

const VITE_SCHEDULE_DATABASE_URL = import.meta.env.VITE_SCHEDULE_DATABASE_URL;

function CreateScheduleForm() {
    const [users, setUsers] = useState([]);
    const [schedules, setSchedules] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [cpf, setCpf] = useState("");
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");

    const navigate = useNavigate();

    const nameType = [
        "Cardiologista",
        "Dermatologista",
        "Endocrinologista",
        "Fisioterapeuta",
        "Gastroenterologista",
        "Ginecologista",
        "Hematologista",
        "Nefrologista",
        "Neurologista",
        "Oftalmologista",
        "Oncologista",
        "Ortopedista",
        "Pediatria",
    ]

    const getUser = async () => {
        try {
            const response = await axios.get(`https://consult-manage-admin-backend.vercel.app/users`);
            setUsers(response.data);
        } catch (error) {
            toast.error("Erro ao carregar os pacientes");
        }
    }

    const getSchedule = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`${VITE_SCHEDULE_DATABASE_URL}`);
            setSchedules(response.data);
        } catch (error) {
            toast.error("Erro ao carregar as consultas" + error.message);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getSchedule(); 
        getUser();
    }, [])

    const createSchedule = async (e) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            const data = {
                cpf,
                name,
                type,
                date,
                time
            };
            const response = await axios.post(`${VITE_SCHEDULE_DATABASE_URL}`, data);
            toast.success(`Consulta para ${response.data.type} criado com sucesso`);
            getSchedule();
            navigate("/agendamentos");
        } catch (error) {   
            if (error.response && error.response.status === 500) {
                toast.error("Paciente já possui consulta marcada");
            } else {
                toast.error(error.message);
            }   
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (cpf) {
            const user = users.find((user) => user.cpf === cpf);
            if (user) {
                setName(user.name);
            }
        }
    }, [cpf, users]);

    useEffect(() => {
        if (name) {
            const user = users.find((user) => user.name === name);
            if (user) {
                setCpf(user.cpf);
            }
        }
    }, [name, users]);

    return (
        <form className="create-form" onSubmit={createSchedule}>
            <div className="double-input">
                <div className="form-content">
                    <label>Nome*</label>
                    <select 
                        placeholder="Nome do paciente" 
                        id="name" 
                        value={name} 
                        required 
                        onChange={(e) => setName(e.target.value)}
                    >
                        <option value="">Selecione o nome do paciente</option>
                        {users.map((user) => (
                            <option key={user.key} value={user.name}>
                                {user.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-content">
                    <label>CPF*</label>
                    <select 
                        type="text" 
                        id="cpf" 
                        value={cpf} 
                        required 
                        onChange={(e) => setCpf(e.target.value)} placeholder=""
                    >
                        <option value="">Selecione o CPF do paciente</option>
                        {users.map((user) => (
                            <option key={user.key} value={user.cpf}>
                                {user.cpf}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="form-content">
                <label>Tipo*</label>
                <select type="text" id="type" value={type} required onChange={(e) => setType(e.target.value)} placeholder="">
                    <option value="">Selecione o tipo de consulta</option>
                    {nameType.map((type) => (
                        <option key={type} value={type}>
                            {type}
                        </option>
                    ))}
                </select>
            </div>
            <div className="double-input">
                <div className="form-content">
                    <label>Dia*</label>
                    <input type="date" id="date" value={date} required onChange={(e) => setDate(e.target.value)} placeholder="Digite o dia da consulta" />
                </div>
                <div className="form-content">
                    <label>Hora*</label>
                    <InputMask
                        type="time"
                        id="time"
                        value={time}
                        required
                        onChange={(e) => setTime(e.target.value)}
                        placeholder="Digite a hora da consulta"
                    />
                </div>
            </div>
            <div>
                {!isLoading && (<button>CADASTRAR</button>)}
            </div>
        </form>
    );
}

export default CreateScheduleForm;