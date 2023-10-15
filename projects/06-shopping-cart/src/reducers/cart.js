export const cartInitialState =
  JSON.parse(window.localStorage.getItem('cart')) || [];

export const CART_ACTION_TYPES = {
  ADD_TO_CART: 'ADD_TO_CART',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
  CLEAR_CART: 'CLEAR_CART',
};

export const updateLocalStorage = (state) => {
  window.localStorage.setItem('cart', JSON.stringify(state));
};

const UPDATE_STATE_BY_ACTION = {
  [CART_ACTION_TYPES.ADD_TO_CART]: (state, action) => {
    const { id } = action.payload;
    //Chequear si el producto está ya en el carrito
    const productInCartIndex = state.findIndex((item) => item.id === id);

    if (productInCartIndex >= 0) {
      //Crea una copia profunda de un array
      const newState = structuredClone(state);
      newState[productInCartIndex].quantity += 1;
      updateLocalStorage(newState); //Asegurar que se actualiza con el nuevo estado según local storage
      return newState;
    }

    //Si el producto no está ya en el carrito
    const newState = [
      ...state,
      {
        ...action.payload,
        quantity: 1,
      },
    ];

    updateLocalStorage(newState); //Asegurar que se actualiza con el nuevo estado según local storage
    return newState;
  },
  [CART_ACTION_TYPES.REMOVE_FROM_CART]: (state, action) => {
    const { id } = action.payload;
    const newState = state.filter((item) => item.id !== id);
    updateLocalStorage(newState); //Asegurar que se actualiza con el nuevo estado según local storage
    return newState;
  },
  [CART_ACTION_TYPES.CLEAR_CART]: () => {
    updateLocalStorage([]);
    return [];
  },
};

export function cartReducer(state, action) {
  /* 
  //Si lo hacemos con objetos nos ahorramos el switch

  const { type: actionType, payload: actionPayload } = action;

  switch (actionType) {
    case CART_ACTION_TYPES.ADD_TO_CART: {
      const { id } = actionPayload;
      //Chequear si el producto está ya en el carrito
      const productInCartIndex = state.findIndex((item) => item.id === id);

      if (productInCartIndex >= 0) {
        //Crea una copia profunda de un array
        const newState = structuredClone(state);
        newState[productInCartIndex].quantity += 1;
        updateLocalStorage(newState); //Asegurar que se actualiza con el nuevo estado según local storage
        return newState;
      }

      //Si el producto no está ya en el carrito
      const newState = [
        ...state,
        {
          ...actionPayload,
          quantity: 1,
        },
      ];

      updateLocalStorage(newState); //Asegurar que se actualiza con el nuevo estado según local storage
      return newState;
    }

    case CART_ACTION_TYPES.REMOVE_FROM_CART: {
      const { id } = actionPayload;
      const newState = state.filter((item) => item.id !== id);
      updateLocalStorage(newState); //Asegurar que se actualiza con el nuevo estado según local storage
      return newState;
    }

    case CART_ACTION_TYPES.CLEAR_CART: {
      updateLocalStorage(cartInitialState); //Asegurar que se actualiza con el nuevo estado según local storage
      return cartInitialState;
    }
  } */
  const { type: actionType } = action;

  const updateState = UPDATE_STATE_BY_ACTION[actionType];

  return updateState ? updateState(state, action) : state;
}
