import React, { useState } from "react";

function Modal({ show, item, onClose }) {
    if (!show || !item) {
        return null;
    }

    const [showMore, setShowMore] = useState(false); 

    const thumbnail = item.volumeInfo?.imageLinks?.smallThumbnail;
    const authors = item.volumeInfo?.authors?.join(', ') || 'Unknown author';
    const publisher = item.volumeInfo?.publisher || 'Unknown publisher';
    const publishedDate = item.volumeInfo?.publishedDate || 'Unknown date';
    const description = item.volumeInfo?.description || 'No description available';
    const previewLink = item.volumeInfo?.previewLink || '#';

    const truncatedDescription = description.length > 500 ? description.substring(0, 500) + '...' : description;

    return (
        <div className="overlay">
            <div className="overlay-inner">
                <button className="close" onClick={onClose}>Close</button>
                <div className="inner-box">
                    {thumbnail && <img src={thumbnail} alt="Book Thumbnail" />}
                    <div className="info">
                        <h1>{item.volumeInfo.title}</h1>
                        <h3>{authors}</h3>
                        <h4>{publisher}<span>{publishedDate}</span></h4>
                        <br />
                        <a href={previewLink}><button>More</button></a>
                    </div>
                </div>
                <h4 className="description">
                    {showMore ? description : truncatedDescription}
                </h4>
                {description.length > 500 && (
                    <button className="show-more-btn" onClick={() => setShowMore(!showMore)}>
                        {showMore ? 'Show Less' : 'Show More'}
                    </button>
                )}
            </div>
        </div>
    );
}

export default Modal;
