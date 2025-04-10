import { Container, Row, Col } from "react-bootstrap";
import NavbarComponent from "./components/NavbarComponent.jsx";
import Category from "./components/Category.jsx";
import ProductDetail from "./components/ProductDetail.jsx";
import Order from "./components/Order.jsx";

function App() {
  return (
    <>
      <NavbarComponent />
      <Container fluid className="mt-3">
        <Row>
          <Col md={3}>
            <Category />
          </Col>
          <Col md={6}>
            <ProductDetail />
          </Col>
          <Col md={3}>
            <Order />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
