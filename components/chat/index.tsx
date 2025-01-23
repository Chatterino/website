import React, { useEffect, useState } from "react";
import Tab from "./tab";
import Split from "./split";
import {
  addMessage,
  ClientOnly,
  initTabs,
  randomMessage,
  tabTitle,
} from "./common";

function Chat({ version }: { version: string }) {
  const [tabs, setTabs] = useState(() => initTabs(new Date()));

  useEffect(() => {
    const id = setInterval(() => {
      const time = new Date();
      const shouldAdd = Math.random() > 0.3;
      if (shouldAdd) {
        setTabs(addMessage(tabs, randomMessage(time)));
      }
    }, 1000);
    return () => clearInterval(id);
  });

  return (
    <div className="c-window">
      <div className="c-window-titlebar">Chatterino {version}</div>
      <div>
        {tabs.map((tab) => (
          <Tab key={tabTitle(tab)} title={tabTitle(tab)} status={tab.status} />
        ))}
      </div>
      <div className="c-split-container">
        {tabs[0]?.splits?.map((split) => (
          <Split key={split.name} name={split.name} messages={split.messages} />
        ))}
      </div>
    </div>
  );
}

export default ClientOnly(Chat);
