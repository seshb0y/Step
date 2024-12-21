import { Component, ReactNode } from 'react';
import './components/Components.module.css'
import { ImageGallery } from './components/ImageGallery'
// import './App.css'
import { Searchbar } from './components/Searchbar'
import { Button } from './components/Button';
type AppState = {
  images: {
    id: number,
    webformatURL: string;
  }[];
  loadButton: boolean,
};


class App extends Component<{}, AppState> {
  state: AppState = {
    images: [],
    loadButton: false,
  };
  
  handleShowButton = (shouldShow:boolean) => {
    this.setState({loadButton: shouldShow})
  }

  handleImageUpdate = (images: AppState['images']) => {
    this.setState(images);
  }
  render(): ReactNode {
    return (
      <div>
            <Searchbar onImagesUpdate={this.handleImageUpdate}/>
            <ImageGallery images={this.state.images} onShowButton={this.handleShowButton}/>
            {/* {this.state.loadButton && <Button/>} */}
      </div>
    )
  }

}

export default App
