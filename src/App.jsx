import { useState } from "react";
import TetoEgen from "./teto-egen";
import JoseonTest from "./joseon-test";

export default function App() {
  const [page, setPage] = useState("home");

  if (page === "teto") return <TetoEgen />;
  if (page === "joseon") return <JoseonTest />;

  return (
    <div style={{ minHeight: "100vh", background: "#0a0008", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "16px", padding: "40px 20px", fontFamily: "'Noto Serif KR', serif" }}>
      <p style={{ color: "#8a7a9a", fontSize: "0.8rem", letterSpacing: "0.2em", marginBottom: "8px" }}>✦ 테스트 모음 ✦</p>
      <h1 style={{ color: "#fff", fontSize: "1.8rem", fontWeight: 900, marginBottom: "24px", textAlign: "center" }}>나는 어떤 사람일까?</h1>

      <button onClick={() => setPage("teto")} style={{ width: "100%", maxWidth: "360px", padding: "20px 24px", background: "linear-gradient(135deg, #7c3aed, #a855f7)", border: "none", borderRadius: "16px", color: "#fff", fontFamily: "inherit", fontSize: "1rem", fontWeight: 700, cursor: "pointer", textAlign: "left", boxShadow: "0 8px 24px rgba(124,58,237,0.3)" }}>
        <div style={{ fontSize: "1.6rem", marginBottom: "6px" }}>🦊🐰</div>
        <div>테토-에겐 테스트</div>
        <div style={{ fontSize: "0.75rem", opacity: 0.7, marginTop: "3px", fontWeight: 400 }}>나는 이성형? 감성형?</div>
      </button>

      <button onClick={() => setPage("joseon")} style={{ width: "100%", maxWidth: "360px", padding: "20px 24px", background: "linear-gradient(135deg, #8b6914, #c8a96e)", border: "none", borderRadius: "16px", color: "#1a0d00", fontFamily: "inherit", fontSize: "1rem", fontWeight: 700, cursor: "pointer", textAlign: "left", boxShadow: "0 8px 24px rgba(200,169,110,0.25)" }}>
        <div style={{ fontSize: "1.6rem", marginBottom: "6px" }}>🏯</div>
        <div>조선시대 직업 테스트</div>
        <div style={{ fontSize: "0.75rem", opacity: 0.6, marginTop: "3px", fontWeight: 400 }}>내가 조선에 태어났다면?</div>
      </button>
    </div>
  );
}