import { useEffect, useRef, useState } from "react";
import Page from "../components/page";
import Section from "../components/section";

const redirectUrl = process.env.NEXT_PUBLIC_TWITCH_OAUTH_REDIRECT_URL!;
const twitchClientID = process.env.NEXT_PUBLIC_TWITCH_OAUTH_CLIENT_ID!;
const scopes = [
  "channel:moderate", // for seeing automod & which moderator banned/unbanned a user (felanbird unbanned weeb123)
  "channel:read:redemptions", // for getting the list of channel point redemptions (not currently used)
  "chat:edit", // for sending messages in chat
  "chat:read", // for viewing messages in chat
  "whispers:read", // for viewing recieved whispers

  // https://dev.twitch.tv/docs/api/reference#start-commercial
  "channel:edit:commercial", // for /commercial api

  // https://dev.twitch.tv/docs/api/reference#create-clip
  "clips:edit", // for /clip creation

  // https://dev.twitch.tv/docs/api/reference#create-stream-marker
  // https://dev.twitch.tv/docs/api/reference#modify-channel-information
  "channel:manage:broadcast", // for creating stream markers with /marker command, and for the /settitle and /setgame commands

  // https://dev.twitch.tv/docs/api/reference#get-user-block-list
  "user:read:blocked_users", // for getting list of blocked users

  // https://dev.twitch.tv/docs/api/reference#block-user
  // https://dev.twitch.tv/docs/api/reference#unblock-user
  "user:manage:blocked_users", // for blocking/unblocking other users

  // https://dev.twitch.tv/docs/api/reference#manage-held-automod-messages
  "moderator:manage:automod", // for approving/denying automod messages

  // https://dev.twitch.tv/docs/api/reference#start-a-raid
  // https://dev.twitch.tv/docs/api/reference#cancel-a-raid
  "channel:manage:raids", // for starting/canceling raids

  // https://dev.twitch.tv/docs/api/reference#create-poll
  // https://dev.twitch.tv/docs/api/reference#end-poll
  "channel:manage:polls", // for creating & ending polls (not currently used)

  // https://dev.twitch.tv/docs/api/reference#get-polls
  "channel:read:polls", // for reading broadcaster poll status (not currently used)

  // https://dev.twitch.tv/docs/api/reference#create-prediction
  // https://dev.twitch.tv/docs/api/reference#end-prediction
  "channel:manage:predictions", // for creating & ending predictions (not currently used)

  // https://dev.twitch.tv/docs/api/reference#get-predictions
  "channel:read:predictions", // for reading broadcaster prediction status (not currently used)

  // https://dev.twitch.tv/docs/api/reference#send-chat-announcement
  "moderator:manage:announcements", // for /announce api

  // https://dev.twitch.tv/docs/api/reference#send-whisper
  "user:manage:whispers", // for whispers api

  // https://dev.twitch.tv/docs/api/reference#ban-user
  // https://dev.twitch.tv/docs/api/reference#unban-user
  "moderator:manage:banned_users", // for ban/unban/timeout/untimeout api & channel.moderate eventsub topic

  // https://dev.twitch.tv/docs/api/reference#delete-chat-messages
  "moderator:manage:chat_messages", // for delete message api (/delete, /clear) & channel.moderate eventsub topic

  // https://dev.twitch.tv/docs/api/reference#update-user-chat-color
  "user:manage:chat_color", // for update user color api (/color coral)

  // https://dev.twitch.tv/docs/api/reference#get-chat-settings
  "moderator:manage:chat_settings", // for roomstate api (/followersonly, /uniquechat, /slow) & channel.moderate eventsub topic

  // https://dev.twitch.tv/docs/api/reference#get-moderators
  // https://dev.twitch.tv/docs/api/reference#add-channel-moderator
  // https://dev.twitch.tv/docs/api/reference#remove-channel-vip
  "channel:manage:moderators", // for add/remove/view mod api

  // https://dev.twitch.tv/docs/api/reference#add-channel-vip
  // https://dev.twitch.tv/docs/api/reference#remove-channel-vip
  // https://dev.twitch.tv/docs/api/reference#get-vips
  "channel:manage:vips", // for add/remove/view vip api

  // https://dev.twitch.tv/docs/api/reference#get-chatters
  "moderator:read:chatters", // for get chatters api

  // https://dev.twitch.tv/docs/api/reference#get-shield-mode-status
  // https://dev.twitch.tv/docs/api/reference#update-shield-mode-status
  "moderator:manage:shield_mode", // for reading/managing the channel's shield-mode status

  // https://dev.twitch.tv/docs/api/reference/#send-a-shoutout
  "moderator:manage:shoutouts", // for reading/managing the channel's shoutouts (not currently used)

  // https://dev.twitch.tv/docs/api/reference/#get-moderated-channels
  "user:read:moderated_channels", // for reading where the user is modded (not currently used)

  // https://dev.twitch.tv/docs/eventsub/eventsub-subscription-types/#channelchatmessage
  "user:read:chat", // for reading chat via eventsub (in progress)

  // https://dev.twitch.tv/docs/api/reference/#send-chat-message
  "user:write:chat", // for sending chat messages via helix (in testing)

  // https://dev.twitch.tv/docs/api/reference/#get-user-emotes
  "user:read:emotes", // for fetching emotes that a user can use via helix

  // https://dev.twitch.tv/docs/api/reference/#warn-chat-user
  "moderator:manage:warnings", // for /warn api & channel.moderate eventsub topic

  // https://dev.twitch.tv/docs/api/reference/#get-followed-channels
  "user:read:follows", // for determining if the current user follows a streamer

  "moderator:manage:blocked_terms", // for channel.moderate eventsub topic

  "moderator:manage:unban_requests", // for channel.moderate eventsub topic

  "moderator:read:moderators", // for channel.moderate eventsub topic

  "moderator:read:vips", // for channel.moderate eventsub topic

  "moderator:read:suspicious_users", // for channel.suspicious_user.message and channel.suspicious_user.update eventsub topics

  // https://dev.twitch.tv/docs/api/reference#add-suspicious-status-to-chat-user
  // https://dev.twitch.tv/docs/api/reference#remove-suspicious-status-from-chat-user
  "moderator:manage:suspicious_users",
];

export default function ClientLogin() {
  const hash = typeof window !== "undefined" ? window.location.hash : "";
  const [oauthToken, setOauthToken] = useState<string | null>(null);
  const [hidden, setHidden] = useState(true);
  const [user, setUser] = useState<null | User>(null);
  const [copied, setCopied] = useState(false);
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

  const handleCopyClick = () => {
    if (dataStringRef.current) {
      dataStringRef.current.select();
      window.document.execCommand("copy");
      setCopied(true);
    }
  };

  return (
    <Page title="Login - Chatterino">
      <Section className="login">
        <h2 className="login-title">Chatterino Login</h2>
        <h5 className="login-warning">Do not show on stream</h5>
        {errorMessage && (
          <h6 className="login-warning">Error: {errorMessage}</h6>
        )}
        {!loggedIn && (
          <a href={createLoginUrl().toString()} className="login-button">
            Login with Twitch
          </a>
        )}
        {loggedIn && (
          <>
            <div className="token-row">
              <div className="token-box">
                {hidden && <div className="token-cover" />}
                <input
                  type="text"
                  ref={dataStringRef}
                  readOnly
                  className="token-input"
                  value={createChatterinoDataString(oauthToken, user)}
                />
              </div>
              <div
                className="token-toggle"
                onClick={() => setHidden((hidden) => !hidden)}
              >
                🔎
              </div>
            </div>
            <button
              className={"copy-button" + (copied ? " copied" : "")}
              onClick={handleCopyClick}
            >
              Copy
            </button>
            <div className="login-steps">
              Steps:
              <ul>
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
