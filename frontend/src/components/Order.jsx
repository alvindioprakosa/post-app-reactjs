import React, { useEffect, useMemo, useState } from "react";
import { Col, ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getCart, setDetail } from "../features/CartSlice.js";
import TotalCart from "./TotalCart.jsx";
import CartModal from "./CartModal.jsx";

const Order = () => {
  const dispatch = useDispatch();
  const [modalShow, setModalShow] = useState(false);
  const carts = useSelector((state) => state.cart.data);
  const loading = useSelector((state) => state.cart.loading);
  const error = useSelector((state) => state.cart.error);

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  const formattedCarts = useMemo(
    () =>
      carts?.map((item) => ({
        ...item,
        totalPrice: item.price * item.qty,
      })) || [],
    [carts]
  );

  const handleItemClick = (item) => {
    dispatch(setDetail(item));
    setModalShow(true);
  };

  return (
    <>
      <Col md={3} className="mb-5 pb-5">
        <h4>Order List</h4>
        {error && <p className="text-danger">{error}</p>}
        <hr />
        {loading ? (
          <p>Loading...</p>
        ) : formattedCarts.length > 0 ? (
          <ListGroup variant="flush">
            {formattedCarts.map((item) => (
              <ListGroup.Item
                key={item.id}
                style={{ cursor: "pointer" }}
                onClick={() => handleItemClick(item)}
              >
                <div className="fw-bold">{item.name}</div>
                <div className="d-flex justify-content-between align-items-start">
                  <div className="me-auto">
                    <small>
                      Rp {item.price.toLocaleString("id-ID")} x {item.qty}
                    </small>
                    {item.note && <p><small>{item.note}</small></p>}
                  </div>
                  <div>
                    <strong>
                      <small>Rp {item.totalPrice.toLocaleString("id-ID")}</small>
                    </strong>
                  </div>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        ) : (
          <p>No data</p>
        )}
        <TotalCart carts={formattedCarts} />
      </Col>
      <CartModal show={modalShow} onHide={() => setModalShow(false)} />
    </>
  );
};

export default Order;
