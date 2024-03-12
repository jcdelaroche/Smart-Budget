import axios from '../../utils/axios'
import { useState, useEffect } from "react"
import "./Home.css"
import ProjectCard from '../../components/ProjectCard/ProjectCard'
import Navbar from '../../components/Navbar/Navbar'
import ProjectModal from '../../components/ProjectModal/ProjectModal'
import toast from 'react-hot-toast'

export default function Home(){
    const [projects, setProjects] = useState([])

    useEffect(() => {
        axios.get('/api/projects/user')
        .then(response => {
            response.ok ? setProjects(() => response.data) : toast.error(response.data.data)
        })
        .catch(err => console.log(err))
    }, [])

    return (
        <>
            <Navbar />
            <section className="home">
                <h1>Home</h1>
                <ProjectModal addProject={setProjects}/>
                {projects?.map((project) => (
                    <ProjectCard key={project._id} {...project} />
                ))}
            </section>
        </>
    )
}
