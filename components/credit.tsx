import React from "react";

type Props = {
  author: string;
  helper?: string;
  inline?: boolean;
  prs?: string;
};

export function GitHubUser({ username }: { username: string }) {
  const avatarURL = `https://avatars.githubusercontent.com/${username}?v=4&s=60`;
  return (
    <a href={`https://github.com/${username}`} className="gh-author">
      <img src={avatarURL} className="gh-avatar" />@{username}
    </a>
  );
}

function PullRequest({ pullRequestID }: { pullRequestID: string }) {
  return (
    <a
      href={`https://github.com/Chatterino/chatterino2/pull/${pullRequestID}`}
      className="gh-pr"
    >
      #{pullRequestID}
    </a>
  );
}

function formatUsers(users: string[] | undefined): React.ReactNode[] {
  if (!users) {
    return [];
  }

  return users.map((username) => <GitHubUser username={username.trim()} />);
}

function formatPRs(prs: string[]): React.ReactNode[] {
  if (!prs) {
    return [];
  }

  return prs.map((pr) => <PullRequest pullRequestID={pr.trim()} />);
}

export default function Credit({ author, helper, inline, prs }: Props) {
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

  const prList = formatPRs(prs?.split(",") ?? []);

  const contents = (
    <>
      Authored by {formatList(authorElements)}
      {helperElements.length ? (
        <> with help from {formatList(helperElements)}</>
      ) : null}
      {prList.length ? <> in {formatList(prList)}</> : null}
    </>
  );

  if (inline) {
    return <span className="text-gray-300 mt-3 mb-4 text-sm">{contents}</span>;
  } else {
    return <div className="text-gray-300 mt-3 mb-4 text-sm">{contents}</div>;
  }
}
