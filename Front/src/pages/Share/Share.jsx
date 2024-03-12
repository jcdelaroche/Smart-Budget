import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import axios from "../../utils/axios";

export default function Share() {
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        axios.put(`/api/projects/join/${id}`)
        .then(response => {
            response.ok ? toast.success(`Projet rejoint avec succès`) : toast.error(response.data.data)
        })
        navigate(`/dashboard/${id}`)
    }, [id, navigate])

    return (
        <></>
    )
}