import { create } from 'zustand';
import { createAuthSlice } from './slice/auth-slice';

const userAppstore = create()((...a) => ({
  ...createAuthSlice(...a),
}));

export default userAppstore;
