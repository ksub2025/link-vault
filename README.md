# Link Vault

![License](https://img.shields.io/github/license/ksub2025/link-vault)
![Manifest](https://img.shields.io/badge/manifest-v3-blue)
![Dependencies](https://img.shields.io/badge/dependencies-none-brightgreen)

A tiny Chrome extension that saves links with a topic and a Timely/Timeless
status. No account, no server, no sync. Everything stays in your browser's
local storage, permanently.

<img width="356" height="427" alt="Screenshot 2026-07-03 at 2 09 46 PM" src="https://github.com/user-attachments/assets/151077d9-59e6-407c-9324-84fcc7a6d4ce" />


## Why

Most link-saving tools assume you want everything backed up to someone
else's cloud. This one doesn't. If some of what you're saving is sensitive,
or you just don't want another login and another set of permissions, this
trades sync for that guarantee.

## How it works

**Right-click to save.** Any page, any link, one click, saved instantly as
Uncategorized / Timely. No form, no friction. Clean it up later.

**Or use the popup for more control.** It pre-fills the current tab. Add a
topic, mark it Timely or Timeless, optionally leave a note.

**Edit in place.** Every saved link has its topic and time-status editable
right in the list, click the topic to retype it, click the pill to flip it.

**Search everything once it grows.** "View all" opens a full tab: search
across title, URL, note, and topic, filter by topic or time-sensitivity,
sort newest, oldest, or by topic. The popup itself only shows your 8 most
recent matches, so it never becomes an endless scroll.

**Export anytime.** One click downloads everything as JSON, your data, in
a format you can read without this extension installed.

## Install

Not on the Chrome Web Store, so load it manually:

1. Clone or download this repo.
2. Go to `chrome://extensions`, turn on **Developer mode**.
3. Click **Load unpacked**, select the folder.
4. Pin it from the toolbar.

## Permissions, and why

`storage`, `contextMenus`, `activeTab`. Nothing else. No host permissions,
no network calls. Four small JS files, readable end to end in one sitting
if you want to verify that yourself.

## Contributing

Small codebase, on purpose. Issues and pull requests welcome, especially
around optional sync, that's the one feature left out deliberately rather
than built and forced on everyone.

## License

MIT. See [LICENSE](LICENSE).
