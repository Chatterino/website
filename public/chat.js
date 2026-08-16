// Fake chat window on the landing page.
(() => {
  const host = document.getElementById("chatprop-host");
  if (!host) {
    return;
  }
  const version = host.dataset.version;

  const MAX_MESSAGES = 16;
  const MENTIONS = [
    "@justinfan yooooooo",
    "@justinfan welcome back",
    "@justinfan hi",
    "@justinfan hey",
  ];
  const MESSAGES = [
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
  const EMOTES = ["LUL", "LULW", "KEKW", "Sadge", "Kappa", "YEP", "4Weird"];
  const COLORS = [
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
  const CHATTERS = [
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

  const timeFormatter = new Intl.DateTimeFormat(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const randomItem = (array) => array[Math.floor(Math.random() * array.length)];

  const randomMessage = (time) => ({
    time,
    user: randomItem(CHATTERS),
    userColor: randomItem(COLORS),
    text: Math.random() > 0.7 ? randomItem(MENTIONS) : randomItem(MESSAGES),
    emote: Math.random() > 0.3 ? randomItem(EMOTES) : undefined,
  });

  const isMention = (message) => message.text.includes("@justinfan");

  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  }

  function messageEl(message) {
    const node = el("div", "c-message");
    node.append(el("span", "c-timestamp", timeFormatter.format(message.time)));
    const username = el("span", "c-username", `${message.user}:`);
    username.style.color = message.userColor;
    node.append(username, el("span", null, message.text));
    if (message.emote) {
      const emote = el("img", "c-emote-2x");
      emote.src = `emotes/${message.emote}.png`;
      node.append(emote);
    }
    return node;
  }

  function splitEl(name) {
    const split = el("div", "c-split");
    const header = el("div", "c-split-header");
    header.append(el("div", null, name));
    const content = el("div", "c-split-content");
    split.append(header, content, el("div", "c-split-input"));
    return { split, content };
  }

  const streamer = splitEl("Streamer");
  const mentions = splitEl("/mentions");
  const splits = [
    { ...streamer, mentionsOnly: false },
    { ...mentions, mentionsOnly: true },
  ];

  function addMessage(message) {
    for (const split of splits) {
      if (split.mentionsOnly && !isMention(message)) {
        continue;
      }
      split.content.append(messageEl(message));
      while (split.content.childElementCount > MAX_MESSAGES) {
        split.content.firstElementChild.remove();
      }
    }
  }

  const window_ = el("div", "c-window");
  window_.append(el("div", "c-window-titlebar", `Chatterino ${version}`));
  const tabs = el("div");
  tabs.append(
    el("div", "c-tab active", "Streamer, /mentions"),
    el("div", "c-tab", "offline_chat"),
    el("div", "c-tab", "secret_memes"),
  );
  const container = el("div", "c-split-container");
  container.append(streamer.split, mentions.split);
  window_.append(tabs, container);
  host.append(window_);

  const now = new Date();
  for (let i = 0; i < 15; i++) {
    addMessage(randomMessage(now));
  }
  setInterval(() => {
    if (Math.random() > 0.3) {
      addMessage(randomMessage(new Date()));
    }
  }, 1000);
})();
