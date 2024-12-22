import { Component, ReactNode } from 'react';
import './components/Components.module.css'
import { ImageGallery } from './components/ImageGallery'
import axios from 'axios';
// import './App.css'
import { Searchbar } from './components/Searchbar'
import { Button } from './components/Button';
import { Modal } from './components/Modal';
// import { ImageGalleryItem } from './components/ImageGalleryItem';
type AppState = {
  images: {
    id: number,
    webformatURL: string;
  }[];
  loadButton: boolean,
  loadMore: boolean
  currentSearch: {
    search: string | null,
    per_page: number,
    page: number
  }
  isLoading: boolean,
  isOpen: false,
  openImageURL: string | null
};


class App extends Component<AppState> {
  state: AppState = {
    images: [],
    loadButton: false,
    loadMore: false,
    currentSearch: {
      search: null,
      per_page: 20,
      page: 1
    },
    isLoading: false,
    isOpen: false,
    openImageURL: null
  };

  getImage = (search: string | null) => {
    const API_KEY = "47419937-9f04f29adf351466240a80859";
    const BASE_URL = "https://pixabay.com/api/";

    this.setState({ isLoading: true });
    
    if (!search) return;
    axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: search,
        per_page: this.state.currentSearch.per_page,
        page: this.state.currentSearch.page
      },
    }).then((response) => {
      if(!this.state.loadMore){
        this.setState({ 
          images: response.data.hits, 
          currentSearch: {
            search: search,
             page: 1
            } 
          });
      }
      else{
        this.setState((prev:AppState) => ({ 
          images: [...prev.images, ...response.data.hits]
        }));
      }
    }).catch((error) => {
      console.error(error);
    }).finally(() => {
      this.setState({isLoading: false})
    })
  };

  handleShowButton = (shouldShow:boolean) => {
    this.setState({loadButton: shouldShow})
  }

  noLoadMore = () => {
    this.setState(() => ({loadMore: false}))
  }
  
  loadMore = () => {
    this.setState((prev: AppState) => ({
      loadMore: true,
      currentSearch: {
        ...prev.currentSearch,
        page: prev.currentSearch.page + 1,
      }
    }), () => {
      this.getImage(this.state.currentSearch.search);
    })
    
  }

  openImage = (event: React.MouseEvent<HTMLImageElement>) => {
    const img = event.currentTarget.src
    this.setState({isOpen: true, openImageURL: img})
  }

  closeModal = () => {
    this.setState({isOpen: false, openImageURL: null})
  }

  render(): ReactNode {
    return (
      <div>
            <Searchbar onImageSearch={this.getImage} loadMore={this.noLoadMore}/>
            <ImageGallery images={this.state.images} onShowButton={this.handleShowButton} isOpen={this.openImage}/>
            {this.state.loadButton && <Button loadMore={this.loadMore} isLoading={this.state.isLoading}/>}
            {this.state.isOpen && <Modal imageURL={this.state.openImageURL} closeModal={this.closeModal}/>}
      </div>
    )
  }

}

export default App
