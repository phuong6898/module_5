import { useEffect, useState } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { addProduct } from "../service/ProductService";
import getCategory from "../service/CategoryService";

function AddProduct() {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [importDate, setImportDate] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        getCategory().then((data) => {
            setCategories(data);
        });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        // Validation
        if (!name.trim()) {
            setError("Vui lòng nhập tên sản phẩm");
            return;
        }

        if (!importDate) {
            setError("Vui lòng chọn ngày nhập");
            return;
        }

        const today = new Date();
        const selectedDate = new Date(importDate);
        if (selectedDate > today) {
            setError("Ngày nhập không được lớn hơn ngày hiện tại");
            return;
        }

        if (!selectedCategory) {
            setError("Vui lòng chọn loại sản phẩm");
            return;
        }

        const newProduct = {
            name,
            importDate,
            category: {
                id: selectedCategory
            }
        };

        try {
            await addProduct(newProduct);
            setSuccess("Thêm sản phẩm thành công!");
            setTimeout(() => {
                navigate("/product-list");
            }, 1500);
        } catch (err) {
            setError("Lỗi khi thêm sản phẩm: " + (err.response?.data?.message || err.message));
        }
    };

    return (
        <Container className="mt-4">
            <h2 className="text-center mb-4">Thêm sản phẩm mới</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}

            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Tên sản phẩm</Form.Label>
                    <Form.Control
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Nhập tên sản phẩm"
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Ngày nhập</Form.Label>
                    <Form.Control
                        type="date"
                        value={importDate}
                        onChange={(e) => setImportDate(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Loại sản phẩm</Form.Label>
                    <Form.Select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        <option value="">Chọn loại sản phẩm</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>

                <div className="d-grid gap-2">
                    <Button variant="primary" type="submit">
                        Thêm mới
                    </Button>
                    <Button variant="secondary" onClick={() => navigate("/product-list")}>
                        Quay lại
                    </Button>
                </div>
            </Form>
        </Container>
    );
}

export default AddProduct;