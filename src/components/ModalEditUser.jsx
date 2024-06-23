// eslint-disable-next-line react/prop-types
const ModalEdit = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;
    return (
        <div className="modal"> 
            <div className="modal-content">
                <div className="text-close-button">
                    <h1>Editar</h1>
                    <svg onClick={onClose} xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="black" d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6z" className="close" /></svg>
                </div>  
                {children}
            </div>
        </div>
    );
};
export default ModalEdit;