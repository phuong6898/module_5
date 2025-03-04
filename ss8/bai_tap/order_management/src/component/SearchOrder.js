// src/components/SearchOrder.js
import React from "react";
import { Row, Col, Form } from "react-bootstrap";

function SearchOrder({
                         searchStart,
                         setSearchStart,
                         searchEnd,
                         setSearchEnd,
                         searchProduct,
                         setSearchProduct,
                         uniqueProducts
                     }) {
    return (
        <Form className="mb-4">
            <Row className="g-3">
                {/* Từ ngày */}
                <Col md={4}>
                    <Form.Group>
                        <Form.Label>Từ ngày</Form.Label>
                        <Form.Control
                            type="date"
                            value={searchStart}
                            onChange={(e) => setSearchStart(e.target.value)}
                        />
                    </Form.Group>
                </Col>

                {/* Đến ngày */}
                <Col md={4}>
                    <Form.Group>
                        <Form.Label>Đến ngày</Form.Label>
                        <Form.Control
                            type="date"
                            value={searchEnd}
                            onChange={(e) => setSearchEnd(e.target.value)}
                        />
                    </Form.Group>
                </Col>

                {/* Chọn sản phẩm */}
                <Col md={4}>
                    <Form.Group>
                        <Form.Label>Chọn sản phẩm</Form.Label>
                        <Form.Select
                            value={searchProduct}
                            onChange={(e) => setSearchProduct(e.target.value)}
                        >
                            <option value="">Tất cả</option>
                            {uniqueProducts.map((name) => (
                                <option key={name} value={name}>
                                    {name}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                </Col>
            </Row>
        </Form>
    );
}

export default SearchOrder;
