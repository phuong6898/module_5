import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";

function BookCreate() {
    const [title, setTitle] = useState("");
    const [quantity, setQuantity] = useState("");
    const navigate = useNavigate();

    const handleAdd = async (e) => {
        e.preventDefault();
        if (!title.trim() || !quantity.trim()) {
            alert("Please fill all fields");
            return;
        }

        try {
            const res = await axios.post(
                "https://my-json-server.typicode.com/codegym-vn/mock-api-books/books",
                { title, quantity }
            );
            alert(`Create book success! (Status: ${res.status})`);
            navigate("/");
        } catch (error) {
            console.error("Error creating book:", error);
        }
    };

    return (
        <Container className="mt-4">
            <h1>Add a new Book</h1>
            <Form onSubmit={handleAdd}>
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
                <Button variant="success" type="submit">
                    Add
                </Button>
            </Form>
        </Container>
    );
}

export default BookCreate;
