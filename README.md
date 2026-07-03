# Link Vault

A small Chrome extension that captures links with a topic and a timeless/timely
status. Everything lives in `chrome.storage.local`, on this machine only.
Nothing is sent anywhere, there is no server, no account, no sync. That was
a deliberate choice, not a limitation we ran out of time to fix.

## Install (load unpacked, since this isn't on the Chrome Web Store)

1. Unzip this folder somewhere you'll remember, e.g. `~/link-vault`.
2. Open Chrome and go to `chrome://extensions`.
3. Turn on **Developer mode** (top right toggle).
4. Click **Load unpacked**, and select the unzipped `link-vault` folder.
5. Pin it from the puzzle-piece icon in the toolbar so it's one click away.

## How to use it

**Quick capture, while browsing:** right-click any page or any link and
choose "Save to Link Vault." It saves instantly as Uncategorized / Timely,
the same way your Inbox.md takes things in without judgment. Clean it up
later.

**Deliberate capture, from the popup:** click the extension icon. It
pre-fills the current tab's title and URL. Add a topic (e.g. "ACR 2026",
"Growth Conversations"), mark it Timely or Timeless, optionally add a short
note, and save.

**Sorting later:** every saved link shows its topic as an editable field and
its Timely/Timeless status as a clickable pill, right in the list. No need
to reopen a form to fix a quick-capture.

**Once you've got more than a handful:** click "View all →" in the popup.
It opens a full browser tab, not the cramped popup, with search across
title/URL/note, the same two filters, and a sort order (newest, oldest, or
by topic). This is the same data, just a bigger room to stand in. The
popup itself only ever shows your latest 8 matching links, by design, so
it never becomes the thing you're scrolling through at 100+ links.

**Filtering:** the two dropdowns above the list filter by topic and by
timeless/timely, independently, since they're two different questions
about a link, not one.

**Export:** the Export button downloads everything as a JSON file. You
chose single-machine-only for now, this button is what makes "add sync
later" possible without rebuilding anything: on a second machine, load the
same extension, and a future version can import that file. Not built yet,
kept out on purpose to match what you asked for today.

## What's deliberately not here

No cloud storage, no Google account sync, no company data leaves this
machine, because the extension never talks to a server at all. No login.
No analytics. If you ever want cross-machine sync, that's a real decision
about which channel you're willing to route through, worth a fresh
conversation rather than a silent default.
