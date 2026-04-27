import { findAndReplace } from "mdast-util-find-and-replace";

const baseRepoUrl = "https://github.com/Chatterino/Chatterino2";

// -- #1234 issues
export default function githubIssueLinks(options) {
  return (tree) => {
    findAndReplace(tree, [[/#\d+/g, replace]], {
      ignore: ["link", "linkReference"],
    });
  };

  function replace(value, _no, _match) {
    return {
      type: "link",
      title: null,
      url: `${baseRepoUrl}/issues/${value.slice(1)}`,
      children: [{ type: "text", value }],
    };
  }
}
