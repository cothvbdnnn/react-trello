import { ENDPOINT } from "config/endpoint";
import { request } from "../config/request";

const createCard = ({ data }: { data: {} }) => {
  return request({
    url: ENDPOINT.CARDS,
    method: 'post',
    data,
  })
}

const deleteCard = ({ cardId, data }: { cardId: string, data: {} }) => {
  return request({
    url: `${ENDPOINT.CARDS}/${cardId}`,
    method: 'delete',
    data,
  })
}

export const cardService = {
  createCard,
  deleteCard,
}