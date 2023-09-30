import React from 'react';
import { useEffect, useState } from 'react';
import styles from '@/styles/Home.module.css'
import TypingIndicator from 'typing-indicator';

let typingIndicator = null;
export default function Input({onSendMessage, onChangeTypingState}) { 

    console.log('dasdasdsa')
    const [text, setText] = useState('');

    useEffect(() => {
        console.log('typingIndicator',typingIndicator)

        if (typingIndicator === null) {
            
            typingIndicator = new TypingIndicator();
            console.log('typingIndicator',typingIndicator)
          typingIndicator.listen(isTyping => onChangeTypingState(isTyping));
        }
      }, []);

        function onChange(e) {
        const text = e.target.value;
        console.log('onchanges',typingIndicator)
        typingIndicator.onChange(text);
        setText(text);
        }
    
      function onSubmit(e) {
        e.preventDefault();
        setText('');
        onSendMessage(text);
      }
    return (
        <div className={styles.input} >
          <form onSubmit={e => onSubmit(e)}>
            <input
              onChange={e => onChange(e)}
              value={text}
              type='text'
              placeholder='Enter your message and press ENTER'
              autoFocus
            />
            <button>Send</button>
          </form>
        </div>
      );
}

