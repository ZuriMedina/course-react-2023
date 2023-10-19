import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

const DEFAULT_STATE = [
  {
    id: '1',
    name: 'Zuri',
    email: 'zuri@gmail.com',
    github: '@zuri',
  },
  {
    id: '2',
    name: 'Pepe',
    email: 'pepe@gmail.com',
    github: '@pepe',
  },
  {
    id: '3',
    name: 'María',
    email: 'maria@gmail.com',
    github: '@maria',
  },
];

export type UserId = string;

export interface User {
  name: string;
  email: string;
  github: string;
}

export interface UserWithId extends User {
  id: UserId;
}

/**
 * Función que se ejecuta a sí misma
 */
const initialState: UserWithId[] = (() => {
  const persistedState = localStorage.getItem('__redux__state__');
  return persistedState ? JSON.parse(persistedState).users : DEFAULT_STATE;
})();

/**
 * Es posible mutar el estado con redux toolkit gracias a Immer. Vease ejemplos en las funciones;
 * addNewUser y rollbackUser
 * @see https://redux-toolkit.js.org/usage/immer-reducers
 */
export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addNewUser: (state, action: PayloadAction<User>) => {
      const id = crypto.randomUUID();
      //Mutamos estado
      state.push({ id, ...action.payload });
      //Por lo que no es necesario duplicar un nuevo estado, etc.
      //return [...state, { id, ...action.payload }];
    },
    //En el PayloadAction le pasamos el tipo del UserId para que lo tenga en cuenta
    deleteUserById: (state, action: PayloadAction<UserId>) => {
      const id = action.payload;
      return state.filter((user) => user.id !== id);
    },
    rollbackUser: (state, action: PayloadAction<UserWithId>) => {
      const isUserAlreadyDefined = state.some(
        (user) => user.id === action.payload.id
      );
      //Mutamos estado
      if (!isUserAlreadyDefined) state.push(action.payload);
      //Por lo que no es necesario duplicar un nuevo estado, etc.
      //return [...state, action.payload];
    },
  },
});

export default usersSlice.reducer;

export const { addNewUser, deleteUserById, rollbackUser } = usersSlice.actions;
