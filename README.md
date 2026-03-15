# 🎬 Mini OTT Web Platform

OTT 스트리밍 서비스를 모티브로 한 웹 플랫폼입니다.  
회원가입/로그인부터 콘텐츠 탐색, 상세 정보 확인까지 웹 서비스의 전체 흐름을 구현한 풀스택 프로젝트입니다.

## 주요 기능

- 회원가입 (아이디/이메일 중복 검사, 프론트엔드 + 백엔드 유효성 검증)
- 로그인 / 로그아웃 (세션 기반 인증)
- 비밀번호 SHA-256 + Salt 해시 암호화
- 콘텐츠 목록 조회 (시리즈 / 영화 / 애니메이션 탭 필터링)
- 평점순, 제작 연도순, 장르순 정렬
- 콘텐츠 상세 페이지 (트레일러 자동재생, 줄거리, 평점 등)

## 기술 스택

| 구분 | 기술 |
|------|------|
| Frontend | HTML, CSS, JavaScript (Vanilla) |
| Backend | Java 17, Spring Boot 3.5 |
| ORM | MyBatis |
| Database | MySQL (H2 지원) |
| Build | Maven |
| 기타 | Lombok, Spring DevTools |

## 프로젝트 구조

```
back/
├── src/main/java/com/ureca/web/
│   ├── controller/
│   │   ├── ContentController.java   # 콘텐츠 API
│   │   ├── LoginController.java     # 로그인/로그아웃/세션 확인
│   │   └── MemberController.java    # 회원가입
│   ├── model/
│   │   ├── dao/                     # MyBatis Mapper 인터페이스
│   │   ├── dto/                     # Content, Member, SaltInfo
│   │   ├── service/                 # 비즈니스 로직
│   │   └── UplusException.java      # 커스텀 예외
│   └── util/
│       └── OpenCrypt.java           # SHA-256, AES 암호화 유틸
├── src/main/resources/
│   ├── mapper/                      # MyBatis XML 매퍼
│   ├── static/                      # 프론트엔드 (HTML, CSS, JS, 이미지)
│   └── application.properties       # 환경 설정
└── pom.xml
```

## 실행 방법

### 1. 사전 준비

- Java 17+
- MySQL
- Maven

### 2. 데이터베이스 설정

MySQL에 `user`, `contents`, `saltInfo` 테이블을 생성합니다.

### 3. 환경 변수 설정

다음 환경 변수를 설정하거나 `application.properties`에 직접 입력합니다:

```
DB_DRIVER=com.mysql.cj.jdbc.Driver
DB_URL=jdbc:mysql://localhost:3306/{데이터베이스명}
DB_USER={사용자명}
DB_PW={비밀번호}
```

### 4. 빌드 및 실행

```bash
cd back
./mvnw spring-boot:run
```

브라우저에서 `http://localhost:8080` 으로 접속합니다.

## 화면 구성

| 페이지 | 설명 |
|--------|------|
| `index.html` | 랜딩 페이지 (로그인/회원가입 모달) |
| `home.html` | 콘텐츠 목록 (탭 필터링, 정렬) |
| `detail.html` | 콘텐츠 상세 (트레일러, 정보) |

## API 엔드포인트

| Method | URL | 설명 |
|--------|-----|------|
| POST | `/signup` | 회원가입 |
| POST | `/login` | 로그인 |
| POST | `/logout` | 로그아웃 |
| GET | `/check` | 세션 유효성 확인 |
| GET | `/getContents` | 전체 콘텐츠 목록 |
| GET | `/contents/{id}` | 콘텐츠 상세 조회 |
