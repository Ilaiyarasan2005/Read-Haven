const express = require('express');
const Book = require('../models/Book');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Get all books
router.get('/', async (req, res) => {
    try {
        const { genre, sortBy } = req.query;
        let query = {};
        if (genre) {
            query.genre = genre;
        }
        let sort = {};
        if (sortBy) {
            sort[sortBy] = 1;
        }
        const books = await Book.find(query).sort(sort);
        res.json(books);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Add a new book
router.post('/', authMiddleware, async (req, res) => {
    try {
        const { title, author, genre, description, coverImage } = req.body;
        const newBook = new Book({ title, author, genre, description, coverImage, uploadedBy: req.user.id });
        await newBook.save();
        res.status(201).json(newBook);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;