import { useState, useContext, createContext } from "react";

const SearchContext = createContext();

const SearchProvider = ({ children }) => {
    const [searchProduct, setSearchProduct] = useState({
        keyword: "",
        results: [],
    })

    return (
        <SearchContext.Provider value={[searchProduct, setSearchProduct]}>
            {children}
        </SearchContext.Provider>
    )
}

// custom hook
const useSearch = () => useContext(SearchContext);

export { useSearch, SearchProvider };
