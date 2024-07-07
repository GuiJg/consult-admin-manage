import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Card, Col, Row, Spin, Statistic, List, Progress } from "antd";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";

// const VITE_DATABASE_URL = import.meta.env.VITE_DATABASE_URL;

function Home() {
    const [users, setUsers] = useState([]);
    const [schedules, setSchedules] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const getUsers = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`https://consult-manage-admin-backend.vercel.app/users`);
            setUsers(response.data);
        } catch (error) {
            toast.error("Erro ao carregar usuários");
        } finally {
            setIsLoading(false);
        }
    }

    const getSchedules = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`https://consult-manage-admin-backend.vercel.app/schedules`);
            setSchedules(response.data);
        } catch (error) {
            toast.error("Erro ao carregar agendamentos");
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getUsers();
        getSchedules();
    }, [])

    const completedAppointments = schedules.filter(schedule => schedule.status === "completed").length;
    const canceledAppointments = schedules.filter(schedule => schedule.status === "canceled").length;

    return (
        <div className="dashboard">
            <h1>Dashboard</h1>
            <Spin className="cards-container" spinning={isLoading}>
                <Row gutter={16}>
                    <Col span={8}>
                        <Card
                            title="Pacientes cadastrados"
                            className="dashboard-card"
                            style={{ borderRadius: 20 }}
                        >
                            <Statistic
                                value={users.length}
                                valueStyle={{ color: '#3f8600' }}
                            />
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card
                            title="Agendamentos totais"
                            className="dashboard-card"
                            style={{ borderRadius: 20 }}
                        >
                            <Statistic
                                value={schedules.length}
                                valueStyle={{ color: '#3f8600' }}
                            />
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card
                            title="Consultas concluídas"
                            className="dashboard-card"
                            style={{ borderRadius: 20 }}
                        >
                            <Statistic
                                value={completedAppointments}
                                valueStyle={{ color: '#3f8600' }}
                                prefix={<ArrowUpOutlined />}
                            />
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card
                            title="Consultas canceladas"
                            className="dashboard-card"
                            style={{ borderRadius: 20 }}
                        >
                            <Statistic
                                value={canceledAppointments}
                                valueStyle={{ color: '#cf1322' }}
                                prefix={<ArrowDownOutlined />}
                            />
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card
                            title="Taxa de no-show"
                            className="dashboard-card"
                            style={{ borderRadius: 20 }}
                        >
                            <Statistic
                                value={(canceledAppointments / schedules.length) * 100}
                                precision={2}
                                valueStyle={{ color: '#cf1322' }}
                                suffix="%"
                            />
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card
                            title="Satisfação dos Pacientes"
                            className="dashboard-card"
                            style={{ borderRadius: 20 }}
                        >
                            <Progress
                                type="circle"
                                percent={75} 
                                width={80}
                            />
                        </Card>
                    </Col>
                </Row>
            </Spin>
            <Row gutter={16} style={{ marginTop: 16 }}>
                <Col span={12}>
                    <Card title="Próximos Agendamentos" className="dashboard-card">
                        <List
                            dataSource={schedules.slice(0, 5)}
                            renderItem={item => (
                                <List.Item>
                                    <List.Item.Meta
                                        title={item.patientName}
                                        description={`Data: ${new Date(item.date).toLocaleDateString()} - Hora: ${item.time}`}
                                    />
                                </List.Item>
                            )}
                        />
                    </Card>
                </Col>
                <Col span={12}>
                    <Card title="Tarefas Pendentes" className="dashboard-card">
                        <List
                            dataSource={[
                                'Confirmar agendamentos',
                                'Responder feedbacks dos pacientes',
                                'Verificar estoque de materiais médicos',
                                'Revisar prontuários de pacientes'
                            ]}
                            renderItem={item => (
                                <List.Item>
                                    <List.Item.Meta
                                        title={item}
                                    />
                                </List.Item>
                            )}
                        />
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default Home;
