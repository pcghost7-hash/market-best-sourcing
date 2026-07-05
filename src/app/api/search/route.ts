import { NextRequest, NextResponse } from "next/server";
import { getMockProducts } from "@/lib/products";
import { fetchNaverShoppingProducts } from "@/lib/naverShopping";

export async function POST(req: NextRequest) {
  const { category, bannedKeywords } = await req.json();

  if (typeof category !== "string" || !category.trim()) {
    return NextResponse.json({ error: "카테고리를 입력해주세요." }, { status: 400 });
  }

  let products;
  try {
    products = await fetchNaverShoppingProducts(category);
  } catch (e) {
    if (e instanceof Error && e.message === "NAVER_API_KEY_MISSING") {
      products = getMockProducts(category);
    } else {
      return NextResponse.json(
        { error: "네이버 쇼핑 API 호출 중 오류가 발생했습니다." },
        { status: 502 }
      );
    }
  }

  const banned: string[] = Array.isArray(bannedKeywords) ? bannedKeywords : [];
  const filtered = products.filter(
    (p) => !banned.some((keyword) => p.title.includes(keyword))
  );

  return NextResponse.json({ products: filtered });
}
