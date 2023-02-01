import React from "react";
import "./Buttonn.css";


const Buttonn = (props) => {
    const { imgSrc, handleDelete, handleEdit, selector, id }  = props;

    const handleOnClick = () => {
        if (selector === 'deleteButton') {
            handleDelete(id);
        }
        if (selector === 'editButton') {
            handleEdit(id);
        }

    };
    return(
        <button onClick={handleOnClick} className="button">
            <img alt={selector} className="icon" src={imgSrc}/>
        </button>
    );
}


export default Buttonn;