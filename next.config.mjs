// -- config
const withMDX = (await import("@next/mdx")).default({
  extension: /\.mdx$/,
  options: {
    remarkPlugins: [
      // Paths relative to project root (pages/)
      "../scripts/c2-gh-issue-links.mjs",
      "../scripts/c2-major-minor-coloring.mjs",
      "remark-custom-heading-id",
    ],
    rehypePlugins: [
      [
        "rehype-autolink-headings",
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
