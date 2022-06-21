import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { updateCategory, getCategory } from "../../../functions/category";
import "./categoryform.scss";
import { toast } from "react-toastify";
import { useHistory, useRouteMatch } from "react-router-dom";

const CategoryUpdateForm = ({ slug }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [name, setName] = useState("");

  //   let { slug } = useParams();
  let match = useRouteMatch(slug);
  let history = useHistory();

  useEffect(() => {
    // console.log(match.params);
    loadCategory();
  }, []);

  const loadCategory = () => {
    getCategory(match.params.slug).then((c) => setName(c.data.name));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateCategory(match.params.slug, { name }, user.token)
      .then((res) => {
        setName("");
        console.log(res);
        toast.success(`"${res.data.name}" is updated`);
        history.push("/admin/category");
      })
      .catch((err) => {
        console.log("Error while trying to update category: ", err);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  return (
    <div className="category-create-form">
      <h1>Update Category</h1>
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
    </div>
  );
};

export default CategoryUpdateForm;
