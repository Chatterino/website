import React from "react";
import Message from "./message";

/**
 * @typedef SplitProps
 * @property {string} name
 * @property {import("./message").MessageProps[]} messages
 * @property {boolean} [mentionsOnly]
 */

/**
 * @param {SplitProps}
 */
function Split({ name, messages }) {
  return (
    <div className="c-split">
      <div className="c-split-header">
        <div>{name}</div>
      </div>
      <div className="c-split-content">
        {messages.map((message) => (
          <Message
            key={
              message.time.toString() +
              message.user +
              message.text +
              message.userColor +
              message.emote
            }
            time={message.time}
            user={message.user}
            userColor={message.userColor}
            text={message.text}
            emote={message.emote}
          />
        ))}
      </div>
      <div className="c-split-input">{""}</div>
    </div>
  );
}

export default Split;
