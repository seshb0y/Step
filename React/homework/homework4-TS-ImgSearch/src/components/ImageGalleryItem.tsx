import React, { Component } from 'react'
import style from "./Components.module.css"
type Props = {
    image: {
        id: number;
        webformatURL: string;
    }
    onShowButton: (shouldShow: boolean) => void
    isOpen: () => void
}

export class ImageGalleryItem extends Component<Props> {
    
    componentDidMount(): void {
        this.props.onShowButton(true);
    }

  render(): React.ReactNode {
        const {image} = this.props
        
        return(
            <li className={style.ImageGalleryItem}>
                <img className={style.ImageGalleryItemImage} src={image.webformatURL} alt="" onClick={this.props.isOpen}/>
            </li>
        )
  }
}
