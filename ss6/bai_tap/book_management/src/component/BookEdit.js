import React, { useEffect, useState } from "react";
import { Container, Form, Button, Modal } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { getBookById, updateBook } from "../service/BookService";

function BookEdit() {
    const [title, setTitle] = useState("");
    const [quantity, setQuantity] = useState("");
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const data = await getBookById(id);
                setTitle(data.title);
                setQuantity(data.quantity);
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
            const res = await updateBook(id, { title, quantity });
            setShowSuccessModal(true);
        } catch (error) {
            console.error("Error updating book:", error);
        }
    };

    const handleModalClose = () => {
        setShowSuccessModal(false);
        navigate("/");
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

            <Modal show={showSuccessModal} onHide={handleModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Success</Modal.Title>
                </Modal.Header>
                <Modal.Body>Update book success!</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleModalClose}>
                        OK
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}

export default BookEdit;
