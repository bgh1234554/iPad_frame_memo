let boardInputDatas = {
  id: 0,
  title: "",
  content: "",
  writer: ""
};

function addBoard() {
  const titleInput = document.querySelector('.main-article input:nth-of-type(1)');
  const contentInput = document.querySelector('.main-article textarea');
  const writerInput = document.querySelector('.main-article input:nth-of-type(2)');

  boardInputDatas.title = titleInput.value.trim();
  boardInputDatas.content = contentInput.value.trim();
  boardInputDatas.writer = writerInput.value.trim();

  let boardDatas = localStorage.getItem("boardDatas")
      ? JSON.parse(localStorage.getItem("boardDatas"))
      : [];

  boardInputDatas.id = boardDatas.length;
  boardDatas.push({ ...boardInputDatas });

  localStorage.setItem("boardDatas", JSON.stringify(boardDatas));

  location.href = './list.html';
}

const backButton = document.querySelector('.back-button');
if (backButton) {
  backButton.onclick = () => {
      location.href = './list.html';
  };
}
