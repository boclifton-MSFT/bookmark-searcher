# Bookmark Searcher
Chrome and Edge extension for searching bookmarks

**Available in Chrome Web Store!**
[Bookmark Searcher on Chrome Web Store](https://chromewebstore.google.com/detail/bookmark-searcher/nalokehijhjobfhjcbfjgihaofppejlb)

## Tech notes
- Manifest V3 extension popup
- No CSS framework dependency (popup styles are in `/home/runner/work/bookmark-searcher/bookmark-searcher/popup/popup.css`)
- Supports bookmark and folder search results (folders are shown as non-link results)

### (For developers) Steps to install for local development
1. Download the files from this repo
1. Extract all files to a folder like "C:\Users\me\BrowserExtensions\BookmarkSearcher"
1. Open Edge or Chrome
1. Follow the instructions here, choosing the folder you saved the files to from above: [Edge](https://learn.microsoft.com/en-us/microsoft-edge/extensions-chromium/getting-started/extension-sideloading), [Chrome](https://developer.chrome.com/docs/extensions/mv3/getstarted/#unpacked)

### Package for release
Run PowerShell from the repository root:
`pwsh -File /home/runner/work/bookmark-searcher/bookmark-searcher/build.ps1`

### Manual verification checklist
- Popup opens with expected layout and no horizontal overflow.
- Empty query shows an explicit prompt message.
- Search with bookmark results opens links in a new tab.
- Search with folder results shows folder entries without broken links.
- Parent folder path renders for each result.
- Search with no matches shows an explicit empty-state message.
