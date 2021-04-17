import React, { useEffect, useState } from 'react'
import Users from '../components/Users/Users'
import { searchUsers } from '../helpers/data-fetcher'

const IndexPage: React.FC = () => {
  const [query, setQuery] = useState('')
  const [queryChanged, setQueryChanged] = useState(false)
  const [page, setPage] = useState(0)
  const [perPage] = useState(10)
  const [users, setUsers] = useState({
    items: [],
    total_count: null,
    avatar_url: null,
    followers_url: null,
    starred_url: null,
  })
  const [showErrorModal, setShowErrorModal] = useState(false)

  useEffect(() => {
    page !== 0 && handleSearchCall()
  }, [page])

  const handleSearchCall = async () => {
    const data = await searchUsers(query, perPage, page)
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

  const updateSearchString = (e) => {
    setQuery(e.target.value)
    setQueryChanged(true)
  }

  return (
    <Users
      updateSearchString={updateSearchString}
      handleSearchCall={handleSearchCall}
      setPage={setPage}
      currentPage={page}
      users={users}
      error={showErrorModal}
      setShowErrorModal={setShowErrorModal}
    />
  )
}

export default IndexPage
