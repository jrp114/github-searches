import React, { useState } from 'react'
import Modal from './UserCard'
import ErrorModal from './ErrorModal'
import { getUser } from '../helpers/data-fetcher'

type Props = {
    handlePageDown: () => void,
    updateSearchString: (e: any) => void,
    handlePageUp: () => void,
    setPage: (n: number) => void,
    setShowErrorModal: (error: boolean) => void,
    currentPage: number,
    users: {items: any[], total_count: number, avatar_url: string, followers_url: string, starred_url: string},
    error: boolean
}

const Users: React.FC<Props> = (props) => {
    const {
        handlePageDown,
        updateSearchString,
        handlePageUp,
        setPage,
        setShowErrorModal,
        currentPage,
        users,
        error
    } = props

    const [showModal, setShowModal] = useState(false)
    const [userDetail, setUserDetail] = useState({})

    const handleUserModal = async (user) => {
        const data = await getUser(user.url)
        if (data.error) {
            setShowErrorModal(true)
        } else {
            setUserDetail(data)
            setShowModal(true)
        }
    }

    const handlePageNumber = (pageNumber) => {
        setPage(pageNumber)
    }

    const numberOfPages = users?.total_count != 0 ? Math.round(users?.total_count / 10) : 0

    return (
        <div>
            <button onClick={handlePageDown}>-</button>
            <input onChange={updateSearchString}/>
            <button onClick={handlePageUp}>+</button>
            <div>{currentPage >= 1 ? <h4>Page Number: {currentPage}</h4> : null }{currentPage > 1 ? <span onClick={() => handlePageNumber(currentPage >= 14 ? currentPage-14 : 1)}> ... </span> : null}{
                users?.total_count && Array.from(Array(numberOfPages), (e, i) => {
                    return i !== 0 
                        && i >= currentPage 
                        && i <= currentPage+14 
                        && <a onClick={() => handlePageNumber(i)}>{i}{i == currentPage+14 || i == 0
                            ? '' 
                            : ', '
                        }</a>
                })
            }
            </div>
            <div><h4>Total Count: {users?.total_count}</h4></div>
            {users?.items?.map(user => (
                <div>
                    <h3 className="users" onClick={() => handleUserModal(user)}>{user.login}</h3>
                </div>))}
            {showModal ? <Modal user={userDetail} setShowModal={setShowModal} showModal={showModal}/> : null}
            {error ? <ErrorModal error={error} setError={setShowErrorModal} /> : null}
        </div>
    )
  }

  export default Users