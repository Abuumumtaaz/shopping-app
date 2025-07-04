import { createContext, useContext, useState, type ReactNode} from "react";


interface FilterContextType {
    searchQuery: string;
    setSearchQuery:(query: string) => void;
    selectedCategory: string;
    setSelectedCategory: (category: string) => void;
    minPrice: number | undefined;
    setMinPrice: (price: number | undefined) => void;
    maxPrice: number | undefined;
    setMaxPrice: (price: number | undefined) => void;
    keyword: string;
    setKeyword: (keyword: string) => void;

}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const FilterProvider: React.FC<{ children: ReactNode}> =({
    children,
}) => {
    const [searchQuery, setSearchQuery ] = useState<string>('')
    const [selectedCategory, setSelectedCategory ] = useState<string>('')
    const [maxPrice, setMaxPrice ] = useState<number | undefined>(undefined)
    const [minPrice, setMinPrice ] = useState<number | undefined>(undefined)
    const [keyword, setKeyword] = useState<string>('')

    return <FilterContext.Provider value={{
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        minPrice,
        setMinPrice,
        maxPrice,
        setMaxPrice,
        keyword,
        setKeyword

    }} >
        {children}
    </FilterContext.Provider>
};

// eslint-disable-next-line react-refresh/only-export-components
export const useFilter = () => {
    const context = useContext(FilterContext)
    if (context === undefined) {
        throw new Error("useFilter must be used within a FilterProvider")
    }
    return context;
}

