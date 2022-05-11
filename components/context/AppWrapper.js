import { createContext, useContext, useState } from "react";
import Modal from "@/components/Modal";
import Toast from "@/components/Toast";
import SlideOut from "@/components/SlideOut";

const AppContext = createContext();

export function AppWrapper({ children }) {
    const [modalContent, setModalContent] = useState("");
    const [showModal, setShowModal] = useState(false);
    const handleClose = () => {
        setShowModal(false);
        setModalContent("");
    };
    const handleShow = () => setShowModal(true);

    const [slideContent, setSlideContent] = useState("");
    const [showSlide, setShowSlide] = useState(false);
    const handleSlideClose = () => {
        setShowSlide(false);
        setSlideContent("");
    };
    const handleSlideShow = () => setShowSlide(true);

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
        slideOut: {
            show: showSlide,
            content: slideContent,
            setSlideContent: setSlideContent,
            handleSlideClose: handleSlideClose,
            handleSlideShow: handleSlideShow,
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
            <SlideOut
                show={showSlide}
                content={slideContent}
                onHide={handleSlideClose}
            />
        </AppContext.Provider>
    );
}
export function useAppContext() {
    return useContext(AppContext);
}
