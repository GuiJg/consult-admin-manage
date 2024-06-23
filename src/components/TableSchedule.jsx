import { Table } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Alert from "sweetalert2";
import ModalEditSchedule from "./ModalEditUser";
import { useNavigate, useParams } from "react-router-dom";
import ReactInputMask from "react-input-mask";

function TableList() {
    let id = useParams();

    const [dado, setDado] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [currentSchedule, setCurrentSchedule] = useState(null);

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
    ];

    const getSchedule = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get("https://consultas-server.vercel.app/schedule");
            setDado(response.data);
        } catch (error) {
            toast.error("Erro ao carregar as consultas");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getSchedule();
    }, []);

    const deleteSchedule = async (id) => {
        const result = await Alert.fire({
            title: 'Tem certeza que deseja deletar este agendamento?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim, deletar'
        })
        if (result.isConfirmed) {
            try {
                await axios.delete(`https://consultas-server.vercel.app/schedule/${id}`);
                getSchedule();
                toast.success("Agendamento deletado");
            } catch (error) {
                if (error.response && error.response.status === 500) {
                    toast.success("Agendamento deletado com sucesso!");
                    getSchedule();
                } else {
                    toast.error(error.message);
                }
            }
        }
    };

    const handleEditClick = (schedule) => {
        console.log(schedule);
        setCurrentSchedule(schedule);
        setIsOpen(true);
    };

    const updateSchedule = async (e) => {
        e.preventDefault();
        console.log(id);
        console.log(currentSchedule);
        setIsLoading(true);
        try {
            const response = await axios.put(`https://consultas-server.vercel.app/schedule/${currentSchedule.id}`, currentSchedule);
            if (response.status === 200) {
                toast.success("Agendamento editado");
                getSchedule();
            } else {
                toast.error("Erro ao editar agendamento");
            }
        } catch (error) {
            if (error.response && error.response.status === 500) {
                toast.success("Usuario editado com sucesso!");
                getSchedule();
                navigate("/agendamentos");
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
            title: "Tipo",
            dataIndex: "type",
            key: "type",
        },
        {
            title: "Data",
            dataIndex: "date",
            key: "date",
        },
        {
            title: "Hora",
            dataIndex: "time",
            key: "time",
        },
        {
            title: "Ações",
            dataIndex: "actions",
            key: "actions",
            align: "center",
            render: (_, data) => (
                <div className="actions-body" style={{ display: 'flex', gap: '1rem' }}>
                    <button onClick={() => handleEditClick(data)}>Editar</button>
                    <button onClick={() => deleteSchedule(data.key)}>Excluir</button>
                </div>
            )
        }
    ];

    const dataSource = dado.map((data) => {
        return {
            key: data.id,
            cpf: data.cpf,
            name: data.name,
            type: data.type,
            date: data.date,
            time: data.time,
            actions: data.id
        };
    });

    return (
        <>
            <Table className="table-ant" dataSource={dataSource} columns={columns} />

            {isOpen && currentSchedule && (
                <ModalEditSchedule isOpen={isOpen} onClose={() => setIsOpen(false)}>
                    <form className="edit-form" onSubmit={updateSchedule}>
                        <div className="double-input">
                            <div className="form-content">
                                <label>CPF*</label>
                                <ReactInputMask mask="999.999.999-99" type="text" value={currentSchedule.cpf} required onChange={(e) => setCurrentSchedule({ ...currentSchedule, cpf: e.target.value })} placeholder="CPF do usuário" />
                            </div>
                            <div className="form-content">
                                <label>Nome*</label>
                                <input type="text" value={currentSchedule.name} required onChange={(e) => setCurrentSchedule({ ...currentSchedule, name: e.target.value })} placeholder="Nome do usuário" />
                            </div>
                        </div>
                        <div className="form-content">
                            <label>Tipo*</label>
                            <select type="text" value={currentSchedule.type} required onChange={(e) => setCurrentSchedule({ ...currentSchedule, type: e.target.value })} placeholder="">
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
                                <label>Data*</label>
                                <input type="date" value={currentSchedule.date} required onChange={(e) => setCurrentSchedule({ ...currentSchedule, date: e.target.value })} placeholder="Data" />
                            </div>
                            <div className="form-content">
                                <label>Horário*</label>
                                <input type="time" value={currentSchedule.time} required onChange={(e) => setCurrentSchedule({ ...currentSchedule, time: e.target.value })} placeholder="Horário" />
                            </div>
                        </div>
                        <div>
                            {!isLoading && (<button type="submit">Editar</button>)}
                        </div>
                    </form>
                </ModalEditSchedule>
            )}
        </>
    );
}

export default TableList;