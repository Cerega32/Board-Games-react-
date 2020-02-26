export default class BoardServices {
  _apiBase = "http://193.164.149.66/api/1.2"

  _getResource = async (url, data = {}) => {
    const res = await fetch(`${this._apiBase}${url}`, data)

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}`)
    }
    return await res.json()
  }

  getAllGames = async (...params) => {
    const [page, sortBy, orderBy, manufacturer, type, value] = params
    const m = manufacturer.join(",")
    const t = type.join(",")
    const [min, max] = value
    return this._getResource(
      `/games/?page=${page}&sortBy=${sortBy}&orderBy=${orderBy}&manufacturer=${m}&type=${t}&min=${min}&max=${max}`
    )
  }

  getGameById = async id => {
    return this._getResource(`/games/${id}`)
  }

  _postAuth = async (url, params) => {
    const res = await fetch(`${this._apiBase}${url}`, {  
      method: 'post',  
      headers: {  
        "Content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },  
      body: JSON.stringify(params) 
    })
    if (!res.ok) {
      throw new Error(`Could not fetch`)
    }
    return await res
  }

  signUp = async (email, password, name) => {
    const params = { email, password, name }
    return this._postAuth(`/auth/signup`, params)
  }

  signIn = async (email, password) => {
    const params = { email, password }
    return this._postAuth(`/auth/signin`, params)
  }

  getProfile = async () => {
    const params = {
      headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    }
    return this._getResource(`/auth/whoami`, params)
  }

  postOrder = async (list, email, phone, name) => {
    const params = { list, email, phone, name }
    return this._postAuth(`/orders`, params)
  }
}
