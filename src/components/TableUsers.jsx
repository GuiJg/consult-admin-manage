import { Table } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Alert from "sweetalert2";
import ModalEditUser from "./ModalEditUser";
import { useNavigate } from "react-router-dom";
import ReactInputMask from "react-input-mask";

function TableList() {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);

    const navigate = useNavigate();

    const getUsers = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get("https://consultas-server.vercel.app/users");
            console.log(response.data);
            setUsers(response.data);
        } catch (error) {
            toast.error('Erro ao carregar os usuários');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getUsers();
    }, []);

    const deleteUser = async (id) => {
        console.log(id);
        const result = await Alert.fire({
            title: 'Tem certeza que deseja deletar este usuário?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim, deletar'
        })
        if (result.isConfirmed) {
            try {
                await axios.delete(`https://consultas-server.vercel.app/users/${id}`);
                getUsers();
                toast.success("Usuário deletado");
            } catch (error) {
                if (error.response && error.response.status === 500) {
                    toast.success("Usuário deletado com sucesso!");
                    getUsers();
                } else {
                    toast.error(error.message);
                }
            }
        }
    };

    const handleEditClick = (user) => {
        console.log(user);
        setCurrentUser(user);
        setIsOpen(true);
    };

    const updateUser = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await axios.put(`https://consultas-server.vercel.app/users/${currentUser.id}`, currentUser);
            if (response.status === 200) {
                toast.success("Usuário editado");
                getUsers();
            } else {
                toast.error("Erro ao editar usuário");
            }
        } catch (error) {
            if (error.response && error.response.status === 500) {
                toast.success("Usuário editado com sucesso!");
                getUsers();
                navigate("/usuarios");
            }
        } finally {
            setIsLoading(false);
            setIsOpen(false);
        }
    };

    const columns = [
        {
            title: "CPF",
            dataIndex: "cpf",
            key: "cpf",
        },
        {
            title: "Nome",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Telefone",
            dataIndex: "tel",
            key: "tel",
        },
        {
            title: "Ações",
            dataIndex: "actions",
            key: "actions",
            render: (_, data) => (
                <div className="actions-body" style={{ display: 'flex', gap: '1rem' }}>
                    <button onClick={() => handleEditClick(data)}>Editar</button>
                    <button onClick={() => deleteUser(data.key)}>Excluir</button>
                </div>
            )
        }
    ];

    const dataSource = users.map((data) => {
        return {
            key: data.id,
            cpf: data.cpf,
            name: data.name,
            email: data.email,
            tel: data.tel,
            actions: data.id
        };
    });

    return (
        <>
            <Table className="table-ant" dataSource={dataSource} columns={columns} />

            {isOpen && currentUser && (
                <ModalEditUser isOpen={isOpen} onClose={() => setIsOpen(false)}>
                    <form className="edit-form" onSubmit={updateUser}>
                        <div className="double-input">
                            <div className="form-content">
                                <label>CPF*</label>
                                <ReactInputMask mask="999.999.999-99" type="text" value={currentUser.cpf} required onChange={(e) => setCurrentUser({ ...currentUser, cpf: e.target.value })} placeholder="CPF do usuário" />
                            </div>
                            <div className="form-content">
                                <label>Nome*</label>
                                <input type="text" value={currentUser.name} required onChange={(e) => setCurrentUser({ ...currentUser, name: e.target.value })} placeholder="Nome do usuário" />
                            </div>
                        </div>
                        <div className="form-content">
                            <label>Email*</label>
                            <input type="email" value={currentUser.email} required onChange={(e) => setCurrentUser({ ...currentUser, email: e.target.value })} placeholder="Email" />
                        </div>
                        <div className="form-content">
                            <label>Telefone*</label>
                            <ReactInputMask mask="(99) 99999-9999" type="tel" value={currentUser.tel} required onChange={(e) => setCurrentUser({ ...currentUser, tel: e.target.value })} placeholder="Telefone" />
                        </div>
                        <div>
                            {!isLoading && (<button type="submit">Editar</button>)}
                        </div>
                    </form>
                </ModalEditUser>
            )}
        </>
    );
}

export default TableList;
