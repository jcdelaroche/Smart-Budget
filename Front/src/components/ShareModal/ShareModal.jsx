import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faShare, faXmark } from '@fortawesome/free-solid-svg-icons';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import './ShareModal.css';

// eslint-disable-next-line react/prop-types
const ShareModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { id } = useParams();
    const [url] = useState(`http://localhost:5173/share/${id}`);

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(url);
        toast.success('Lien copié');
    }

    return (
        <>
            <a onClick={openModal}><FontAwesomeIcon icon={faShare}/><span className='navtext'>Partager</span></a>
            {isOpen && (
                <section className="modal share">
                    <div className="modal-content">
                        <span className="close" onClick={closeModal}>
                            <FontAwesomeIcon icon={faXmark}/>
                        </span>
                        <h2>Partager</h2>
                        <form>
                            <label>Partager le lien</label>
                            <input type="text" name="name" value={url} readOnly/>
                            <FontAwesomeIcon icon={faCopy} onClick={handleCopy}/>
                        </form>
                    </div>
                </section>
            )}
        </>
    );
};

export default ShareModal;