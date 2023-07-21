/* 頁面 - 會員資訊查詢 */

export const metadata = {
  title: "會員資訊查詢",
  description: "...",
};

export default function User({ params }) {
  const { id } = params;
  return (
    <main>
      <p>user id test page</p>
      <p>user: {id}</p>
    </main>
  );
}
