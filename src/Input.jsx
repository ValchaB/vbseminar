import React, { Component } from "react";

class ChatInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
    };
  }

  handleTextChange = (e) => {
    this.setState({ text: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { text } = this.state;
    if (!text.trim()) {
      return;
    }
    this.setState({ text: "" });
    this.props.sendMessage(text.trim());
  };

  render() {
    const { text } = this.state;
    return (
      <div className="ChatInput">
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            onChange={this.handleTextChange}
            value={text}
            placeholder="Type here!"
            autoFocus={true}
          />
          <button>Click!</button>
        </form>
      </div>
    );
  }
}

export default ChatInput;