import React, { useEffect } from 'react'
import style from "./Components.module.css"
type Props = {
    image: {
        id: number;
        webformatURL: string;
    }
    onShowButton: (shouldShow: boolean) => void
    isOpen: (event: React.MouseEvent) => void
}

export const ImageGalleryItem: React.FC<Props> = (props) => {
    
    useEffect(() => {
        props.onShowButton(true);
    })

    return(
        <li className={style.ImageGalleryItem}>
            <img className={style.ImageGalleryItemImage} src={props.image.webformatURL} alt="" onClick={props.isOpen}/>
        </li>
    )
}
