import { Container, Draggable } from 'react-smooth-dnd'
import Column from "components/column/Column"
import { useEffect, useRef, useState } from "react"
import { boardService } from "services/board"
import { columnService } from 'services/column'
import { cardService } from 'services/card'
import { applyDrag } from 'utils/common'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons'
import { IDragResult } from 'utils/interfaces'

const BoardContent = () => {
  const [isLoadingBoard, setIsLoadingBoard] = useState(true)
  // const [board, setBoard] = useState({})
  const [columns, setColumns] = useState<any[]>([])
  const [isShowAddColumn, setIsShowAddColumn] = useState(false)
  const [newColumnTitle, setNewColumnTitle] = useState('')
  const newColumnInputRef = useRef<any>(null)

  useEffect(() => {
    fetchBoards();
  }, [])

  useEffect(() => {
    if (!newColumnInputRef?.current) return
    newColumnInputRef.current?.focus()
  }, [isShowAddColumn])

  const fetchBoards = async () => {
    try {
      const board = await boardService.getBoardDetail({ boardId: '6331c68ffe2bce7be90f53ed' })
      // setBoard(board)
      setColumns(board?.columns)
      setIsLoadingBoard(false)
    } catch (error: any) {
      setIsLoadingBoard(false)
      throw new Error(error)
    }
  }

  const onColumnDrop = (data: IDragResult) => {
    const newColumn = applyDrag(columns, data)
    setColumns(newColumn)
  }

  const onCardDrop = (data: any, columnIndex: number) => {
    const newColumns = [...columns]
    const currentColumn = newColumns?.[columnIndex]
    currentColumn.cards = applyDrag(currentColumn?.cards, data);
    setColumns(newColumns)
  }

  const handleGetChildPayload = (index: number) => {
    return columns?.[index]
  }

  const handleToggleShowAddColumn = () => {
    setIsShowAddColumn(!isShowAddColumn)
  }

  const handleOnChange = (event: any) => {
    setNewColumnTitle(event.target.value)
  }

  const handleRemoveColumn = async (columnId: string) => {
    try {
      await columnService.deleteColumn({ columnId: columnId });
      fetchBoards();
    } catch (error: any) {
      throw new Error(error);
    }
  }

  const handleCreateColumn = async () => {
    if (!newColumnTitle) {
      newColumnInputRef.current.focus()
    }
    const data = {
      title: newColumnTitle,
      boardId: '6331c68ffe2bce7be90f53ed'
    }
    try {
      await columnService.createColumn({ data })
      fetchBoards()
      setIsShowAddColumn(false)
      setNewColumnTitle('')
    } catch (error: any) {
      throw new Error(error)
    }
  }

  const handleRemoveCard = async (cardId: string) => {
    try {
      await cardService.deleteCard({ cardId })
      fetchBoards()
    } catch (error: any) {
      throw new Error(error);
    }
  }

  if (isLoadingBoard) {
    return <div></div>
  }

  return (
    <div
      className="board-content p-5 flex w-full"
    >
      <Container
        orientation="horizontal"
        onDrop={onColumnDrop}
        getChildPayload={handleGetChildPayload}
        dragHandleSelector=".column-drag-handle"
        dropPlaceholder={{
          animationDuration: 300,
          showOnTop: true,
          className: "outline-dashed outline-2 m-2 bg-stone-100",
        }}
      >
        {
          columns?.map((column, index) => (
            <Draggable key={column?._id}>
              <Column
                column={column}
                index={index}
                onCardDrop={onCardDrop}
                handleRemoveColumn={handleRemoveColumn}
                handleRemoveCard={handleRemoveCard}
              />
            </Draggable>
          ))
        }
      </Container>
      <nav className="board-columns text-lg overflow-auto p-2 w-80">
        <div className="column bg-stone-300 p-2 rounded-md">
          {
            !isShowAddColumn ?
              <header className="px-1 cursor-pointer" onClick={handleToggleShowAddColumn}>
                <FontAwesomeIcon icon={faPlus} /> Add another column
              </header>
              :
              <div>
                <input
                  type="text"
                  className='w-full h-9 rounded-md mb-2 p-3'
                  ref={newColumnInputRef}
                  value={newColumnTitle}
                  onChange={handleOnChange}
                />
                <button className='bg-stone-500 px-3 py-1 cursor-pointer text-white mr-3 rounded-md'
                  onClick={handleCreateColumn}
                >Add column</button>
                <FontAwesomeIcon className='cursor-pointer' icon={faTimes} size={'lg'} onClick={handleToggleShowAddColumn} />
              </div>
          }
        </div>
      </nav>
    </div>
  )
}

export default BoardContent