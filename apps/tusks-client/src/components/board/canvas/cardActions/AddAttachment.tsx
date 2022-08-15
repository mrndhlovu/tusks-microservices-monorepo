import { Button } from '@chakra-ui/button';
import { Input } from '@chakra-ui/input';
import { Divider } from '@chakra-ui/layout';
import { Menu, MenuItemOption } from '@chakra-ui/menu';
import { ChangeEvent, useRef, useState } from 'react';

import { apiClient } from '../../../../api';
import { useBoard, useCardContext } from '../../../../lib/providers';
import { IAttachment } from './ChangeCover';
import StyleAddAttachment from './StyleAddAttachment';

const ATTACHMENT_INITIAL_STATE = {
  data: undefined,
  isFile: false,
  isImage: false,
};

const AddAttachment = () => {
  const { cardId } = useCardContext();
  const { fetchAndUpdateActions, setAttachments } = useBoard();
  const [name, setName] = useState<string>('');
  const [attachment, setAttachment] = useState<{
    data: string | FormData | undefined;
    isFile?: boolean;
    isImage?: boolean;
  }>(ATTACHMENT_INITIAL_STATE);
  const inputRef = useRef<HTMLInputElement>();

  const handleClick = () => {
    inputRef.current.click();
  };

  const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
    if (!ev?.currentTarget?.files) {
      setAttachment({ data: ev.currentTarget.value });

      return;
    }

    const file = ev.currentTarget.files?.[0];
    if (!file) return;
    const fileType = file.type.split('/')?.[1];
    const allowedImageFiles = ['png', 'jpeg', 'jpg', 'gif'];
    const isImage = allowedImageFiles.includes(fileType);

    const formData = new FormData();
    formData.append('file', file);

    setAttachment({ data: formData, isFile: true, isImage });
  };

  const handleChangeName = (ev: ChangeEvent<HTMLInputElement>) => {
    setName(ev?.target.value);
  };

  const handleAttach = () => {
    if (attachment?.isFile && !attachment.isImage) {
      apiClient
        .uploadAttachment(attachment.data as FormData, cardId)
        .then(res => {
          const newAttachmentIds = [];

          const newAttachments: IAttachment[] = res.data;
          newAttachments.map(item => newAttachmentIds.push(item.id));

          setAttachment(ATTACHMENT_INITIAL_STATE);
          setName('');
          fetchAndUpdateActions(newAttachmentIds.join('|'));

          setAttachments(prev => [...prev, ...res.data]);
        })
        .catch(() => null);

      return;
    }

    if (attachment.isImage) {
      apiClient
        .uploadImageCardCover(attachment.data as FormData, cardId)
        .then(res => {
          setAttachment(ATTACHMENT_INITIAL_STATE);
          setName('');
          fetchAndUpdateActions(res.data.id);
          setAttachments(prev => [...prev, res.data]);
        })
        .catch(() => null);
      return;
    }

    if (!name) return;

    apiClient
      .addLinkAttachment({ link: attachment.data as string, name }, cardId)
      .then(res => {
        setAttachment(ATTACHMENT_INITIAL_STATE);
        setName('');
        fetchAndUpdateActions(res.data.id);

        setAttachments(prev => [...prev, res.data]);
      })
      .catch(() => null);
  };

  return (
    <StyleAddAttachment>
      <div className="attach-options">
        <Menu>
          <input
            onChange={handleChange}
            className="hidden-input"
            ref={inputRef}
            type="file"
          />
          <MenuItemOption
            onClick={handleClick}
            iconSpacing="-1"
            className="menu-option">
            Computer
          </MenuItemOption>
          <MenuItemOption iconSpacing="-1" className="menu-option">
            Google Drive
          </MenuItemOption>
        </Menu>
      </div>
      <Divider />
      <div className="attach-input">
        <label htmlFor="link">Attach a link</label>
        <Input
          onChange={handleChange}
          size="sm"
          name="link"
          placeholder="Paste any title here..."
          value={
            typeof attachment.data === 'string'
              ? (attachment.data as string)
              : ''
          }
        />

        {typeof attachment?.data === 'string' && (
          <>
            <label htmlFor="name">Attachment name</label>
            <Input
              onChange={handleChangeName}
              size="sm"
              name="name"
              placeholder="Add name..."
              value={name}
            />
          </>
        )}

        <Button
          disabled={!attachment}
          size="sm"
          colorScheme={attachment ? 'blue' : 'gray'}
          onClick={handleAttach}>
          Attach
        </Button>
      </div>
    </StyleAddAttachment>
  );
};

export default AddAttachment;
