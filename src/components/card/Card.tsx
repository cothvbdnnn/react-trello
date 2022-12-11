import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ICard } from '../../utils/interfaces';

const Card = ({ card, handleRemoveCard }: ICard) => {
  return (
    <li className="bg-stone-200 flex justify-between items-center mt-2 px-3 py-2 rounded-sm cursor-pointer">
      <p>{card?.title}</p>
      <FontAwesomeIcon icon={faTimes} onClick={() => handleRemoveCard(card?._id)} />
    </li>
  );
}

export default Card;