import React from "react";
import { Link } from "react-router-dom";
import { Card } from "antd";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { showAverage } from "../../functions/rating";
import laptop from "../../images/laptop.png";

const { Meta } = Card;

const ProductCard = ({ product }) => {
  const { images, title, description, slug } = product;

  return (
    <>
      {product && product.ratings && product.ratings.length > 0 ? (
        showAverage(product)
      ) : (
        <div className="text-center pt-1 pb-3">"No rating yet" </div>
      )}
      <Card
        cover={
          <img
            src={images && images.length ? images[0].url : laptop}
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
            Add to Cart
          </>,
        ]}
      >
        <Meta
          title={title}
          description={`${description && description.substring(0, 40)}...`}
        />
      </Card>
    </>
  );
};

export default ProductCard;
