let page = 1;

function displayBooks(data){

    const container = document.getElementById("books");

    container.innerHTML="";

    data.forEach(book=>{

        container.innerHTML += `

        <div class="book">

        <h3>${book.title}</h3>

        <p><b>Author:</b> ${book.author}</p>

        <p><b>Category:</b> ${book.category}</p>

        <p><b>Price:</b> ₹${book.price}</p>

        <p><b>Rating:</b> ${book.rating}</p>

        </div>

        `;
    });
}


/* LOAD BOOKS WHEN PAGE OPENS */

window.onload = function(){

    fetch(`/books?page=1`)

    .then(res=>res.json())

    .then(displayBooks);

}


/* SEARCH BOOK */

function searchBook(){

    const title = document.getElementById("searchTitle").value;

    fetch(`/books/search?title=${title}`)

    .then(res=>res.json())

    .then(displayBooks);
}


/* FILTER CATEGORY */

function filterCategory(){

    const category = document.getElementById("category").value;

    fetch(`/books/category/${category}`)

    .then(res=>res.json())

    .then(displayBooks);
}


/* SORT PRICE */

function sortPrice(){

    fetch("/books/sort/price")

    .then(res=>res.json())

    .then(displayBooks);
}


/* SORT RATING */

function sortRating(){

    fetch("/books/sort/rating")

    .then(res=>res.json())

    .then(displayBooks);
}


/* TOP RATED */

function topRated(){

    fetch("/books/top")

    .then(res=>res.json())

    .then(displayBooks);
}


/* PAGINATION */

function nextPage(){

    fetch(`/books?page=${page}`)

    .then(res=>res.json())

    .then(data=>{

        displayBooks(data);

        page++;

    });
}
