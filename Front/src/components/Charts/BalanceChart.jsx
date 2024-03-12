/* eslint-disable react/prop-types */
import Chart from "chart.js/auto";
import { useEffect, useState } from "react";
import './Chart.css'
import { toCapitalize } from "../../utils/toCapitalize";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

export default function BalanceChart({incomes, expenses}) { 
    const [chart, setChart] = useState(null)
    const [year, setYear] = useState(new Date().getFullYear())

    const colors = ["#e85f5c", "#820263", "rgba(50, 170, 220, 0.9)"]
    const months = [
        'Janvier',
        'Février',
        'Mars',
        'Avril',
        'Mai',
        'Juin',
        'Juillet',
        'Août',
        'Septembre',
        'Octobre',
        'Novembre',
        'Décembre'
    ]

    const createData = () => {
        let data = {
            datasets: [{
                type: 'bar',
                label: 'Revenus',
                data: [0,0,0,0,0,0,0,0,0,0,0,0,0],
                backgroundColor: [colors[0]],
                order: 1
            },
            {
                type: 'bar',
                label: 'Dépenses',
                data: [0,0,0,0,0,0,0,0,0,0,0,0,0],
                backgroundColor: [colors[1]],
                order: 2
            },
            {
                type: 'line',
                label: 'Solde',
                data: [],
                borderColor: [colors[2]],
                backgroundColor: [colors[2]],
                order: 0
            }],
            labels: months
        }

        expenses.forEach(expense => {
            const date = new Date(expense.date)
            if (date.getFullYear() === year || expense.every !== 'Ponctuel') {
                switch (expense.every) {
                    case 'Ponctuel':
                        if(year === date.getFullYear()) data.datasets[1].data[date.getMonth()] += expense.amount
                        break;
                    case 'Jour':
                        months.forEach((month, index) => {
                            if (index === date.getMonth() && date.getFullYear() === year) {
                                data.datasets[1].data[index] += expense.amount * (new Date(date.getFullYear(), index + 1, 0).getDate() - date.getDate() + 1)
                            } else if (index > date.getMonth() || date.getFullYear() !== year) {
                                data.datasets[1].data[index] += expense.amount * new Date(date.getFullYear(), index + 1, 0).getDate()
                            }
                        })
                        break;
                    case 'Mois':
                        months.forEach((month, index) => {
                            if (index >= date.getMonth() || date.getFullYear() !== year) data.datasets[1].data[index] += expense.amount
                        })
                        break;
                    case 'Trimestre':
                        months.forEach((month, index) => {
                            if ((index + date.getMonth()) % 3 === 0 && (index + 1 >= date.getMonth() || date.getFullYear() !== year)) {
                                data.datasets[1].data[index] += expense.amount
                            }
                        })
                        break;
                    case 'Semestre':
                        months.forEach((month, index) => {
                            if ((index + date.getMonth()) % 6 === 0 && (index + 1 >= date.getMonth() || date.getFullYear() !== year)) {
                                data.datasets[1].data[index] += expense.amount
                            }
                        })
                        break;
                    case 'Année':
                        data.datasets[1].data[date.getMonth()] += expense.amount
                        break;
                    default:
                        break;
                }
            }               
        })
        incomes.forEach(income => {
            const date = new Date(income.date)
            if (date.getFullYear() === year || income.every !== 'Ponctuel') {
                switch (income.every) {
                    case 'Ponctuel':
                        if(year === date.getFullYear()) data.datasets[0].data[date.getMonth()] += income.amount
                        break;
                    case 'Jour':
                        months.forEach((month, index) => {
                            if (index === date.getMonth() && date.getFullYear() === year) {
                                data.datasets[0].data[index] += income.amount * (new Date(date.getFullYear(), index + 1, 0).getDate() - date.getDate() + 1)
                            } else if (index > date.getMonth() || date.getFullYear() !== year) {
                                data.datasets[0].data[index] += income.amount * new Date(date.getFullYear(), index + 1, 0).getDate()
                            }
                        })
                        break;
                    case 'Mois':
                        months.forEach((month, index) => {
                            if (index >= date.getMonth() || date.getFullYear() !== year) data.datasets[0].data[index] += income.amount
                        })
                        break;
                    case 'Trimestre':
                        months.forEach((month, index) => {
                            if ((index + date.getMonth()) % 3 === 0 && (index + 1 >= date.getMonth() || date.getFullYear() !== year)){
                                data.datasets[0].data[index] += income.amount
                            }
                        })
                        break;
                    case 'Semestre':
                        months.forEach((month, index) => {
                            if ((index + date.getMonth()) % 6 === 0 && (index + 1 >= date.getMonth() || date.getFullYear() !== year)){
                                data.datasets[0].data[index] += income.amount
                            }
                        })
                        break;
                    case 'Année':
                        data.datasets[0].data[date.getMonth()] += income.amount
                        break;
                    default:
                        break;
                }
            }
        })
        for (let i = 0; i < 12; i++) {
            data.datasets[2].data.push(data.datasets[0].data[i] - data.datasets[1].data[i])
        }
        console.log(data)
        return data;
    }

    useEffect(() => {
        if (chart) chart.destroy()
        const data = createData()
        const ctx = document.querySelector('.balanceChart').getContext('2d')
        setChart(() => new Chart(ctx, {
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
                        text: 'Solde mensuel',
                        color: 'white'
                    }
                },
                scales: {
                    y: {
                        ticks: {
                            color: 'white'
                        }
                    },
                    x: {
                        ticks: {
                            color: 'white'
                        }
                    }
                }
            }
        }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [expenses, year])
    return (
        <div className="balance">
            <div className="year">
                <button onClick={() => setYear(year - 1)}><FontAwesomeIcon icon={faChevronLeft} /></button>
                <h4>{toCapitalize(
                    new Date(year, 0).toLocaleString('fr-FR', {year: 'numeric'})
                )}</h4>
                <button onClick={() => setYear(year + 1)}><FontAwesomeIcon icon={faChevronRight} /></button>
            </div>
            <canvas className="balanceChart">
            </canvas>
        </div>
    )
}