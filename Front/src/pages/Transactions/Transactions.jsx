import { useParams } from "react-router-dom";
import axios from "../../utils/axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import NavbarDashboard from "../../components/Navbar/NavbarDashboard";
import TransactionModal from "../../components/TransactionModal/TransactionModal";
import TransactionCard from "../../components/TransactionCard/TransactionCard";
import "./Transactions.css";

// eslint-disable-next-line react/prop-types
export default function Transactions({transaction}) {
    const { id } = useParams()
    const [transactions, setTransactions] = useState([])

    useEffect(() => {
        axios.get(`/api/transactions/${transaction}s/${id}`)
        .then(response => {
            response.ok ? setTransactions(() => response.data) : toast.error(response.data.data)
        })
        .catch(err => console.log(err))
    }, [id, transaction])

    return (
        <>
            <NavbarDashboard />
            <section className="transaction">
                <h1>{transaction === "income" ? "Revenus" : "Dépenses"}</h1>
                <TransactionModal addTransaction={setTransactions} transactionType={transaction}/>
                {transactions?.map((e) => (
                    <TransactionCard key={e._id} transactionType={transaction} addTransaction={setTransactions} {...e}/>
                ))}
            </section>
        </>
    )
}