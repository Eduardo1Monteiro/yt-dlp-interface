import { useState } from 'react';
import "./SearchBar.css";
import magnifyingGlass from '../../assets/magnifying_glass_transparent.png';

interface SearchBarProps {
  placeholderText: string;
  onSearch: (query: string) => void; // função recebida do App
}

function SearchBar({ placeholderText, onSearch }: SearchBarProps) {
  const [searchElement, setSearchElement] = useState("");

  function handleSearchElement(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchElement(event.target.value);
  }

  function handleClick() {
    onSearch(searchElement); // chama a função do App
  }

  return (
    <div className="searchBarContainer">
      <input
        className="searchBar"
        value={searchElement}
        type="text"
        placeholder={placeholderText}
        onChange={handleSearchElement}
      />
      <button className="searchBarButton" onClick={handleClick}>
        <img src={magnifyingGlass} alt="Search" />
      </button>
    </div>
  );
}

export default SearchBar;
