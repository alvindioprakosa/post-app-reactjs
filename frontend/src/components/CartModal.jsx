import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal, Form } from "react-bootstrap";
import PropTypes from "prop-types";
import { delCart, updCart } from "../features/CartSlice.js";
import Swal from "sweetalert2";

const CartModal = ({ onHide }) => {
  const dispatch = useDispatch();
  const dataEdit = useSelector((state) => state.cart.dataEdit);
  const [data, setData] = useState({ qty: 0, note: "", id: null, name: "" });

  useEffect(() => {
    if (dataEdit) {
      setData({ ...dataEdit });
    }
  }, [dataEdit]);

  const handleUpdate = () => {
    dispatch(updCart(data));
    onHide();
    Swal.fire("Update Success!", "", "success");
  };

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(delCart(data.id));
        onHide();
        Swal.fire("Deleted!", "Your item has been deleted.", "success");
      }
    });
  };

  return (
    <Modal show centered onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Edit {data.name || ""}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Jumlah</Form.Label>
            <Form.Control
              type="number"
              min="0"
              value={data.qty}
              onChange={(e) => setData({ ...data, qty: Number(e.target.value) || 0 })}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Keterangan</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={data.note}
              onChange={(e) => setData({ ...data, note: e.target.value })}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleUpdate} variant="success">
          Update
        </Button>
        <Button onClick={handleDelete} variant="danger">
          Delete
        </Button>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

CartModal.propTypes = {
  onHide: PropTypes.func.isRequired,
};

export default CartModal;
