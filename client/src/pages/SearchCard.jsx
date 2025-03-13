import { useState } from "react";
import Modal from "./modal";

const SearchCard = ({ book, onSaveBook }) => { 
    const [show, setShow] = useState(false);
    const [bookItem, setItem] = useState();

    return (
        <>
            {
                book.map((item) => {
                    let thumbnail = item.volumeInfo?.imageLinks?.smallThumbnail;
                    let amount = item.saleInfo?.listPrice?.amount;

                    if (thumbnail && amount) {
                        return (
                            <div key={item.id || item.volumeInfo.title} className="card" onClick={() => { setShow(true); setItem(item); }}>
                                <img src={thumbnail} alt="book image" />
                                <div className="bottom">
                                    <h3 className="title">{item.volumeInfo.title}</h3>
                                    <p className="amount">&#36;{amount}</p>
                                </div>
                            </div>
                        );
                    }
                    return null;
                })
            }
            {show && <Modal show={show} item={bookItem} onClose={() => setShow(false)} onSaveBook={onSaveBook} />} 
        </>
    );
};

export default SearchCard;
