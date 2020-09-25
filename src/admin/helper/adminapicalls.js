const { API } = require("../../backend");

//Creating a Card
export const createCard = (userId, token, card) => {
  return fetch(`${API}/card/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: card,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

//Update Card
export const updateCard = (cardId, userId, token, card) => {
  return fetch(`${API}/card/${cardId}/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: card,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

//Deleting a Card

export const deleteCard = (cardId, userId, token) => {
  return fetch(`${API}/card/${cardId}/${userId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
//Get a Card

export const getCard = (cardId) => {
  return fetch(`${API}/card/${cardId}`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

//Get all the card
export const getCards = () => {
    return fetch(`${API}/cards`, {
      method: "GET"
    })
      .then(response => {
        return response.json();
      })
      .catch(err => console.log(err));
  };
