import express from "express";


const router =express.Router();

let borrows = [{ borrowerName, bookId, borrowDate, returnDate}]
let borrowIdCounter = 1

router.get("/books", (req, res) => {
  res.status(200).json({
    status: 200,
    message: "All borrows returned.",
    data: borrows,
  });
});

router.post ("/books/borrow", (req, res)=>{
    const  {borrowerName, bookId, borrowDate, returnDate}=req.body
    const newBorrow = {
        borrowerName,
        bookId,
        borrowDate,
        returnDate
    }
    borrows.push(newBorrow)
    res.json ({message: "Borrow registered correctly."})
})

export default router;