import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getCategories } from "../../../functions/category";
import "../Category/categoryform.scss";
import { toast } from "react-toastify";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import LocalSearch from "../Search/LocalSearch";
import { createSub, getSub, getSubs, removeSub } from "../../../functions/sub";

const SubCreateForm = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState([]);
  const [subs, setSubs] = useState([]);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    loadCategories();
    loadSubs();
  }, []);

  const loadCategories = () =>
    getCategories().then((c) => setCategories(c.data));

  const loadSubs = () =>
    getSubs().then((c) => setSubs(c.data));

  const handleSubmit = (e) => {
    e.preventDefault();
    createSub({ name, parent: category }, user.token)
      .then((res) => {
        setName("");
        console.log(res);
        toast.success(`"${res.data.name}" is created`);
        loadSubs();
      })
      .catch((err) => {
        console.log("Error while trying to create category: ", err);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  const handleRemove = async (slug) => {
    if (window.confirm("Delete ?")) {
      removeSub(slug, user.token)
        .then((res) => {
          toast.error(`${res.data.name} deleted!`);
          loadSubs();
        })
        .catch((err) => {
          if (err.response.status === 400) {
            toast.error(err.response.data);
          }
        });
    }
  };

  const handleSearchChange = (e) => {
    e.preventDefault();
    setKeyword(e.target.value.toLowerCase());
  };

  const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);

  return (
    <div className="category-create-form">
      <h1>Create Sub Category</h1>
      <br />
      <form onSubmit={handleSubmit}>
        <div className="select-category-container">
          <label>Parent Category</label>
          <br />
          <select name="category" onChange={(e) => setCategory(e.target.value)}>
            <option>Please select</option>
            {categories.length > 0 &&
              categories.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
          </select>

          {/* {JSON.stringify(category)} */}
        </div>
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

      <LocalSearch keyword={keyword} setKeyword={setKeyword} />

      {subs.filter(searched(keyword)).map((s) => {
        return (
          <div key={s._id} className="category-list-container">
            <h2>{s.name}</h2>
            <span
              style={{ cursor: "pointer" }}
              onClick={() => handleRemove(s.slug)}
            >
              <AiFillDelete />
            </span>
            <Link to={`/admin/sub/${s.slug}`}>
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

export default SubCreateForm;
