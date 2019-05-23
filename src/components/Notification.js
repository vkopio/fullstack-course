import React from 'react'

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

export default Notification
