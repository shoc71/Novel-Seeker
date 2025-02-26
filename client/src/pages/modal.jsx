// import React from "react";

function modal({ show, item, onClose }) {
    // Return null if the modal should not be shown
    if (!show || !item) {
        return null;
    }

    const thumbnail = item.volumeInfo?.imageLinks?.smallThumbnail;
    const authors = item.volumeInfo?.authors?.join(', ') || 'Unknown author';
    const publisher = item.volumeInfo?.publisher || 'Unknown publisher';
    const publishedDate = item.volumeInfo?.publishedDate || 'Unknown date';
    const description = item.volumeInfo?.description || 'No description available';
    const previewLink = item.volumeInfo?.previewLink || '#';

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
                <h4 className="description">{description}</h4>
            </div>
        </div>
    );
}

export default modal;
