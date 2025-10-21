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