import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import  getProduct  from "../service/ProductService";
import { getOrder, addOrder } from "../service/OrderService";
import { toast } from "react-toastify";
import { Container, Form as BootstrapForm, Button, Row, Col } from "react-bootstrap";

const AddOrder = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const data = await getProduct();
            if (Array.isArray(data)) {
                setProducts(data);
            } else {
                console.error("Product data is not an array", data);
            }
        };
        fetchProducts();
    }, []);

    const validationSchema = Yup.object().shape({
        purchase: Yup.date()
            .required("Ngày mua là bắt buộc")
            .max(new Date(), "Ngày mua không được vượt quá hiện tại"),
        quantity: Yup.number()
            .min(1, "Số lượng tối thiểu là 1")
            .required("Số lượng là bắt buộc"),
        product: Yup.string().required("Vui lòng chọn sản phẩm"),
    });

    const initialValues = {
        purchase: "",
        quantity: 1,
        product: "",
        totalAmount: 0,
    };

    const computeTotalAmount = (productId, quantity) => {
        const selectedProduct = products.find((p) => p.id.toString() === productId);
        return selectedProduct && quantity > 0 ? selectedProduct.price * quantity : 0;
    };

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            const orders = await getOrder();
            const numericCodes = orders.map((order) => (order.code ? Number(order.code.replace("DH", "")) : 0));
            const maxCode = orders.length > 0 ? Math.max(...numericCodes) : 0;
            const newCodeFormatted = `DH${(maxCode + 1).toString().padStart(4, "0")}`;

            const selectedProduct = products.find((p) => p.id.toString() === values.product);
            if (!selectedProduct) {
                toast.error("Không tìm thấy sản phẩm được chọn");
                setSubmitting(false);
                return;
            }

            const totalAmount = computeTotalAmount(values.product, values.quantity);
            const orderData = {
                code: newCodeFormatted,
                purchase: values.purchase,
                quantity: Number(values.quantity),
                totalAmount: totalAmount,
                products: selectedProduct,
            };

            const result = await addOrder(orderData);
            if (result) {
                toast.success("Thêm đơn hàng thành công");
                navigate("/");
            } else {
                toast.error("Thêm đơn hàng thất bại");
            }
        } catch (error) {
            console.error("Lỗi khi thêm đơn hàng:", error);
            toast.error("Có lỗi xảy ra khi thêm đơn hàng");
        }
        setSubmitting(false);
    };

    const TotalAmountUpdater = ({ product, quantity, setFieldValue }) => {
        useEffect(() => {
            setFieldValue("totalAmount", computeTotalAmount(product, quantity), false);
        }, [product, quantity, setFieldValue]);
        return null;
    };

    return (
        <Container className="mt-4">
            <h2 className="text-center mb-4">Thêm đơn hàng mới</h2>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                {({ values, setFieldValue, isSubmitting }) => (
                    <BootstrapForm as={Form}>
                        <TotalAmountUpdater product={values.product} quantity={values.quantity} setFieldValue={setFieldValue} />

                        <Row className="mb-3">
                            <Col md={6}>
                                <BootstrapForm.Group>
                                    <BootstrapForm.Label>Ngày mua</BootstrapForm.Label>
                                    <Field as={BootstrapForm.Control} type="date" name="purchase" />
                                    <ErrorMessage name="purchase" component="div" className="text-danger" />
                                </BootstrapForm.Group>
                            </Col>

                            <Col md={6}>
                                <BootstrapForm.Group>
                                    <BootstrapForm.Label>Số lượng</BootstrapForm.Label>
                                    <Field as={BootstrapForm.Control} type="number" name="quantity" min="1" />
                                    <ErrorMessage name="quantity" component="div" className="text-danger" />
                                </BootstrapForm.Group>
                            </Col>
                        </Row>

                        <Row className="mb-3">
                            <Col md={6}>
                                <BootstrapForm.Group>
                                    <BootstrapForm.Label>Chọn sản phẩm</BootstrapForm.Label>
                                    <Field as={BootstrapForm.Select} name="product">
                                        <option value="">-- Chọn sản phẩm --</option>
                                        {products.map((prod) => (
                                            <option key={prod.id} value={prod.id}>
                                                {prod.name}
                                            </option>
                                        ))}
                                    </Field>
                                    <ErrorMessage name="product" component="div" className="text-danger" />
                                </BootstrapForm.Group>
                            </Col>

                            <Col md={6}>
                                <BootstrapForm.Group>
                                    <BootstrapForm.Label>Tổng tiền</BootstrapForm.Label>
                                    <Field as={BootstrapForm.Control} type="text" name="totalAmount" readOnly style={{ backgroundColor: "#eee" }} />
                                </BootstrapForm.Group>
                            </Col>
                        </Row>

                        <div className="d-flex justify-content-center">
                            <Button type="submit" variant="primary" disabled={isSubmitting}>
                                {isSubmitting ? "Đang thêm..." : "Thêm đơn hàng"}
                            </Button>
                        </div>
                    </BootstrapForm>
                )}
            </Formik>
        </Container>
    );
};

export default AddOrder;
