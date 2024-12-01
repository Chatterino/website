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

/*
usernames=(
    "pajlada"
    "nerixyz"
    "mm2pl"
    "franzitrone"
    "iprodigy"
    "hemirt"
    "kleberpf"
    "kornes"
    "8thony"
    "jakeryw"
    "niller2005"
    "felanbird"
    "teknsl"
    "occluder"
);
rm -f /tmp/gh-avatar-xd
echo "const ghAvatars = {" > /tmp/gh-avatar-xd
for username in $usernames; do
    avatar_url="$(gh api /users/$username | jq -r '.avatar_url')"
    printf '    "%s": "%s",\n' "$username" "$avatar_url" >> /tmp/gh-avatar-xd
done
echo "};" >> /tmp/gh-avatar-xd

cat /tmp/gh-avatar-xd | wl-copy
*/

const ghAvatars = {
  pajlada: "https://avatars.githubusercontent.com/u/962989?v=4",
  nerixyz: "https://avatars.githubusercontent.com/u/19953266?v=4",
  mm2pl: "https://avatars.githubusercontent.com/u/25011746?v=4",
  franzitrone: "https://avatars.githubusercontent.com/u/1348642?v=4",
  iprodigy: "https://avatars.githubusercontent.com/u/8106344?v=4",
  hemirt: "https://avatars.githubusercontent.com/u/1310440?v=4",
  kleberpf: "https://avatars.githubusercontent.com/u/43550602?v=4",
  kornes: "https://avatars.githubusercontent.com/u/28986062?v=4",
  "8thony": "https://avatars.githubusercontent.com/u/114905842?v=4",
  jakeryw: "https://avatars.githubusercontent.com/u/32527926?v=4",
  niller2005: "https://avatars.githubusercontent.com/u/3404570?v=4",
  felanbird: "https://avatars.githubusercontent.com/u/41973452?v=4",
  teknsl: "https://avatars.githubusercontent.com/u/64030674?v=4",
  occluder: "https://avatars.githubusercontent.com/u/69414142?v=4",
};

function author(options) {
  return (tree) => {
    findAndReplace(tree, [[/@[\w\d-]+/g, replace]], {
      ignore: ["list", "li", "ul", "link", "linkReference"],
    });
  };

  function replace(value, _no, _match) {
    const username = value.slice(1);
    let pfp = null;
    if (username.toLowerCase() in ghAvatars) {
      pfp = ghAvatars[username.toLowerCase()];
    } else {
      console.log(`missing pfp for ${username}`);
    }

    const children = [{ type: "text", value }];

    if (pfp !== null) {
      children.unshift({
        type: "image",
        url: `${pfp}&s=60`,
        data: {
          hProperties: {
            className: "gh-avatar",
          },
        },
      });
    }

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
    remarkPlugins: [githubIssueLinks, author, majorMinorColoring],
  },
});

export default withMDX({
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  output: "export",
});
