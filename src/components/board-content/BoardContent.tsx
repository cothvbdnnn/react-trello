import Column from "components/column/Column"
import { useEffect, useState } from "react"
import { boardService } from "services/board"

const BoardContent = () => {
  const [isLoadingBoard, setIsLoadingBoard] = useState(true)
  const [board, setBoard] = useState({})
  const [columns, setColumns] = useState<any[]>([])

  const fetchBoards = async () => {
    try {
      const board = await boardService.getBoardDetail({ boardId: '6331c68ffe2bce7be90f53ed' })
      setBoard(board)
      setColumns(board?.columns)
      setIsLoadingBoard(false)
    } catch (error: any) {
      setIsLoadingBoard(false)
      throw new Error(error)
    }
  }

  useEffect(() => {
    fetchBoards();
  }, [])

  if (isLoadingBoard) {
    return <div></div>
  }

  return (
    <div className="board-content flex">
      {
        columns?.map((column) => <Column key={column?._id} column={column} />)
      }
    </div>
  )
}

export default BoardContent