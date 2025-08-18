import express from "express";


const router =express.Router();

let idCounter = 1
let books = [ //in-memory book store
  {
    id: 1,
    title: "Waiting to Exhale",
    author: "Terry McMillian",
    price: 9.99,
    genre: "Romance",
  },
  {
    id: 2,
    title: "Coldest Winter Ever",
    author: "Sista Soulja",
    price: 13.00,
    genre: "Coming of Age",
  },
  {
    id: 3,
    title: "At My Table",
    author: "Sarah Knowles",
    price: 17.95,
    genre: "Cookbook",
  },
  {
    id: 4,
    title: "Know Fear: Facing Life's Six Most Common Phobias",
    author: "Ed Young, Jr",
    price: 25.00,
    genre: "Faith-Based/Self Help",
  },
  {
    id: 5,
    title: "The Silent Patient",
    author: "Alex Michealides",
    price: 9.92,
    genre: "Non-Fiction",
  },
  {
    id: 6,
    title: "The Very Hungry Caterpiller",
    author: "Eric Carle",
    price: 10.00,
    genre: "Childrens",
  },
];


//Get all books
router.get("/books", (req, res) => {
  res.json(books);
});

//Add a new book
router.post("/books/", (req, res) => {
  const newBook = {
    id: idCounter++,
    title,
    author,
    genre,
    price
  };
  books.push(newBook);
  idCounter++,
    res.status(201).json({
      message: "New Book entry has been created!",
      data: newBook,
    });
});

//Get book by ID
router.get("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const book = books.find((book) => book.id === Number(bookId));

  if (!book) {
    return res.status(404).json({
      message: `Book with ID ${bookId} was not found.`,
    });
  }
  res.status(200).json({
    message: "Book was returned successfully!",
    data: book,
  });
});

//Update a book's information
router.put("/books/:id", (req, res) => {
  const bookId = Number(req.params.id);
  const idx = books.findIndex((book) => book.id === bookId);

  if (idx === -1) {
    return res.status(404).json({
      message: "Book not found.",
    });
  }
  const newBook = req.body;
  books[idx] = { ...books[idx], ...newBook };
  res.status(200).json({
    message: "Book modified correctly.",
    data: newBook,
  });
});

//Delete book by ID
router.delete("/books/:id", (req, res) => {
  const bookId = Number(req.params.id);
  const idx = books.findIndex((book) => book.id === bookId);

  if (idx === -1) {
    return res.status(404).json({
      message: "Book not found.",
    });
  }
  books.splice(idx, 1);
  res.status(200).json({
    message: "Book deleted successfully.",
  });
});

//Get books by specific genre
router.get("/books/genre/:genre", (req, res) => {
  const genre = req.params.genre.toLowerCase();
  const result = books.filter((book) => book.genre.toLowerCase() === genre);
  res.status(200).json({
    status: 200,
    message: "Books returned.",
    data: result,
  });
});

//search by term
router.get("/books/search/:term", (req, res) => {
  const term = req.params.term.toLowerCase();
  const result = books.filter(
    (book) =>
      book.title.toLowerCase().includes(term) ||
      book.author.toLowerCase().includes(term)
  );
  res.json({
    status: 200,
    message: "Book found by title",
    data: result,
  });
});

//
router.get("/books/price-range/:min/:max", (req, res) => {
  const min = Number(req.params.min);
  const max = Number(req.params.max);
  const result = books.filter((book) => book.price >= min && book.price <= max);
  res.json({
    status: 200,
    message: "Book(s) in range retrieved.",
    data: result,
  });
});

//Average price of the book
router.get("/books/average", (req, res) => {
  let total = 0;

  books.map((book) => (total += book.price));

  const average = total / books.length;

  if (books.length === 0)
    return res.json({
      status: 404,
      message: "No average found.",
      data: 0,
    });

  res.json({
    status: 200,
    message: "Average calculated.",
    data: average,
  });
});

//Find cheapest book
router.get("/books/cheapest", (req, res) => {
  if (books.length === 0)
    return res.json({
      status: 404,
      message: "Cheapest book not found.",
      data: 0,
    });

  let cheapest = books[0];

  books.forEach((book) => {
    if (book.price < cheapest.price) {
      cheapest = book;
    }
  });
  res.json({
    status: 200,
    message: "Cheapest book found.",
    result: cheapest,
  });
});

export default router;