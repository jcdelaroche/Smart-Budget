import Navbar from "../../components/Navbar/Navbar";
import Input from "../../components/Input/Input";
import "./Profile.css";
import { useState, useEffect } from "react";
import axios from "../../utils/axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import DeleteModal from "../../components/DeleteModal/DeleteModal";

export default function Profile() {
    const navigate = useNavigate()
    const [name, setName] = useState("")
    const [surname, setSurname] = useState("")
    const [email, setEmail] = useState("")

    useEffect(() => {
        axios.get('/api/users/user')
        .then(response => {
            const {name, surname, email} = response.data
            setName(() => name)
            setSurname(() => surname)
            setEmail(() => email)
        })
    }, [])

    const handleModify = (e) => {
        e.preventDefault()
        axios.put('/api/users/user', {
            name,
            surname,
            email
        }).then(() => {
            toast.success("Profil modifié avec succès")
        })
    }

    const handleSuppr = (e) => {
        e.preventDefault()
        axios.delete('/api/users/user')
        .then(response => {
            if (response.ok) {
                Cookies.remove('auth')
                navigate('/login')
            }
        })
    }
    return (
        <>
            <Navbar />
            <section className="profile">
                <h1>Profil</h1>
                <form>
                    <Input label="Nom" type="text" value={name} onChange={(e) => setName(e.target.value)}/>
                    <Input label="Prénom" type="text" value={surname} onChange={(e) => setSurname(e.target.value)}/>
                    <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <button type="submit" onClick={handleModify}>Modifier</button>
                </form>
                <DeleteModal handleSuppr={handleSuppr} label={'compte'}/>
            </section>
        </>
    )
}