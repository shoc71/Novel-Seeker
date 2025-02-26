import {useState} from "react";
import searchCard from "../components/searchCard";
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
            <div className="header">
                <div className="row1">
                    <h1>Novel Seeker</h1>
                </div>
                <div className="row2">
                    <h2>Search for a book:</h2>
                    <div className="search">
                        <input type="text" placeholder="Enter the book name here" 
                        value={search} onChange={e=>setSearch(e.target.value)}
                        onKeyPress={searchBook} />
                        <button onClick={SearchBook}>Search</button>

                    </div>
                </div>

                <div className="container">
                    <searchCard book={bookData} /> 
                </div>
            </div>
        </>
    );
};

export default BrowsePage;
