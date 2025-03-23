import { Card, Col } from "react-bootstrap";
import PropTypes from "prop-types";

const CardComponent = ({ product: { image, name, code, price }, setCart }) => (
  <Col md={4} xs={6} className="mb-4">
    <Card className="shadow" onClick={() => setCart({ image, name, code, price })}>
      <Card.Img variant="top" src={`/img/${image}`} />
      <Card.Body>
        <Card.Title>{`${name} (${code})`}</Card.Title>
        <Card.Text>Rp. {price.toLocaleString("id-ID")}</Card.Text>
      </Card.Body>
    </Card>
  </Col>
);

CardComponent.propTypes = {
  product: PropTypes.shape({
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    code: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }),
  setCart: PropTypes.func.isRequired,
};

CardComponent.defaultProps = {
  product: {
    image: "",
    name: "Unknown Product",
    code: "N/A",
    price: 0,
  },
};

export default CardComponent;
