import {useEffect, useState } from 'react';
import './components/Components.module.css'
import { ImageGallery } from './components/ImageGallery'
import axios from 'axios';
// import './App.css'
import { Searchbar } from './components/Searchbar'
import { Button } from './components/Button';
import { Modal } from './components/Modal';
// import { ImageGalleryItem } from './components/ImageGalleryItem';


const App = () => {
  const [images, setImages] = useState<{id: number; webformatURL: string}[]>([]);
  const [loadButton, setLoadButton] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const [currentSearch, setCurrentSearch] = useState({
    search: "",
    page: 1,
  })
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [openImageURL, setOpenImageURL] = useState("")


  const getImage = (search: string | null) => {
    const API_KEY = "47419937-9f04f29adf351466240a80859";
    const BASE_URL = "https://pixabay.com/api/";

    setIsLoading(true);
    
    if (!search) return;
    axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: search,
        page: currentSearch.page
      },
    }).then((response) => {
      if(!loadMore){
        setImages(response.data.hits)
        setCurrentSearch({search: search, page: 1})
      }
      else{
        setImages((prev) => [...prev, ...response.data.hits])
      }
    }).catch((error) => {
      console.error(error);
    }).finally(() => {
      setIsLoading(false)
    })
  };

  const handleShowButton = (shouldShow:boolean) => {
    setLoadButton(shouldShow)
  }

  const noLoadMore = () => {
    setLoadMore(false)
  }
  
  useEffect(() => {
    if(loadMore){
      getImage(currentSearch.search)
    }
  },[currentSearch.page])
  
  const loadingMore = () => {
    setLoadMore(true);
    setCurrentSearch((prev) => ({...prev, page: prev.page + 1}))
  }

  const openImage = (event: React.MouseEvent<HTMLImageElement>) => {
    const img = event.currentTarget.src
    setIsOpen(true);
    setOpenImageURL(img)
  }

  const closeModal = () => {
    setIsOpen(false);
    setOpenImageURL("")
  }

  return (
    <div>
          <Searchbar onImageSearch={getImage} loadMore={noLoadMore}/>
          <ImageGallery images={images} onShowButton={handleShowButton} isOpen={openImage}/>
          {loadButton && <Button loadMore={loadingMore} isLoading={isLoading}/>}
          {isOpen && <Modal imageURL={openImageURL} closeModal={closeModal}/>}
    </div>
  )
}

export default App
