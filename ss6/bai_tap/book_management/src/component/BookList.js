import React, { useEffect, useState } from "react";
import { Container, Table, Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getBooks, deleteBook } from "../service/BookService";

function BookList() {
    const [books, setBooks] = useState([]);
    const navigate = useNavigate();
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getBooks();
                setBooks(data);
            } catch (error) {
                console.error("Error fetching books:", error);
            }
        };
        fetchData();
    }, []);

    const handleDeleteClick = (book) => {
        setSelectedBook(book);
        setShowDeleteModal(true);
    };

    const handleConfirmDelete = async () => {
        if (selectedBook) {
            try {
                const res = await deleteBook(selectedBook.id);
                setBooks(books.filter((book) => book.id !== selectedBook.id));
                setShowDeleteModal(false);
                setSelectedBook(null);
            } catch (error) {
                console.error("Error deleting book:", error);
            }
        }
    };

    const handleCancelDelete = () => {
        setShowDeleteModal(false);
        setSelectedBook(null);
    };

    return (
        <Container className="mt-4">
            <h1>Library</h1>
            <div className="d-flex justify-content-end mb-3">
                <Button variant="success" onClick={() => navigate("/create")}>
                    Add a new Book
                </Button>
            </div>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Title</th>
                    <th>Quantity</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {books.map((book) => (
                    <tr key={book.id}>
                        <td>{book.title}</td>
                        <td>{book.quantity}</td>
                        <td>
                            <Button
                                variant="primary"
                                className="me-2"
                                onClick={() => navigate(`/edit/${book.id}`)}
                            >
                                Edit
                            </Button>
                            <Button variant="danger" onClick={() => handleDeleteClick(book)}>
                                Delete
                            </Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>

            <Modal show={showDeleteModal} onHide={handleCancelDelete}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedBook && (
                        <p>
                            Are you sure you want to delete the book "
                            {selectedBook.title}"?
                        </p>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCancelDelete}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleConfirmDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}

export default BookList;
