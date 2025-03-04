import React from "react";
import { Form, Row, Col } from "react-bootstrap";

function SearchProduct({
                           searchName,
                           setSearchName,
                           searchCategory,
                           setSearchCategory,
                           categories,
                       }) {
    return (
        <Form className="mb-4">
            <Row>
                <Col md={6}>
                    <Form.Group>
                        <Form.Label>Tìm kiếm theo tên sản phẩm</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Nhập tên sản phẩm"
                            value={searchName}
                            onChange={(e) => setSearchName(e.target.value)}
                        />
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group>
                        <Form.Label>Chọn loại sản phẩm</Form.Label>
                        <Form.Control
                            as="select"
                            value={searchCategory}
                            onChange={(e) => setSearchCategory(e.target.value)}
                        >
                            <option value="">Tất cả</option>
                            {categories.map((category) => (
                                <option key={category.idCategory} value={category.nameCategory}>
                                    {category.nameCategory}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                </Col>
            </Row>
        </Form>
    );
}

export default SearchProduct;
