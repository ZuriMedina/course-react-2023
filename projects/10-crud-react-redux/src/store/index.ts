import { type Middleware, configureStore } from '@reduxjs/toolkit';
import usersReducer, { UserWithId, rollbackUser } from './users/slice';
import { toast } from 'sonner';

/**
 * Función store devuelve la función next que a su vez devuelve la función action.
 * Como cada uno de los métodos se ejecuta en distintos momentos, se debe plantear así.
 */
const persistanceLocalStorageMiddleware: Middleware =
  (store) => (next) => (action) => {
    next(action);
    localStorage.setItem('__redux__state__', JSON.stringify(store.getState()));
  };

const syncWithDataBaseMiddleware: Middleware =
  (store) => (next) => (action) => {
    const { type, payload } = action;
    const previousState = store.getState();
    next(action);

    if (type === 'users/deleteUserById') {
      const userIdToRemove = payload;
      const userToRemove = previousState.users.find(
        (user: UserWithId) => user.id === userIdToRemove
      );

      fetch(`https://jsonplaceholder.typicode.com/users/${userIdToRemove}`, {
        method: 'DELETE',
      })
        .then((res) => {
          if (res.ok) {
            return toast.success(
              `Usuario ${userIdToRemove} Eliminado correctamente`
            );
          }
          throw new Error('Error al eliminar el usuario');
        })
        .catch((error) => {
          toast.error(`Error deleting user ${userIdToRemove}`);
          //Si no es posible sincronizar con DDBB vuelve al estado inicial del usuario
          if (userToRemove) return store.dispatch(rollbackUser(userToRemove));
          console.log(error);
        });
    }
  };

export const store = configureStore({
  reducer: {
    users: usersReducer,
  },
  middleware: [persistanceLocalStorageMiddleware, syncWithDataBaseMiddleware],
});

//Importante poner esto para usar typescript con redux
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
