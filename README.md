# chatterino.com

Static site generator and content for the Chatterino website.

## Building

```bash
cargo run
```

That puts the site into `out/`.

Use your preferred static HTTP server to serve it locally. For example:

```bash
npx serve out
```

## Site build process

The site is made up of [minijinja](https://docs.rs/minijinja/latest/minijinja/) templates, with some Rust code to render it.

The build process:

- Constructs a `minijinja` environment from `templates`
- Reads all content in `pages` and renders each `.j2` file into the output dir
- Copies `public` and `styles` into the output dir

Configuration is split between `.env.*` files and `links.json`.

Various components are exposed from Rust. These are mostly used in the changelog.

- `credit(author="A, B", helper="C", prs="1234", inline=true)`: attribution
- `github_user("name")`: inline GH profile icon + link
- `figure("path/to/img/or/video.png", caption="Text under the media")`: annotated media
- `redirect("https://example.com")`: creates redirect pages
- `{% filter callout("note") %} ... {% endfilter %}`: highlights

Some globals are also exposed:

- `links`, which holds content from `links.json`

Comments in `.j2` files are written `{! ... !}`, because the default `{#` collides with the `{#heading-id}` markdown syntax.

## Configuration

`TWITCH_OAUTH_CLIENT_ID` and `TWITCH_OAUTH_REDIRECT_URL` configure the login page.

You can configure these in `.env.development` (`cargo run -- --dev`) and `.env.production` (`cargo run -- --prod`)
