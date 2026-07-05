import type { Product } from "./products";

function escapeCsvCell(value: string): string {
  return `"${value.replace(/"/g, '""')}"`;
}

export function buildProductCsv(products: Product[]): string {
  const deduped = Array.from(
    new Map(products.map((p) => [p.title, p])).values()
  ).sort((a, b) => a.lprice - b.lprice);

  const rows = [
    ["상품명", "가격", "판매처"],
    ...deduped.map((p) => [p.title, String(p.lprice), p.mallName]),
  ];

  const csvBody = rows.map((row) => row.map(escapeCsvCell).join(",")).join("\r\n");
  return "﻿" + csvBody; // UTF-8 BOM: 엑셀에서 한글이 깨지지 않도록
}

export function downloadCsv(filename: string, csvContent: string) {
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}
