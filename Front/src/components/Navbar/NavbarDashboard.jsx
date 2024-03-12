import { faChartLine, faCreditCard, faDoorOpen, faMoneyBillTrendUp, faTrashCan, faTurnUp } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import "./Navbar.css"
import { NavLink, useParams, useNavigate } from "react-router-dom"
import axios from "../../utils/axios"
import toast from "react-hot-toast"
import ShareModal from "../ShareModal/ShareModal"
import Cookies from "js-cookie"

export default function NavbarDashboard() {
    const { id } = useParams()
    const navigate = useNavigate()

    const handleDelete = (e) => {
        e.preventDefault()
        axios.delete(`/api/projects/${id}`)
        .then(response => {
            response.ok ? navigate('/') && toast.success("Compte supprimé avec succès") : console.log(response.data)
        })
    }

    const handleLogout = (e) => {
        e.preventDefault()
        Cookies.remove('auth')
        navigate('/login')
    }

    const rotate = {
        transform: "rotate(270deg)"
    }

    return (
        <nav>
            <ul>
                <li>
                    <NavLink to={`/`}><FontAwesomeIcon icon={faTurnUp} style={rotate}/><span className="navtext">Retour</span></NavLink>
                </li>
                <li>
                    <NavLink to={`/dashboard/${id}`}><FontAwesomeIcon icon={faChartLine} /><span className="navtext"> Stats</span></NavLink>
                </li>
                <li>
                    <NavLink to={`/incomes/${id}`}><FontAwesomeIcon icon={faMoneyBillTrendUp} /><span className="navtext"> Revenus</span></NavLink>
                </li>
                <li>
                    <NavLink to={`/expenses/${id}`}><FontAwesomeIcon icon={faCreditCard} /><span className="navtext"> Dépenses</span></NavLink>
                </li>
                <li>
                    <ShareModal />
                </li>
                <li>
                    <button onClick={handleDelete}><FontAwesomeIcon icon={faTrashCan}/><span className="navtext">Supprimer le projet</span></button>
                </li>
                <li>
                    <button onClick={handleLogout}><FontAwesomeIcon icon={faDoorOpen} /><span className="navtext">Déconnexion</span></button>
                </li>
            </ul>
        </nav>
    )
}