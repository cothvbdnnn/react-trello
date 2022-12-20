import { ENDPOINT } from "config/endpoint";
import { request } from "../config/request";


const getBoards = () => {
  return request({
    url: ENDPOINT.BOARDS,
    method: 'get',
  })
}

const getBoardDetail = ({ boardId }: { boardId: string }) => {
  return request({
    url: `${ENDPOINT.BOARDS}/${boardId}`,
    method: 'get'
  })
}

const updateBoard = ({ boardId, data }: { boardId: string, data: {} }) => {
  return request({
    url: `${ENDPOINT.BOARDS}/${boardId}`,
    method: 'put',
    data,
  })
}

export const boardService = {
  getBoards,
  getBoardDetail,
  updateBoard,
}