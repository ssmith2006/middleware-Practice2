function validateBook(req, res, next) {
  const { title, author, genre, price } = req.body;

  if (!title) {
    return res.status(400).json({
      message: "Book title is required.",
    });
  }
  if (!author) {
    return res.status(400).json({
      message: "Auhtor name is required.",
    });
  }
  if (!genre) {
    return res.status(400).json({
      message: "Genre is required.",
    });
  }
  if (genre.toLowerCase() === "Non Fiction".toLowerCase()) {
    return res.status(400).json({
      message: "Book is not Non Fiction.",
    });
  }
  if (!price) {
    return res.status(400).json({
      message: "Book title is required.",
    });
  }
  if (price <= 0) {
    return res.status(400).json({
      message: "Book price must be greater than 0.",
    });
  }

  next();
}

function validateBorrow (req, res, next){

    
}