import {useEffect, useState} from 'react'
import { useFilter } from './FilterContext';

interface Products {
    category: string;
}
interface FetchResponse {
   products: Products[];
}

const Sidebar = () => {

    const { 
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        minPrice,
        setMinPrice,
        maxPrice,
        setMaxPrice,
        setKeyword
    } = useFilter();

    const [categories, setCategories] = useState<string[]>([]);
    const [keywords] = useState<string[]>([
        "apple",
        "watch",
        "Fashion",
        "trend",
        "shoes",
        "shirt",
    ]);

    useEffect(() => {

       const fetchCategories = async () => {
        try {
            const response = await fetch('https://dummyjson.com/products')
            const data: FetchResponse = await response.json()
          const uniqueCategories = Array.from(
            new Set(data.products.map(product => product.category)))
        console.log(uniqueCategories);
        setCategories(uniqueCategories)
        }
        catch (error) {
            console.error('Error fetching product', error)
        }
       }

       fetchCategories();
    }, [])

    const handleMinPriceChange  = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setMinPrice(value ? parseFloat(value) : undefined);
    }

    const handleMaxPriceChange  = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setMaxPrice(value ? parseFloat(value) : undefined);
    }
    const handleRadioChange = (category: string) => {
        setSelectedCategory(category);
    }

    const handleKeywordClick = (keyword: string) => {
        setKeyword(keyword);
    }
    const handleReset = () => {
        setSearchQuery("");
        setSelectedCategory("");
        setMaxPrice(undefined);
        setMinPrice(undefined);
        setKeyword("");

    }

  return (
    <>
   <div className="w-64 p-5 h-screen">
    <h1 className="text-2xl font-bold mb-10 mt-4 text-red">
        AMAARI STRORE
    </h1>
  
   <section>
      <input
       type="text" className="border-2 rounded px-2 sm:mb-0" placeholder='Search products'
       value={searchQuery}
       onChange={e => setSearchQuery(e.target.value)}/>
       <div className="flex justify-center items-center mt-2">
        <input type="text" className="border-2 mr-2 py-3 px-5 mb-3 w-full" placeholder='Min' 
        value={minPrice ?? ''}
        onChange={handleMinPriceChange}/>
        <input type="text" className="border-2 mr-2 py-3 px-5 mb-3 w-full" placeholder='Max'
        value={maxPrice ?? ''}
        onChange={handleMaxPriceChange}/>
       </div>

{/* Categories */}
<div className="mb-3">
    <h2 className="text-xl font-semibold mb-3">Categories</h2>
</div>
<section>
{categories.map((category, index) => (
    <label key={index} className="block mb-2">
        <input type="radio" name='category' value={category}
        className='mr-2 w-[16px] h-[16px]'
        onChange={() => handleRadioChange(category)} 
        checked={selectedCategory === category}
        
        />
    
    {category.toUpperCase()}

    </label>
))}
</section>

{/* Keywords */}
<div className="mb-3 mt-4">
    <h2 className="text-xl font-semibold mb-3">Keywords</h2>
    <div>
        {keywords.map((keyword, index) => (
            <button key={index} className="block mb-2 py-2 px-4 w-full text-left border rounded hover:bg-gray-200 "
            onClick={() => handleKeywordClick(keyword)}>
                {keyword.toUpperCase()}
            </button>
        ))}
    </div>
</div>
    <button onClick={handleReset} className="w-full py-2 mb-[4rem] bg-black text-white rounded mt-5">
        Rest filters
    </button>

   </section>
   </div>
   </>
  )
}

export default Sidebar