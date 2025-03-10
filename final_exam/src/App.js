import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Navbar, Container, Nav } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductList from "./component/ProductList";
import ProductEdit from "./component/ProductEdit";
import AddProduct from "./components/AddProduct";

function App() {
  return (
      <BrowserRouter>
        <Navbar bg="primary" variant="dark">
          <Container>
            <Navbar.Brand as={Link} to="/">quản lý sản phẩm</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">Danh sách Sản phẩm</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
        <Container className="mt-4">
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/product/edit/:id" element={<ProductEdit />} />
            <Route path="/add-product" element={<AddProduct />} />
          </Routes>
        </Container>
      </BrowserRouter>
  );
}

export default App;
