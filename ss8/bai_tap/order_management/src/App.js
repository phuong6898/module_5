import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Navbar, Container, Nav } from "react-bootstrap";
import OrderList from "./component/OrderList";
import AddOrder from "./component/AddOrder";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    return (
        <BrowserRouter>
            <Navbar bg="primary" variant="dark">
                <Container>
                    <Navbar.Brand as={Link} to="/">Order Management</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">Danh sách đơn hàng</Nav.Link>
                        <Nav.Link as={Link} to="/add">Thêm đơn hàng</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
            <Container className="mt-4">
                <Routes>
                    <Route path="/" element={<OrderList />} />
                    <Route path="/add" element={<AddOrder />} />
                </Routes>
            </Container>
        </BrowserRouter>
    );
}

export default App;
