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

const boardId = '6331c68ffe2bce7be90f53ed'

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
      const board = await boardService.getBoardDetail({ boardId })
      // setBoard(board)
      setColumns(board?.columns)
      setIsLoadingBoard(false)
    } catch (error: any) {
      setIsLoadingBoard(false)
      throw new Error(error)
    }
  }

  const onColumnDrop = async (data: IDragResult) => {
    console.log(data);
    try {
      const newColumn = applyDrag(columns, data)
      setColumns(newColumn)
      boardService.swapColumn({ boardId, data: { oldIndex: data?.removedIndex, newIndex: data?.addedIndex } })
    } catch (error: any) {
      fetchBoards()
      throw new Error(error)
    }
  }

  const onCardDrop = (data: any, columnDetail: { id: string, index: number }) => {
    try {
      const newColumns = [...columns]
      const currentColumn = newColumns?.[columnDetail.index]
      currentColumn.cards = applyDrag(currentColumn?.cards, data);
      setColumns(newColumns)
      handleSwapCard({ data, columnDetail })
    } catch (error: any) {
      fetchBoards()
      throw new Error(error)
    }
  }

  const handleSwapCard = ({ data, columnDetail }: { data: any, columnDetail: { id: string } }) => {
    const { removedIndex, addedIndex } = data;
    if (removedIndex !== null && addedIndex === null) {
      cardService.deleteCard({
        cardId: data.payload._id,
        data: {
          columnId: columnDetail.id
        }
      })
    } else if (removedIndex === null && addedIndex !== null) {
      const { boardId, title } = data.payload
      cardService.createCard({
        data: {
          boardId,
          columnId: columnDetail.id,
          title
        }
      })
    } else if (removedIndex !== null && addedIndex !== null) {
      const dataSwap = {
        oldIndex: removedIndex,
        newIndex: addedIndex,
      }
      columnService.swapCard({ columnId: columnDetail.id, data: dataSwap })
    }
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
      const data = {
        boardId: '6331c68ffe2bce7be90f53ed',
      }
      await columnService.deleteColumn({ columnId, data });
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
      const response = await columnService.createColumn({ data })
      const newColumns = [...columns, response];
      setColumns(newColumns)
      setIsShowAddColumn(false)
      setNewColumnTitle('')
    } catch (error: any) {
      throw new Error(error)
    }
  }


  const handleCreateCard = async ({ title, columnId }: { title: string, columnId: string }) => {
    try {
      const data = {
        title,
        columnId,
        boardId: '6331c68ffe2bce7be90f53ed'
      }
      const response = await cardService.createCard({ data })
      fetchBoards()
    } catch (error: any) {
      throw new Error(error)
    }
  }

  const handleRemoveCard = async ({ cardId, columnId }: { cardId: string, columnId: string }) => {
    try {
      await cardService.deleteCard({ cardId, data: { columnId } })
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
                handleCreateCard={handleCreateCard}
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