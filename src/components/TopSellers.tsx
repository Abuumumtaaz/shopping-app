import { useEffect, useState } from "react";

interface Author {
  name: string;
  image: string;
  isFollowing: boolean;
}

const TopSellers = () => {
 const [authors, setAuthors] = useState<Author[]>([]);

  useEffect(() => {
    const fetchData = async () => { 
      try {
        const response = await fetch('https://randomuser.me/api/?results=5');
        const data = await response.json()

        const authorsData: Author[] = data.results.map((user: any) => ({
          name: `${user.name.first} ${user.name.last}`,
          image: user.picture.medium,
          isFollowing: false,
      }));
      setAuthors(authorsData);

    } catch (error) {
      console.error(`Error fetching authors:, ${error}`)
    }
  }
  fetchData();
  }, [])
  


const  handleFollowClick = (index: number) => {
    setAuthors(prevAuthors => 
      prevAuthors.map((author, i) => 
        i === index ? { ...author, isFollowing: !author.isFollowing } : author)
    
);
};

    return (
      <div className="bg-white mx-5 p-2  w-[20rem] mt-[5rem] rounded">
        <h2 className="text-xl font-bold mb-5">TopSellers</h2>
        <ul>
          {authors.map((author, index) => (
            <li key={index} className="flex justify-between items-center mb-4">
              <section className="flex justify-center items-center">
                <img src={author.image} alt={author.name} className="w-[25%] h-[25%] justify-center rounded-full" />
                <span className="ml-4">{author.name}</span>
              </section>
              <button 
                onClick={() => handleFollowClick(index)}
              className={`py-1 px-3 rounded ${author.isFollowing ? "bg-red-500 text-white" : "bg-black text-white"}`}>{author.isFollowing ? "unfllow" : "follow"} </button>
            </li>

          ))}
        </ul>
      </div>
    );
  }


export default TopSellers

