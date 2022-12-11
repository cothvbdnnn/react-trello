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

const deleteColumn = ({ columnId }: { columnId: string }) => {
  return request({
    url: `${ENDPOINT.COLUMNS}/${columnId}`,
    method: 'delete'
  })
}

export const columnService = {
  getColumns,
  getColumnDetail,
  createColumn,
  deleteColumn,
}