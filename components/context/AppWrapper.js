import { createContext, useContext, useState } from "react";
import Modal from "../Modal";
import Toast from "../Toast";

const AppContext = createContext();

export function AppWrapper({ children }) {
    const [modalContent, setModalContent] = useState("");
    const [showModal, setShowModal] = useState(false);
    const handleClose = () => {
        setShowModal(false);
        setModalContent("");
    };
    const handleShow = () => setShowModal(true);

    const [toastShow, setToastShow] = useState(false);
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState("");

    let sharedState = {
        modal: {
            show: showModal,
            content: modalContent,
            setModalContent: setModalContent,
            handleClose: handleClose,
            handleShow: handleShow,
        },
        toast: {
            show: toastShow,
            message: message,
            status: status,
            setMessage: setMessage,
            setStatus: setStatus,
            setToastShow: setToastShow,
        },
    };

    return (
        <AppContext.Provider value={sharedState}>
            {children}
            <Modal
                show={showModal}
                content={modalContent}
                onHide={handleClose}
            />
            <Toast
                message={message}
                status={status}
                show={toastShow}
                onClose={() => setToastShow(false)}
            />
        </AppContext.Provider>
    );
}
export function useAppContext() {
    return useContext(AppContext);
}
