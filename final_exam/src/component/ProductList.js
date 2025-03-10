import { useEffect, useState } from "react";
import { Table, Button, Container } from "react-bootstrap";
import { getProduct } from "../service/ProductService";
import getCategory from "../service/CategoryService";
import { useNavigate } from "react-router-dom";
import SearchProduct from "./SearchProduct";

function ProductList() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchName, setSearchName] = useState("");
    const [searchCategory, setSearchCategory] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        getProduct().then((data) => {
            if (Array.isArray(data)) {
                setProducts(data);
            } else if (data.products) {
                setProducts(data.products);
            }
        });
    }, []);

    useEffect(() => {
        getCategory().then((data) => {
            setCategories(data);
        });
    }, []);

    useEffect(() => {
        let filtered = products;
        if (searchName) {
            filtered = filtered.filter((product) =>
                product.name.toLowerCase().includes(searchName.toLowerCase())
            );
        }
        if (searchCategory) {
            filtered = filtered.filter(
                (product) => product.category?.nameCategory === searchCategory
            );
        }
        setFilteredProducts(filtered);
    }, [products, searchName, searchCategory]);

    return (
        <Container className="mt-4">
            <h2 className="text-center mb-4">Quản lý sản phẩm</h2>
            <Button
                variant="success"
                className="mb-3"
                onClick={() => navigate("/add-product")}
            >
                Thêm sản phẩm mới
            </Button>
            <SearchProduct
                searchName={searchName}
                setSearchName={setSearchName}
                searchCategory={searchCategory}
                setSearchCategory={setSearchCategory}
                categories={categories}
            />
            {filteredProducts.length === 0 ? (
                <p className="text-danger">Không có kết quả</p>
            ) : (
                <Table striped bordered hover responsive>
                    <thead className="table-dark">
                    <tr>
                        <th>Mã sản phẩm</th>
                        <th>Tên sản phẩm</th>
                        <th>Ngày nhập</th>
                        <th>Số lượng</th>
                        <th>Loại sản phẩm</th>
                        <th>Hành động</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredProducts.map((product) => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>{product.importDay}</td>
                            <td>{product.quantity}</td>
                            <td>{product.category?.nameCategory}</td>
                            <td>
                                <Button
                                    variant="primary"
                                    size="sm"
                                    onClick={() => navigate(`/product/edit/${product.id}`)}
                                >
                                    Cập nhật
                                </Button>{" "}
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

export default ProductList;
