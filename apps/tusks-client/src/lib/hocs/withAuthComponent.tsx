import { useEffect, ComponentType } from "react"

import { IUser, useAuth } from "../providers"

interface IProps {
  data?: unknown
  currentUser?: IUser
}

export const withAuthComponent = <T extends IProps>(
  Component: ComponentType<T>
) => {
  return (props: IProps) => {
    const { rehydrateUser } = useAuth()

    useEffect(() => {
      rehydrateUser(props?.currentUser)
    }, [])

    return <Component {...(props as T)} />
  }
}
