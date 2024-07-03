import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import InputMask from "react-input-mask";
import axios from "axios";
import toast from "react-hot-toast";

const VITE_SCHEDULE_DATABASE_URL = import.meta.env.VITE_SCHEDULE_DATABASE_URL;

function CreateScheduleForm() {
    const [, setDado] = useState([]);
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

    const getSchedule = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`${VITE_SCHEDULE_DATABASE_URL}`);
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
            const response = await axios.post(`${VITE_SCHEDULE_DATABASE_URL}`, { cpf, name, type, date, time });
            toast.success(`Consulta para ${response.data.type} criado com sucesso`);
            getSchedule();
            navigate("/agendamentos");
        } catch (error) {
            toast.error(error.message);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <form className="create-form" onSubmit={createSchedule}>
            <div className="double-input">
                <div className="form-content">
                    <label>Nome*</label>
                    <input type="name" id="name" value={name} required onChange={(e) => setName(e.target.value)} placeholder="Nome do paciente" />
                </div>
                <div className="form-content">
                    <label>CPF*</label>
                    <InputMask
                        mask="999.999.999-99"
                        maskChar=" "
                        type="cpf"
                        id="cpf"
                        value={cpf}
                        required
                        onChange={(e) => setCpf(e.target.value)}
                        placeholder="CPF do paciente"
                    />
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