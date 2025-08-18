import express from "express";

const app = express();

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
  const { title, author, genre, price } = req.body;
  const newBook = {
    id: idCounter++,
    title,
    author,
    genre,
    price,
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

//Get books by specific genre
app.get("/books/genre/:genre", (req, res) => {
  const genre = req.params.genre.toLowerCase();
  const result = books.filter((book) => book.genre.toLowerCase() === genre);
  res.status(200).json({
    status: 200,
    message: "Books returned.",
    data: result,
  });
});

//search by term
app.get("/books/search/:term", (req, res) => {
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
app.get("/books/price-range/:min/:max", (req, res) => {
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
app.get("/books/average", (req, res) => {
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
app.get("/books/cheapest", (req, res) => {
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
