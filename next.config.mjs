import remarkHeadingId from "remark-custom-heading-id";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

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
    remarkPlugins: [githubIssueLinks, majorMinorColoring, remarkHeadingId],
    rehypePlugins: [
      [
        rehypeAutolinkHeadings,
        {
          behavior: "append",
          content: {
            type: "text",
            value: "#",
          },
        },
      ],
    ],
  },
});

export default withMDX({
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  output: "export",
});
