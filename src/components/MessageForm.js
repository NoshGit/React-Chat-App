import { SendOutlined, PictureOutlined } from '@ant-design/icons';
import React, {useState, useEffect} from 'react';
import { sendMessage, isTyping } from 'react-chat-engine';


const MessageForm = (props) => {
    const [value, setValue] = useState('');
    const {chatId, creds } = props;

    useEffect(() => {
        console.log('Message Form Initiated', props);
    },[])

    const handleSubmit = (evt) => {
        evt.preventDefault();

        const text = value.trim();

        if(text.length > 0) sendMessage(creds, chatId, {text})

        setValue('');
    }
    const handleMsgChange = (e) => {
        setValue(e.target.value);

        isTyping(props, chatId)
    }

    const handleUpload = (e) => {
        sendMessage(creds, chatId, { files:e.target.file, text:'' })
    }
    return (        
        <form className="message-form" onSubmit={handleSubmit}>
            <input 
                className="message-input"
                placeholder="Send a message..."
                value={value}
                onChange={handleMsgChange}
                onSubmit={handleSubmit}
            />
            <label htmlFor="upload-button">
                <span className="image-button">
                    <PictureOutlined className="picture-icon" />
                </span>
                <input 
                    type="file"
                    multiple={false}
                    id="upload-button"
                    style={{display:'none'}}
                    onChange={handleUpload}
                />
            </label>
            <button type="submit" className="send-button">
                <SendOutlined className="send-icon" />
            </button>
        </form>
    )
}

export default MessageForm
