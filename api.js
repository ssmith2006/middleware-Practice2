import express from "express";

app.use(express.json());

let books = [];
let idCounter = 1;

//Return all books
app.get("/books", (req, res) => {
  res.status(200).json({
    message: "All books have been returned!",
    data: books,
  });
});

//Add a new book
app.post("/books", (req, res) => {
  const newBook = {
    id: idCounter,
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    genre: "Fantasy",
    price: 15.99,
  };
  books.push(newBook);
  idCounter++,
    res.status(201).json({
      message: "New Book entry has been created!",
      data: newBook,
    });
});

//Return one book by ID
app.get("/books/:id", (req, res) => {
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
app.put("/books/:id", (req, res) => {
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
app.delete("/books/:id", (req, res) => {
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