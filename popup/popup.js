function addParentTitle(element, text, rootId) {
  if (element.parentId && element.parentId !== '0') {
    chrome.bookmarks.get(element.parentId, (results) => {
      results.forEach(p => {
        if (p.title) {
          text = text
            ? p.title + ' > ' + text
            : p.title;
        }
        if (p.parentId === '0') {
          console.log('Inner Text: ' + text);
          document.getElementById(rootId).querySelector('p').innerText = text;
        }
        addParentTitle(p, text, rootId);
      })
    });
  }
}

function displayParent(element) {
  let text = '';
  addParentTitle(element, text, element.id);
  const p = document.createElement('p');
  p.setAttribute('class', 'ml-1 mt-1 text-small text-muted mb-0');
  p.setAttribute('style', 'font-size: 0.8rem');
  return p;
}

function createLi(result) {
  const a = document.createElement('a');
  a.href = result.url;
  a.innerText = result.title;
  const li = document.createElement('li');
  li.setAttribute('class', 'list-group-item');
  li.setAttribute('id', result.id);
  

  if (result.parentId && result.parentId !== '0') {
    const p = displayParent(result);
    li.appendChild(p);
  }
  li.appendChild(a);
  return li;
}

document.getElementById("bmSearch").addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("bmSearchBtn").click();
  }
});

document.getElementById('bmSearchBtn').addEventListener('click', () => {
  const search = document.getElementById('bmSearch').value;
  chrome.bookmarks.search(search, (results) => {
    document.getElementById('resultCount').innerText = `${results.length} results found`;

    const root = document.getElementById('results');
    root.innerHTML = "";

    let ul = document.createElement('ul');
    ul.setAttribute('id', 'bmList');
    ul.setAttribute('class', 'list-group mt-2 rounded-0');

    root.appendChild(ul);

    results.forEach((result) => {
      const li = createLi(result)
      ul.appendChild(li);
    });
  });
});
