import BoardServices from "../services/board-services"

const boardService = new BoardServices()

const fetchGames = (page, sortBy, orderBy, manufacturer, type, value) => async dispatch => {
  dispatch(gamesRequested())
  try {
    const response = await boardService.getAllGames(page, sortBy, orderBy, 
                                manufacturer, type, value)
    dispatch(gamesLoaded(response.data, response.price.min, response.price.max, response.results))
  } catch (error) {
    dispatch(gamesError(error))
  }
}

const fetchGame = (id) => async dispatch => {
  dispatch(gamesRequested())
  try {
    const response = await boardService.getGameById(id)
    dispatch(gamesLoaded([response.data]))
  } catch (error) {
    dispatch(gamesError(error))
  }
}


const gamesRequested = () => {
  return {
    type: "FETCH_GAMES_REQUEST"
  }
}

const gamesLoaded = (newGames, minPrice, maxPrice, allItems) => {
  return {
    type: "FETCH_GAMES_SUCCESS",
    payload: {newGames, minPrice, maxPrice, allItems}
  }
}

const gamesError = error => {
  return {
    type: "FETCH_GAMES_FAILURE",
    payload: error
  }
}

const filterChange = (data, cb) => async dispatch => {
  await dispatch({
    type: "FETCH_GAMES_UPDATE",
    payload: data
  })
  cb()
}

const onAddedToCart = (id) => {
  return {
    type: "GAMES_ADDED_TO_CART",
    payload: id
  }
}

const onRemovedToCart = (id) => {
  return {
    type: "GAMES_REMOVED_FROM_CART",
    payload: id
  }
}

const onAllRemovedToCart = (id) => {
  return {
    type: "ALL_GAMES_REMOVED_FROM_CART",
    payload: id
  }
}


export { fetchGames, fetchGame, filterChange, onAddedToCart, onRemovedToCart, onAllRemovedToCart }
