import { useState } from "react";
import Saju from "./saju-ai";
import TetoEgen from "./teto-egen";

export default function App() {
  const [page, setPage] = useState("home");

  if (page === "saju") return <Saju />;
  if (page === "teto") return <TetoEgen />;

  return (
    <div style={{ minHeight: "100vh", background: "#0a0612", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "20px" }}>
      <h1 style={{ color: "#fff", fontFamily: "serif", fontSize: "2rem" }}>🔮 테스트 모음</h1>
      <button onClick={() => setPage("saju")} style={{ padding: "16px 40px", background: "linear-gradient(135deg, #f5c842, #ff8c42)", border: "none", borderRadius: "12px", color: "#1a0c30", fontSize: "1rem", fontWeight: 700, cursor: "pointer" }}>
        사주 보기
      </button>
      <button onClick={() => setPage("teto")} style={{ padding: "16px 40px", background: "linear-gradient(135deg, #7c3aed, #a855f7)", border: "none", borderRadius: "12px", color: "#fff", fontSize: "1rem", fontWeight: 700, cursor: "pointer" }}>
        테토-에겐 테스트
      </button>
    </div>
  );
}