import { useState } from 'react';
import './ProjectModal.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import Input from '../Input/Input';
import axios from '../../utils/axios';
import toast from 'react-hot-toast';

// eslint-disable-next-line react/prop-types
const ProjectModal = ({addProject}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState('');

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('/api/projects', {
            name
        }).then(response => {
            response.ok ?
                addProject(prev => [...prev, response.data]) :
                toast.error(response.data.data);
        });
        closeModal();
    }
    return (
        <>
            <button onClick={openModal}>Créer un projet</button>
            {isOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={closeModal}>
                            <FontAwesomeIcon icon={faXmark}/>
                        </span>
                        <h2>Créer un projet</h2>
                        <form>
                            <Input type="text" name="name" label="Nom" value={name} onChange={(e) => setName(() => e.target.value)} />
                            <button type="submit" onClick={handleSubmit}>Créer</button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default ProjectModal;