import React from 'react'
import PropTypes from 'prop-types'

const notificationColor = {
    success: 'green',
    error: 'red'
}

const Notification = ({ notification }) => {
    if (Object.keys(notification).length === 0) {
        return null
    }

    const style = {
        color: notificationColor[notification.type]
    }

    return (
        <div className="error" style={style}>
            {notification.message}
        </div>
    )
}

Notification.propTypes = {
    notification: PropTypes.object.isRequired
}

export default Notification
