import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";


interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    images: string[];
    rating: number;
}


const ProductPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [product, setProduct] = useState<Product | null>(null);
   

useEffect(() => {
    if(id) {
        axios.get<Product>(`https://dummyjson.com/products/${id}`)
        .then((response) => {
            setProduct(response.data);
        })
        .catch((error) => {
            console.error(`Error fetching product data:, ${error}`);
        })
  
}}, [id])

if (!product) {
    return <h1>Loading...</h1>; }

  return (
    <div className="p-5 w-[50%]">
        <h1>Bismilaah</h1>
        <button className="mb-5 px-4 py-2 bg-black text-white rounded"
        onClick={() => navigate(-1)}>
            Back
        </button>
        <img src={product.images[0]} alt={product.title} className="w-[50%] h-auto mb-5" />
        <h1 className="text-2xl mb-4 font-bold">{product.title}</h1>
        <p className="mb-4 text-grey-700 w-[70%]">{product.description}</p>
        <div className="flex">
            <p>Price: <span className="font-bold">£{product.price}</span></p>
            <p className="ml-10">Rating: <span className="font-bold">{product.rating}</span></p>
        </div>
    </div>
  )
}

export default ProductPage