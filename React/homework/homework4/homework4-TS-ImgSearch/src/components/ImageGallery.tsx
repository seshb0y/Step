import React, { Component } from 'react'
import { ImageGalleryItem } from './ImageGalleryItem';
import style from "./Components.module.css"
type Props = {
    images: {
        id: number;
        webformatURL: string;
    }[]
    onShowButton: (shouldShow: boolean) => void;
    isOpen: () => void
}

export class ImageGallery extends Component<Props> {
  
  render(): React.ReactNode {
    const {images} = this.props
      return(
        
        <ul className={style.ImageGallery}>
            {images.map((image) => (
              <ImageGalleryItem key={image.id} image={image} onShowButton={this.props.onShowButton} isOpen={this.props.isOpen}/>
            ))}
        </ul>
      )
  }
}
