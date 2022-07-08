import React from "react";
import { Card, Tabs } from "antd";
import { Link } from "react-router-dom";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Laptop from "../../images/laptop.png";
// import "./styles/SingleProduct.scss";
import ProductListItems from "./ProductListItems";
import StarRating from "react-star-ratings";
import RatingModal from '../modal/RatingModal'

const { Meta } = Card;
const { TabPane } = Tabs;

const SingleProduct = ({ product, onStarClick, star }) => {
  const { title, images, description, _id } = product;

  return (
    <div className="single-product">
      <div className="product-image-container p-5">
        {images && images.length ? (
          <Carousel showArrows={true} autoPlay infiniteLoop>
            {images && images.map((i) => <img src={i.url} key={i.public_id} />)}
          </Carousel>
        ) : (
          <Card
            className="card-image"
            cover={<img src={Laptop} style={{ marginBottom: "3px" }} />}
          ></Card>
        )}

        <Tabs type="card">
          <TabPane tab="Description" key="1">
            {description && description}
          </TabPane>
          <TabPane tab="More" key="2">
            Call use on +383 48 787 555 to learn more about this product.
          </TabPane>
        </Tabs>
      </div>

      <div className="product-info p-5">
        <h1>{title}</h1>

        <Card
          actions={[
            <>
              <ShoppingCartOutlined /> Add to Cart
            </>,
            <Link to="/">
              <HeartOutlined /> <br /> Add to Wishlist
            </Link>,
            <RatingModal>
              <StarRating
                name={_id}
                numberOfStars={5}
                rating={star}
                changeRating={onStarClick}
                isSelectable={true}
                starRatedColor="red"
              />
            </RatingModal>,
          ]}
        >
          <ProductListItems product={product} />
        </Card>
      </div>
    </div>

    // <>
    //   <div className="col-md-7">
    //     {images && images.length ? (
    //       <Carousel showArrows={true} autoPlay infiniteLoop>
    //         {images && images.map((i) => <img src={i.url} key={i.public_id} />)}
    //       </Carousel>
    //     ) : (
    //       <Card cover={<img src={Laptop} className="mb-3 card-image" />}></Card>
    //     )}
    //   </div>

    //   <div className="col-md-5">
    //     <h1 className="bg-info p-3">{title}</h1>
    //     <Card
    //       actions={[
    //         <>
    //           <ShoppingCartOutlined className="text-success" /> <br />
    //           Add to Cart
    //         </>,
    //         <Link to="/">
    //           <HeartOutlined className="text-info" /> <br /> Add to Wishlist
    //         </Link>,
    //       ]}
    //     >
    //       <ProductListItems product={product} />
    //     </Card>
    //   </div>
    // </>
  );
};

export default SingleProduct;
