import React, { useEffect, useState } from 'react'

type Props = {
    user: any
    setShowModal: any
}

const Modal: React.FC<Props> = (props) => {
    const { user, setShowModal } = props
    useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick)
    }, [])
    const handleOutsideClick = (e) => {
        if (e.target.className !== 'user-modal' && e.target.className !== 'users') {
            setShowModal(false)
        }
    }

    return <React.Fragment>
            <div className='user-modal' style={{position:'fixed',top:85,left:260,width:'50%',height:'50%',background:'rgba(0, 0, 0, 0.1)'}}>
                {user?.avatar_url ? <img className='user-modal' style={{width:200,height:200}} src={user?.avatar_url} /> : null}
                <h1 className='user-modal'>
                    {user.login}
                </h1>
                {user?.company ? <h2 className='user-modal' >Company: {user.company}</h2> : null}
                {user?.bio ? <h2 className='user-modal' >Bio: {user.bio}</h2> : null}
                {user?.blog && /^(https?:\/\/)([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(user?.blog)
                    ? <h2><a className='user-modal' href={user.blog}>Blog</a></h2>
                    : null
                }
                {user?.html_url && /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(
                    user?.html_url
                ) ? <h2><a className='user-modal' href={user.html_url}>GitHub Dashboard</a></h2> : null}
                {user?.followers ? <h2 className='user-modal' >Followers: {user?.followers}</h2> : null}
                {user?.following ? <h2 className='user-modal' >Following: {user?.following}</h2> : null}
            </div>
        </React.Fragment>
}

export default Modal