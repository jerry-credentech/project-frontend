import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createCard } from "../admin/helper/adminapicalls";
import { isAutheticated } from "../auth/helper";
import Base from "../core/Base";
import { IDocumentInterface } from "./model/DocumentInterface";
import notify from '../notify';

const formData = new FormData();

const CreateDocument: React.FC = () => {
  const { user, token } = isAutheticated();

  const [values, setValues] = useState<IDocumentInterface>({
    documentid: "",
    photo: "",
    loading: false,
    error: "",
    createdCardname: "",
    getaRedirect: false
  });

  const {
    documentid,
    loading,
    createdCardname,
  } = values;

  const handleChange = (documentid: string) => (event: any) => {
    const value = documentid === "photo" ? event.target.files : event.target.value;
    formData.set(documentid, value);
    setValues({ ...values, [documentid]: value });
  };
  const onSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });
    createCard(user._id, token, formData).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
        notify(data.error);
      } else {
        setValues({
          ...values,
          documentid: "",
          photo: "",
          loading: false,
          createdCardname: data.name,
        });
        notify("Document Upload successfully.");
      }
    });
  };
  const successMessage = () =>
    loading && (
      <div
        className="alert alert-success mt-3"
        style={{ display: createCard() ? "" : "none" }}
      >
        <h4>{createdCardname} created successfully</h4>
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
