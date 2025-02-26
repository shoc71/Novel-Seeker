import { useState } from "react";
import Modal from "../pages/Modal";

const SearchCard = ({ book }) => {
    const [show, setShow] = useState(false);
    const [bookItem, setItem] = useState();

    return (
        <>
            {
                book.map((item) => {
                    let thumbnail = item.volumeInfo?.imageLinks?.smallThumbnail;
                    let amount = item.saleInfo?.listPrice?.amount;

                    // Only show the card if both the thumbnail and amount are defined
                    if (thumbnail && amount) {
                        return (
                            <div key={item.id || item.volumeInfo.title} className="card" onClick={() => { setShow(true); setItem(item); }}>
                                <img src={thumbnail} alt="book image" />
                                <div className="bottom">
                                    <h3 className="title">{item.volumeInfo.title}</h3>
                                    <p className="amount">&#8377;{amount}</p>
                                </div>
                            </div>
                        );
                    }
                    return null;
                })
            }

            {/* Show Modal when clicked */}
            {show && <Modal show={show} item={bookItem} onClose={() => setShow(false)} />}
        </>
    );
};

export default SearchCard;
