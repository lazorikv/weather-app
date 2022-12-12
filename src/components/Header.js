import {useEffect, useState} from 'react'
import "../style/header.css";

const Header = (props) => {

    const [open, setOpen] = useState(false);
    const [favoritePlaces, setFavoritePlaces] = useState([])
    const handleOpen = () => {
    setOpen(!open);
  };

  const addPlaceToCookieFunction = () => {
      let places = localStorage.getItem('favorites');
      let check = places.includes(props.searchTerm)
      if (check === false) {
          favoritePlaces.push(props.searchTerm)
    setFavoritePlaces(favoritePlaces)
    localStorage.setItem('favorites', JSON.stringify(favoritePlaces))
      }

  }

  const searchPlace = (place) => {
      props.setSearchTerm(place)
  }

  const favoritesList = () => {
      return JSON.parse(localStorage.getItem('favorites'));
  }

  useEffect(
      () => {favoritesList()}, favoritePlaces
  )


    return (
        <div className="favorites">
            <div>
                <button className="addToFavorite" onClick={addPlaceToCookieFunction}>Add to Favorite</button>
            </div>
            <div className="dropdown">
      <button className="addToFavorite favorite-btn" onClick={handleOpen}>Favorites</button>
      {open ? (
        <ul className="menu">
            {favoritesList().map((item) => (<li className="menu-item">
            <button onClick={() => searchPlace(item)}>{item}</button>
          </li>))}
        </ul>
      ) : null}
    </div>
        </div>
    )
}

export default Header;