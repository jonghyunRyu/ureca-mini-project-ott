// 모달 열기
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.style.display = "flex";
}

// 모달 닫기
function closeModal(modalId, resetForm = false) {
  const modal = document.getElementById(modalId);
  if (modal) modal.style.display = "none";

  if (resetForm) {
    const form = modal.querySelector('form');
    if (form) form.reset();
  }
}

// 모달 외부 클릭 시 닫기
window.addEventListener('click', (e) => {
  const loginModal = document.getElementById('loginModal');
  const signupModal = document.getElementById('signupModal');
  if (e.target === loginModal) closeModal('loginModal', false);
  if (e.target === signupModal) closeModal('signupModal', false);
});


// 회원가입 클릭 시 서버로 데이터 전송
document.getElementById("modalSignupBtn").addEventListener("click", async (e) => {
  e.preventDefault();

  const form = document.getElementById("signupForm");
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  const { id, password, passwordConfirm, email, nickname } = data;
  
  const idRegex = /^[a-z][a-z0-9_]{4,19}$/;
  const pwRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const nicknameRegex = /^[가-힣a-zA-Z0-9_]{2,10}$/;
  
  // 유효성 검사
  if (!idRegex.test(id)) {
    alert("아이디 형식을 확인하세요");
    return;
  }

  if (!pwRegex.test(password)) {
    alert("비밀번호 형식을 확인하세요");
    return;
  }

  if (password !== passwordConfirm) {
    alert("비밀번호가 일치하지 않습니다");
    return;
  }

  if (!emailRegex.test(email)) {
    alert("이메일 형식을 확인하세요");
    return;
  }

  if (!nicknameRegex.test(nickname)) {
    alert("닉네임 형식을 확인하세요");
    return;
  }

  try {
    const res = await fetch("/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    const result = await res.json();

    if (result.msg === "success") {
      alert("회원가입 성공!");
      closeModal("signupModal");
      form.reset();
    } else {
      alert(`회원가입 실패: ${result.msg}`);
    }
  } catch (err) {
    console.error(err);
    alert("서버 오류 발생");
  }
});

// 로그인 시 서버로 데이터 전송
document.getElementById("modalLoginBtn").addEventListener("click", async (e) => {
  e.preventDefault();

  const id = document.getElementById("loginId").value;
  const password = document.getElementById("loginPw").value;

  const idRegex = /^[a-z][a-z0-9-]{4,19}$/;
  const pwRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;

  // 유효성 검사
  if (!idRegex.test(id)) {
    alert("아이디 형식을 확인하세요");
    return;
  }

  if (!pwRegex.test(password)) {
    alert("비밀번호 형식을 확인하세요");
    return;
  }

  try {
    const res = await fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, password })
    });

    const result = await res.json();
    const userNickname = result.user.nickname;
    if (result.msg === "success") {
      alert(`로그인 성공! 환영합니다 ${userNickname}님`);
      updateHeaderForLogin(userNickname);
      closeModal("loginModal");
    } else {
      alert("로그인 실패: 아이디 또는 비밀번호가 올바르지 않습니다.");
    }
  } catch (err) {
    console.error(err);
    alert("서버 오류 발생");
  }
});

// 로그인 상태 헤더 UI 전환
function updateHeaderForLogin(nickname) {
  const headerButtons = document.querySelector(".header-buttons");
  headerButtons.innerHTML = `
    <span class="welcome-text">안녕하세요, <b>${nickname}</b>님</span>
    <button class="logout-btn" onclick="logout()">로그아웃</button>
  `;
}

// 로그아웃 버튼 클릭 시 서버로 요청
async function logout() {
  try {
    const res = await fetch("/logout", { method: "POST" });
    if (res.ok) {
      updateHeaderForLogout(); // UI 초기화
      alert("로그아웃 되었습니다.");
    } else {
      alert("로그아웃 실패. 다시 시도해주세요.");
    }
  } catch (err) {
    console.error("로그아웃 요청 실패:", err);
    alert("서버 오류가 발생했습니다.");
  }
}

// 로그아웃 시 헤더 UI 전환
function updateHeaderForLogout() {
  const headerButtons = document.querySelector(".header-buttons");
  headerButtons.innerHTML = `
    <button class="signup-btn" id="signupBtn" onclick="openModal('signupModal')">회원가입</button>
    <button class="login-btn" id="loginBtn" onclick="openModal('loginModal')">로그인</button>
  `;
}