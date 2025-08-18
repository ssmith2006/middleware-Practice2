function validateBook(req, res, next) {
  const { title, author, price, genre } = req.body;
  if (!title) {
    return res.status(404).json({
      message: "Book title is required.",
    });
  }
  if (!author) {
    return res.status(400).json({
      message: "Book author is required.",
    });
  }
  if (!price) {
    return res.status(400).json({
      message: "Book price is required.",
    });
  }
  if (price <= 0) {
    return res.status(400).json({
      message: "Book price must be greater than 0.",
    });
  }
  if (!genre){
        return res.status(400).json ({
            "message": "Book genre is required."
        })
}
if (genre.toLowerCase() === "Non-fiction".toLowerCase()){
        return res.status(400).json ({
            "message": "Book is not Non-fiction."
        })
}}
next();