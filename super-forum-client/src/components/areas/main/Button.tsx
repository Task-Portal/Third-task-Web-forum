

import React, {FC} from "react";

interface ButtonProps {
    btnName: string;
    state:string
}

const Button : FC<ButtonProps> = ({ btnName,state }) => {
    return <li className="nav-item">
        <button className={`btn btn-dark me-2${state}`} aria-current="page" >{btnName}</button>
    </li>
};

export default Button;
