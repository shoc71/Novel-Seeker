
import { useState } from "react";
import modal from "../pages/modal";

const SearchCard = ({ book }) => {
    const [show, setShow] = useState(false);
    const [bookItem, setItem] = useState();

    console.log(book);

    return (
        <>
            {
                book.map((item) => {
                    let thumbnail = item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.smallThumbnail;
                    let amount = item.saleInfo.listPrice && item.saleInfo.listPrice.amount;

                   
                    if (thumbnail !== undefined && amount !== undefined) {
                        return (
                            <div key={item.id || item.volumeInfo.title} className="card" onClick={() => { setShow(true); setItem(item); }}>
                                <img src={thumbnail} alt="book image" />
                                <div className="bottom">
                                    <h3 className="title">{item.volumeInfo.title}</h3>
                                    <p className="amount">&#8377;{amount}</p>
                                </div>
                                {/* Show Modal when clicked */}
                                <Modal show={show} item={bookItem} onClose={() => setShow(false)} />
                            </div>
                        );
                    }
                    return null;
                })
            }
        </>
    );
};

export default SearchCard;
