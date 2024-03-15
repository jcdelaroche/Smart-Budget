import { useState } from 'react';
import './DeleteModal.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faXmark } from '@fortawesome/free-solid-svg-icons';

// eslint-disable-next-line react/prop-types
const DeleteModal = ({handleSubmit, label, nav}) => {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = (e) => {
        e.preventDefault();
        setIsOpen(true);
    };

    const closeModal = (e) => {
        e.preventDefault();
        setIsOpen(false);
    };

    return (
        <>
            <button onClick={openModal}><FontAwesomeIcon icon={faTrashCan} />{nav ? <span className='navtext'>Supprimer le {label}</span> : `Supprimer le ${label}`}</button>
            {isOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={closeModal}>
                            <FontAwesomeIcon icon={faXmark}/>
                        </span>
                        <h2>Êtes-vous sûr de vouloir supprimer le {label} ?</h2>
                        <form>
                            <button className='deleteButton' type="submit" onClick={handleSubmit}><FontAwesomeIcon icon={faTrashCan}/>Supprimer</button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default DeleteModal;