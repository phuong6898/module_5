import React, { useState } from "react";
import { Container, Form, Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { createBook } from "../service/BookService";

function BookCreate() {
    const [title, setTitle] = useState("");
    const [quantity, setQuantity] = useState("");
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const navigate = useNavigate();

    const handleAdd = async (e) => {
        e.preventDefault();
        if (!title.trim() || !quantity.trim()) {
            alert("Please fill all fields");
            return;
        }

        try {
            const res = await createBook({ title, quantity });
            setShowSuccessModal(true);
        } catch (error) {
            console.error("Error creating book:", error);
        }
    };

    const handleModalClose = () => {
        setShowSuccessModal(false);
        navigate("/");
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

            <Modal show={showSuccessModal} onHide={handleModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Success</Modal.Title>
                </Modal.Header>
                <Modal.Body>Create book success!</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleModalClose}>
                        OK
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}

export default BookCreate;
