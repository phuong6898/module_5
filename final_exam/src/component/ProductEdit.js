import { useEffect, useState } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById, updateProduct } from "../service/ProductService";
import getCategory from "../service/CategoryService";

function ProductEdit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [importDay, setImportDay] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        getProductById(id).then((data) => {
            setProduct(data);
            setName(data.name);
            setImportDay(data.importDay);
            setQuantity(data.quantity);
            setSelectedCategory(data.category?.idCategory || "");
        });
        getCategory().then((data) => {
            setCategories(data);
        });
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (name.length > 100) {
            setError("Tên sản phẩm không được vượt quá 100 ký tự.");
            return;
        }
        const today = new Date();
        const selectedDate = new Date(importDay);
        if (selectedDate > today) {
            setError("Ngày nhập không được lớn hơn ngày hiện tại.");
            return;
        }
        if (quantity < 1) {
            setError("Số lượng sản phẩm phải từ 1 trở lên.");
            return;
        }
        if (!selectedCategory) {
            setError("Vui lòng chọn loại sản phẩm.");
            return;
        }

        const updatedCategory = categories.find(
            (cat) => cat.idCategory === selectedCategory
        );
        const updatedProduct = {
            ...product,
            name,
            importDay,
            quantity,
            category: updatedCategory,
        };

        try {
            await updateProduct(updatedProduct);
            setSuccess("Cập nhật sản phẩm thành công.");
            setTimeout(() => {
                navigate("/product-list");
            }, 2000);
        } catch (err) {
            setError("Có lỗi xảy ra khi cập nhật sản phẩm.");
        }
    };

    if (!product) {
        return <Container>Loading...</Container>;
    }

    return (
        <Container className="mt-4">
            <h2 className="text-center mb-4">Cập nhật sản phẩm</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Tên sản phẩm</Form.Label>
                    <Form.Control
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Ngày nhập</Form.Label>
                    <Form.Control
                        type="date"
                        value={importDay}
                        onChange={(e) => setImportDay(e.target.value)}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Số lượng</Form.Label>
                    <Form.Control
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(parseInt(e.target.value))}
                        min="1"
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Loại sản phẩm</Form.Label>
                    <Form.Control
                        as="select"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        <option value="">Chọn loại sản phẩm</option>
                        {categories.map((cat) => (
                            <option key={cat.idCategory} value={cat.idCategory}>
                                {cat.nameCategory}
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Cập nhật
                </Button>
            </Form>
        </Container>
    );
}

export default ProductEdit;
