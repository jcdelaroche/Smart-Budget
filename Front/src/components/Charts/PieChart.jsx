/* eslint-disable react/prop-types */
import Chart from "chart.js/auto";
import { useEffect, useState } from "react";
import './Chart.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { toCapitalize } from "../../utils/toCapitalize";

export default function PieChart({expenses}) { 
    const [chart, setChart] = useState(null)
    const [month, setMonth] = useState(new Date().getMonth())

    const colors = ["#e85f5c", "#820263", "#78c091", "#3772ff", "#3772ff"]
    const createData = () => {
        let data = {
            labels: [],
            datasets: [{
                label: 'Dépenses',
                data: [],
                backgroundColor: []
            }]
        }
        const expensesByMonth = expenses.filter(expense => new Date(expense.date).getMonth() === month)
        if (expensesByMonth.length === 0) {
            data.labels.push('Aucune dépense')
            data.datasets[0].data.push(1)
            data.datasets[0].backgroundColor.push('grey')
            return data
        } 
        expensesByMonth.forEach(expense => {
            if (data.labels.includes(expense.category)) {
                data.datasets[0].data[data.labels.indexOf(expense.category)] += expense.amount
            } else {
                data.labels.push(expense.category)
                data.datasets[0].data.push(expense.amount)
                data.datasets[0].backgroundColor.push(colors[data.labels.length - 1])
            }
        })
        return data;
    }

    useEffect(() => {
        if (chart) chart.destroy()
        expenses.filter(expense => new Date(expense.date).getMonth() === month)
        console.log(expenses)
        const data = createData()
        const ctx = document.querySelector('.pieChart').getContext('2d')
        setChart(() => new Chart(ctx, {
            type: 'pie',
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',                       
                        labels: {
                            color: 'white'
                        }
                    },
                    title: {
                        display: true,
                        text: 'Répartition des dépenses',
                        color: 'white'
                    }
                }
            }
        }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [expenses, month])
    return (
        <div className="pie">
            <div className="month">
                <button onClick={() => setMonth(month - 1)}><FontAwesomeIcon icon={faChevronLeft} /></button>
                <h4>{toCapitalize(new Date(0, month).toLocaleString('default', { month: 'long' }))}</h4>
                <button onClick={() => setMonth(month + 1)}><FontAwesomeIcon icon={faChevronRight} /></button>
            </div>
            <canvas className="pieChart">
            </canvas>
        </div>
    )
}