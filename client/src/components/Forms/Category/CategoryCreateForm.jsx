import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  createCategory,
  getCategories,
  removeCategory,
} from "../../../functions/category";
import "./categoryform.scss";
import { toast } from "react-toastify";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";

const CategoryForm = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () =>
    getCategories().then((c) => setCategories(c.data));

  const handleSubmit = (e) => {
    e.preventDefault();
    createCategory({ name }, user.token)
      .then((res) => {
        setName("");
        console.log(res);
        toast.success(`"${res.data.name}" is created`);
        loadCategories();
      })
      .catch((err) => {
        console.log("Error while trying to create category: ", err);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  const handleRemove = async (slug) => {
    if (window.confirm("Delete ?")) {
      removeCategory(slug, user.token)
        .then((res) => {
          toast.error(`${res.data.name} deleted!`);
          loadCategories();
        })
        .catch((err) => {
          if (err.response.status === 400) {
            toast.error(err.response.data);
          }
        });
    }
  };

  return (
    <div className="category-create-form">
      <h1>Create Category</h1>
      <br />
      <form onSubmit={handleSubmit}>
        <div className="createcategory-input">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <input type="submit" value="Save" />
      </form>
      <hr />
      {categories.map((c) => {
        return (
          <div key={c._id} className="category-list-container">
            <h2>{c.name}</h2>
            <span
              style={{ cursor: "pointer" }}
              onClick={() => handleRemove(c.slug)}
            >
              <AiFillDelete />
            </span>
            <Link to={`/admin/category/${c.slug}`}>
              <span>
                <AiFillEdit />
              </span>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default CategoryForm;
