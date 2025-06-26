import { Link } from "react-router-dom";

interface BookCardProps {
  image: string;
  id: string;
  price: number;
  title: string;
}



const BookCard: React.FC<BookCardProps>= ({image, id, price, title}) => {
  return (
    <div className="border p-4 rounded">
        <Link to={`/product/${id}`}></Link>
        <img src={image} alt={title} className="w-full h-32 object-cover mb-2" />
        <h2 className="font-bold">{title}</h2>
        <p>£{price}</p>
    </div>
  )
}

export default BookCard