import { Button, Table, Spin, Select } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Alert from "sweetalert2";
import ModalEditSchedule from "./ModalEditUser";
import { useNavigate } from "react-router-dom";
import ReactInputMask from "react-input-mask";
import { CheckCircleTwoTone, CloseCircleTwoTone, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Option } from "antd/es/mentions";

const VITE_SCHEDULE_DATABASE_URL = import.meta.env.VITE_SCHEDULE_DATABASE_URL;

function TableList() {

    const [dado, setDado] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isDeleteLoading, setIsDeleteLoading] = useState(false);
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
            const response = await axios.get(`${VITE_SCHEDULE_DATABASE_URL}`);
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
            confirmButtonText: 'Sim, deletar',
            preConfirm: () => {
                setIsDeleteLoading(true);
            }
        });

        if (result.isConfirmed) {
            try {
                await axios.delete(`${VITE_SCHEDULE_DATABASE_URL}/${id}`);
                getSchedule();
                toast.success("Agendamento deletado");
            } catch (error) {
                if (error.response && error.response.status === 500) {
                    toast.success("Agendamento deletado com sucesso!");
                    getSchedule();
                } else {
                    toast.error(error.message);
                }
            } finally {
                setIsDeleteLoading(false);
            }
        } else {
            setIsDeleteLoading(false);
        }
    };

    const handleEditClick = (schedule) => {
        setCurrentSchedule(schedule);
        setIsOpen(true);
    };

    const updateSchedule = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await axios.put(`${VITE_SCHEDULE_DATABASE_URL}/${currentSchedule.key}`, currentSchedule);
            toast.success("Agendamento editado com sucesso");
            getSchedule();
            navigate("/agendamentos");
        } catch (error) {
            if (error.response && error.response.status === 500) {
                toast.error("Erro interno do servidor");
            } else {
                toast.error(error.message);
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
            title: "Ações",
            dataIndex: "actions",
            key: "actions",
            align: "center",
            render: (_, data) => (
                <div className="actions-body" style={{ display: 'flex', gap: '1rem' }}>
                    <Button id="edit" onClick={() => handleEditClick(data)}><EditOutlined /></Button>
                    <Button id="delete" onClick={() => deleteSchedule(data.key)}><DeleteOutlined /></Button>
                    <Select
                        id="status"
                        placeholder="Status da consulta"
                        onChange={(e) => setCurrentSchedule({ ...currentSchedule, status: e })}
                    >
                        <Option value="">
                            Status da consulta
                        </Option>
                        <Option
                            value="Confirmado"
                            onClick={() => deleteSchedule(data.key)}
                        >
                            <CheckCircleTwoTone twoToneColor="#52c41a" /> Concluida
                        </Option>
                        <Option
                            value="Cancelado"
                            onClick={() => deleteSchedule(data.key)}
                        >
                            <CloseCircleTwoTone twoToneColor="#d40000" /> Cancelada
                        </Option>
                    </Select>
                </div>
            )
        }
    ];

    const dataSource = dado.map((data) => {
        return {
            key: data._id,
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
            <Spin spinning={isLoading}>
                <Table className="table-ant" dataSource={dataSource} columns={columns} />
            </Spin>

            {isOpen && currentSchedule && (
                <ModalEditSchedule isOpen={isOpen} onClose={() => setIsOpen(false)}>
                    <form className="edit-form" onSubmit={updateSchedule}>
                        <div className="double-input">
                            <div className="form-content">
                                <label>CPF*</label>
                                <ReactInputMask
                                    mask="999.999.999-99"
                                    type="text"
                                    value={currentSchedule.cpf}
                                    required
                                    onChange={(e) => setCurrentSchedule({ ...currentSchedule, cpf: e.target.value })} placeholder="CPF do usuário"
                                />
                            </div>
                            <div className="form-content">
                                <label>Nome*</label>
                                <input
                                    type="text"
                                    value={currentSchedule.name}
                                    required
                                    onChange={(e) => setCurrentSchedule({ ...currentSchedule, name: e.target.value })} placeholder="Nome do usuário"
                                />
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
            <Spin spinning={isDeleteLoading}>
                <div style={{ height: '100px' }} /> {/* Placeholder for spinner */}
            </Spin>
        </>
    );
}

export default TableList;
