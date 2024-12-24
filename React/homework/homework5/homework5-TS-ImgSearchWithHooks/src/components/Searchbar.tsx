import React, { useState } from 'react'

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


export const Searchbar: React.FC<SearchbarProps> = (props) => {
    const [search, setSearch] = useState("");

    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        props.onImageSearch(search);
        props.loadMore();
      };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch( event.target.value)
    }

    return(
        <div>
            <header className={style.Searchbar}>
            <form className={style.SearchForm} onSubmit={handleFormSubmit}>
                <button type="submit" className={style.SearchFormButton}>
                    <span className={style.SearchFormButtonLabel}>Search</span>
                </button>
                <input
                className={style.SearchFormInput}
                type="text"
                autoComplete="off"
                autoFocus
                placeholder="Search images and photos"
                onChange={handleSearchChange}
                />
            </form>
        </header>
    </div>
    )
}
