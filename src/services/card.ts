import { ENDPOINT } from "config/endpoint";
import { request } from "../config/request";

const createCard = ({ data }: { data: {} }) => {
  return request({
    url: ENDPOINT.CARDS,
    method: 'post',
    data,
  })
}

const deleteCard = ({ cardId }: { cardId: string }) => {
  return request({
    url: `${ENDPOINT.CARDS}/${cardId}`,
    method: 'delete'
  })
}

export const cardService = {
  createCard,
  deleteCard,
}