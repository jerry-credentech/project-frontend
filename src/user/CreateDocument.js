import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createCard } from "../admin/helper/adminapicalls";
import { isAutheticated } from "../auth/helper";
import Base from "../core/Base";

const CreateDocument = () => {
  const { user, token } = isAutheticated();
  const [values, setValues] = useState({
    documentid: "",
    photo: "",
    loading: false,
    error: "",
    createdCard: "",
    getaRedirect: false,
    formData: "",
  });
  const {
    documentid,
    photo,
    loading,
    error,
    createdCard,
    getaRedirect,
    formData,
  } = values;

  const preload = ()=>{
      setValues({...values, formData: new FormData()});
  }
  //Passing an Empty useEffect so everytime something changes it can just rebuild to force updates
  useEffect(() => {
      preload();
  }, []);
  const handleChange = (documentid) => (event) => {
    const value = documentid === "photo" ? event.target.files[0] : event.target.value;
    formData.set(documentid, value);
    setValues({ ...values, [documentid]: value });
  };
  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });
    createCard(user._id, token, formData).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          documentid: "",
          photo: "",
          loading: false,
          createdCard: data.name,
        });
      }
    });
  };
  const successMessage = () =>
    loading && (
      <div
        className="alert alert-success mt-3"
        style={{ display: createCard ? "" : "none" }}
      >
        <h4>{createdCard} created successfully</h4>
      </div>
    );

  const createCardForm = () => (
    <form>
      <h1 className="text-white text-center">Add your documents Photo</h1>
      <div className="form-group">
        <label className="btn btn-block btn-success">
          <input
            onChange={handleChange("photo")}
            type="file"
            name="photo"
            accept="image"
            placeholder="choose a file"
          />
        </label>
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("documentid")}
          name="photo"
          className="form-control"
          placeholder="Your Document Id"
          value={documentid}
        />
      </div>
      <button
        type="submit"
        onClick={onSubmit}
        className="btn btn-outline-success mb-3"
      >
        Create Product
      </button>
    </form>
  );

  return (
    <Base
      title="Add a product here!"
      description="Welcome to product creation section"
      className="container bg-info p-4"
    >
      <Link to="/home" className="btn btn-md btn-dark mb-3">
        Home Page
      </Link>
      <div className="row bg-dark text-white rounded">
        <div className="col-md-8 offset-md-2">
          {successMessage()}
          {createCardForm()}
        </div>
      </div>
    </Base>
  );
};

export default CreateDocument;
