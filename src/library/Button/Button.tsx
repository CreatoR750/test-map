import { FC } from "react";
import "./button.scss";

interface IButtonProps {
    text: string;
    variant: "primary" | "outlined";
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const Button: FC<IButtonProps> = ({ text, variant, onClick }) => {
    return (
        <button className={`btn ${variant}`} onClick={onClick}>
            {text}
        </button>
    );
};

export default Button;
