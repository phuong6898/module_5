// src/components/OrderList.js
import { useEffect, useState } from "react";
import { Table, Button, Container } from "react-bootstrap";
import { getOrder } from "../service/OrderService";
import SearchOrder from "./SearchOrder";

function OrderList() {
    const [orders, setOrders] = useState([]);

    // State cho tìm kiếm
    const [searchStart, setSearchStart] = useState("");
    const [searchEnd, setSearchEnd] = useState("");
    const [searchProduct, setSearchProduct] = useState("");

    useEffect(() => {
        getOrder().then((data) => {
            setOrders(data);
        });
    }, []);

    // Hàm lấy thông tin từ trường products
    const getProductInfo = (products, field) => {
        if (Array.isArray(products)) {
            return products.map((p) => p[field]).join(", ");
        } else if (products && typeof products === "object") {
            return products[field];
        }
        return "";
    };

    // Danh sách tên sản phẩm duy nhất (để hiển thị trong dropdown)
    const uniqueProducts = Array.from(
        new Set(orders.map((order) => getProductInfo(order.products, "name")))
    ).filter((name) => name !== "");

    // Chuyển đổi chuỗi ngày sang timestamp
    const toTimestamp = (dateString) => {
        if (!dateString) return 0;
        return new Date(dateString).getTime();
    };

    // Lọc đơn hàng theo điều kiện
    const filteredOrders = orders.filter((order) => {
        const orderTime = toTimestamp(order.purchase);

        // Nếu có searchStart => order.purchase >= searchStart
        if (searchStart) {
            const startTime = toTimestamp(searchStart);
            if (orderTime < startTime) return false;
        }
        // Nếu có searchEnd => order.purchase <= searchEnd
        if (searchEnd) {
            const endTime = toTimestamp(searchEnd);
            if (orderTime > endTime) return false;
        }
        // Nếu có searchProduct => tên sản phẩm phải khớp
        if (searchProduct) {
            const productName = getProductInfo(order.products, "name");
            if (productName !== searchProduct) return false;
        }

        return true;
    });

    return (
        <Container className="mt-4">
            <h2 className="text-center mb-4">Danh sách đơn hàng</h2>

            {/* Component con hiển thị form tìm kiếm */}
            <SearchOrder
                searchStart={searchStart}
                setSearchStart={setSearchStart}
                searchEnd={searchEnd}
                setSearchEnd={setSearchEnd}
                searchProduct={searchProduct}
                setSearchProduct={setSearchProduct}
                uniqueProducts={uniqueProducts}
            />

            {/* Hiển thị kết quả */}
            {filteredOrders.length === 0 ? (
                <p className="text-danger">Không có kết quả</p>
            ) : (
                <Table striped bordered hover responsive>
                    <thead className="table-dark">
                    <tr>
                        <th>#</th>
                        <th>Mã đơn hàng</th>
                        <th>Tên sản phẩm</th>
                        <th>Giá</th>
                        <th>Loại sản phẩm</th>
                        <th>Ngày mua</th>
                        <th>Số lượng</th>
                        <th>Tổng tiền</th>
                        <th>Hành động</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredOrders.map((order, index) => (
                        <tr key={order.code}>
                            <td>{index + 1}</td>
                            <td>{order.code}</td>
                            <td>{getProductInfo(order.products, "name")}</td>
                            <td>{getProductInfo(order.products, "price")}</td>
                            <td>{getProductInfo(order.products, "category")}</td>
                            <td>{order.purchase}</td>
                            <td>{order.quantity}</td>
                            <td>{order.totalAmount}</td>
                            <td>
                                <Button variant="danger" size="sm">
                                    Xóa
                                </Button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            )}
        </Container>
    );
}

export default OrderList;
