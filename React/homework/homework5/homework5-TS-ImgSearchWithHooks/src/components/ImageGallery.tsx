import React from 'react'
import { ImageGalleryItem } from './ImageGalleryItem';
import style from "./Components.module.css"
type Props = {
    images: {
        id: number;
        webformatURL: string;
    }[]
    onShowButton: (shouldShow: boolean) => void;
    isOpen: (event: React.MouseEvent) => void
}

export const ImageGallery: React.FC<Props> = (props) => {
  
  const {images} = props
  console.log("images", images)
    return(
      <ul className={style.ImageGallery}>
          {images.map((image) => (
            <ImageGalleryItem key={image.id} image={image} onShowButton={props.onShowButton} isOpen={props.isOpen}/>
          ))}
      </ul>
    )
}
