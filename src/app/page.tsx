"use client";

import { useEffect, useState } from "react";
import type { Product } from "@/lib/products";
import { buildProductCsv, downloadCsv } from "@/lib/csv";

const BANNED_KEYWORDS_KEY = "bannedKeywords";
const LAST_RESULT_KEY = "lastSearchResult";

export default function Home() {
  const [category, setCategory] = useState("");
  const [products, setProducts] = useState<Product[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [bannedKeywords, setBannedKeywords] = useState<string[]>([]);
  const [newKeyword, setNewKeyword] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem(BANNED_KEYWORDS_KEY);
    if (saved) setBannedKeywords(JSON.parse(saved));

    const lastResult = localStorage.getItem(LAST_RESULT_KEY);
    if (lastResult) {
      const parsed = JSON.parse(lastResult);
      setCategory(parsed.category);
      setProducts(parsed.products);
    }
  }, []);

  function addKeyword() {
    const keyword = newKeyword.trim();
    if (!keyword || bannedKeywords.includes(keyword)) return;
    const updated = [...bannedKeywords, keyword];
    setBannedKeywords(updated);
    localStorage.setItem(BANNED_KEYWORDS_KEY, JSON.stringify(updated));
    setNewKeyword("");
  }

  function removeKeyword(keyword: string) {
    const updated = bannedKeywords.filter((k) => k !== keyword);
    setBannedKeywords(updated);
    localStorage.setItem(BANNED_KEYWORDS_KEY, JSON.stringify(updated));
  }

  async function handleSearch() {
    if (!category.trim()) {
      setError("카테고리를 입력해주세요.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category, bannedKeywords }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "검색 중 오류가 발생했습니다.");
        setProducts(null);
        return;
      }
      setProducts(data.products);
      localStorage.setItem(
        LAST_RESULT_KEY,
        JSON.stringify({ category, products: data.products })
      );
    } catch {
      setError("검색 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <main className="mx-auto max-w-4xl px-6 py-12">
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
          마켓 베스트 상품 소싱
        </h1>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          카테고리를 입력하면 네이버 베스트 상품을 찾아드립니다.
        </p>

        <div className="mt-6 flex gap-2">
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="예: 여성 가방"
            className="flex-1 rounded-md border border-zinc-300 px-4 py-2 text-sm outline-none focus:border-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
          />
          <button
            onClick={handleSearch}
            disabled={loading}
            className="rounded-md bg-zinc-900 px-5 py-2 text-sm font-medium text-white disabled:opacity-50 dark:bg-zinc-50 dark:text-zinc-900"
          >
            {loading ? "찾는 중..." : "베스트 상품 찾기"}
          </button>
        </div>

        {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

        <div className="mt-6 rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
          <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
            금지 상품 키워드
          </p>
          <div className="mt-2 flex gap-2">
            <input
              type="text"
              value={newKeyword}
              onChange={(e) => setNewKeyword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addKeyword()}
              placeholder="예: 짝퉁, 의약품"
              className="flex-1 rounded-md border border-zinc-300 px-3 py-1.5 text-sm outline-none focus:border-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
            />
            <button
              onClick={addKeyword}
              className="rounded-md border border-zinc-300 px-3 py-1.5 text-sm font-medium text-zinc-900 dark:border-zinc-700 dark:text-zinc-50"
            >
              추가
            </button>
          </div>
          {bannedKeywords.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {bannedKeywords.map((keyword) => (
                <span
                  key={keyword}
                  className="flex items-center gap-1 rounded-full bg-zinc-100 px-3 py-1 text-xs text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
                >
                  {keyword}
                  <button
                    onClick={() => removeKeyword(keyword)}
                    className="text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-50"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {products && (
          <div className="mt-8 flex items-center justify-between">
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              {products.length}개 상품
            </p>
            <button
              onClick={() =>
                downloadCsv(
                  `${category}_베스트상품.csv`,
                  buildProductCsv(products)
                )
              }
              className="rounded-md border border-zinc-300 px-4 py-1.5 text-sm font-medium text-zinc-900 dark:border-zinc-700 dark:text-zinc-50"
            >
              엑셀 다운로드
            </button>
          </div>
        )}

        {products && (
          <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {products.map((p, i) => (
              <div
                key={i}
                className="relative rounded-lg border border-zinc-200 p-3 dark:border-zinc-800"
              >
                <span className="absolute left-4 top-4 z-10 flex h-6 min-w-6 items-center justify-center rounded-full bg-zinc-900 px-1.5 text-xs font-semibold text-white dark:bg-zinc-50 dark:text-zinc-900">
                  {i + 1}
                </span>
                <img
                  src={p.image}
                  alt={p.title}
                  className="mb-2 aspect-square w-full rounded-md object-cover"
                />
                <p className="line-clamp-2 text-sm text-zinc-900 dark:text-zinc-50">
                  {p.title}
                </p>
                <p className="mt-1 text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                  {p.lprice.toLocaleString()}원
                </p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  {p.mallName}
                </p>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
