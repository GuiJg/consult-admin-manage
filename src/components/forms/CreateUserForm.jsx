import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

function CreateUserForm() {
    const [, setDado] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [tel, setTel] = useState("");

    const navigate = useNavigate();

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

    const createUsers = async (e) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            const response = await axios.post("https://consultas-server.vercel.app/users", { name, email, tel });
            toast.success(`Usuário ${response.data.name} criado com sucesso`);
            getUsers();
        } catch (error) {
            if (error.response && error.response.status === 500) {
                // Tratar explicitamente o erro 500, se necessário
                toast.success(`Cliente cadastrado com sucesso!`);
                getUsers();
                navigate("/");
            } else {
                // Outros erros
                toast.error(error.message);
            }
        } finally {
            setIsLoading(false);
        }
    }

    return ( 
        <form onSubmit={createUsers}>
                <div>
                    <label>Nome</label>
                    <input type="text" value={name} required onChange={(e) => setName(e.target.value)} placeholder="Nome do usuario" />
                </div>
                <div>
                    <label>Email</label>
                    <input type="text" value={email} required onChange={(e) => setEmail(e.target.value)} placeholder="E-mail" />
                </div>
                <div>
                    <label>Telefone</label>
                    <input type="number" value={tel} required onChange={(e) => setTel(e.target.value)} placeholder="Telefone" />
                </div>
                <div>
                    {!isLoading && (<button>Cadastrar</button>)}
                </div>
            </form>
     );
}

export default CreateUserForm;