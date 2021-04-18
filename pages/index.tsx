import React, { useEffect, useState } from 'react'
import Users from '../components/Users/Users'
import { searchUsers } from '../helpers/data-fetcher'

const IndexPage: React.FC = () => {
  const [query, setQuery] = useState('')
  const [queryChanged, setQueryChanged] = useState(false)
  const [page, setPage] = useState(0)
  const [fetchPage, setFetchPage] = useState(0)
  const [perPage] = useState(100)
  const [users, setUsers] = useState({
    items: [],
    total_count: null,
    avatar_url: null,
    followers_url: null,
    starred_url: null,
  })
  const [showErrorModal, setShowErrorModal] = useState(false)

  useEffect(() => {
    const apiPageToCall = Math.ceil(parseInt(page.toString().slice(0)) / 10)
    if (fetchPage !== apiPageToCall) {
      handleSearchCall(apiPageToCall)
      setFetchPage(apiPageToCall)
    }
  }, [page])

  const handleSearchCall = async (apiPage) => {
    if (page !== 0) {
      const data = await searchUsers(query, perPage, apiPage)
      if (data.error) {
        setShowErrorModal(true)
      } else {
        if (queryChanged) {
          setPage(1)
          setQueryChanged(false)
        }
        setUsers(data)
      }
    }
  }

  const handleKeyPressSearchCall = async (e: any) => {
    if (e.code == 'Enter' && query !== '') {
      const data = await searchUsers(query, perPage, 1)
      if (data.error) {
        setShowErrorModal(true)
      } else {
        setPage(1)
        setQueryChanged(false)
        setUsers(data)
      }
    }
  }

  const updateSearchString = (e) => {
    setQuery(e.target.value)
    setQueryChanged(true)
  }

  return (
    <Users
      key={'Users'}
      updateSearchString={updateSearchString}
      handleSearchCall={handleSearchCall}
      setPage={setPage}
      currentPage={page}
      users={users}
      error={showErrorModal}
      setShowErrorModal={setShowErrorModal}
      handleKeyPressSearchCall={handleKeyPressSearchCall}
    />
  )
}

export default IndexPage
