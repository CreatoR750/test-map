import React, { FC } from "react";
import close from "../../assets/svg/close.svg";
import "./modal.scss";

interface IModalProps {
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    title: string;
    children: React.ReactElement;
    size: "small" | "large";
}

const Modal: FC<IModalProps> = ({ setIsOpen, title, children, size }) => {
    const closeModal = (e: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
        e.stopPropagation();
        setIsOpen(false);
    };

    const outsideClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
        const target = e.target as HTMLDivElement;
        if (target.className === "modal__back") {
            setIsOpen(false);
        }
    };

    return (
        <div
            className="modal__back"
            onClick={(e) => {
                outsideClick(e);
            }}
        >
            <div style={{ width: size === "small" ? "600px" : "1000px" }} className="modal__wrapper">
                <div className="modal__title">
                    <h1>{title}</h1>
                    <img className="modal__title__close" src={close} alt="close" onClick={closeModal}></img>
                </div>
                {children}
            </div>
        </div>
    );
};

export default Modal;
