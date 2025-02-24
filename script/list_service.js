function loadList() {
  let boardDatas = localStorage.getItem("boardDatas")
      ? JSON.parse(localStorage.getItem("boardDatas"))
      : [];

  const boardList = document.querySelector('.board-list-container');
  boardList.innerHTML = boardDatas.map(data => `
      <li class="board-box" id="memo-${data.id}">
          <div class="memo-content" onclick="viewArticle(${data.id})">
              <h1>${data.title}</h1>
              <h2>${data.writer}</h2>
              <pre>${data.content}</pre>
          </div>
          <div class="button-container">
              <button class="delete-btn" onclick="deleteMemo(${data.id})">삭제</button>
          </div>
      </li>
  `).join("");
}

function viewArticle(id) {
  localStorage.setItem("currentArticleId", id);
  location.href = './article.html';
}

loadList();
