import { CloseOutlined } from "@ant-design/icons";

// eslint-disable-next-line react/prop-types
const ModalEdit = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;
    return (
        <div className="modal"> 
            <div className="modal-content">
                <div className="text-close-button">
                    <h1>Editar</h1>
                    <CloseOutlined onClick={onClose} />
                </div>  
                {children}
            </div>
        </div>
    );
};
export default ModalEdit;