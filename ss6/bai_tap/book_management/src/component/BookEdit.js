import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";

function BookEdit() {
    const [title, setTitle] = useState("");
    const [quantity, setQuantity] = useState("");
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const res = await axios.get(
                    `https://my-json-server.typicode.com/codegym-vn/mock-api-books/books/${id}`
                );
                setTitle(res.data.title);
                setQuantity(res.data.quantity);
            } catch (error) {
                console.error("Error fetching book:", error);
            }
        };
        fetchBook();
    }, [id]);

    const handleSave = async (e) => {
        e.preventDefault();
        if (!title.trim() || !quantity.trim()) {
            alert("Please fill all fields");
            return;
        }

        try {
            const res = await axios.put(
                `https://my-json-server.typicode.com/codegym-vn/mock-api-books/books/${id}`,
                { title, quantity }
            );
            alert(`Update success! (Status: ${res.status})`);
            navigate("/");
        } catch (error) {
            console.error("Error updating book:", error);
        }
    };

    return (
        <Container className="mt-4">
            <h1>Edit Book</h1>
            <Form onSubmit={handleSave}>
                <Form.Group className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter book title"
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        placeholder="Enter quantity"
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Save
                </Button>
            </Form>
        </Container>
    );
}

export default BookEdit;
