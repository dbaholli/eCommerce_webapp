import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getCategories } from "../../../functions/category";
import "../Category/categoryform.scss";
import { toast } from "react-toastify";
import { useHistory, useRouteMatch } from "react-router-dom";
import { getSub, updateSub } from "../../../functions/sub";

const SubUpdateForm = ({ slug }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [parent, setParent] = useState("");

  let match = useRouteMatch(slug);
  let history = useHistory();

  useEffect(() => {
    loadCategories();
    loadSub();
  }, []);

  const loadCategories = () =>
    getCategories().then((c) => setCategories(c.data));

  const loadSub = () =>
    getSub(match.params.slug).then((s) => {
      setName(s.data.name);
      setParent(s.data.parent);
    });

  const handleSubmit = (e) => {
    e.preventDefault();
    updateSub(match.params.slug, { name, parent }, user.token)
      .then((res) => {
        setName("");
        console.log(res);
        toast.success(`"${res.data.name}" is updated`);
        history.push("/admin/sub");
      })
      .catch((err) => {
        console.log("Error while trying to update category: ", err);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  return (
    <div className="category-create-form">
      <h1>Update Sub Category</h1>
      <br />
      <form onSubmit={handleSubmit}>
        <div className="select-category-container">
          <label>Parent Category</label>
          <br />
          <select name="category" onChange={(e) => setParent(e.target.value)}>
            <option>Please select</option>
            {categories.length > 0 &&
              categories.map((c) => (
                <option key={c._id} value={c._id} selected={c._id === parent}>
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
    </div>
  );
};

export default SubUpdateForm;
