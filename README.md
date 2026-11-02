# Bookmark Searcher
Chrome and Edge extension for searching bookmarks

**Available in Chrome Web Store!**
[Bookmark Searcher on Chrome Web Store](https://chromewebstore.google.com/detail/bookmark-searcher/nalokehijhjobfhjcbfjgihaofppejlb)

### (For developers) Steps to install for local development
1. Download the files from this repo
1. Extract all files to a folder like "C:\Users\me\BrowserExtensions\BookmarkSearcher"
1. Open Edge or Chrome
1. Follow the instructions here, choosing the folder you saved the files to from above: [Edge](https://learn.microsoft.com/en-us/microsoft-edge/extensions-chromium/getting-started/extension-sideloading), [Chrome](https://developer.chrome.com/docs/extensions/mv3/getstarted/#unpacked)

### (For maintainers) Publishing to the Chrome Web Store

Publishing a GitHub Release starts `.github/workflows/publish-to-chrome-web-store.yml`. It packages the extension sources and submits the ZIP to the Chrome Web Store for review. The store makes the release available after review; `workflow_dispatch` can run the workflow manually from a release tag.

Before using the workflow:

1. Configure Google Cloud Workload Identity Federation to trust this repository and its `chrome-web-store` GitHub environment, and allow the configured service account to access the Chrome Web Store API.
1. Create a GitHub environment named `chrome-web-store`. Restrict deployments to release tags and configure any required approvals.
1. Add these repository variables: `CWS_WIF_PROVIDER`, `CWS_SERVICE_ACCOUNT`, `CWS_PUBLISHER_ID`, and `CWS_ITEM_ID`. The publisher and item IDs are available in the Chrome Web Store Developer Dashboard.
