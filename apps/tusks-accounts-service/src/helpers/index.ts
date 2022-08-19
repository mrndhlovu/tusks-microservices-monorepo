import { ACTION_KEYS } from '@tusks/api/util-interfaces'
import mongoose from 'mongoose'

export const idToObjectId = (id: string): mongoose.Types.ObjectId =>
  (mongoose.Types.ObjectId as any)(id)

export const getNotificationContext = (
  actionKey: string
): { title?: string; body?: string; subject?: string } => {
  switch (actionKey) {
    case ACTION_KEYS.CREATE_BOARD:
      return {
        body: 'New board created',
        subject: 'New board created',
        title: '',
      }

    default:
      return {}
  }
}
