const Notification = ({ message }) => {

    const style = {
        color: 'green',
        background: 'lightgrey',
        borderStyle: 'solid',
        borderWidth: '4px',
        borderColor: 'green',
        fontSize: '40px',
        padding: '10px',
        borderRadius: '5px',
    }

    if (message === null) {
        return null
    }

    return (
        <div style={style}>
            {message}
        </div>
    )
}

export default Notification