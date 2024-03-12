import { NavLink, useNavigate } from "react-router-dom"
import Cookies from "js-cookie"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import "./Navbar.css"
import { faDoorOpen, faHouse, faUser } from "@fortawesome/free-solid-svg-icons"

export default function Navbar() {
    const navigate = useNavigate()

    const handleLogout = (e) => {
        e.preventDefault()
        Cookies.remove('auth')
        navigate('/login')
    }
  return (
    <nav>
      <ul>
        {/* <li>
          <img className="logo" src="/assets/SmartBudgetLogo.png" alt="logo" />
          <span className="navtext logo">SmartBudget</span>
        </li> */}
        <li>
          <NavLink to='/'><FontAwesomeIcon icon={faHouse} /><span className="navtext">Accueil</span></NavLink>
        </li>
        <li>
          <NavLink to='/profile'><FontAwesomeIcon icon={faUser} /><span className="navtext">Compte</span></NavLink>
        </li>
        <li>
            <button onClick={handleLogout}><FontAwesomeIcon icon={faDoorOpen} /><span className="navtext">Déconnexion</span></button>
        </li>
      </ul>
    </nav>
  )
}