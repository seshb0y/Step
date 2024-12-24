import React, { Component } from 'react'
import style from "./Components.module.css"

type Props = {
    loadMore: () => void
    isLoading: boolean
}

export const Button: React.FC<Props> = (props) => {

    return (
        <div>
            {props.isLoading ? (
                <div>...</div>
            ) : (
            <div className={style.Button} onClick={props.loadMore}>Load</div>)}
        </div>
        
        )
}
