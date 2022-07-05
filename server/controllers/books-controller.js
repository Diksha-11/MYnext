//real

const Book = require("../model/Book");

const getAllBooks = async (req, res, next) => {
  let books;
  try {
    books = await Book.find();
  } catch (err) {
    console.log(err);
  }

  if (!books) {
    return res.status(404).json({ message: "No products found" });
  }
  return res.status(200).json({ books });
};

const getById = async (req, res, next) => {
  const id = req.params.id;
  let book;
  try {
    book = await Book.findById(id);
  } catch (err) {
    console.log(err);
  }
  if (!book) {
    return res.status(404).json({ message: "No Book found" });
  }
  return res.status(200).json({ book });
};

const addBook = async (req, res, next) => {
  const { name, author, description, price, available, image } = req.body;
  let book;
  try {
    book = new Book({
      name,
      author,
      description,
      price,
      available,
      image,
    });
    await book.save();
  } catch (err) {
    console.log(err);
  }

  if (!book) {
    return res.status(500).json({ message: "Unable To Add" });
  }
  return res.status(201).json({ book });
};

const updateBook = async (req, res, next) => {
  const id = req.params.id;
  const { name, author, description, price, available, image } = req.body;
  let book;
  try {
    book = await Book.findByIdAndUpdate(id, {
      name,
      author,
      description,
      price,
      available,
      image,
    });
    book = await book.save();
  } catch (err) {
    console.log(err);
  }
  if (!book) {
    return res.status(404).json({ message: "Unable To Update By this ID" });
  }
  return res.status(200).json({ book });
};

const deleteBook = async (req, res, next) => {
  const id = req.params.id;
  let book;
  try {
    book = await Book.findByIdAndRemove(id);
  } catch (err) {
    console.log(err);
  }
  if (!book) {
    return res.status(404).json({ message: "Unable To Delete By this ID" });
  }
  return res.status(200).json({ message: "Product Successfully Deleted" });
};

exports.getAllBooks = getAllBooks;
exports.addBook = addBook;
exports.getById = getById;
exports.updateBook = updateBook;
exports.deleteBook = deleteBook;







/*const Book = require("../model/Book");

//console.log(req.user.id);

const getAllBooks = async (req, res, next) => {
  //console.log(req.params.id);
  try{
          let allbooks = await Book.find({user:req.params.id}).sort({name:1}).exec();         
          console.log(allbooks);
          return res.render('book',{ book_list : allbooks });
       
  }catch(err){
      console.log('error in fetching Contacts from database', err);
      return;
  }
};


const getById = async (req, res, next) => {
  const id = req.params.id;
  let book;
  try {
    book = await Book.findById(id);
  } catch (err) {
    console.log(err);
  }
  if (!book) {
    return res.status(404).json({ message: "No Book found" });
  }
  return res.status(200).json({ book });
};

const addBook = async (req, res, next) => {
  const { name, author, description, price, available, image } = req.body;
  let book;
  try {
    book = new Book({
      name,
      author,
      description,
      price,
      available,
      image,
    });
    await book.save();
  } catch (err) {
    console.log(err);
  }

  if (!book) {
    return res.status(500).json({ message: "Unable To Add" });
  }
  return res.status(201).json({ book });
};

const updateBook = async (req, res, next) => {
  const id = req.params.id;
  const { name, author, description, price, available, image } = req.body;
  let book;
  try {
    book = await Book.findByIdAndUpdate(id, {
      name,
      author,
      description,
      price,
      available,
      image,
    });
    book = await book.save();
  } catch (err) {
    console.log(err);
  }
  if (!book) {
    return res.status(404).json({ message: "Unable To Update By this ID" });
  }
  return res.status(200).json({ book });
};

const deleteBook = async (req, res, next) => {
  const id = req.params.id;
  let book;
  try {
    book = await Book.findByIdAndRemove(id);
  } catch (err) {
    console.log(err);
  }
  if (!book) {
    return res.status(404).json({ message: "Unable To Delete By this ID" });
  }
  return res.status(200).json({ message: "Product Successfully Deleted" });
};

exports.getAllBooks = getAllBooks;
exports.addBook = addBook;
exports.getById = getById;
exports.updateBook = updateBook;
exports.deleteBook = deleteBook;*/







/*const Book = require("../model/Book");

const getAllBooks = async(req, res,next) => {
 let books;
 try {
    books = await Book.find();
 }catch(err){
     console.log(err);
 }

 if(!books){
     return res.status(404).json({message:"No products found"});
 }
 return res.status(200).json({books});
    const id = req.params.id
    let Book;
};


const getById = async( req, res, next) => {
    try {
        books = await Book.findById(id);
     }catch(err){
         console.log(err);
     }
    
     if(!books){
         return res.status(404).json({message:"No Book found:("});
     }
     return res.status(200).json({books});
}


const addBook = async(req, res, next ) =>{
    const {name,author,discription,price,available} = req.body
    let book;
    try {
        book = new Book ({
            name,author,discription,price,available
        });
        await book.save();
    }catch(err){
        console.log(err);
    }

    if(!book){
        return res.status(500).json({message:'Unable to Add :('});
    }
    return res.status(201).json({ book });
}


const updateBook = async(req, res, next ) =>{
    const id = req.params.id;
    const {name,author,discription,price,available} = req.body
    let book;
    try {
        book = await Book.findByIdAndUpdate (id,{
            name,author,discription,price,available
        })
        book = await book.save();
    }catch(err){
        console.log(err);
    }

    if(!book){
        return res.status(404).json({message:'Unable to Update this ID :('});
    }
    return res.status(200).json({ book });
}



const deleteBook = async(req, res, next ) =>{
    const id = req.params.id;
    let book;
    try {
        book = await Book.findByIdAndRemove (id)
    }catch(err){
        console.log(err);
    }
    if(!book){
        return res.status(404).json({message:'Unable to Delete by this ID :('});
    }
    return res.status(200).json({ message:'Product Successfully Delete' });
}


exports.getAllBooks = getAllBooks; //this getallbooks will be called whanever we call the getall fun from any file
exports.addBook = addBook;
exports.getById = getById;
exports.updateBook = updateBook;
exports.deleteBook = deleteBook;*/







