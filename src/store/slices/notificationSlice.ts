import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'store/store';
import { NotificationType } from 'types/types';

const initialState: NotificationType = {
  isShow: false,
  text: '',
  severity: undefined,
};

export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showNotification: (state, { payload }: { payload: NotificationType }) => {
      return payload;
    },
    closeNotification: (state) => {
      state.isShow = false;
      state.text = '';
    },
  },
});

export const notification = (state: RootState) => state.notification;

export const { showNotification, closeNotification } = notificationSlice.actions;

export default notificationSlice.reducer;
