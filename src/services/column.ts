import { ENDPOINT } from "config/endpoint";
import { request } from "../config/request";


const getColumns = () => {
  return request({
    url: ENDPOINT.COLUMNS,
    method: 'get',
  })
}

const getColumnDetail = ({ columnId }: { columnId: string }) => {
  return request({
    url: `${ENDPOINT.COLUMNS}/${columnId}`,
    method: 'get'
  })
}

const createColumn = ({ data }: { data: {} }) => {
  return request({
    url: ENDPOINT.COLUMNS,
    method: 'post',
    data,
  })
}

const swapCard = ({ columnId, data }: { columnId: string, data: {} }) => {
  return request({
    url: `${ENDPOINT.COLUMNS}/${columnId}/swap-card`,
    method: 'put',
    data,
  })
}

const updateColumn = ({ columnId, data }: { columnId: string, data: {} }) => {
  return request({
    url: `${ENDPOINT.COLUMNS}/${columnId}`,
    method: 'put',
    data,
  })
}

const deleteColumn = ({ columnId, data }: { columnId: string, data: {} }) => {
  return request({
    url: `${ENDPOINT.COLUMNS}/${columnId}`,
    method: 'delete',
    data,
  })
}

export const columnService = {
  getColumns,
  getColumnDetail,
  createColumn,
  deleteColumn,
  updateColumn,
  swapCard,
}