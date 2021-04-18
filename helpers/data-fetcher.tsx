import axios, { AxiosResponse } from 'axios'

const url = 'https://api.github.com'

const searchUsers = async (
  searchString: string,
  perPage: number,
  pageNumber: number
) => {
  try {
    const result: AxiosResponse = await axios.get(
      `${url}/search/users?q=${searchString}&per_page=${perPage}&page=${pageNumber}&order=desc`
    )
    return result.data
  } catch (err) {
    return { error: 'Error in processing request' }
  }
}

const getUser = async (url: string) => {
  try {
    const result: AxiosResponse = await axios.get(url)
    return result.data
  } catch (err) {
    return { error: 'Error in processing request' }
  }
}

export { searchUsers, getUser }
