import Link from "next/link";

const STEPS = [
  {
    title: "1. 카테고리 입력",
    desc: "'여성 가방'처럼 찾고 싶은 상품 카테고리만 입력하세요.",
  },
  {
    title: "2. 자동 검색 · 금지상품 제외",
    desc: "네이버 베스트 상품을 검색하고, 미리 등록한 금지 키워드는 자동으로 제외합니다.",
  },
  {
    title: "3. 엑셀로 바로 다운로드",
    desc: "상품명·가격·판매처가 정리된 엑셀(CSV) 파일을 즉시 받습니다.",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <header className="mx-auto flex max-w-4xl items-center justify-between px-6 py-6">
        <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
          마켓 베스트 상품 소싱 AI
        </span>
        <Link
          href="/app"
          className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white dark:bg-zinc-50 dark:text-zinc-900"
        >
          무료로 체험하기
        </Link>
      </header>

      <main className="mx-auto max-w-4xl px-6">
        {/* 히어로 */}
        <section className="py-16 text-center">
          <h1 className="text-3xl font-bold text-zinc-900 sm:text-4xl dark:text-zinc-50">
            매일 3시간 걸리던 베스트 상품 정리,
            <br />
            이제 몇 초면 끝납니다
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-zinc-600 dark:text-zinc-400">
            구매대행 사업자·마켓 셀러를 위한 상품 소싱 도구. 카테고리만
            입력하면 금지 상품을 제외한 베스트 상품을 엑셀로 정리해드립니다.
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <Link
              href="/app"
              className="rounded-md bg-zinc-900 px-6 py-3 text-sm font-medium text-white dark:bg-zinc-50 dark:text-zinc-900"
            >
              무료로 체험하기
            </Link>
            <a
              href="#price"
              className="rounded-md border border-zinc-300 px-6 py-3 text-sm font-medium text-zinc-900 dark:border-zinc-700 dark:text-zinc-50"
            >
              가격 보기
            </a>
          </div>
        </section>

        {/* 문제 제기 */}
        <section className="rounded-2xl border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-950">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
            이런 고민, 익숙하지 않으세요?
          </h2>
          <ul className="mt-4 space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
            <li>· 베스트 상품을 매일 손으로 찾고 엑셀에 옮겨 적는다</li>
            <li>· 금지 상품(짝퉁, 의약품 등)을 하나하나 걸러내야 한다</li>
            <li>· 상품명·가격·판매처 정리에만 하루 3시간 이상 쓴다</li>
          </ul>
        </section>

        {/* 해결 과정 3단계 */}
        <section className="py-16">
          <h2 className="text-center text-xl font-semibold text-zinc-900 dark:text-zinc-50">
            이렇게 해결합니다
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {STEPS.map((step) => (
              <div
                key={step.title}
                className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950"
              >
                <p className="font-medium text-zinc-900 dark:text-zinc-50">
                  {step.title}
                </p>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 가격 */}
        <section id="price" className="py-16">
          <h2 className="text-center text-xl font-semibold text-zinc-900 dark:text-zinc-50">
            가격
          </h2>
          <div className="mx-auto mt-8 max-w-sm rounded-2xl border border-zinc-200 bg-white p-8 text-center dark:border-zinc-800 dark:bg-zinc-950">
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              구매대행·마켓 셀러 플랜
            </p>
            <p className="mt-2 text-3xl font-bold text-zinc-900 dark:text-zinc-50">
              문의 후 안내
            </p>
            <ul className="mt-4 space-y-1 text-sm text-zinc-600 dark:text-zinc-400">
              <li>베스트 상품 검색 무제한</li>
              <li>금지 키워드 등록</li>
              <li>엑셀 다운로드</li>
            </ul>
            <a
              href="#"
              className="mt-6 block rounded-md bg-zinc-900 px-6 py-3 text-sm font-medium text-white dark:bg-zinc-50 dark:text-zinc-900"
            >
              결제하기
            </a>
            <p className="mt-2 text-xs text-zinc-400 dark:text-zinc-600">
              (실제 결제 링크는 준비되는 대로 연결 예정입니다)
            </p>
          </div>
        </section>
      </main>

      <footer className="mx-auto max-w-4xl px-6 py-10 text-center text-xs text-zinc-400 dark:text-zinc-600">
        © 2026 마켓 베스트 상품 소싱 AI
      </footer>
    </div>
  );
}
