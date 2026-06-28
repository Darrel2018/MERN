import express from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();

// get all books
router.get("/", async (request, response) => {
    try {
        const books = await Book.find({});
        return response.status(200).json({
            count: books.length,
            data: books
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// get single book by id
router.get("/:id", async (request, response) => {
    try {
        const { id } = request.params;

        const book = await Book.findById(id);
        return response.status(200).json(book);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Update a book
router.put("/:id", async (request, response) => {
    try {
        if (
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ) {
            return response.status(400).send({
                message: "Send all required fields: title, author, publishYear",
            });
        }

        const { id } = request.params;

        const result = await Book.findByIdAndUpdate(id, request.body);

        if(!result) {
            return response.status(404).json({ message: "Book not found" });
        }

        return response.status(200).send({ message: "Book updated successfully" });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// create new book entry
router.post("/", async (request, response) => {
    try {
        if (
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ) {
            return response.status(400).send({
                message: "Send all required fields: title, author, publishYear",
            });
        }

        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear,
        }

        const book = await Book.create(newBook);

        return response.status(201).send(book);
    } catch (error) {
        console.log(error);
        response.status(500).send({ message: error.message });
    }
});

// Delete a book
router.delete("/:id", async (request, response) => {
    try {
        const { id } = request.params;

        const result = await Book.findByIdAndDelete(id);

        if(!result) {
            return response.status(404).json({ message: "Book  not found" });
        }

        return response.status(200).send({ message: "Book deleted successfully" });
    } catch (error) {
        console.log(error);
        response.status(500).send({ message: error.message });
    }
});

export default router;

// This code defines an API router for managing books using Express.js and a `Book` model (likely from Mongoose). It implements full CRUD (Create, Read, Update, Delete) operations for a book collection.

// ### Summary of Functionality

// * **Imports**

//   * Imports Express and creates a router instance.
//   * Imports the `Book` model used to interact with the database.

// * **GET `/` — Fetch all books**

//   * Retrieves all books from the database using `Book.find({})`.
//   * Returns:

//     * Total count of books
//     * Array of book data
//   * Sends a `500` error if something fails.

// * **GET `/:id` — Fetch a single book**

//   * Extracts the `id` from request parameters.
//   * Uses `Book.findById(id)` to retrieve one book.
//   * Returns the matching book object.
//   * Sends a `500` error on failure.

// * **PUT `/:id` — Update a book**

//   * Validates that `title`, `author`, and `publishYear` exist in the request body.
//   * Updates the book using `Book.findByIdAndUpdate(id, request.body)`.
//   * Returns:

//     * `404` if the book does not exist
//     * Success message if updated
//   * Sends `400` for missing fields and `500` for server errors.

// * **POST `/` — Create a new book**

//   * Validates required fields:

//     * `title`
//     * `author`
//     * `publishYear`
//   * Creates a new book object and stores it with `Book.create()`.
//   * Returns the newly created book with status `201`.
//   * Sends `400` for missing data and `500` for server errors.

// * **DELETE `/:id` — Remove a book**

//   * Deletes a book using `Book.findByIdAndDelete(id)`.
//   * Returns:

//     * `404` if no book is found
//     * Success message if deletion succeeds
//   * Sends `500` for server errors.

// * **Export**

//   * Exports the router so it can be used in the main server application.

// ### Overall Purpose

// This router acts as a RESTful API layer for a book management system, allowing clients to:

// * Create books
// * Read one or all books
// * Update book information
// * Delete books

// It also includes:

// * Basic validation
// * Proper HTTP status codes
// * Error handling with try/catch blocks
