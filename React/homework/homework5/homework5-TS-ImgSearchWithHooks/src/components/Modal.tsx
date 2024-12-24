import React from 'react'
import style from "./Components.module.css"

type Props = {
    imageURL: string | null,
    closeModal: ()=> void
}

export const Modal: React.FC<Props> = (props) => {
    return (
        <div className={style.Overlay} onClick={props.closeModal}>
            <div className={style.Modal}>
                <img src={props.imageURL || ''} alt="" />
            </div>
        </div>
        )
}
