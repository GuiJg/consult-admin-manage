import CreateScheduleForm from "../components/forms/CreateScheduleForm";

function CadConsult() {
    return (
        <>
            <h1>Agendar Consultas</h1>
            <span>Preencha os campos abaixo para agendar uma consulta.</span>
            <div className="create-main">
                <CreateScheduleForm />
            </div>
        </>
    )
}

export default CadConsult;