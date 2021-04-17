import React, { useState } from 'react'
import Modal from './UserCard'
import { getUser } from '../helpers/data-fetcher'

type Props = {
    handlePageDown: () => void,
    updateSearchString: (e: any) => void,
    handlePageUp: () => void,
    setPage: (n: number) => void,
    currentPage: number,
    users: {items: any[], total_count: number, avatar_url: string, followers_url: string, starred_url: string}
}

const Users: React.FC<Props> = (props) => {
    const {
        handlePageDown,
        updateSearchString,
        handlePageUp,
        setPage,
        currentPage,
        users
    } = props

    const [showModal, setShowModal] = useState(false)
    const [userDetail, setUserDetail] = useState({})

    const handleUserModal = async (user) => {
        setUserDetail(await getUser(user.url))
        setShowModal(true)
    }

    const handlePageNumber = (pageNumber) => {
        setPage(pageNumber)
    }

    const numberOfPages = Math.round(users?.total_count / 10)

    return (
        <div>
            <button onClick={handlePageDown}>-</button>
            <input onChange={updateSearchString}/>
            <button onClick={handlePageUp}>+</button>
            <div>{currentPage >= 1 ? <h4>Page Number: {currentPage}</h4> : null }{currentPage > 1 ? <span onClick={() => handlePageNumber(currentPage >= 14 ? currentPage-14 : 1)}> ... </span> : null}{
                Array.from(Array(numberOfPages), (e, i) => {
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
            {users?.items.map(user => (
                <div>
                    <h3 className="users" onClick={() => handleUserModal(user)}>{user.login}</h3>
                </div>))}
            {showModal ? <Modal user={userDetail} setShowModal={setShowModal} showModal={showModal}/> : null}
        </div>
    )
  }

  export default Users