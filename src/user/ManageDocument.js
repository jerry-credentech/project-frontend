import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  deleteCard,
  getCards
} from "../admin/helper/adminapicalls";
import { isAutheticated } from "../auth/helper";
import Base from "../core/Base";

const ManageCard = () => {
  const [cards, setCards] = useState([]);
  const { user, token } = isAutheticated();
  const preload = () => {
    getCards().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setCards(data);
      }
    });
  };
  useEffect(() => {
    preload();
  }, []);
  const deleteThisCard = (cardId) => {
    deleteCard(cardId, user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        preload();
      }
    });
  };
  return (
    <Base title="Welcome User" description="Manage all Documents here">
      <h2 className="mb-4">All Card:</h2>
      <Link className="btn btn-info" to={`/home`}>
        <span className="">Home</span>
      </Link>
      <div className="row">
        <div className="col-12">
          <h2 className="text-center text-white my-3">
            Total no of Documents: {cards.length}
          </h2>

          {cards.map((card, index) => {
            return (
              <div key={index} className="row text-center mb-2 ">
                <div className="col-4">
                  <h3 className="text-white text-left">{card.documentid}</h3>
                </div>
                <div className="col-4">
                  <Link
                    className="btn btn-success"
                    to={`/card/update/${card._id}`}
                  >
                    <span className="">Update</span>
                  </Link>
                </div>
                <div className="col-4">
                  <button
                    onClick={() => {
                      deleteThisCard(card._id);
                    }}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Base>
  );
};

export default ManageCard;
