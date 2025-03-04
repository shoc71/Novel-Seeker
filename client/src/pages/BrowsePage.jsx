import {useState} from "react";
import SearchCard from "./SearchCard";
import axios from "axios";


const BrowsePage = () => {
    const [search, setSearch] = useState("");
    const [bookData, setData] = useState([]);

    const searchBook = (evt) => {
        if (evt.key === "Enter" || evt.type === "click") { 
            axios.get('https://www.googleapis.com/books/v1/volumes?q=' + search + '&key=AIzaSyDsAloQeKEJ0dFzk_2q9SRkG7Knmp_0Pak' + '&maxResults=40')
                .then(res => setData(res.data.items))
                .catch(err => console.log(err));
        }
    };

    return (
        <>
        <div className="background">
            {/* <div className="header">
                <div className="row1">
                    <h1>Novel Seeker</h1>
                </div> */}
                <div className="row2">
                    <h2>Search for a book or author:</h2>
                    <div className="search">
                        <input type="text" placeholder="Enter the book name here" 
                        value={search} onChange={e=>setSearch(e.target.value)}
                        onKeyPress={searchBook} />
                        <button onClick={searchBook}>Search</button>

                    </div>
                </div>

                <div className="container">
                    <SearchCard book={bookData} /> 
                </div>
            {/* </div> */}
            </div>
        </>
    );
};

export default BrowsePage;
