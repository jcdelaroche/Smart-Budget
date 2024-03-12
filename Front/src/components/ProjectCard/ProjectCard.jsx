/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom'
import './ProjectCard.css'
import { displayDate } from '../../utils/displayDate'

export default function ProjectCard({ _id, name, date}) {
    return (
        <div className='projectCard'>
            <Link to={`/dashboard/${_id}`}>
                <h2>{name}</h2>
                <p>{displayDate(date)}</p>
            </Link>
        </div>
    )
}