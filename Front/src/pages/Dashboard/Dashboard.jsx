import { useParams } from "react-router-dom"
import NavbarDashboard from "../../components/Navbar/NavbarDashboard"
import PieChart from "../../components/Charts/PieChart"
import axios from "../../utils/axios"
import { useEffect, useState } from "react"
import BalanceChart from "../../components/Charts/BalanceChart"
import "./Dashboard.css"

export default function Dashboard() {
    const { id } = useParams()
    const [project, setProject] = useState({})
    const [expenses, setExpenses] = useState([])
    const [incomes, setIncomes] = useState([])

    useEffect(() => {
        axios.get(`/api/projects/${id}`)
        .then(response => {
            setProject(() => response.data)
            setExpenses(() => response.data.expenses)
            setIncomes(() => response.data.incomes)
        })
        .catch(err => console.log(err))
    }, [id])

    return (
        <>
            <NavbarDashboard />
            <section className="dashboard">
                <h1>{project.name}</h1>
                <BalanceChart expenses={expenses} incomes={incomes}/>
                <PieChart expenses={expenses}/>
            </section>
        </>
    )
}