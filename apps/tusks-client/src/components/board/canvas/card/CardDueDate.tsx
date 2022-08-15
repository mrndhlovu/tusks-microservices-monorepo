import { Checkbox } from '@chakra-ui/checkbox';
import { Badge } from '@chakra-ui/layout';
import { formatDistanceToNow } from 'date-fns';
import { IoIosArrowDown } from 'react-icons/io';

import { apiClient } from '../../../../api';
import { UIDropdown } from '../../../shared';
import { useCardContext } from '../../../../lib/providers';
import AddCardDueDate from './AddCardDueDate';
import CardModule from './CardModule';

const CardDueDate = () => {
  const { card, cardId, listId, updateCardState } = useCardContext();
  const hasDueDate = card?.due && card?.due !== undefined;

  const handleUpdate = () => {
    const update = { dueComplete: !card?.dueComplete };

    apiClient
      .updateCard(update, { cardId, listId })
      .then(res => updateCardState(res.data))
      .catch(err => null);
  };

  return hasDueDate ? (
    <div className="card-due-date-module">
      <CardModule className="card-due-date" title="Due Date" />

      <div className="due-date-detail module-content">
        <Checkbox
          checked={card?.dueComplete}
          isChecked={card?.dueComplete}
          onChange={handleUpdate}
        />
        {formatDistanceToNow(new Date(card?.due), { addSuffix: true })}
        {card.dueComplete && (
          <Badge className="badge" colorScheme="green">
            Complete
          </Badge>
        )}
        <UIDropdown heading="Dates" usePortal toggle={<IoIosArrowDown />}>
          <AddCardDueDate />
        </UIDropdown>
      </div>
    </div>
  ) : null;
};

export default CardDueDate;
