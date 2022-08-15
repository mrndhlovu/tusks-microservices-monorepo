import { ReactNode, ReactElement, MouseEvent } from 'react';
import styled from 'styled-components';

import { Divider, Menu, MenuButton, MenuList, Portal } from '@chakra-ui/react';

interface IProps {
  toggle: ReactElement;
  children: ReactNode;
  className?: string;
  heading?: string;
  closeOnSelect?: boolean;
  placement?:
    | 'top'
    | 'right'
    | 'bottom'
    | 'left'
    | 'auto'
    | 'auto-start'
    | 'auto-end'
    | 'top-start'
    | 'top-end'
    | 'bottom-start'
    | 'bottom-end'
    | 'right-start'
    | 'right-end'
    | 'left-start'
    | 'left-end';
  usePortal?: boolean;
  onToggleClick?: (ev: MouseEvent<HTMLButtonElement>) => void;
  toggleId?: string;
  contentClassName?: string;
}

const StyledMenu = styled(Menu)`
  min-width: 350px;
  border-width: 0;
  border: 0;
`;

const StyledMenuContent = styled(MenuList)`
  border-radius: 2px !important;
  border-width: 0;
  border: 0;
  z-index: 50;
  padding: 0 !important;

  &::-webkit-scrollbar {
    display: none;
  }

  header {
    margin-bottom: 0.8rem;
    padding: 0.8rem 0.8rem 0;
    position: relative;
    text-align: center;
    font-weight: 500;

    div {
      color: #172b4d;
      font-size: 14px;
      line-height: 20px;
      font-weight: 400;
      color: #5e6c84;
      height: 40px;
      display: block;
      line-height: 40px;
      margin: 0;
      overflow: hidden;
      padding: 0 32px;
      position: relative;
      text-overflow: ellipsis;
      white-space: nowrap;
      grid-column: 1 / span 3;
      grid-row: 1;
    }
  }

  .dropdown-item {
    font-size: 1rem;
    color: ${props => props.theme.colors.bgDark};
    font-weight: 500;
    color: #5e6c84;
    font-size: 14px;
  }

  .dropdown-content {
    padding: 10px;
  }

  .dropdown > span:first-child {
    z-index: -1;
  }
`;

const DropdownHeader = styled.h6``;

const UIDropdown = ({
  toggle,
  children,
  className = '',
  contentClassName = '',
  heading,
  placement = 'bottom',
  usePortal = false,
  closeOnSelect = false,
  onToggleClick,
  toggleId,
}: IProps) => {
  return (
    <StyledMenu closeOnSelect={closeOnSelect} placement={placement}>
      {({ isOpen }) => (
        <>
          <MenuButton
            data-toggle-id={toggleId}
            onClick={onToggleClick}
            className={`dropdown ${className}`}>
            {toggle}
          </MenuButton>

          <UIDropdown.Wrapper usePortal={usePortal}>
            <StyledMenuContent>
              {heading && (
                <header>
                  <DropdownHeader>{heading}</DropdownHeader>
                </header>
              )}
              <Divider />
              {isOpen ? (
                <div className={`dropdown-content ${contentClassName}`}>
                  {children}
                </div>
              ) : null}
            </StyledMenuContent>
          </UIDropdown.Wrapper>
        </>
      )}
    </StyledMenu>
  );
};

UIDropdown.Wrapper = ({
  usePortal,
  children,
}: {
  usePortal: IProps['usePortal'];
  children: IProps['children'];
}) => (usePortal ? <Portal>{children}</Portal> : <>{children}</>);

export { UIDropdown };
