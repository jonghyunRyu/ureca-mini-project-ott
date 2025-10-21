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

  try {
    const res = await fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, password })
    });

    const result = await res.json();
    if (result.msg === "success") {
      alert(`로그인 성공! 환영합니다 ${result.user.nickname}님`);
      closeModal("loginModal");
    } else {
      alert("로그인 실패: 아이디 또는 비밀번호가 올바르지 않습니다.");
    }
  } catch (err) {
    console.error(err);
    alert("서버 오류 발생");
  }
});