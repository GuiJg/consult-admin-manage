import CreateUserForm from "../components/forms/CreateUserForm";

function RegisterClients() {

    return (
        <>
            <h1>Cadastro de Paciente</h1>
            <span>Preencha os campos abaixo para cadastrar um novo paciente.</span>
            <div className="create-main">
                <CreateUserForm />
            </div>
        </>
    )
}

export default RegisterClients;