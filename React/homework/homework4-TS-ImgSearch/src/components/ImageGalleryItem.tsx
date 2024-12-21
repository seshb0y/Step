import React, { Component } from 'react'
import style from "./Components.module.css"
type Props = {
    images: {
        id: number;
        webformatURL: string;
    }[]
    onShowButton: (shouldShow: boolean) => void
}

export class ImageGalleryItem extends Component<Props> {
    
    componentDidMount(): void {
        this.props.onShowButton(true);
    }

  render(): React.ReactNode {
        const {images} = this.props

        return(
            <li className={style.ImageGalleryItem}>
                {images.map((image) => (
                    <img 
                    className={style.ImageGalleryItem}
                    key={image.id}
                    src={image.webformatURL}
                    />
                ))}
            </li>
        )
  }
}
