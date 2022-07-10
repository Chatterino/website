import React from "react";
import { formatTime } from "./common";

/**
 * @typedef MessageProps
 * @property {Date} time
 * @property {string} user
 * @property {string} userColor
 * @property {string} text
 * @property {string} [emote]
 */

/**
 * @param {MessageProps}
 */
function Message({ time, user, userColor, text, emote }) {
  return (
    <div className="c-message">
      <span className="c-timestamp">{formatTime(time)}</span>
      <span className="c-username" style={{ color: userColor }}>
        {user}:
      </span>
      <span>{text}</span>
      {emote && <img src={`emotes/${emote}.png`} className="c-emote-2x" />}
    </div>
  );
}

export default Message;
