const itemsArray = localStorage.getItem('badge') ? JSON.parse(localStorage.getItem('badge')) : [];
const itemsTotal = localStorage.getItem('total') ? JSON.parse(localStorage.getItem('total')) : 0;


const initialState = {
  games: [],
  sortBy: "createdAt",
  orderBy: "desc",
  loading: false,
  error: false,
  currentPage: 1,
  page: 10,
  allPages: 10,
  minPrice: 1,
  maxPrice: 99999,
  type: [],
  manufacturer: [],
  value: [0, 1000000],
  badge: itemsArray,
  total: itemsTotal,
  orderSuccess: false
}

const updateCartItems = (cartItems, item, idx) => {


  if (item.count === 0) {
    const newCartItems = [
      ...cartItems.slice(0, idx),
      ...cartItems.slice(idx + 1)
    ]
    localStorage.setItem('badge', JSON.stringify(newCartItems));
    return newCartItems;
  }

  if (idx === -1) {
    const newCartItems =[
      ...cartItems,
      item
    ]
    localStorage.setItem('badge', JSON.stringify(newCartItems));
    return newCartItems;
  }

  const newCartItems = [
    ...cartItems.slice(0, idx),
    item,
    ...cartItems.slice(idx + 1)
  ]

  localStorage.setItem('badge', JSON.stringify(newCartItems));

  return newCartItems;
};

const updateCartItem = (game, item = {}, quantity) => {

  const {
    _id = game._id,
    price = game.price,
    images = game.images,
    count = 0,
    title = game.title,
    total = 0 } = item;

  return {
    _id,
    title,
    price,
    images,
    count: count + quantity,
    total: total + quantity*Math.floor(game.price)
  };
};


const updateOrder = (state, gamesId, quantity) => {
  const { games, badge } = state;

  let game = games.find(({_id}) => _id === gamesId);
  const itemIndex = badge.findIndex(({_id}) => _id === gamesId);
  const item = badge[itemIndex];
  if (!game) {
    game = item;
  }
  const newItem = updateCartItem(game, item, quantity);

  const newTotal = Math.floor(newItem.price)*(quantity) + state.total
  localStorage.setItem('total', JSON.stringify(newTotal));
  return {
    ...state,
    total: newTotal, 
    badge: updateCartItems(badge, newItem, itemIndex)
  }
};

export const items = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_GAMES_UPDATE":
      return {
        ...state,
        ...action.payload
      }
    case "FETCH_GAMES_REQUEST":
      return {
        ...state,
        games: [],
        error: false,
        loading: true
      }
    case "FETCH_GAMES_SUCCESS":
      return {
        ...state,
        games: action.payload.newGames,
        minPrice: action.payload.minPrice,
        maxPrice: action.payload.maxPrice,
        allPages: Math.ceil(action.payload.allItems / 6) * 10,
        error: false,
        loading: false
      }
    case "FETCH_GAMES_FAILURE":
      return {
        ...state,
        games: [],
        loading: false,
        error: action.payload
      }
    case "GAMES_ADDED_TO_CART":
      return updateOrder(state, action.payload, 1);
    case "GAMES_REMOVED_FROM_CART":
      return updateOrder(state, action.payload, -1);
    case 'ALL_GAMES_REMOVED_FROM_CART':
      const item = state.badge.find(({_id}) => _id === action.payload);
      return updateOrder(state, action.payload, -item.count);
    case 'ORDER_START':
      return { ...state, loading: true, error: false, orderSuccess: false }
    case 'ORDER_SUCCESS':
      localStorage.setItem('badge', []);
      localStorage.setItem('total', []);
      return { ...state, loading: false, error: false, badge: [], total: 0, orderSuccess: true }
    case 'ORDER_ERROR':
      return { ...state, loading: false, error: true, orderSuccess: false }
    default:
      return state
  }
}
