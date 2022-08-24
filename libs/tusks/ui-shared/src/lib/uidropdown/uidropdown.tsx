import { ReactNode, ReactElement, MouseEvent } from 'react'
import { Divider, Menu, MenuButton, MenuList, Portal } from '@chakra-ui/react'

interface IProps {
  toggle: ReactElement
  children: ReactNode
  className?: string
  heading?: string
  closeOnSelect?: boolean
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
    | 'left-end'
  usePortal?: boolean
  onToggleClick?: (ev: MouseEvent<HTMLButtonElement>) => void
  toggleId?: string
  contentClassName?: string
}

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
    <Menu closeOnSelect={closeOnSelect} placement={placement}>
      {({ isOpen }) => (
        <>
          <MenuButton
            data-toggle-id={toggleId}
            onClick={onToggleClick}
            className={`dropdown ${className}`}
          >
            {toggle}
          </MenuButton>

          <UIDropdown.Wrapper usePortal={usePortal}>
            <MenuList className="ui-menu-list">
              {heading && (
                <header>
                  <h6>{heading}</h6>
                </header>
              )}
              <Divider />
              {isOpen ? (
                <div className={`dropdown-content ${contentClassName}`}>
                  {children}
                </div>
              ) : null}
            </MenuList>
          </UIDropdown.Wrapper>
        </>
      )}
    </Menu>
  )
}

UIDropdown.Wrapper = ({
  usePortal,
  children,
}: {
  usePortal: IProps['usePortal']
  children: IProps['children']
}) => (usePortal ? <Portal>{children}</Portal> : <>{children}</>)

export default UIDropdown
