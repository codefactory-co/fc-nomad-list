// =============================================================================
// Nomad List - 도시 데이터 및 타입 정의
// =============================================================================
// 이 파일은 디지털 노마드를 위한 도시 정보, 대륙 정보, 정렬 옵션을 정의합니다.
// 모든 데이터는 TypeScript 타입으로 정의되어 타입 안전성을 보장합니다.
// =============================================================================

// =============================================================================
// 타입 정의 (Type Definitions)
// =============================================================================

// 대륙 정보를 정의하는 타입
export type Continent = {
    id: string                    // 대륙 고유 식별자 (URL 파라미터, 필터링 등에서 사용)
    name: string                  // 대륙 한국어 이름 (UI에 표시)
    emoji: string                 // 대륙을 나타내는 이모지 (UI에 표시)
    englishName: string           // 대륙 영어 이름 (SEO, 다국어 지원용)
}

// 도시 정보를 정의하는 타입
export type City = {
    id: string                    // 도시 고유 식별자 (URL, 데이터베이스 키, 상태 관리 등에서 사용)
    name: string                  // 도시 한국어 이름 (UI에 표시)
    country: string               // 국가명 (UI에 표시)
    continent: string             // 대륙 ID (continents 배열과 연결하여 필터링에 사용)
    coordinates: {                // 지리적 좌표 정보 (지도 표시, 날씨 API 등에 사용)
        lat: number               // 위도 (latitude) - 지도 표시, 날씨 API 등에 사용
        lng: number               // 경도 (longitude) - 지도 표시, 날씨 API 등에 사용
    }
    image: string                 // 도시 이미지 파일 경로 (public/city/ 폴더 내 이미지)
    overallScore: number          // 종합 점수 (1-5점, 추천 알고리즘에 사용)
    monthlyCostUsd: number        // 월 생활비 (USD, 정렬 및 필터링에 사용)
    internetSpeedMbps: number     // 인터넷 속도 (Mbps, 정렬 및 필터링에 사용)
    safetyLevel: string           // 안전도 레벨 (Excellent/Good/Fair, UI 표시용)
    safetyScore: number           // 안전도 점수 (0-100점, 정렬 및 필터링에 사용)
    currentWeather: {             // 현재 날씨 정보 (실시간 데이터 연동 가능)
        temperature: number        // 현재 온도 (°C)
        condition: string          // 날씨 상태 (sunny, cloudy, rainy 등)
    }
    airQualityIndex: number       // 대기질 지수 (0-100, 낮을수록 좋음)
    visaRequirement: string       // 비자 요구사항 (사용자 정보 제공용)
    popularityRank: number        // 인기도 순위 (낮을수록 인기, 정렬에 사용)
    isFavorite: boolean           // 즐겨찾기 여부 (사용자별 상태 저장용)
}

// 정렬 옵션을 정의하는 타입
export type SortOption = {
    id: string                    // 정렬 옵션 고유 식별자 (UI 상태 관리용)
    name: string                  // 정렬 옵션 표시 이름 (UI에 표시)
    key: keyof City | "recommended" // 정렬 기준 키 (City 타입의 속성 또는 "recommended")
    order: "asc" | "desc"        // 정렬 순서 (asc: 오름차순, desc: 내림차순)
}

// =============================================================================
// 대륙 데이터 (Continent Data)
// =============================================================================

// 전 세계 대륙 정보 배열
export const continents: Continent[] = [
    { id: "all", name: "전체", emoji: "🌍", englishName: "Global" },           // 전체 대륙 (필터링 초기값)
    { id: "north-america", name: "북미", emoji: "🌎", englishName: "North America" }, // 북아메리카
    { id: "south-america", name: "남미", emoji: "💃", englishName: "South America" }, // 남아메리카
    { id: "europe", name: "유럽", emoji: "🇪🇺", englishName: "Europe" },        // 유럽
    { id: "africa", name: "아프리카", emoji: "🌍", englishName: "Africa" },     // 아프리카
    { id: "middle-east", name: "중동", emoji: "🕌", englishName: "Middle East" }, // 중동
    { id: "asia", name: "아시아", emoji: "⛩️", englishName: "Asia" },          // 아시아
    { id: "oceania", name: "오세아니아", emoji: "🏄", englishName: "Oceania" }, // 오세아니아
]

// =============================================================================
// 정렬 옵션 데이터 (Sort Options Data)
// =============================================================================

// 도시 목록 정렬 옵션 배열
export const sortOptions: SortOption[] = [
    { id: "recommended", name: "추천순", key: "recommended", order: "desc" },           // 추천 알고리즘 기반 정렬
    { id: "cost-low", name: "생활비 낮은순", key: "monthlyCostUsd", order: "asc" },     // 생활비 낮은 도시부터
    { id: "cost-high", name: "생활비 높은순", key: "monthlyCostUsd", order: "desc" },   // 생활비 높은 도시부터
    { id: "internet-fast", name: "인터넷 속도 빠른순", key: "internetSpeedMbps", order: "desc" }, // 인터넷 빠른 도시부터
    { id: "safety-high", name: "안전도 높은순", key: "safetyScore", order: "desc" },    // 안전도 높은 도시부터
]

// =============================================================================
// 도시 데이터 (City Data)
// =============================================================================

// 샘플 도시 정보 배열 (실제 서비스에서는 API나 데이터베이스에서 가져옴)
export const sampleCities: City[] = [
    {
        id: "bangkok",                    // 도시 고유 식별자 (URL 등에서 사용)
        name: "방콕",                      // 도시 한국어 이름 (UI에 표시)
        country: "태국",                   // 국가명 (UI에 표시)
        continent: "asia",                 // 대륙 ID (continents 배열과 연결)
        coordinates: { lat: 13.7563, lng: 100.5018 }, // 위도, 경도 좌표 (지도 표시용)
        image: "/city/bangkok.jpg",       // 도시 이미지 파일 경로 (public/city/ 폴더)
        overallScore: 4.5,                // 종합 점수 (1-5점, 추천 알고리즘용)
        monthlyCostUsd: 1508,             // 월 생활비 (USD, 정렬 및 필터링용)
        internetSpeedMbps: 25,            // 인터넷 속도 (Mbps, 정렬 및 필터링용)
        safetyLevel: "Good",              // 안전도 레벨 (UI 표시용)
        safetyScore: 75,                  // 안전도 점수 (0-100점, 정렬 및 필터링용)
        currentWeather: { temperature: 33, condition: "sunny" }, // 현재 날씨 정보 (실시간 연동 가능)
        airQualityIndex: 34,              // 대기질 지수 (0-100, 낮을수록 좋음)
        visaRequirement: "Visa on arrival", // 비자 요구사항 (사용자 정보 제공)
        popularityRank: 1,                // 인기도 순위 (낮을수록 인기, 정렬용)
        isFavorite: false,                // 즐겨찾기 여부 (사용자별 상태)
    },
    {
        id: "lisbon",                     // 도시 고유 식별자
        name: "리스본",                    // 도시 한국어 이름
        country: "포르투갈",               // 국가명
        continent: "europe",              // 대륙 ID
        coordinates: { lat: 38.7223, lng: -9.1393 }, // 위도, 경도 좌표
        image: "/city/lisbon.jpg",        // 도시 이미지 파일 경로
        overallScore: 4.3,                // 종합 점수
        monthlyCostUsd: 2200,             // 월 생활비 (USD)
        internetSpeedMbps: 45,            // 인터넷 속도 (Mbps)
        safetyLevel: "Excellent",         // 안전도 레벨
        safetyScore: 95,                  // 안전도 점수
        currentWeather: { temperature: 22, condition: "partly-cloudy" }, // 현재 날씨
        airQualityIndex: 15,              // 대기질 지수
        visaRequirement: "EU passport",   // 비자 요구사항
        popularityRank: 2,                // 인기도 순위
        isFavorite: true,                 // 즐겨찾기 여부
    },
    {
        id: "mexico-city",                // 도시 고유 식별자
        name: "멕시코시티",                // 도시 한국어 이름
        country: "멕시코",                 // 국가명
        continent: "north-america",       // 대륙 ID
        coordinates: { lat: 19.4326, lng: -99.1332 }, // 위도, 경도 좌표
        image: "/city/mexico-city.jpg",   // 도시 이미지 파일 경로
        overallScore: 4.2,                // 종합 점수
        monthlyCostUsd: 1200,             // 월 생활비 (USD)
        internetSpeedMbps: 30,            // 인터넷 속도 (Mbps)
        safetyLevel: "Fair",              // 안전도 레벨
        safetyScore: 70,                  // 안전도 점수
        currentWeather: { temperature: 25, condition: "cloudy" }, // 현재 날씨
        airQualityIndex: 85,              // 대기질 지수
        visaRequirement: "Tourist visa",  // 비자 요구사항
        popularityRank: 5,                // 인기도 순위
        isFavorite: false,                // 즐겨찾기 여부
    },
    {
        id: "cape-town",                  // 도시 고유 식별자
        name: "케이프타운",                // 도시 한국어 이름
        country: "남아프리카공화국",        // 국가명
        continent: "africa",              // 대륙 ID
        coordinates: { lat: -33.9249, lng: 18.4241 }, // 위도, 경도 좌표
        image: "/city/cape-town.jpg",     // 도시 이미지 파일 경로
        overallScore: 4.1,                // 종합 점수
        monthlyCostUsd: 1800,             // 월 생활비 (USD)
        internetSpeedMbps: 20,            // 인터넷 속도 (Mbps)
        safetyLevel: "Fair",              // 안전도 레벨
        safetyScore: 55,                  // 안전도 점수
        currentWeather: { temperature: 18, condition: "sunny" }, // 현재 날씨
        airQualityIndex: 25,              // 대기질 지수
        visaRequirement: "Visa required", // 비자 요구사항
        popularityRank: 8,                // 인기도 순위
        isFavorite: false,                // 즐겨찾기 여부
    },
    {
        id: "buenos-aires",               // 도시 고유 식별자
        name: "부에노스아이레스",           // 도시 한국어 이름
        country: "아르헨티나",             // 국가명
        continent: "south-america",       // 대륙 ID
        coordinates: { lat: -34.6037, lng: -58.3816 }, // 위도, 경도 좌표
        image: "/city/buenos-aires.jpg",  // 도시 이미지 파일 경로
        overallScore: 4.0,                // 종합 점수
        monthlyCostUsd: 1400,             // 월 생활비 (USD)
        internetSpeedMbps: 35,            // 인터넷 속도 (Mbps)
        safetyLevel: "Good",              // 안전도 레벨
        safetyScore: 70,                  // 안전도 점수
        currentWeather: { temperature: 20, condition: "rainy" }, // 현재 날씨
        airQualityIndex: 45,              // 대기질 지수
        visaRequirement: "Tourist visa",  // 비자 요구사항
        popularityRank: 6,                // 인기도 순위
        isFavorite: false,                // 즐겨찾기 여부
    },
    {
        id: "dubai",                      // 도시 고유 식별자
        name: "두바이",                    // 도시 한국어 이름
        country: "아랍에미리트",            // 국가명
        continent: "middle-east",         // 대륙 ID
        coordinates: { lat: 25.2048, lng: 55.2708 }, // 위도, 경도 좌표
        image: "/city/dubai.jpg",         // 도시 이미지 파일 경로
        overallScore: 4.4,                // 종합 점수
        monthlyCostUsd: 3500,             // 월 생활비 (USD)
        internetSpeedMbps: 80,            // 인터넷 속도 (Mbps)
        safetyLevel: "Excellent",         // 안전도 레벨
        safetyScore: 90,                  // 안전도 점수
        currentWeather: { temperature: 35, condition: "sunny" }, // 현재 날씨
        airQualityIndex: 55,              // 대기질 지수
        visaRequirement: "Visa on arrival", // 비자 요구사항
        popularityRank: 3,                // 인기도 순위
        isFavorite: false,                // 즐겨찾기 여부
    },
    {
        id: "sydney",                     // 도시 고유 식별자
        name: "시드니",                    // 도시 한국어 이름
        country: "호주",                   // 국가명
        continent: "oceania",             // 대륙 ID
        coordinates: { lat: -33.8688, lng: 151.2093 }, // 위도, 경도 좌표
        image: "/city/sydney.jpg",        // 도시 이미지 파일 경로
        overallScore: 4.6,                // 종합 점수
        monthlyCostUsd: 5200,             // 월 생활비 (USD)
        internetSpeedMbps: 50,            // 인터넷 속도 (Mbps)
        safetyLevel: "Excellent",         // 안전도 레벨
        safetyScore: 92,                  // 안전도 점수
        currentWeather: { temperature: 24, condition: "sunny" }, // 현재 날씨
        airQualityIndex: 12,              // 대기질 지수
        visaRequirement: "Work visa",     // 비자 요구사항
        popularityRank: 4,                // 인기도 순위
        isFavorite: true,                 // 즐겨찾기 여부
    },
    {
        id: "bali",                       // 도시 고유 식별자
        name: "발리",                      // 도시 한국어 이름
        country: "인도네시아",             // 국가명
        continent: "asia",                // 대륙 ID
        coordinates: { lat: -8.3405, lng: 115.092 }, // 위도, 경도 좌표
        image: "/city/bali.jpg",          // 도시 이미지 파일 경로
        overallScore: 4.3,                // 종합 점수
        monthlyCostUsd: 1100,             // 월 생활비 (USD)
        internetSpeedMbps: 20,            // 인터넷 속도 (Mbps)
        safetyLevel: "Good",              // 안전도 레벨
        safetyScore: 78,                  // 안전도 점수
        currentWeather: { temperature: 30, condition: "partly-cloudy" }, // 현재 날씨
        airQualityIndex: 28,              // 대기질 지수
        visaRequirement: "Visa on arrival", // 비자 요구사항
        popularityRank: 7,                // 인기도 순위
        isFavorite: false,                // 즐겨찾기 여부
    },
    {
        id: "berlin",                     // 도시 고유 식별자
        name: "베를린",                    // 도시 한국어 이름
        country: "독일",                   // 국가명
        continent: "europe",              // 대륙 ID
        coordinates: { lat: 52.52, lng: 13.405 }, // 위도, 경도 좌표
        image: "/city/berlin.jpg",        // 도시 이미지 파일 경로
        overallScore: 4.4,                // 종합 점수
        monthlyCostUsd: 2800,             // 월 생활비 (USD)
        internetSpeedMbps: 60,            // 인터넷 속도 (Mbps)
        safetyLevel: "Excellent",         // 안전도 레벨
        safetyScore: 88,                  // 안전도 점수
        currentWeather: { temperature: 15, condition: "cloudy" }, // 현재 날씨
        airQualityIndex: 22,              // 대기질 지수
        visaRequirement: "EU passport",   // 비자 요구사항
        popularityRank: 9,                // 인기도 순위
        isFavorite: false,                // 즐겨찾기 여부
    },
    {
        id: "tokyo",                      // 도시 고유 식별자
        name: "도쿄",                      // 도시 한국어 이름
        country: "일본",                   // 국가명
        continent: "asia",                // 대륙 ID
        coordinates: { lat: 35.6762, lng: 139.6503 }, // 위도, 경도 좌표
        image: "/city/tokyo.jpg",         // 도시 이미지 파일 경로
        overallScore: 4.7,                // 종합 점수
        monthlyCostUsd: 3800,             // 월 생활비 (USD)
        internetSpeedMbps: 95,            // 인터넷 속도 (Mbps)
        safetyLevel: "Excellent",         // 안전도 레벨
        safetyScore: 98,                  // 안전도 점수
        currentWeather: { temperature: 28, condition: "partly-cloudy" }, // 현재 날씨
        airQualityIndex: 35,              // 대기질 지수
        visaRequirement: "Tourist visa",  // 비자 요구사항
        popularityRank: 10,               // 인기도 순위
        isFavorite: false,                // 즐겨찾기 여부
    },
]

// =============================================================================
// 파일 끝
// =============================================================================
