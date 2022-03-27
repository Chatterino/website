import React, { useEffect, useState, useRef } from "react";
import Section from "components/section";
import Page from "components/page";

const redirectUrl = "https://chatterino.com/client_login";
const twitchClientID = "g5zg0400k4vhrx2g6xi4hgveruamlv";
const scopes = [
  "user_subscriptions",
  "user_blocks_edit", // deprecated, replaced with "user:manage:blocked_users"
  "user_blocks_read", // deprecated, replaced with "user:read:blocked_users"
  "user_follows_edit", // deprecated, soon to be removed later since we now use "user:edit:follows"
  "channel_editor", // for /raid
  "channel:moderate",
  "channel:read:redemptions",
  "chat:edit",
  "chat:read",
  "whispers:read",
  "whispers:edit",
  "channel_commercial", // for /commercial
  "channel:edit:commercial", // in case twitch upgrades things in the future (and this scope is required)
  "user:edit:follows", // for (un)following
  "clips:edit", // for clip creation
  "channel:manage:broadcast", // for creating stream markers with /marker command, and for the /settitle and /setgame commands
  "user:read:blocked_users", // for getting list of blocked users
  "user:manage:blocked_users", // for blocking/unblocking other users
  "moderator:manage:automod", // for approving/denying automod messages
];

export default function ClientLogin() {
  const hash = typeof window !== "undefined" ? window.location.hash : "";
  const [oauthToken, setOauthToken] = useState(null);
  const [user, setUser] = useState(null);
  const [buttonColor, setButtonColor] = useState(
    "bg-blue-500 hover:bg-blue-400"
  );
  const dataStringRef = useRef(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    if (location.hash === "") {
      return;
    }

    const oauthHash = location.hash.slice(1);
    const oauthToken = oauthHash
      .slice(oauthHash.indexOf("access_token="))
      .split("&")[0]
      .split("=")[1];
    if (oauthToken) {
      setOauthToken(oauthToken);
      history.replaceState(null, null, " ");
    }
  }, [hash]);

  useEffect(() => {
    if (oauthToken) {
      fetchUser(oauthToken)
        .then(setUser)
        .then(() => setErrorMessage(null))
        .catch(() => setErrorMessage("Failed to fetch user"));
    }
  }, [oauthToken]);

  const loggedIn = oauthToken && user;

  const loginButtonClasses =
    "p-3 flex justify-center rounded shadow bg-purple-800 hover:bg-purple-600 hover:opacity-100 whitespace-nowrap no-underline my-5".split(
      " "
    );
  if (loggedIn) {
    loginButtonClasses.push("opacity-25");
  }

  const handleCopyClick = () => {
    if (dataStringRef.current) {
      dataStringRef.current.select();
      window.document.execCommand("copy");
      setButtonColor("bg-green-600 hover:bg-green-500");
    }
  };

  return (
    <Page title="Login - Chatterino">
      <Section className="p-16">
        <h2 className="m-4 text-center">Chatterino Login</h2>
        <h5 className="font-bold text-center my-2 text-red-600 text-xl">
          Do not show on stream
        </h5>
        {errorMessage && (
          <h6 className="font-bold text-center my-2 text-red-600 text-xl">
            Error: {errorMessage}
          </h6>
        )}
        {!loggedIn && (
          <a href={createLoginUrl()} className={loginButtonClasses.join(" ")}>
            Login with Twitch
          </a>
        )}
        {loggedIn && (
          <>
            <input
              type="text"
              ref={dataStringRef}
              readOnly
              className="appearance-none rounded bg-gray-900 w-full overflow-hidden resize-none p-3 my-2"
              value={createChatterinoDataString(oauthToken, user)}
            />
            <button
              className={`rounded w-full p-3 ${buttonColor}`}
              onClick={handleCopyClick}
            >
              Copy
            </button>
            <div className="mt-6">
              Steps:
              <ul className="list-disc ml-4">
                <li>Click "Copy" or copy the text manually.</li>
                <li>Then, in Chatterino, click "Paste login info".</li>
              </ul>
            </div>
          </>
        )}
      </Section>
    </Page>
  );
}

function createChatterinoDataString(oauthToken, user) {
  return `username=${user.login};user_id=${user.id};client_id=${twitchClientID};oauth_token=${oauthToken};`;
}

async function fetchUser(oauthToken) {
  const response = await fetch("https://api.twitch.tv/helix/users", {
    headers: {
      "Client-ID": twitchClientID,
      Authorization: `Bearer ${oauthToken}`,
    },
  });

  const data = await response.json();
  return {
    id: data.data[0].id,
    login: data.data[0].login,
  };
}

function createLoginUrl() {
  const url = new URL("https://id.twitch.tv/oauth2/authorize");
  url.searchParams.set("client_id", twitchClientID);
  url.searchParams.set("redirect_uri", redirectUrl);
  url.searchParams.set("response_type", "token");
  url.searchParams.set("scope", scopes.join(" "));

  return url;
}
