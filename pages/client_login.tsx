import { useEffect, useRef, useState } from "react";
import Page from "../components/page";
import Section from "../components/section";

const redirectUrl = process.env.NEXT_PUBLIC_TWITCH_OAUTH_REDIRECT_URL!;
const twitchClientID = process.env.NEXT_PUBLIC_TWITCH_OAUTH_CLIENT_ID!;
const scopes = [
  "channel_editor", // for /raid
  "channel:moderate",
  "channel:read:redemptions",
  "chat:edit",
  "chat:read",
  "whispers:read",
  "whispers:edit",
  "channel_commercial", // for /commercial
  "channel:edit:commercial", // in case twitch upgrades things in the future (and this scope is required)
  "clips:edit", // for clip creation
  "channel:manage:broadcast", // for creating stream markers with /marker command, and for the /settitle and /setgame commands
  "user:read:blocked_users", // for getting list of blocked users
  "user:manage:blocked_users", // for blocking/unblocking other users
  "moderator:manage:automod", // for approving/denying automod messages
  "channel:manage:raids", // for starting/canceling raids
  "channel:manage:polls", // for creating & ending polls
  "channel:read:polls", // for reading broadcaster poll status
  "channel:manage:predictions", // for creating & ending predictions
  "channel:read:predictions", // for reading broadcaster prediction status
  "moderator:manage:announcements", // for announce api
  "user:manage:whispers", // for whispers api
  "moderator:manage:banned_users", // for ban/unban/timeout/untimeout api
  "moderator:manage:chat_messages", // for delete message api
  "user:manage:chat_color", // for update user color api
  "moderator:manage:chat_settings", // for roomstate api like followersonly
  "channel:manage:moderators", // for add/remove mod api
  "channel:manage:vips", // for add/remove vip api
  "moderator:read:chatters", // for get chatters
];

export default function ClientLogin() {
  const hash = typeof window !== "undefined" ? window.location.hash : "";
  const [oauthToken, setOauthToken] = useState<string | null>(null);
  const [hidden, setHidden] = useState(true);
  const [user, setUser] = useState<null | User>(null);
  const [buttonColor, setButtonColor] = useState(
    "bg-blue-500 hover:bg-blue-400"
  );
  const dataStringRef = useRef<HTMLInputElement | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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
      history.replaceState(null, "", " ");
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
          <a href={createLoginUrl().toString()} className={loginButtonClasses.join(" ")}>
            Login with Twitch
          </a>
        )}
        {loggedIn && (
          <>
            <div className="flex gap-1 align-center my-2">
              <div className="relative w-full">
                {hidden && <div className="absolute top-0 left-0 w-full h-full bg-red-700 rounded" />}
                <input
                  type="text"
                  ref={dataStringRef}
                  readOnly
                  className={`appearance-none rounded bg-gray-900 w-full overflow-hidden resize-none p-3`}
                  value={createChatterinoDataString(oauthToken, user)}
                />
              </div>
              <div className="flex align-center h-full bg-gray-900 rounded p-3 select-none cursor-pointer hover:bg-gray-700" onClick={() => setHidden(hidden => !hidden)}>🔎</div>
            </div>
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

type User = {
  id: string;
  login: string;
};

function createChatterinoDataString(oauthToken: string, user: User) {
  return `username=${user.login};user_id=${user.id};client_id=${twitchClientID};oauth_token=${oauthToken};`;
}

async function fetchUser(oauthToken: string): Promise<User> {
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
