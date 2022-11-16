import React, { FC } from "react";
import Button from "../../library/Button/Button";
import "./error.scss";

interface IErrorProps {
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    message: string;
}

const Error: FC<IErrorProps> = ({ setIsOpen, message }) => {
    return (
        <div className="error__wrapper">
            <div className="error__info">
                <span>{message}</span>
            </div>
            <div className="error__button">
                <Button text="OK" variant="primary" onClick={() => setIsOpen(false)} />
            </div>
        </div>
    );
};

export default Error;
