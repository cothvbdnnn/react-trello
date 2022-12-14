export interface IDragResult {
  removedIndex: number | null,
  addedIndex: number | null,
  payload?: {}
}

export interface IColumn {
  column: {
    _id: string,
    title: string,
    cards: [],
  },
  index: number,
  onCardDrop: any,
  handleRemoveColumn: any,
  handleRemoveCard: any,
  handleCreateCard: any,
}

export interface ICard {
  card: {
    _id: string,
    title: string,
  },
  handleRemoveCard: any,
}