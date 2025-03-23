import { Col, ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { categorySelectors, getAllCategory } from "../features/CategorySlice.js";
import { useEffect, useRef } from "react";
import { IoFastFoodSharp } from "react-icons/io5";
import { FaUtensils } from "react-icons/fa";
import { CiCoffeeCup } from "react-icons/ci";
import { TbBrandCakephp } from "react-icons/tb";
import { getProduct, getProductByCategory } from "../features/ProductSlice.js";

const Category = () => {
  const dispatch = useDispatch();
  const category = useSelector(categorySelectors.selectAll);
  const activeRef = useRef(null);

  useEffect(() => {
    dispatch(getAllCategory());
  }, [dispatch]);

  const setActive = (elem) => {
    if (activeRef.current) {
      activeRef.current.classList.remove("active");
    }
    elem.classList.add("active");
    activeRef.current = elem;
  };

  const setIcon = (categoryId) => {
    switch (categoryId) {
      case 1:
        return <FaUtensils />;
      case 2:
        return <CiCoffeeCup />;
      default:
        return <TbBrandCakephp />;
    }
  };

  return (
    <Col md={2}>
      <h4>Product Kategori</h4>
      <hr />
      <ListGroup>
        <ListGroup.Item
          id="all001"
          className="mb-1 shadow-sm active"
          action
          ref={activeRef}
          onClick={(e) => {
            setActive(e.currentTarget);
            dispatch(getProduct());
          }}
        >
          <IoFastFoodSharp /> All Product
        </ListGroup.Item>
        {category.map((item) => (
          <ListGroup.Item
            key={item.id}
            className="mb-1 shadow-sm"
            action
            onClick={(e) => {
              setActive(e.currentTarget);
              dispatch(getProductByCategory(item.id));
            }}
          >
            {setIcon(item.id)} {item.name}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Col>
  );
};

export default Category;
