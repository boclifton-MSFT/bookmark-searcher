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

#### Manual release procedure

1. Merge the reviewed release changes into the protected default branch.
1. Create and push a release tag in `vMAJOR.MINOR.PATCH` format (for example, `v1.2.3`) at the intended commit.
1. In **Actions**, select **Publish to Chrome Web Store**, choose **Run workflow**, and select that tag. Pushes, pull requests, and GitHub Releases do not start this workflow.
1. The workflow validates the tag and packages the extension. The publishing job then waits for approval in the `chrome-web-store` environment before requesting Google credentials or contacting the store.
1. The environment's required reviewer approves or rejects the deployment. Approval allows the workflow to submit the ZIP for Chrome Web Store review; it does not make the store release immediately available.

Users with permission to run workflows may request a dispatch, but a request alone cannot publish: publishing remains blocked until an environment reviewer approves it.

#### Administrator setup checklist

These settings are administrator actions and are not applied by this workflow or README change. Configure and verify them before the first release.

1. **Environment approval:** Create the `chrome-web-store` environment. Initially add only `@boclifton-MSFT` as a required reviewer. Leave **Prevent self-review** disabled so this maintainer can request and approve their own release. Disable **Allow administrators to bypass configured protection rules** where that option is available. To add approvers later, update the environment's required reviewers in GitHub settings; do not change the workflow to authorize usernames.
1. **Deployment refs:** Set deployment rules to **Selected branches and tags**, and add a **Tag** rule for `v*` only; do not add a branch rule. GitHub evaluates these patterns against the workflow ref. The workflow additionally accepts only `refs/tags/vMAJOR.MINOR.PATCH`, so a branch selected in the dispatch UI fails validation and cannot reach publishing. Avoid giving a protected branch the same name as a release tag: GitHub does not allow a tag sharing a protected branch's name to deploy to an environment.
1. **Tag ruleset:** Create a tag ruleset targeting `v*` and restrict tag creation, updates, and deletion to the authorized maintainer role/team or another narrowly scoped bypass actor supported by the repository's plan. Ruleset bypass options can be roles, teams, or GitHub Apps; they may not provide an individual-user-only option. If the UI offers only a broad role, understand who holds it and limit membership appropriately rather than assuming it grants access only to `@boclifton-MSFT`. Rulesets are available for public repositories on GitHub Free and Free for organizations, and for public and private repositories on Pro, Team, and Enterprise Cloud; available actors and controls can vary.
1. **Review protections:** Protect the default branch and require pull requests and appropriate approvals for changes, including workflow changes. Repository administrators and anyone able to edit these protections or rulesets remain trusted; use required review and restrict who can change the protections accordingly.
1. **Google Cloud:** Configure Workload Identity Federation to trust only this repository and the `chrome-web-store` environment (the expected subject is `repo:boclifton-MSFT/bookmark-searcher:environment:chrome-web-store`). Grant the federated identity only the service-account impersonation permission needed by this workflow, and grant that service account only the Chrome Web Store API access and item permissions needed to upload and publish. Do not broaden the trust to arbitrary refs or untrusted pull-request workflows.
1. **Repository variables:** Set `CWS_WIF_PROVIDER`, `CWS_SERVICE_ACCOUNT`, `CWS_PUBLISHER_ID`, and `CWS_ITEM_ID` as repository variables. These identify the existing identity provider, service account, publisher, and store item; do not put credentials in variables or secrets for this workflow.
