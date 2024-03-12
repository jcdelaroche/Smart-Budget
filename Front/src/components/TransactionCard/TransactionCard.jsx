/* eslint-disable react/prop-types */
import './TransactionCard.css'
import { displayDate } from '../../utils/displayDate'
import TransactionModal from '../TransactionModal/TransactionModal'

export default function TransactionCard({ transactionType, addTransaction, _id, name, date, amount, every, category}) {
    return (
        <div className='transactionCard'> 
            <h2>{name}</h2>
            <TransactionModal transactionType={transactionType} addTransaction={addTransaction} transaction={{_id, name, amount, every, category}} modify/>
            <table>
                <tbody>
                    <tr>
                        <td>{displayDate(date)}</td>
                        <td>{amount}€</td>
                        <td>{category}</td>
                        <td>{every}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}