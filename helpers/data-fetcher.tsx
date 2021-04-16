// import axios from 'axios'

import axios from "axios"

const url = 'https://api.github.com'

const searchUsers = async (searchString, perPage, pageNumber) => {
    const result = await axios.get(`${url}/search/users?q=${searchString}&per_page=${perPage}&page=${pageNumber}`)
    return result.data
}

const getUser = async (url) => {
    const result = await axios.get(url)
    return result.data
}

export { searchUsers, getUser }
