import mongoose from 'mongoose';

export const idToObjectId = (id: string): mongoose.Types.ObjectId =>
  (mongoose.Types.ObjectId as any)(id);
