import React from "react";
import { Link } from "react-router-dom";
import { Card } from "antd";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";

const { Meta } = Card;

const ProductCard = ({ product }) => {
  const { title, description, images, slug } = product;

  return (
    <Card
      cover={
        <img
          src={images && images.length ? images[0].url : ""}
          style={{ height: "175px", objectFit: "cover" }}
        />
      }
      actions={[
        <Link to={`/product/${slug}`}>
          <EyeOutlined />
          <br />
          View Product
        </Link>,
        <>
          <ShoppingCartOutlined />
          <br />
          View Product
        </>,
      ]}
    >
      <Meta
        title={product.title}
        description={`${description && description.substring(0, 40)}...`}
      />
    </Card>
  );
};

export default ProductCard;
