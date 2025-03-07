import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const BookshelfPage = () => {
    const [savedBooks, setSavedBooks] = useState([]);

    useEffect(() => {
        const books = JSON.parse(localStorage.getItem("savedBooks")) || [];
        setSavedBooks(books);
    }, []);

    const removeBook = (bookId) => {
        const updatedBooks = savedBooks.filter(book => book.id !== bookId);
        setSavedBooks(updatedBooks);
        localStorage.setItem("savedBooks", JSON.stringify(updatedBooks));
    };

    return (
        <div className="background">
            <div className="header">
                <h2>Your Bookshelf</h2>
            </div>

            {savedBooks.length === 0 ? (
                <p>No books saved yet!</p>
            ) : (
                <div className="container">
                    {savedBooks.map(book => (
                        <div key={book.id} className="card">
                            <img src={book.volumeInfo.imageLinks?.smallThumbnail} alt={book.volumeInfo.title} />
                            <div className="bottom">
                                <h3 className="title">{book.volumeInfo.title}</h3>
                                <button className="remove" onClick={() => removeBook(book.id)}>Remove</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <Link to="/browse">
                <button className="go-to-browse-btn">Back to Browse</button>
            </Link>
        </div>
    );
};

export default BookshelfPage;
