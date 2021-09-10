import React from 'react';

const messageStyle = {
    float: 'right',
    marginRight:'18px',
    color:'white',
    backgroundColor:'#3B2A50'
}

function MyMessage({message}) {
    if(message?.attachments?.length > 0 ){
        return(
            <img 
            src={message.attachments[0].file}
            alt="message-attachment"
            className="message-image"
            style={{float:'right'}}
            />
        )
    }
    return (
        <div className="message" style={messageStyle}>
            {message.text}
        </div>
    )
}

export default MyMessage
