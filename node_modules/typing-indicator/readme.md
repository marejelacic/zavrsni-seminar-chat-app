# Typing Indicator
Add typing indicator logic to your JavaScript chat app. Typing-indicator is framework agnostic and works with any JavaScript frameworks (or without).

## API
**Creating a new instance of TypingIndicator**
```javascript
import TypingIndicator from 'typing-indicator';
const typingIndicator = new TypingIndicator();
```

**Creating a new instance of TypingIndicator with custom listening time**
Set how fast typingIndicator reacts to typing changes. Default is 1500ms and it's not recommended to set it much lower than 500. Setting it lower will cause the indicator to be too reactive.
```javascript
import TypingIndicator from 'typing-indicator';
const typingIndicator = new TypingIndicator(1000);
```

**Send input changes to typingIndicator**
```javascript
typingIndicator.onChange(inputText);
```

**Listen to when typingIndicator detects typing and stopping typing**
```javascript
typingIndicator.listen(isTyping => {
  console.log('Is typing?', isTyping);
});
```

## Example
### JavaScript
```javascript
import TypingIndicator from 'typing-indicator';
const typingIndicator = new TypingIndicator();
typingIndicator.listen(isTyping => {
  console.log('Is typing?', isTyping);
});
HTMLInputElementObject.addEventListener('input', e => {
  typingIndicator.onChange(e.value);
});
```


### React
```javascript
import TypingIndicator from 'typing-indicator';

class Input extends Component {
  state = {
    text: "",
    typingIndicator: new TypingIndicator(),
  }

  componentDidMount() {
    const {typingIndicator} = this.state;
    const {onChangeTypingState} = this.props;
    typingIndicator.listen(isTyping => onChangeTypingState(isTyping));
  }

  onChange(e) {
    const {typingIndicator} = this.state;
    const text = e.target.value;
    typingIndicator.onChange(text);
    this.setState({text});
  }

  onSubmit(e) {
    const {onSendMessage} = this.props;
    const {text} = this.state;
    e.preventDefault();
    this.setState({text: ""});
    onSendMessage(text);
  }

  render() {
    return (
      <div className="Input">
        <form onSubmit={e => this.onSubmit(e)}>
          <input
            onChange={e => this.onChange(e)}
            value={this.state.text}
            type="text"
            placeholder="Enter your message and press ENTER"
            autoFocus
          />
          <button>Send</button>
        </form>
      </div>
    );
  }
}

export default Input;
```