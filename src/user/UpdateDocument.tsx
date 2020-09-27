import React, { useEffect, useState } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { getCard, updateCard } from "../admin/helper/adminapicalls";
import { isAutheticated } from "../auth/helper";
import Base from "../core/Base";
import { IDocumentInterface } from "./model/DocumentInterface";
import notify from '../notify';

interface MatchParams {
  cardId: string;
}
const formData = new FormData();

const UpdateDocument: React.FC<RouteComponentProps<MatchParams>> = ({ match }) => {
  const { user, token } = isAutheticated();

  const [values, setValues] = useState<IDocumentInterface>({
    documentid: "",
    photo: "",
    loading: false,
    error: "",
    createdCardname: "",
    getaRedirect: false,
  });

  const { documentid, createdCardname } = values;

  useEffect(() => {
    if (match.params.cardId) {
      getCard(match.params.cardId).then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          formData.set(documentid, data.documentid);
        }
      });
    }
  }, [match.params.cardId]);

  const onSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });
    //Updating the Card
    updateCard(match.params.cardId, user._id, token, formData).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
        notify(data.error);
      } else {
        setValues({
          ...values,
          documentid: "",
          photo: "",
          loading: false,
          createdCardname: data.documentid,
        });
        notify("Document Upload successfully.");
      }
    });
  };

  const handleChange = (name: string) => (event: any) => {
    const value = name === "photo" ? event.target.files : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const successMessage = () => (
    <div
      className="alert alert-success mt-3"
      style={{ display: createdCardname ? "" : "none" }}
    >
      <h4>{createdCardname} updated successfully</h4>
    </div>
  );
  const updateDocumentForm = () => (
    <form>
      <span>Post photo</span>
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
          placeholder="Enter the Document ID"
          value={documentid}
        />
      </div>
      <button type="submit" onClick={onSubmit}
        className="btn btn-outline-success mb-3"
      >
        Update Product
      </button>
    </form>
  );
  return (
    <Base
      title="Update Your Document Here!"
      description="Welcome to the Document Update Section"
      className="container bg-info p-4"
    >
      <Link to="/home" className="btn btn-md btn-dark mb-3">
        Home
      </Link>
      <div className="row bg-dark text-white rounded">
        <div className="col-md-8 offset-md-2">
          {successMessage()}
          {updateDocumentForm()}
        </div>
      </div>
    </Base>
  );
};

export default UpdateDocument;
