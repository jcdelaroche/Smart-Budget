/* eslint-disable react/prop-types */
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faXmark } from '@fortawesome/free-solid-svg-icons';
import Input from '../Input/Input';
import axios from '../../utils/axios';
import toast from 'react-hot-toast';
import './TransactionModal.css';
import { useParams } from 'react-router-dom';
import Select from '../Input/Select';


const TransactionModal = ({ addTransaction, transactionType, modify, transaction}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [amount, setAmount] = useState('');
    const [every, setEvery] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const { id } = useParams();

    const categories = {
        income: ["Salaire", "Loyer", "Vente", "Loisirs", "Transport", "Épargne", "Autre"],
        expense: ["Alimentation", "Shopping", "Assurance", "Loyer", "Transport", "Loisir", "Santé", "Impôts", "Épargne", "Crédit", "Études", "Autre"]
    }

    const everyOptions = ["Ponctuel", "Jour", "Mois", "Trimestre", "Semestre", "Année"];

    const openModal = () => {
        console.log(date)
        if (modify) {
            setAmount(() => transaction.amount);
            setCategory(() => transaction.category);
            setEvery(() => transaction.every);
            setIsOpen(true);  
        } else {
            setName(() => "");
            setAmount(() => "");
            setCategory(() => transactionType === "income" ? "Salaire" : "Alimentation");
            setEvery(() => "Ponctuel");
            setIsOpen(true);
        }
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const handleCreate = (e) => {
        e.preventDefault();
        axios.post(`/api/transactions`, {
            name,
            type: transactionType,
            category,
            amount,
            every,
            date,
            project: id
        })
        .then(response => {
            if(response.ok){
                console.log(response.data);
                addTransaction((prev) => [...prev, response.data]);
                toast.success("Transaction ajoutée avec succès");
            } else {
                toast.error(response.data.data);
            }
        })
        .catch(err => console.log(err));
        closeModal();
    }

    const handleModify = (e) => {
        e.preventDefault();
        axios.put(`/api/transactions/${transaction._id}`, {
            category,
            amount,
            every
        })
        .then(response => {
            if(response.ok){
                console.log(response.data);
                addTransaction((prev) => prev.map(e => e._id === transaction._id ? response.data : e));
                toast.success("Transaction modifiée avec succès");
            } else {
                toast.error(response.data.data);
            }
        })
        closeModal();
    }

    const handleDelete = (e) => {
        e.preventDefault();
        axios.delete(`/api/transactions/${transaction._id}`)
        .then((response) => {
            console.log(response.data);
            if(response.ok){
                console.log(response.data);
                addTransaction((prev) => prev.filter(e => e._id !== transaction._id));
                toast.success("Transaction supprimée avec succès");
            } else {
                toast.error(response.data.data);
            }
        })
        closeModal();
    }

    return (
        <>
            {modify ? <FontAwesomeIcon icon={faPenToSquare} className='modify' onClick={openModal}/> : <button onClick={openModal}>Ajouter {transactionType === "income" ? "un revenu" : "une dépense"}</button>}
            {isOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={closeModal}>
                            <FontAwesomeIcon icon={faXmark}/>
                        </span>
                        {modify ? <h2>{transaction.name}</h2> : <h2>Ajouter {transactionType === "income" ? "un revenu" : "une dépense"}</h2>}
                        <form>
                            {!modify && <Input type="text" name="name" label="Nom" value={name} onChange={(e) => setName(() => e.target.value)} />}
                            <Select name="category" label="Catégorie" value={category} onChange={(e) => setCategory(() => e.target.value)} options={transactionType === "income" ? categories.income : categories.expense}/>
                            <Input type="number" name="amount" label="Montant" value={amount} onChange={(e) => setAmount(() => e.target.value)} />
                            <Select name="every" label="Fréquence" value={every} onChange={(e) => setEvery(() => e.target.value)} options={everyOptions}/>
                            {!modify && <Input name="date" label="Date" type="date" value={date} onChange={(e) => setDate(() => e.target.value)} />}
                            <div className="buttons">
                                {modify ? <button type='submit' onClick={handleModify}>Modifier</button> : <button type="submit" onClick={handleCreate}>Créer</button>}
                                {modify && <button type='submit' onClick={handleDelete}>Supprimer</button>}
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default TransactionModal;