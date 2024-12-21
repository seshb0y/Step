import React, { Component } from 'react'
import { ImageGalleryItem } from './ImageGalleryItem';
import style from "./Components.module.css"
type Props = {
    images: {
        id: number;
        webformatURL: string;
    }[]
    onShowButton: (shouldShow: boolean) => void;
}

export class ImageGallery extends Component<Props> {
  
  render(): React.ReactNode {
      return(
        <ul className={style.ImageGallery}>
            <ImageGalleryItem images={this.props.images} onShowButton={this.props.onShowButton}/>
        </ul>
      )
  }
}
