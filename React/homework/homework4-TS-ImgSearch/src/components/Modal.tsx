import React, { Component } from 'react'
import style from "./Components.module.css"

type Props = {
    imageURL: string | null,
    closeModal: ()=> void
}

export class Modal extends Component<Props>{
    render(): React.ReactNode {
        return (
            <div className={style.Overlay} onClick={this.props.closeModal}>
                <div className={style.Modal}>
                    <img src={this.props.imageURL || ''} alt="" />
                </div>
            </div>
          )
    }

}
