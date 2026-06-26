const UNTITLED_LABEL = '(Untitled)';
const FOLDER_SUFFIX = ' (Folder)';

const searchInput = document.getElementById('bmSearch');
const searchButton = document.getElementById('bmSearchBtn');
const resultCount = document.getElementById('resultCount');
const resultsRoot = document.getElementById('results');

function getDisplayTitle(item) {
  const title = item?.title?.trim();
  return title ? title : UNTITLED_LABEL;
}

function getBookmarkById(id) {
  return new Promise((resolve) => {
    chrome.bookmarks.get(id, (results) => {
      resolve(results && results[0] ? results[0] : null);
    });
  });
}

async function getParentPath(item) {
  const segments = [];
  let parentId = item.parentId;

  while (parentId && parentId !== '0') {
    const parent = await getBookmarkById(parentId);
    if (!parent) {
      break;
    }
    segments.unshift(getDisplayTitle(parent));
    parentId = parent.parentId;
  }

  return segments.join(' > ');
}

function createTitleElement(result) {
  const title = `${getDisplayTitle(result)}${result.url ? '' : FOLDER_SUFFIX}`;

  if (result.url) {
    const link = document.createElement('a');
    link.className = 'result-link';
    link.href = result.url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.textContent = title;
    return link;
  }

  const folderTitle = document.createElement('span');
  folderTitle.className = 'result-folder-title';
  folderTitle.textContent = title;
  return folderTitle;
}

function createResultItem(result, parentPath) {
  const item = document.createElement('li');
  item.className = 'result-item';
  item.id = result.id;

  if (parentPath) {
    const path = document.createElement('p');
    path.className = 'result-path';
    path.textContent = parentPath;
    item.appendChild(path);
  }

  item.appendChild(createTitleElement(result));
  return item;
}

function renderMessage(message) {
  resultsRoot.innerHTML = '';
  const emptyState = document.createElement('p');
  emptyState.className = 'results-empty';
  emptyState.textContent = message;
  resultsRoot.appendChild(emptyState);
}

function renderResults(items) {
  resultsRoot.innerHTML = '';

  if (!items.length) {
    renderMessage('No results found.');
    return;
  }

  const list = document.createElement('ul');
  list.id = 'bmList';
  list.className = 'results-list';

  items.forEach((item) => {
    list.appendChild(item);
  });

  resultsRoot.appendChild(list);
}

searchInput.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    searchButton.click();
  }
});

searchButton.addEventListener('click', async () => {
  const search = searchInput.value.trim();

  if (!search) {
    resultCount.textContent = '0 results found';
    renderMessage('Enter text to search.');
    return;
  }

  chrome.bookmarks.search(search, async (results) => {
    const items = await Promise.all(results.map(async (result) => {
      const parentPath = await getParentPath(result);
      return createResultItem(result, parentPath);
    }));

    resultCount.textContent = `${items.length} results found`;
    renderResults(items);
  });
});
