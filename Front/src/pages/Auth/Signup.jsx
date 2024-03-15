import Input from "../../components/Input/Input"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from '../../utils/axios'
import "./auth.css"
import toast from "react-hot-toast"

export default function Signup(){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const navigate = useNavigate()

    const onSubmit = async (e) => {
        e.preventDefault()
        if (!email || !password || !name || !surname) {
            toast.error("Veuillez remplir tous les champs")
            return
        }
        if (password.length < 8 || !/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/[0-9]/.test(password) || !/[^A-Za-z0-9]/.test(password)){
            toast.error("Le mot de passe doit contenir au moins 8 caractères dont un chiffre, une majuscule, une minuscule et un caractère spécial")
            return
        }
        if (!/^[a-zA-ZÀ-ÿ\s]{2,30}$/.test(name)){
            toast.error("Le nom doit contenir entre 2 et 30 caractères")
            return
        }
        if (!/^[a-zA-ZÀ-ÿ\s]{2,30}$/.test(surname)){
            toast.error("Le prénom doit contenir entre 2 et 30 caractères")
            return
        }
        if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email)){
            toast.error("Email invalide")
            return
        }
        const response = await axios.post('/api/users/signup', {
            email,
            password,
            name,
            surname
        })
        if (response.ok) {
            toast.success("Compte créé avec succès")
            navigate("/login")
        }
        else {
            toast.error(response.data.data)
        }
    }

    return (
        <div className="form-container">
            <h1>S&apos;inscrire</h1>
            <p>Déjà un compte ? <Link to="/login">Se connecter</Link></p>
            <form>
                <Input type="text" name="name" label="Nom" value={name} onChange={(e) => setName(e.target.value)} />
                <Input type="text" name="surname" label="Prénom" value={surname} onChange={(e) => setSurname(e.target.value)} />
                <Input type="email" name="email" label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <Input type="password" name="password" label="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <button type="submit" className="btn btn-primary" onClick={onSubmit}>S&apos;inscrire</button>
            </form>
        </div>
    )
}