import React from "react";

type Props = {
  author: string;
  helper?: string;
};

function GitHubUser({ username }: { username: string }) {
  // Authored by <a href="https://github.com/nerixyz" class="gh-author">
  // <img src="https://avatars.githubusercontent.com/u/19953266?v=4&amp;s=60" class="gh-avatar">@nerixyz</a> with help from <a href="https://github.com/pajlada" class="gh-author"><img src="https://avatars.githubusercontent.com/u/962989?v=4&amp;s=60" class="gh-avatar">@pajlada</a>
  const avatarURL = `https://avatars.githubusercontent.com/${username}?v=4&s=60`;
  return (
    <a href={`https://github.com/${username}`} className="gh-author">
      <img src={avatarURL} className="gh-avatar" />@{username}
    </a>
  );
}

function formatUsers(users: string[] | undefined): React.ReactNode[] {
  if (!users) {
    return [];
  }

  return (
    users.map((username) => <GitHubUser username={username.trim()} />) || [
      <p>TODO REMOVE THIS SINCE AUTHORS SHOULD ALWAYS BE SET</p>,
    ]
  );
}

export default function Credit({ author, helper }: Props) {
  const formatList = (list: React.ReactNode[]) => {
    if (list.length === 0) return null;
    // @username
    if (list.length === 1) return list[0];
    // @username and @username
    if (list.length === 2)
      return (
        <>
          {list[0]} and {list[1]}
        </>
      );

    // @username, @username, and @username
    return (
      <>
        {list.slice(0, -1).map((item, index) => (
          <span key={index}>{item}, </span>
        ))}
        and {list[list.length - 1]}
      </>
    );
  };

  const authorElements = formatUsers(author.split(","));
  const helperElements = formatUsers(helper?.split(","));

  return (
    <div className="text-gray-300 mt-3 mb-4 text-sm">
      Authored by {formatList(authorElements)}
      {helperElements.length ? (
        <> with help from {formatList(helperElements)}</>
      ) : null}
    </div>
  );
}
