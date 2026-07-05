export type Product = {
  title: string;
  image: string;
  lprice: number;
  mallName: string;
  link: string;
};

const MALLS = ["쿠팡", "홈앤쇼핑", "이지스토어", "베스트샵", "위메프", "지마켓"];

// 네이버 쇼핑 검색 API 응답 형태(title/image/lprice/mallName)를 흉내낸 샘플 데이터.
// 실제 API 키가 준비되면 이 함수를 fetch 호출로 교체한다.
export function getMockProducts(category: string): Product[] {
  const trimmed = category.trim();
  if (!trimmed) return [];

  return Array.from({ length: 12 }, (_, i) => {
    const rank = i + 1;
    return {
      title: `${trimmed} 베스트 ${rank}위 상품`,
      image: `https://placehold.co/200x200?text=${encodeURIComponent(trimmed)}+${rank}`,
      lprice: 9900 + rank * 1500,
      mallName: MALLS[i % MALLS.length],
      link: "#",
    };
  });
}
