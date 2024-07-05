import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import InputMask from 'react-input-mask';

const VITE_USER_DATABASE_URL = import.meta.env.VITE_USER_DATABASE_URL; 

function CreateUserForm() {
    const [, setDado] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [cpf, setCpf] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [tel, setTel] = useState("");

    const navigate = useNavigate();
    
    const getUsers = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`${VITE_USER_DATABASE_URL}`);
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

    const createUsers = async (e) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            const response = await axios.post(`${VITE_USER_DATABASE_URL}`, { cpf, name, email, tel });
            toast.success(`Usuário ${response.data.name} criado com sucesso`);
            getUsers();
            navigate("/pacientes");
        } catch (error) {
            toast.error(error.message);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <form className="create-form" onSubmit={createUsers}>
            <div className="double-input">
                <div className="form-content">
                    <label>Nome*</label>
                    <input 
                    type="text" 
                    value={name} 
                    required 
                    onChange={(e) => setName(e.target.value)} placeholder="Nome do paciente" 
                    />
                </div>
                <div className="form-content">
                    <label>CPF*</label>
                    <InputMask
                        mask="999.999.999-99"
                        maskChar=" "
                        type="text"
                        value={cpf}
                        required
                        rules={{ required: true }}
                        onChange={(e) => setCpf(e.target.value)}
                        placeholder="CPF do paciente"
                    />
                </div>
            </div>
            <div className="form-content">
                <label>Email*</label>
                <input type="text" value={email} required onChange={(e) => setEmail(e.target.value)} placeholder="E-mail do paciente" />
            </div>
            <div className="form-content">
                <label>Telefone*</label>
                <InputMask
                    mask="(99) 99999-9999"
                    type="text"
                    value={tel}
                    required
                    onChange={(e) => setTel(e.target.value)}
                    placeholder="Telefone do paciente"
                />
            </div>
            <div>
                {!isLoading && (<button>CADASTRAR</button>)}
            </div>
        </form>
    );
}

export default CreateUserForm;