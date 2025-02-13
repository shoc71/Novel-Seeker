import react from "react";

const browse=()=>{
    return(
        <div className="header">
            <div className="row1">
                <h1>Novel Seeker</h1>
            </div>
            <div className="row2">
                <h2>Search for a book:</h2>
                <div className="search">
                    <input type="text" placeholder="Enter the book name here"/>
                    <button><i class="fas fa-search"></i></button>
                </div>
            </div>

        </div>
    )
}
export default browse;