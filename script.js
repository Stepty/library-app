if ( window.history.replaceState ) {
    window.history.replaceState( null, null, window.location.href );
  }

let formActive = false;

// Book constructor object
function Book(title='Unknown', author='Unknown', pages='0', read=false) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

// library object
function Library() {
    this.books = [];
    
    this.addBook = (newBook) =>  {
        this.books.push(newBook);
    }
    this.removeBook = (title) => {
        this.books.splice(this.books.indexOf(title), 1);
    }
}
const library = new Library();

// book functions
const createBookCard = (book) => {
    const dlete = document.createElement('button');
    const read = document.createElement('button');
    const main = document.querySelector('main');
    const card = document.createElement('div');
    const information = document.createElement('div');
    const title = document.createElement('h2');
    const author = document.createElement('h3');
    const pages = document.createElement('p');
    const btns = document.createElement('div');
    const status = document.createElement('div');

    btns.classList.add('action-btns');
    card.classList.add('card');
    information.classList.add('information');
    read.classList.add('read');
    dlete.classList.add('delete');
    status.classList.add('status');
    title.classList.add('title');
    author.classList.add('author');
    pages.classList.add('pages');

    if (book.read) {
        read.innerHTML = 'Read';
        status.innerHTML = 'Finished';
    }
    else {
        read.innerHTML = 'Not Read';
        status.innerHTML = 'In Progress'
    }
    
    dlete.innerHTML = 'Delete';
    title.innerHTML = book.title;
    author.innerHTML = book.author;
    pages.innerHTML = 'Pages: ' + book.pages;
    

    btns.appendChild(read);
    btns.appendChild(dlete);
    information.appendChild(title);
    information.appendChild(author);
    information.appendChild(pages);
    card.appendChild(information);
    card.appendChild(btns);
    card.appendChild(status);
    main.appendChild(card);

    dlete.addEventListener('click', () => {
        dlete.remove();
        read.remove();
        card.remove();
        information.remove();
        title.remove();
        author.remove();
        pages.remove();
        btns.remove();
        status.remove();
        library.removeBook(book);
    });
    read.addEventListener('click', () => {
        if (book.read == true)
            book.read = false;
        else 
            book.read = true;

        if (book.read) read.innerHTML = 'Read';
        else read.innerHTML = 'Not Read';
        btns.appendChild(read);
        btns.appendChild(dlete);
        card.appendChild(btns);
        if (book.read) status.innerHTML = 'Finished';
        else status.innerHTML = 'In Progress';
        card.appendChild(status);
    });
}

const getBookFromInput = () => {
    const newTitle = document.querySelector('#title').value;
    const newAuthor = document.querySelector('#author').value;
    const newPages = document.querySelector('#pages').value;
    const read = document.querySelector('#read').checked;
    document.querySelector('#title').value = "";
    document.querySelector('#author').value = "";
    document.querySelector('#pages').value = "";
    document.querySelector('#read').checked = false;
    return new Book(newTitle, newAuthor, newPages, read);
}
const closeForm = () => {
    if (formActive)
    {
        document.querySelector(".form-popup").style.display = "none";
        formActive = false;
    }
    else 
    {
        document.querySelector(".form-popup").style.display = "block";
        formActive = true;
    }
};
const createBtn = document.querySelector('.create');

createBtn.addEventListener('click', () => {
    closeForm();
});

const submit = document.querySelector('.submit');
submit.addEventListener('click', (e) => {
    e.preventDefault();
    const newBook = getBookFromInput();
    library.addBook(newBook);
    createBookCard(newBook);
    closeForm();
});






