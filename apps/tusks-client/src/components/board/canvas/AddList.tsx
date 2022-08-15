import { ChangeEvent, useState } from 'react';
import { Button, Input } from '@chakra-ui/react';
import { AiOutlineClose, AiOutlinePlus } from 'react-icons/ai';
import { apiClient } from '../../../api';
import { IBoard, useBoard } from '../../../lib/providers';

interface IProps {
  isFirst: boolean;
  newListPosition: number;
}

const AddList = ({ isFirst, newListPosition }: IProps) => {
  const { boardId, setActiveBoard } = useBoard();

  const [editing, setEditing] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');

  const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
    setTitle(ev.target.value);
  };

  const handleSave = async () => {
    if (!title) return;

    await apiClient
      .createList({ title, position: newListPosition }, boardId)
      .then(res => {
        setActiveBoard((prev: IBoard) => ({
          ...prev,
          lists: [...prev.lists, res.data],
        }));
        setTitle('');
        toggleAddInput();
      })
      .catch(err => {});
  };

  const toggleAddInput = () => setEditing(prev => !prev);

  return (
    <div className="list-wrapper">
      <div className="create-list">
        {editing ? (
          <div className="create-list-content">
            <div className="create-list-wrapper">
              <Input
                placeholder="Add list title..."
                defaultValue={title}
                onChange={handleChange}
                size="sm"
                autoFocus
              />
              <div className="list-control">
                <Button size="sm" colorScheme="blue" onClick={handleSave}>
                  Add list
                </Button>
                <AiOutlineClose
                  cursor="pointer"
                  onClick={toggleAddInput}
                  size={20}
                />
              </div>
            </div>
          </div>
        ) : (
          <Button
            onClick={toggleAddInput}
            className="create-button"
            leftIcon={<AiOutlinePlus size={18} />}
            size="md">
            {isFirst ? 'Add a list' : 'Add another list'}
          </Button>
        )}
      </div>
    </div>
  );
};

export default AddList;
