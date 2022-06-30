import React from "react";
import { Link } from "react-router-dom";
import { Card } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const { Meta } = Card;

const AdminProductCard = ({ product, handleRemove }) => {
  const { title, description, images, slug } = product;

  return (
    <Card
      cover={
        <img
          src={images && images.length ? images[0].url : ""}
          style={{ height: "150px", objectFit: "cover" }}
        />
      }
      actions={[
        <Link to={`/admin/product/${slug}`}>
          <EditOutlined />
        </Link>,
        <DeleteOutlined onClick={() => handleRemove(slug)} />,
      ]}
    >
      <Meta
        title={product.title}
        description={`${description && description.substring(0, 40)}...`}
      />
    </Card>
  );
};

export default AdminProductCard;
