import React, { Component } from 'react'
import style from "./Components.module.css"

type Props = {
    loadMore: () => void
    isLoading: boolean
}

export class Button extends Component<Props>{

    render(): React.ReactNode {
        return (
            <div>
                {this.props.isLoading ? (
                    <div>...</div>
                ) : (
                <div className={style.Button} onClick={this.props.loadMore}>Load</div>)}
            </div>
            
          )
    }

}
