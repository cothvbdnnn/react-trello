import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container, Draggable } from 'react-smooth-dnd';
import Card from 'components/card/Card';
import { IDragResult, IColumn } from 'utils/interfaces';
import { useEffect, useRef, useState } from 'react';

const Column = ({
  column,
  index,
  onCardDrop,
  handleRemoveColumn,
  handleRemoveCard,
  handleCreateCard
}: IColumn) => {
  const { cards }: { cards: any[] } = column
  const [isShowAddCard, setIsShowAddCard] = useState(false)
  const [newCardTitle, setNewCardTitle] = useState('')
  const newCardInputRef = useRef<any>(null)

  useEffect(() => {
    if (!newCardInputRef?.current) return
    newCardInputRef.current?.focus()
  }, [isShowAddCard])

  const handleCardDrop = (data: IDragResult) => {
    if (data?.removedIndex === null && data?.addedIndex === null) return
    const columnDetail = {
      id: column._id,
      index,
    }
    onCardDrop(data, columnDetail)
  }

  const handleGetChildPayload = (index: number) => {
    return cards?.[index]
  }

  const handleOnChange = (event: any) => {
    setNewCardTitle(event.target.value)
  }

  const handleToggleShowAddCard = () => {
    setIsShowAddCard(!isShowAddCard)
  }

  const handleBeforeCreateCard = ({ title, columnId }: { title: string, columnId: string }) => {
    handleCreateCard({ title, columnId })
    setNewCardTitle('')
    setIsShowAddCard(false)
  }

  const handleBeforeRemoveCard = (cardId: string) => {
    handleRemoveCard({ cardId, columnId: column?._id })
  }

  return (
    <nav
      className="board-columns text-lg p-2 w-80"
    >
      <div className="column bg-stone-300 p-2 rounded-md">
        <header className="flex px-3 items-center justify-between column-drag-handle cursor-pointer">
          <p>{column?.title}</p>
          <FontAwesomeIcon icon={faTimes} onClick={() => handleRemoveColumn(column?._id)} />
        </header>
        <ul >
          <Container
            groupName="col"
            dragClass="rotate-3 ease duration-300"
            dropClass="rotate-0 ease-in-out duration-300"
            dropPlaceholder={{
              animationDuration: 300,
              showOnTop: true,
              className: "outline-dashed outline-2 m-2 bg-stone-100",
            }}
            onDrop={handleCardDrop}
            getChildPayload={handleGetChildPayload}
          >
            {
              cards?.map((card) => (
                <Draggable key={card?._id}>
                  <Card
                    card={card}
                    handleRemoveCard={handleBeforeRemoveCard}
                  />
                </Draggable>
              ))
            }
          </Container>
        </ul>
        <div>
          {
            !isShowAddCard ?
              <div className='mt-3 cursor-pointer' onClick={handleToggleShowAddCard}>
                <FontAwesomeIcon icon={faPlus} /> Add another card
              </div>
              :
              <div>
                <input
                  type="text"
                  className='w-full h-9 rounded-md mb-2 p-3'
                  ref={newCardInputRef}
                  value={newCardTitle}
                  onChange={handleOnChange}
                />
                <div className='flex items-center'>
                  <button
                    className='bg-stone-500 px-3 py-1 cursor-pointer text-white mr-3 rounded-md'
                    onClick={() => handleBeforeCreateCard({ title: newCardTitle, columnId: column?._id })}
                  >Add card</button>
                  <FontAwesomeIcon
                    className='cursor-pointer'
                    icon={faTimes}
                    size={'lg'}
                    onClick={handleToggleShowAddCard}
                  />
                </div>
              </div>
          }
        </div>
      </div>
    </nav>
  );
}

export default Column;