# 📝 **iPad 스타일 메모 앱 프로젝트**  

![memo-app](https://img.shields.io/badge/상태-완료-brightgreen) ![version](https://img.shields.io/badge/버전-1.0-blue)  

---

## 📋 **목차**
- [📱 개요](#-개요)  
- [💡 프로젝트 핵심](#-프로젝트-핵심)  
- [📦 주요 기능](#-주요-기능)  
- [💻 코드 비교 및 차이점](#-코드-비교-및-차이점)  
- [📚 배운 점](#-배운-점)  
- [🚀 설치 및 실행](#-설치-및-실행)  
- [📜 회고](#-회고)  

---

## 📱 **개요**
이 프로젝트는 **iPad 스타일의 메모 앱**으로, 사용자는 메모의 **제목, 내용, 작성자**를 입력하고 `localStorage`에 저장할 수 있습니다.  
메모는 리스트 화면에서 확인할 수 있으며, 클릭 시 상세 페이지(article.html)로 이동합니다. iPhone 메모 앱과 달리 삭제 버튼이 생성되었습니다.

- **구성 파일:**  
  - **HTML:** `list.html`, `article.html`, **`index.html`** 
  - **CSS:** `reset.css`, `ipad_frame.css`, `list_header.css`, `border_list.css`, `article_header.css`, `main_article.css`  
  - **JavaScript:** `clock.js`, `list_service.js`, `article_service.js`, **`delete_service.js`**

---

## 💡 **프로젝트 핵심**

| 🗂 **주요 차이점** | ✅ **설명** |
|-----------------|---------------------------------------------|
| **1. 데이터 저장 방식** | 문자열 배열 대신 **객체 배열**을 사용 (예: `{id, title, content, writer}`) |
| **2. localStorage 적용** | `localStorage.setItem()`과 `JSON.stringify()`를 사용해 객체 배열 저장 |
| **3. localStorage 불러오기** | `localStorage.getItem()`과 `JSON.parse()`를 통해 객체 배열 복원 |
| **4. .map() 사용** | 배열의 각 요소를 `<li>` 태그로 변환하여 화면에 출력 |
| **5. Template Literals** | 백틱(``` ` ```)과 `${}`를 사용해 더 가독성 좋은 코드 작성 |

---

## 📦 **주요 기능**
✅ **메모 작성:** 제목, 내용, 작성자를 입력 후 localStorage에 저장  
✅ **메모 목록 보기:** 리스트 화면에서 모든 메모를 볼 수 있음  
✅ **메모 상세 보기:** 클릭 시 해당 메모의 내용을 상세 페이지에서 확인  
✅ **시간 표시:** iPad 스타일의 헤더에 실시간 시간 표시 (시, 분)  
✅ **페이지 이동:** `location.href`를 통해 페이지 간 이동  

---

## 💻 **코드 비교 및 차이점**

### **1. `ipad_frame.css`를 통한 UI 변경**
#### 🗂 **이전 프로젝트 (`iphone_frame.css`)** 
```css
#root {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

.container {
  position: relative;
  box-sizing: border-box;
  border: 4px solid #afafaf;
  border-radius: 45px;
  width: 402px;
  height: 874px;
  box-shadow: 0px 0px 2px 5px #000000 inset;
  overflow: hidden;
}

.phone-header {
  position: absolute;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 60px;
}
```
#### 🗂 **현재 프로젝트 (`ipad_frame.css`)** 
```css
.ipad-frame {
  width: 80vw;  /* Use 80% of the viewport width */
  max-width: 1400px;  /* Limit the maximum width for better readability */
  aspect-ratio: 4 / 3;  /* Maintain the iPad Pro 13-inch aspect ratio */
  border: 15px solid black;
  border-radius: 30px;
  position: relative;
  margin: 50px auto;
  overflow: hidden;
  background: #f5f5f5;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.15);

  /* Font from iPhone Memo App */
  font-family: 'SF Pro Display', Arial, sans-serif; /* iPhone Memo font applied */
}
//후략
```
**✅ 차이점:**  
- iphone_frame.css에서 ipad_frame.css로 바뀌면서 메모가 표시되는 전체적인 UI가 변화했다.
---

### **2. `list_service.js`를 통한 삭제 버튼 추가**
#### 🗂 기존 `boardList.innerHTML`
```js
  boardList.innerHTML = boardDatas.map(data => `
    <li class="board-box">
      <header class="board-header">
        <h1>${data.title}(${data.writer})</h1>
      </header>
      <main class="board-main">
        <pre>${data.content}</pre>
      </main>
    </li>
    `).join("");
```
#### 🗂 개선 `boardList.innerHTML`
```js
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
```
**✅ 차이점:**  
- 글의 제목, 작성자, 내용을 한 div에 몰어넣고, 삭제 버튼을 추가하였다.
- 후에 살펴볼 `deleteMemo()`를 통해 localStorage에서 글을 삭제할 수 있다.
---
### **3. 게시글 삭제 기능**
```js
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
```
**✅ 설명:**  
- `boardDatas`변수에 localStorage에서 가져온 데이터를 저장한다.
- `filter` 메서드에 조건문을 넣어 인수로 받은 id를 제외한 데이터로 boardDatas 변수를 변경한다.
- `setItem` 메서드로 실제 localStorage에 변경 내역을 반영한다.
---
## 📚 **배운 점**
### ✅ **주요 학습 내용**
- **localStorage의 데이터 삭제:**  
  - localStorage의 데이터를 불러와 filter 함수로 삭제하고 싶은 내용을 조건문을 통해 삭제한다.
  - localStorage의 setItem 메서드를 통해 localStorage를 업데이트 한다.
---

### 📌 **향후 개선 사항**
- **반응형 디자인:** 모바일과 데스크탑 모두에서 보기 좋도록 **CSS 개선**  
- **Vue.js 또는 React 적용:** 더 복잡한 프로젝트를 위해 **프레임워크** 도입 고려  
- **TypeScript 사용:** 정적 타입 검사를 제공하는 TypeScript를 JavaScript 대신에 사용하면, 코드의 안정성과 오류를 줄이는 데 도움을 줄 수 있다.
---

## 🚀 **설치 및 실행**
```bash
# 1. 레포지토리 클론
git clone https://github.com/bgh1234554/iPad_frame_memo.git

# 2. 프로젝트 폴더로 이동
cd iPad_frame_memo

# 3. list.html 파일을 브라우저로 열어서 실행
# VSCode의 라이브 서버 플러그인이 있으면 더 도움이 됩니다.
```

---

## 📜 **회고**
📱 **iPad Frame:** 외부에서 가져온 CSS로 디자인 구현  
💾 **localStorage:** 간단하면서도 효과적인 데이터 저장 및 불러오기 방식  
💡 **학습 과정:** 외부에서 가져온 CSS를 기존에 이미 완성된 코드에 덮어씌워 통합하는 과정을 거치고, localStorage에 저장된 데이터를 삭제하는 과정을 배움.

---

## 🤝 **기여 방법**
기여를 원하시면 **이슈**를 등록하거나 **풀 리퀘스트(PR)** 를 제출해 주세요.  
도움이 되셨다면 **GitHub 저장소에 ⭐️ 스타를 눌러주세요!**  

---