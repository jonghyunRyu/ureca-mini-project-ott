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

document.addEventListener("DOMContentLoaded", async () => {
    const mainContent = document.getElementById('mainContent');
    const tabButtons = document.querySelectorAll('.tab-btn');
    const sortSelect = document.getElementById('sortSelect');

    const genreMap = {
        "series": "시리즈",
        "movie": "영화",
        "animation": "애니메이션"
    };

    const genreMapById = {
    1: '액션',
    2: '코미디',
    3: '드라마',
    4: '스릴러',
    5: '판타지',
    6: 'SF',
    7: '공포',
    8: '다큐멘터리',
    9: '애니메이션',
    10: '로맨스',
    11: '범죄',
    12: '미스터리'
    };

    let contents = [];
    let currentFilter = 'all';
    let currentSort = 'recommend';

    try {
        const res = await fetch("/getContents");
        if (!res.ok) throw new Error("컨텐츠 데이터를 불러오는 데 실패했습니다.");
        contents = await res.json();
    } catch (error) {
        console.error(error);
        mainContent.innerHTML = "<p style='color: red;'>컨텐츠를 불러오는데 실패했습니다.</p>";
        return;
    }

	function getSortedContents(data) {
	    const sorted = [...data]; // 원본 배열 복사

	    switch (currentSort) {
	        case 'rating':
	            sorted.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating)); // 내림차순
	            break;
	        case 'productYear':
	            sorted.sort((a, b) => parseInt(b.productionYear) - parseInt(a.productionYear)); // 내림차순
	            break;
	        case 'genre':
	            sorted.sort((a, b) => parseInt(a.genreId) - parseInt(b.genreId)); // 오름차순
	            break;
	    }

	    return sorted;
	}

    function renderContents(filterType = 'all') {
        mainContent.innerHTML = ''; // 초기화

        const grouped = {};
        contents.forEach(item => {
            if (filterType === 'all' || item.type === filterType) {
                if (!grouped[item.type]) grouped[item.type] = [];
                grouped[item.type].push(item);
            }
        });

        // 고정된 순서대로 렌더링
        const fixedOrder = ['series', 'movie', 'animation'];
        fixedOrder.forEach(type => {
            if (!grouped[type]) return;

            const section = document.createElement('section');
            section.className = 'genre-section';

            const h2 = document.createElement('h2');
            h2.textContent = genreMap[type];
            section.appendChild(h2);

            const contentList = document.createElement('div');
            contentList.className = 'content-list';

            const sortedItems = getSortedContents(grouped[type]);
            sortedItems.forEach(item => {
                const card = document.createElement('div');
                card.className = 'content-card';
                card.innerHTML = `
                <img src="${item.img}" alt="${item.title}">
                <h3>${item.title}</h3>
                <div class="card-meta">
                    <span class="genre">${genreMapById[item.genreId]}</span>
                    <span class="rating">${item.rating}</span>
                    <span class="year">${item.productionYear}</span>
                </div>
                <p>${item.description}</p>
                `;

                card.addEventListener('click', () => window.location.href = `/detail.html?id=${item.id}`);
                contentList.appendChild(card);
            });

            section.appendChild(contentList);
            mainContent.appendChild(section);
        });
    }

    // 초기 렌더링
    renderContents(currentFilter);

    // 탭 필터링
    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            tabButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const type = btn.dataset.type || 'all';
            currentFilter = type; // 필터 상태 저장
            renderContents(currentFilter);
        });
    });

    // 정렬 옵션 변경
    sortSelect.addEventListener('change', () => {
      currentSort = sortSelect.value;
      renderContents(currentFilter); // 현재 필터 기준으로 다시 렌더링
    });
});



