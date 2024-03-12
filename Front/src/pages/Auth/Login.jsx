import Input from "../../components/Input/Input"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Cookies from 'js-cookie'
import axios from '../../utils/axios'
import "./auth.css"
import toast from "react-hot-toast"

export default function Login(){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [remember, setRemember] = useState(false)
    const navigate = useNavigate()

    const onSubmit = async (e) => {
        e.preventDefault()
        if ( !email || !password ) return toast.error("Veuillez remplir tous les champs")
        const response = await axios.post('/api/users/login', {
            email,
            password,
            remember
        })
        if (response.ok) {
            Cookies.set('auth', response.data.token, {expires: remember ? 31 : 1})
            navigate("/")
        }
        else {
            toast.error("Identifiants invalides")
        }
    }
    return (
        <div className="form-container">
            <h1>Se connecter</h1>
            <p>Pas de compte ? <Link to="/signup">S&apos;inscrire</Link></p>
            <form>
                <Input type="email" name="email" label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <Input type="password" name="password" label="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <Input type="checkbox" name="remember" label="Se souvenir de moi" value={remember} onChange={(e) => setRemember(e.target.value)}/>
                <button type="submit" className="btn btn-primary" onClick={onSubmit}>Se connecter</button>
            </form>
        </div>
    )
}