import React from "react";

/**
 * @typedef {"active" | "seen" | "new-messages" | "highlighted"} TabStatus
 */

/**
 * @param {{ status?: TabStatus; title: string }}
 */
function Tab({ status, title }) {
  return <div className={`c-tab ${status || ""}`}>{title}</div>;
}

export default Tab;
