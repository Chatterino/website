import remarkHeadingId from "remark-custom-heading-id";

const { findAndReplace } = await import("mdast-util-find-and-replace");

const baseRepoUrl = "https://github.com/Chatterino/Chatterino2";

// -- #1234 issues
function githubIssueLinks(options) {
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

const ignoredUsernames = new Set(["mentions", "usernames"]);

function author(options) {
  return (tree) => {
    findAndReplace(tree, [[/@[\w\d-]+/g, replace]], {
      ignore: ["link", "linkReference"],
    });
  };

  function replace(value, _no, _match) {
    const username = value.slice(1);
    if (ignoredUsernames.has(username)) {
      return _match;
    }

    const children = [
      {
        type: "image",
        url: `https://avatars.githubusercontent.com/${encodeURIComponent(username)}?size=32`,
        data: {
          hProperties: {
            className: "gh-avatar",
            loading: "lazy",
          },
        },
      },
      { type: "text", value },
    ];

    return {
      type: "link",
      data: {
        hProperties: {
          className: "gh-author",
        },
      },
      url: `https://github.com/${username}`,
      children,
    };
  }
}

function majorMinorColoring() {
  return (tree) => {
    findAndReplace(tree, [[/Major:/g, replace]], {
      ignore: ["link", "linkReference"],
    });
  };

  function replace(value, _no, _match) {
    return {
      type: "strong",
      children: [{ type: "text", value }],
    };
  }
}

// -- config
const withMDX = (await import("@next/mdx")).default({
  extension: /\.mdx$/,
  options: {
    remarkPlugins: [
      githubIssueLinks,
      author,
      majorMinorColoring,
      remarkHeadingId,
    ],
  },
});

export default withMDX({
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  output: "export",
});
