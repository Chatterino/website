import React from "react";

const MaxMessageCount = 15;
const Mentions = [
  "@justinfan yooooooo",
  "@justinfan welcome back",
  "@justinfan hi",
  "@justinfan hey",
];
const Messages = [
  "wow",
  "WOW",
  "omg",
  "oh no",
  "this guy",
  "seriously",
  "so good",
  "my streamer",
  "pogger",
  "let's throw",
];
const Emotes = ["LUL", "LULW", "KEKW", "Sadge", "Kappa", "YEP", "4Weird"];
const Colors = [
  "#fff",
  "#ff0000",
  "#c6c6ff",
  "#00ff00",
  "#e71818",
  "#ff7f50",
  "#9acd32",
  "#ff4500",
  "#2ad575",
  "#edae12",
  "#ed6d12",
  "#5f9ea0",
  "#6fb4f6",
  "#ff69b4",
  "#c897f5",
  "#00ff7f",
];
const Chatters = [
  "Kappa123",
  "grey_face",
  "shortwig",
  "justinfan123",
  "championsen",
  "mxr",
  "Ke2",
  "PO_Box",
  "ChickenDinner",
  "BillDipperly",
  "check_unban_forms",
  "WgXcQ",
];

const TimeFormatter = new Intl.DateTimeFormat(undefined, {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

/**
 * @template T
 * @param {T[]} array
 * @returns T
 */
function randomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

/**
 * @param {Date} time
 * @returns {import("./message").MessageProps}
 */
export function randomMessage(time) {
  return {
    time,
    user: randomItem(Chatters),
    userColor: randomItem(Colors),
    text: Math.random() > 0.7 ? randomItem(Mentions) : randomItem(Messages),
    emote: Math.random() > 0.3 ? randomItem(Emotes) : undefined,
  };
}

/** @param {import("./index").TabState} tab */
export function tabTitle(tab) {
  return tab.splits.map((split) => split.name).join(", ");
}

/** @param {Date} time */
export function formatTime(time) {
  return TimeFormatter.format(time);
}

/**
 * @typedef TabData
 * @property {import("./split").SplitProps[]} splits
 * @property {import("./tab").TabStatus} [status]
 */

/** @param {import("./message").MessageProps} msg */
function isMention(msg) {
  return msg.text.includes("@justinfan");
}

/**
 * @param {Date} time
 * @returns {TabData[]}
 */
export function initTabs(time) {
  const randomMessages = Array(MaxMessageCount)
    .fill(null)
    .map(() => randomMessage(time));
  return [
    {
      splits: [
        { name: "Streamer", messages: randomMessages },
        {
          name: "/mentions",
          messages: randomMessages.filter(isMention),
          mentionsOnly: true,
        },
      ],
      status: "active",
    },
    {
      splits: [{ name: "offline_chat", messages: [] }],
    },
    {
      splits: [{ name: "secret_memes", messages: [] }],
    },
  ];
}

/**
 * Adds `message` to every split inside of every tab in `tabs`.
 * Only adds messages which are mentions to splits with `mentionsOnly == true`.
 *
 * @param {TabData[]} tabs
 * @param {import("./message").MessageProps} message
 * @returns {TabData[]}
 */
export function addMessage(tabs, message) {
  return tabs.map((tab) => ({
    ...tab,
    splits: tab.splits.map((split) => {
      if (!split.mentionsOnly || isMention(message)) {
        return { ...split, messages: [...split.messages.slice(-15), message] };
      } else {
        return split;
      }
    }),
  }));
}

function useMounted() {
  const [_, setUpdate] = React.useState({});
  const update = () => setUpdate({});

  const isMounted = React.useRef(false);
  React.useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      update();
    }
  }, [update]);
  return isMounted.current;
}

/**
 * @template Component
 * @param {Component} component
 * @returns Component
 */
export function ClientOnly(component) {
  return (props) => {
    const mounted = useMounted();
    return mounted ? React.createElement(component, props) : null;
  };
}
