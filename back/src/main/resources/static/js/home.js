document.addEventListener("DOMContentLoaded", async () => {
  // localStorage에서 사용자 정보 가져오기
  const userNickname = localStorage.getItem("nickname");
  
  // 세션 유효성 확인
  try {
    const res = await fetch("/check"); // 세션 확인용 백엔드 엔드포인트
    const result = await res.json();

    if (result.isLogin) {
      // 서버 세션이 유효할 때 → UI 갱신
      updateUI(userNickname);
    } else {
      // 세션 만료 → 로그인 페이지로 이동
      alert("로그인 세션이 만료되었습니다. 다시 로그인해주세요.");
      localStorage.removeItem("nickname");
      window.location.href = "/";
    }
  } catch (error) {
    console.error("세션 확인 중 오류:", error);
    alert("서버 오류가 발생했습니다.");
  }

  // 로그아웃 버튼 이벤트
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", async () => {
      try {
        const res = await fetch("/logout", { method: "POST" });
        const result = await res.json();

        if (result.msg === "logout success") {
          alert("로그아웃 되었습니다.");
          localStorage.removeItem("nickname");
          window.location.href = "/";
        } else {
          alert("로그아웃 실패");
        }
      } catch (err) {
        console.error("로그아웃 중 오류:", err);
      }
    });
  }
});

// UI 업데이트 함수
function updateUI(nickname) {
  const headerButtons = document.querySelector(".header-rightBtn");

  headerButtons.innerHTML = `
    <span class="welcome-text">안녕하세요, <b>${nickname}</b>님</span>
    <button class="logout-btn" id="logoutBtn">로그아웃</button>
  `;

  // 로그아웃 버튼 스타일 맞추기
  const style = document.createElement("style");
  style.textContent = `
    .welcome-text {
      margin-right: 15px;
      font-size: 17px;
      color: #fff;
    }
  `;
  document.head.appendChild(style);
}