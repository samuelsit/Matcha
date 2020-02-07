import React, { Fragment } from 'react'

const Message = ({pseudo, message, isUser}) => {
    if (!isUser(pseudo)) {
        return (
            <Fragment>
            <div className="badge badge-pill badge-secondary float-left">
                {message}
            </div><br/>
            </Fragment>
        )
    }
    else {
        return (
            <Fragment>
            <div className="badge badge-pill badge-primary float-right">
                {message}
            </div><br/>
            </Fragment>
        )
    }
}

export default Message