import { Button, Table } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Alert from "sweetalert2";
import ModalEditUser from "./ModalEditUser";
import { useNavigate } from "react-router-dom";
import ReactInputMask from "react-input-mask";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
function TableList() {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);

    const navigate = useNavigate();

    const VITE_USER_DATABASE_URL = import.meta.env.VITE_USER_DATABASE_URL;

    const getUsers = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`${VITE_USER_DATABASE_URL}`);
            setUsers(response.data);
        } catch (error) {
            toast.error('Erro ao carregar os usuários');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const deleteUser = async (id) => {
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
                await axios.delete(`${VITE_USER_DATABASE_URL}/${id}`);
                getUsers();
                toast.success("Usuário deletado");
            } catch (error) {
                toast.error(error.message);
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
            await axios.put(`${VITE_USER_DATABASE_URL}/${currentUser.key}`, currentUser);
            toast.success("Usuário editado com sucesso");
            getUsers();
            navigate('/usuarios');
        } catch (error) {
            toast.error(error.message);
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
            align: "center",
            render: (_, data) => (
                <div className="actions-body" style={{ display: 'flex', gap: '1rem' }}>
                    <Button onClick={() => handleEditClick(data)}><EditOutlined /></Button>
                    <Button onClick={() => deleteUser(data.key)}><DeleteOutlined /></Button>
                </div>
            )
        }
    ];

    const dataSource = users.map((data) => {
        return {
            key: data._id,
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
