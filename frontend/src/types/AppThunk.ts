import { ThunkAction, AnyAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>;
