import axios from "axios"

const url = 'https://api.github.com'

const searchUsers = async (searchString, perPage, pageNumber) => {
    try {
        const result = await axios.get(`${url}/search/users?q=${searchString}&per_page=${perPage}&page=${pageNumber}`)
        return result.data
    } catch (err) {
        return { error: 'Error in processing request'}
    }
}

const getUser = async (url) => {
    try {
        const result = await axios.get(url)
        return result.data
    } catch (err) {
        return { error: 'Error in processing request'}
    }
}

export { searchUsers, getUser }
