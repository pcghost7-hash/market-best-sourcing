import type { Product } from "./products";

type NaverShoppingItem = {
  title: string;
  link: string;
  image: string;
  lprice: string;
  mallName: string;
};

function stripHtml(text: string): string {
  return text
    .replace(/<\/?b>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

export async function fetchNaverShoppingProducts(
  category: string
): Promise<Product[]> {
  const clientId = process.env.NAVER_CLIENT_ID;
  const clientSecret = process.env.NAVER_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error("NAVER_API_KEY_MISSING");
  }

  const url = `https://openapi.naver.com/v1/search/shop.json?query=${encodeURIComponent(
    category
  )}&display=20&sort=sim`;

  const res = await fetch(url, {
    headers: {
      "X-Naver-Client-Id": clientId,
      "X-Naver-Client-Secret": clientSecret,
    },
  });

  if (!res.ok) {
    throw new Error(`NAVER_API_ERROR_${res.status}`);
  }

  const data: { items: NaverShoppingItem[] } = await res.json();

  return data.items.map((item) => ({
    title: stripHtml(item.title),
    image: item.image,
    lprice: Number(item.lprice),
    mallName: item.mallName,
    link: item.link,
  }));
}
