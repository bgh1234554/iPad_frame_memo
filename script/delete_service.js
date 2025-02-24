function deleteMemo(id) {
  let boardDatas = localStorage.getItem("boardDatas")
      ? JSON.parse(localStorage.getItem("boardDatas"))
      : [];

  // 해당 id의 메모 제거
  boardDatas = boardDatas.filter(data => data.id !== id);

  // localStorage에 업데이트된 배열 저장
  localStorage.setItem("boardDatas", JSON.stringify(boardDatas));

  // 화면에서 해당 메모 삭제
  const memoElement = document.getElementById(`memo-${id}`);
  if (memoElement) {
      memoElement.remove();
  }
}
