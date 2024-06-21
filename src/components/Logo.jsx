import { Link } from "react-router-dom";

function Logo() {
    return (
        <div className="logo">
            <Link to={"/perfil-adm"} className="logo-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 20v-1a7 7 0 0 1 7-7v0a7 7 0 0 1 7 7v1m-7-8a4 4 0 1 0 0-8a4 4 0 0 0 0 8"></path></svg>
            </Link>
        </div>
    )
}

export default Logo;