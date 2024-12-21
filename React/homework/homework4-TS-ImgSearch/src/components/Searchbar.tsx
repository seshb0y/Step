import React, { Component } from 'react'

import style from "./Components.module.css"
import axios from 'axios'
// import { ImageGallery } from './ImageGallery';
// import { ImageGalleryItem } from './ImageGalleryItem';

type SearchbarProps = {
    onImagesUpdate: (images: { id: number; webformatURL: string }[]) => void;
};

export type State = {
    API_KEY: string;
    BASE_URL: string;
    search: string | null;
    images: [];
}


export class Searchbar extends Component<SearchbarProps, State> {
    state:State = {
        API_KEY: "47419937-9f04f29adf351466240a80859",
        BASE_URL: "https://pixabay.com/api/",
        search: null,
        images: [],
    }



    getImage = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const {API_KEY, BASE_URL, search} = this.state;
        axios.get(BASE_URL, {
            baseURL: BASE_URL,
            params: {
                key: API_KEY,
                q: search,
            }
        }).then(response => {
            this.setState({images: response.data.hits});
            this.props.onImagesUpdate(response.data.hits);
        }).catch(error => {
            console.log(error)
        })

    }
    handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({search: event.target.value})
    }

  render(): React.ReactNode {
      return(
            <div>
                <header className={style.Searchbar}>
                <form className={style.SearchForm} onSubmit={this.getImage}>
                    <button type="submit" className={style.SearchFormButton}>
                        <span className={style.SearchFormButtonLabel}>Search</span>
                    </button>
                    <input
                    className={style.SearchFormInput}
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                    onChange={this.handleSearchChange}
                    />
                </form>
            </header>
        </div>
      )
  }
}
