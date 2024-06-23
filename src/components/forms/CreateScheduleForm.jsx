import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import InputMask from "react-input-mask";
import axios from "axios";
import toast from "react-hot-toast";

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
            const response = await axios.post("https://consultas-server.vercel.app/schedule", { cpf, name, type, date, time });
            toast.success(`Consulta para ${response.data.type} criado com sucesso`);
            getSchedule();
        } catch (error) {
            if (error.response && error.response.status === 500) {
                // Tratar explicitamente o erro 500, se necessário
                toast.success(`Consulta marcada com sucesso!`);
                getSchedule();
                navigate("/agendamentos");
            } else {
                // Outros erros
                toast.error(error.message);
            }
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <form className="create-form" onSubmit={createSchedule}>
            <div className="double-input">
                <div className="form-content">
                    <label>Nome*</label>
                    <input type="text" value={name} required onChange={(e) => setName(e.target.value)} placeholder="Nome do paciente" />
                </div>
                <div className="form-content">
                    <label>CPF*</label>
                    <InputMask
                        mask="999.999.999-99"
                        maskChar=" "
                        type="text"
                        value={cpf}
                        required
                        onChange={(e) => setCpf(e.target.value)}
                        placeholder="CPF do paciente"
                    />
                </div>
            </div>
            <div className="form-content">
                <label>Tipo*</label>
                <select type="text" value={type} required onChange={(e) => setType(e.target.value)} placeholder="">
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
                    <input type="date" value={date} required onChange={(e) => setDate(e.target.value)} placeholder="Digite o dia da consulta" />
                </div>
                <div className="form-content">
                    <label>Hora*</label>
                    <InputMask
                        type="time"
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