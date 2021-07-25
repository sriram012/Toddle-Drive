import '../../styles/searchBar.css';

import searchIcon from '../../images/Union (1).png';
import cancelIcon from '../../images/Union.png';

interface Props {
    searchInput: string,
    setSearchInput: any
}

export default function SearchBarView(props: Props) {
    const onInputChange = (input: string) => {
        props.setSearchInput(input);
    }

    const clearSearchInput = () => {
        props.setSearchInput("");
    }

    return (
        <div className="search-root">
            <input placeholder="Search for a folder or file" value={props.searchInput} onChange={(e) => onInputChange(e.target.value)} />
            <img src={searchIcon} className="search-icon" />
            <img src={cancelIcon} className={"cancel-icon " + (props.searchInput.length != 0 ? "cancel-display " : "cancel-display-none")}
                onClick={clearSearchInput}/>
        </div>
    )
}