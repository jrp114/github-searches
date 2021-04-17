import React, { useEffect, useState } from 'react'
import Users from '../components/Users'
import { searchUsers } from '../helpers/data-fetcher'


const IndexPage: React.FC = () => {

    const [query, setQuery] = useState('')
    const [page, setPage] = useState(0)
    const [perPage] = useState(10)
    const [users, setUsers] = useState({items: [], total_count: null, avatar_url: null, followers_url: null, starred_url: null})
    const [showErrorModal, setShowErrorModal] = useState(false)

    useEffect(() => {
        page !== 0 && handleSearchCall()
    }, [page])

    const handleSearchCall = async () => {
        const data = await searchUsers(query, perPage, page)
        if (data.error) {
            setShowErrorModal(true)
        } else {
            setUsers(data)
        }
    }

    const handlePageIncrement = (number) => {
        setPage(number)
    }

    const handlePageUp = async () => {
        if (query !== '') {
            handlePageIncrement(page+1)
        }
    }

    const handlePageDown = () => {
        if (page > 1 && query !== '') {
            handlePageIncrement(page-1)
        }
    }

    const updateSearchString = (e) => {
        setQuery(e.target.value)
        page !== 0 && setPage(0)
    }

    return (
        <Users
            handlePageDown={handlePageDown}
            updateSearchString={updateSearchString}
            handlePageUp={handlePageUp}
            setPage={setPage}
            currentPage={page}
            users={users}
            error={showErrorModal}
            setShowErrorModal={setShowErrorModal}
        />
    )
  }

  export default IndexPage