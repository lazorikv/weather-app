import {useEffect, useRef, useState} from 'react'
import "../style/header.css";

const Header = (props) => {

    const [open, setOpen] = useState(false);
    const catMenu = useRef(null)
    const [showElement, setShowElement] = useState(false);

    let [favoritePlaces, setFavoritePlaces] = useState(() => {
        const saved = localStorage.getItem("favorites");
        return saved || [];
    })

    const closeOpenMenus = (e) => {
        if (catMenu.current && open && !catMenu.current.contains(e.target)) {
            setOpen(false)
        }
    }

    document.addEventListener('mousedown', closeOpenMenus)

    const handleOpen = () => {
    setOpen(!open);
  };

  const addPlaceToCookieFunction = () => {
      let check = false;
      if (favoritePlaces !== null) {
          check = favoritePlaces.includes(props.searchTerm)
      }
      if (check === false) {
          favoritePlaces.push(props.searchTerm)
          setShowElement(true)

          setTimeout(() => {
           setShowElement(false);
       }, 2000);
      }

  }

  const searchPlace = (place) => {
      props.setSearchTerm(place)
  }

  const removeFavorite = (item) => {
      const newItems = favoritePlaces.filter(items => items !== item)
      setFavoritePlaces(newItems)
  }


  useEffect(
      () => {localStorage.setItem('favorites', favoritePlaces)}, [favoritePlaces]
  )


    return (
        <div className="favorites">
            <div>
                <button className="addToFavorite" onClick={addPlaceToCookieFunction}>Add to Favorite</button>
            </div>
            <div>
                {showElement && <h3 className="messageAdd">Place added to Favorites</h3>}
            </div>
            <div ref={catMenu} className="dropdown">
      <button className="addToFavorite favorite-btn" onClick={handleOpen}>Favorites</button>
      {open ? (
        <ul className="menu">
            {favoritePlaces.length ? favoritePlaces.map((item) => (<li className="menu-item">
            <button className="item-text" onClick={() => searchPlace(item)}>{item}</button>
                <img onClick={() => removeFavorite(item)} src="remove.svg" alt="remove"/>
          </li>)) : <li className="menu-item">No Favorites</li>}
        </ul>
      ) : null}
    </div>
        </div>
    )
}

export default Header;