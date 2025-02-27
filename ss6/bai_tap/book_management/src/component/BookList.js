import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Container, Table, Button } from "react-bootstrap";

function BookList() {
    const [books, setBooks] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(
                    "https://my-json-server.typicode.com/codegym-vn/mock-api-books/books"
                );
                setBooks(res.data);
            } catch (error) {
                console.error("Error fetching books:", error);
            }
        };
        fetchData();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure to delete?")) return;

        try {
            const res = await axios.delete(
                `https://my-json-server.typicode.com/codegym-vn/mock-api-books/books/${id}`
            );
            alert(`Delete success! (Status: ${res.status})`);
            setBooks(books.filter((book) => book.id !== id));
        } catch (error) {
            console.error("Error deleting book:", error);
        }
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
                            <Button variant="danger" onClick={() => handleDelete(book.id)}>
                                Delete
                            </Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </Container>
    );
}

export default BookList;
