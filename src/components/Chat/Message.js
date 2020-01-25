import React, { Fragment } from 'react'

const Message = ({pseudo, message, isUser}) => {
    if (isUser(pseudo)) {
        return (
            <Fragment>
            <p className="badge badge-pill badge-primary">
                {message}
            </p>
            <br/>
            </Fragment>
        )
    }
    else {
        return (
            <p className="badge badge-pill badge-danger">
                <strong>{pseudo}: </strong>{message}
            </p>
        )
    }
}

export default Message