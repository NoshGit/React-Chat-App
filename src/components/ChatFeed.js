import React from 'react';
import IncomingMessage from './IncomingMessage';
import MessageForm from './MessageForm';
import MyMessage from './MyMessage';
import { LogoutOutlined } from '@ant-design/icons';

const ChatFeed = (props) => {
    const { chats, activeChat, userName, messages } = props;

    const chat = chats && chats[activeChat];

    const readReceipts = (message, isMyMessage) => {
        chat.people.map((person, index) => person.last_read === message.id && (
            <div
                key={`read-${index}`}
                className="read-receipt"
                style={{
                    float: isMyMessage? 'right':'left',
                    backgroundImage: `url(${person?.person?.avatar})`
                }}
            />
        ))
    }

    const renderMessages = () => {
        const keys = Object.keys(messages);
        
        return keys.map( (key, index) => {
            const message = messages[key];
            const lastMessageKey = index === 0? null : key[index -1];
            const isMyMessage = userName === message.sender.username;

            return(
                <div key={`msg-${key}`} style={{width: '100%'}} >
                    <div className="message-block">
                        {isMyMessage? 
                        <MyMessage message={message} /> 
                        : <IncomingMessage message={message} lastMessage={messages[lastMessageKey]} />}
                    </div>
                    <div className="read-receipts" style={{marginRight: isMyMessage? '18px': '0px', marginLeft: isMyMessage? '0px': '68px'}}>
                        {readReceipts(message, isMyMessage)}
                    </div>
                </div>
            );
        })
    }
    if(!chat) return 'Loading...'

    const handleLogout = () => {
        window.localStorage.removeItem('username');
        window.localStorage.removeItem('password');
        window.location.reload();
    }


    return (
        <div className="chat-feed">
            <div className="chat-title-container">
                <div className="chat-title">
                    <span>{chat?.title}</span>                    
                </div>
                <div className="logout" onClick={handleLogout}><LogoutOutlined /> Logout</div>
                <div className="chat-subtitle">
                    {chat.people.map(person => `${person.person.username}  `)}
                </div>
                <div className="chat-message-container">
                {renderMessages()}
                </div>
                

                <div className="message-form-container">
                    <MessageForm {...props} chatId={activeChat} />
                </div>
            </div>
        </div>
    )
}

export default ChatFeed
