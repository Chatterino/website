use pulldown_cmark::{Event, LinkType, Options, Parser, Tag, TagEnd, html};

const ISSUE_BASE_URL: &str = "https://github.com/Chatterino/Chatterino2/issues";

/// Convert markdown to HTML with a few site-specific transforms applied.
pub fn to_html(source: &str) -> String {
    let events: Vec<Event> = Parser::new_ext(source, Options::ENABLE_HEADING_ATTRIBUTES).collect();

    let events = rewrite_plain_text(events, bold_major);
    let events = rewrite_plain_text(events, link_issues);
    let events = add_heading_anchors(events);

    let mut out = String::with_capacity(source.len() * 2);
    html::push_html(&mut out, events.into_iter());
    out
}

/// Rewrite text outside of links and code blocks.
///
/// The `rewrite` callback can return:
/// - `Some(events)` to insert in place
/// - `None` to leave the event stream unchanged
fn rewrite_plain_text<'a>(
    events: Vec<Event<'a>>,
    rewrite: fn(&str) -> Option<Vec<Event<'static>>>,
) -> Vec<Event<'a>> {
    let mut out = Vec::with_capacity(events.len());
    let mut enclosing_links_and_code = 0usize;
    for event in events {
        match &event {
            // - `[text](url)`
            // - ```
            //   code
            //   ```
            Event::Start(Tag::Link { .. } | Tag::CodeBlock(_)) => {
                enclosing_links_and_code += 1;
            }
            Event::End(TagEnd::Link | TagEnd::CodeBlock) => {
                enclosing_links_and_code = enclosing_links_and_code.saturating_sub(1);
            }
            // HTML `<a>` tags (e.g. emitted by components) are links too.
            Event::InlineHtml(html) if html.starts_with("<a>") || html.starts_with("<a ") => {
                enclosing_links_and_code += 1;
            }
            Event::InlineHtml(html) if html.starts_with("</a>") => {
                enclosing_links_and_code = enclosing_links_and_code.saturating_sub(1);
            }
            Event::Text(text) if enclosing_links_and_code == 0 => {
                if let Some(replacement) = rewrite(text) {
                    out.extend(replacement);
                    continue;
                }
            }
            _ => {}
        }
        out.push(event);
    }
    out
}

/// Append a `#` anchor link to headings that have an explicit id.
fn add_heading_anchors<'a>(events: Vec<Event<'a>>) -> Vec<Event<'a>> {
    let mut out = Vec::with_capacity(events.len());
    let mut heading_id = None;
    for event in events {
        match &event {
            Event::Start(Tag::Heading { id, .. }) => {
                heading_id = id.clone();
            }
            Event::End(TagEnd::Heading(_)) => {
                if let Some(id) = heading_id.take() {
                    out.push(Event::InlineHtml(
                        format!(r##"<a aria-hidden="true" tabindex="-1" href="#{id}">"##).into(),
                    ));
                    out.push(Event::Text("#".into()));
                    out.push(Event::InlineHtml("</a>".into()));
                }
            }
            _ => {}
        }
        out.push(event);
    }
    out
}

/// Link `#1234` to the issue tracker.
///
/// If there are multiple occurrences in `text`, this converts all of them.
fn link_issues(text: &str) -> Option<Vec<Event<'static>>> {
    let mut events = Vec::new();
    let mut changed = false;
    let mut plain = 0;

    let bytes = text.as_bytes();
    let mut i = 0;
    while i < bytes.len() {
        match bytes[i] {
            b'#' => {
                let issue_number = parse_ascii_digits(&bytes[i + 1..]);
                if issue_number.is_empty() {
                    i += 1;
                    continue;
                }

                let end = i + 1 + issue_number.len();

                push_text(&mut events, &text[plain..i]);
                push_tag(
                    &mut events,
                    Tag::Link {
                        link_type: LinkType::Inline,
                        dest_url: format!("{ISSUE_BASE_URL}/{issue_number}").into(),
                        title: "".into(),
                        id: "".into(),
                    },
                    &text[i..end],
                );

                changed = true;
                i = end;
                plain = i;
            }
            _ => {
                i += 1;
            }
        }
    }

    if changed {
        push_text(&mut events, &text[plain..]);
        return Some(events);
    }

    None
}

fn parse_ascii_digits(buf: &[u8]) -> &str {
    let mut i = 0;
    while i < buf.len() && buf[i].is_ascii_digit() {
        i += 1;
    }

    std::str::from_utf8(&buf[..i]).expect("ascii is always valid utf-8")
}

/// Rewrite rule: wrap `Major:` in `<strong>`.
///
/// Returns `None` if the text contains no `Major:`.
fn bold_major(text: &str) -> Option<Vec<Event<'static>>> {
    if !text.contains("Major:") {
        return None;
    }
    let mut events = Vec::new();
    let mut plain = 0;
    for (i, needle) in text.match_indices("Major:") {
        push_text(&mut events, &text[plain..i]);
        push_tag(&mut events, Tag::Strong, needle);
        plain = i + needle.len();
    }
    push_text(&mut events, &text[plain..]);
    Some(events)
}

fn push_tag(events: &mut Vec<Event<'static>>, tag: Tag<'static>, content: &str) {
    let end = tag.to_end();
    events.push(Event::Start(tag));
    events.push(Event::Text(content.to_owned().into()));
    events.push(Event::End(end))
}

fn push_text(events: &mut Vec<Event<'static>>, text: &str) {
    if !text.is_empty() {
        events.push(Event::Text(text.to_owned().into()));
    }
}

#[cfg(test)]
mod tests {
    use super::to_html;

    #[test]
    fn rewrites_still_work_after_a_heading() {
        assert_eq!(
            to_html("## Hi {#hi}\n\nfix #1"),
            "<h2 id=\"hi\">Hi<a aria-hidden=\"true\" tabindex=\"-1\" href=\"#hi\">#</a></h2>\n\
             <p>fix <a href=\"https://github.com/Chatterino/Chatterino2/issues/1\">#1</a></p>\n"
        );
    }

    #[test]
    fn plain_text_is_untouched() {
        assert_eq!(to_html("hello world"), "<p>hello world</p>\n");
    }

    #[test]
    fn issue_reference_is_linked() {
        assert_eq!(
            to_html("Fixed #123."),
            "<p>Fixed <a href=\"https://github.com/Chatterino/Chatterino2/issues/123\">#123</a>.</p>\n"
        );
    }

    #[test]
    fn multiple_issue_references() {
        assert_eq!(
            to_html("#1 and #2"),
            "<p><a href=\"https://github.com/Chatterino/Chatterino2/issues/1\">#1</a> \
             and <a href=\"https://github.com/Chatterino/Chatterino2/issues/2\">#2</a></p>\n"
        );
    }

    #[test]
    fn hash_without_digits_is_untouched() {
        assert_eq!(to_html("issue # 5 and #x"), "<p>issue # 5 and #x</p>\n");
    }

    #[test]
    fn issue_reference_in_inline_code_is_untouched() {
        assert_eq!(to_html("`#123`"), "<p><code>#123</code></p>\n");
    }

    #[test]
    fn issue_reference_in_code_block_is_untouched() {
        assert_eq!(
            to_html("```\n#123\n```"),
            "<pre><code>#123\n</code></pre>\n"
        );
    }

    #[test]
    fn issue_reference_inside_markdown_link_is_untouched() {
        assert_eq!(
            to_html("[see #123](https://example.com)"),
            "<p><a href=\"https://example.com\">see #123</a></p>\n"
        );
    }

    #[test]
    fn issue_reference_inside_raw_anchor_is_untouched() {
        assert_eq!(
            to_html(r#"<a href="/x">#123</a> #456"#),
            "<p><a href=\"/x\">#123</a> \
             <a href=\"https://github.com/Chatterino/Chatterino2/issues/456\">#456</a></p>\n"
        );
    }

    #[test]
    fn major_is_bold() {
        assert_eq!(
            to_html("Major: rewrote everything"),
            "<p><strong>Major:</strong> rewrote everything</p>\n"
        );
    }

    #[test]
    fn major_in_inline_code_is_untouched() {
        assert_eq!(to_html("`Major:`"), "<p><code>Major:</code></p>\n");
    }

    #[test]
    fn heading_with_id_gets_anchor() {
        assert_eq!(
            to_html("## Hello {#hello}"),
            "<h2 id=\"hello\">Hello\
             <a aria-hidden=\"true\" tabindex=\"-1\" href=\"#hello\">#</a></h2>\n"
        );
    }

    #[test]
    fn heading_without_id_gets_no_anchor() {
        assert_eq!(to_html("## Hello"), "<h2>Hello</h2>\n");
    }

    #[test]
    fn transforms_combine_in_one_paragraph() {
        assert_eq!(
            to_html("Major: fix #7"),
            "<p><strong>Major:</strong> fix \
             <a href=\"https://github.com/Chatterino/Chatterino2/issues/7\">#7</a></p>\n"
        );
    }
}
