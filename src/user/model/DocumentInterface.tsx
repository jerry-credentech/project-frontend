export interface IDocumentInterface{
  documentid: string,
  photo: string,
  loading: boolean,
  error: string,
  createdCardname: string,
  getaRedirect: boolean
};

export interface CardsInterface{
  _id: string,
  documentid: string,
};
