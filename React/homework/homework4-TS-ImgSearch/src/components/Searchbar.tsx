import React, { Component } from 'react'

import style from "./Components.module.css"
// import axios from 'axios'
// import { ImageGallery } from './ImageGallery';
// import { ImageGalleryItem } from './ImageGalleryItem';

type SearchbarProps = {
    onImageSearch: (search: string | null) => void
    loadMore: () => void
};

export type State = {
    search: string | null;
}


export class Searchbar extends Component<SearchbarProps, State> {
    state:State = {
        search: null,
    }

    handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        this.props.onImageSearch(this.state.search);
        this.props.loadMore();
      };

    handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({search: event.target.value})
    }

  render(): React.ReactNode {
      return(
            <div>
                <header className={style.Searchbar}>
                <form className={style.SearchForm} onSubmit={this.handleFormSubmit}>
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
