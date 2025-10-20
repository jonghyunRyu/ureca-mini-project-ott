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