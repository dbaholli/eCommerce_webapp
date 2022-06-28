import React from "react";
import Resizer from "react-image-file-resizer";
import axios from "axios";
import { useSelector } from "react-redux";
import { Avatar, Badge } from "antd";

const FileUpload = ({ values, setValues }) => {
  const { user } = useSelector((state) => ({ ...state }));

  const fileUploadAndResize = (e) => {
    console.log(e.target.files);
    let files = e.target.files;
    let allUplodadeFiles = values.images;

    if (files) {
      for (let i = 0; i < files.length; i++) {
        Resizer.imageFileResizer(
          files[i],
          720,
          720,
          "JPG",
          100,
          0,
          (uri) => {
            axios
              .post(
                `${process.env.REACT_APP_API}/uploadimages`,
                {
                  image: uri,
                },
                {
                  headers: {
                    authtoken: user ? user.token : "",
                  },
                }
              )
              .then((res) => {
                console.log("IMAGE UPLOAD RES DATA: ", res);
                allUplodadeFiles.push(res.data);
                setValues({ ...values, images: allUplodadeFiles });
              })
              .catch((err) => {
                console.log("Image upload failed: ", err);
              });
            // console.log(uri);
          },
          "base64"
        );
      }
    }
  };

  const handleImageRemove = (public_id) => {
    console.log("Removed image: ", public_id);
    axios
      .post(
        `${process.env.REACT_APP_API}/removeimage`,
        { public_id },
        {
          headers: {
            authtoken: user ? user.token : "",
          },
        }
      )
      .then((res) => {
        const { images } = values;
        let filteredImages = images.filter((item) => {
          return item.public_id !== public_id;
        });
        setValues({ ...values, images: filteredImages });
      })
      .catch((err) => {
        console.log("Error while trying to remove image: ", err);
      });
  };

  return (
    <>
      <div className="uploaded-file">
        {values.images &&
          values.images.map((image) => (
            <Badge
              count="X"
              style={{ marginTop: "5px", cursor: "pointer" }}
              key={image.public_id}
              onClick={() => {
                handleImageRemove(image.public_id);
              }}
            >
              <Avatar
                src={image.url}
                size={75}
                shape="square"
                style={{ margin: "0 0 0 15px" }}
              />
            </Badge>
          ))}
      </div>

      <div className="fileupload-form">
        <label
          className="hover-button"
          style={{
            fontSize: "13px",
            background: "#0800ff",
            padding: "0.5em 2.5em",
          }}
        >
          Choose file
          <input
            type="file"
            multiple
            hidden
            accept="images/*"
            onChange={fileUploadAndResize}
          />
        </label>
      </div>
    </>
  );
};

export default FileUpload;
