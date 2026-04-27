import { findAndReplace } from "mdast-util-find-and-replace";

export default function majorMinorColoring() {
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
