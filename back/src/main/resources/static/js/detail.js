document.addEventListener("DOMContentLoaded", async () => {
  const detailContainer = document.getElementById("detailContainer");
  const trailerFrame = document.getElementById("trailerFrame");
  const unmuteBtn = document.getElementById("unmuteBtn");

  const urlParams = new URLSearchParams(window.location.search);
  const contentId = urlParams.get("id");

  const genreMapById = {
    1: '액션', 2: '코미디', 3: '드라마', 4: '스릴러', 5: '판타지',
    6: 'SF', 7: '공포', 8: '다큐멘터리', 9: '애니메이션',
    10: '로맨스', 11: '범죄', 12: '미스터리'
  };

  try {
    const res = await fetch(`/contents/${contentId}`);
    const detail = await res.json();

    // 트레일러 자동재생 (음소거 상태)
    const embedUrl = `${detail.trailer_url}?autoplay=1&mute=1&controls=0&rel=0`;
    trailerFrame.src = embedUrl;
	
	let isMuted = true;
	
    // 소리 켜기 버튼
    unmuteBtn.addEventListener("click", () => {
	  isMuted = !isMuted; 
      const unmutedUrl = `${detail.trailer_url}?autoplay=1&mute=${isMuted ? 1 : 0}`;
      trailerFrame.src = unmutedUrl;
	  unmuteBtn.textContent = isMuted ? "🔊 소리 켜기" : "🔇 소리 끄기";
    });

    // 상세 정보 렌더링
    detailContainer.innerHTML = `
      <img src="${detail.img}" alt="포스터" class="poster-img" />
      <div class="text-info">
        <h1>${detail.title}</h1>
        <p>${detail.description}</p>
        <p><b>장르 :</b> ${genreMapById[detail.genreId]}</p>
        <p><b>평점 :</b> ${detail.rating}</p>
        <p><b>제작년도 :</b> ${detail.productionYear}</p>
      </div>
    `;
  } catch (error) {
    console.error("상세 정보 오류:", error);
    detailContainer.innerHTML = "<p style='color:red;'>상세 정보를 불러오지 못했습니다.</p>";
  }
});

document.getElementById("backHomeBtn").addEventListener("click", () => {
  window.location.href = "home.html"; // 홈 페이지 경로에 맞게 수정 가능
});