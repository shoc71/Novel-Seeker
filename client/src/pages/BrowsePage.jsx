import { useState } from "react";
import Modal from "./Modal";
import axios from "axios";
import SearchCard from "./SearchCard"; 
import { Link } from 'react-router-dom';

const BrowsePage = () => {
    const [search, setSearch] = useState("");
    const [bookData, setData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);

    const searchBook = (evt) => {
        if (evt.key === "Enter" || evt.type === "click") {
            axios.get('https://www.googleapis.com/books/v1/volumes?q=' + search + '&key=AIzaSyDsAloQeKEJ0dFzk_2q9SRkG7Knmp_0Pak' + '&maxResults=40')
                .then(res => setData(res.data.items))
                .catch(err => console.log(err));
        }
    };

    const saveBook = (book) => {
        const savedBooks = JSON.parse(localStorage.getItem("savedBooks")) || [];
        savedBooks.push(book);
        localStorage.setItem("savedBooks", JSON.stringify(savedBooks));
    };

    const openModal = (book) => {
        setSelectedBook(book);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedBook(null);
    };

    return (
        <div className="background">
            <div className="row2">
                <h2>Search for a book or author:</h2>
                <div className="search">
                    <input
                        type="text"
                        placeholder="Enter the book name here"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        onKeyPress={searchBook}
                    />
                    <button onClick={searchBook}>Search</button>
                    <Link to="/bookshelf">
                        <button className="go-to-bookshelf-btn">Go to Bookshelf</button>
                    </Link>
                </div>
            </div>

            <div className="container">
                <SearchCard book={bookData} onOpenModal={openModal} onSaveBook={saveBook} />
            </div>

            {showModal && <Modal show={showModal} item={selectedBook} onClose={closeModal} onSaveBook={saveBook} />}
        </div>
    );
};

export default BrowsePage;
