import { useState } from "react";

const HEAVENLY_STEMS = ["갑(甲)", "을(乙)", "병(丙)", "정(丁)", "무(戊)", "기(己)", "경(庚)", "신(辛)", "임(壬)", "계(癸)"];
const EARTHLY_BRANCHES = ["자(子)", "축(丑)", "인(寅)", "묘(卯)", "진(辰)", "사(巳)", "오(午)", "미(未)", "신(申)", "유(酉)", "술(戌)", "해(亥)"];
const ZODIAC = ["쥐", "소", "호랑이", "토끼", "용", "뱀", "말", "양", "원숭이", "닭", "개", "돼지"];

function getZodiac(year) {
  return ZODIAC[(year - 4) % 12];
}

function getStem(year) {
  return HEAVENLY_STEMS[(year - 4) % 10];
}

function getBranch(year) {
  return EARTHLY_BRANCHES[(year - 4) % 12];
}

const HOUR_BRANCHES = [
  { label: "모름", value: "모름" },
  { label: "자시 (23:00~01:00)", value: "자시" },
  { label: "축시 (01:00~03:00)", value: "축시" },
  { label: "인시 (03:00~05:00)", value: "인시" },
  { label: "묘시 (05:00~07:00)", value: "묘시" },
  { label: "진시 (07:00~09:00)", value: "진시" },
  { label: "사시 (09:00~11:00)", value: "사시" },
  { label: "오시 (11:00~13:00)", value: "오시" },
  { label: "미시 (13:00~15:00)", value: "미시" },
  { label: "신시 (15:00~17:00)", value: "신시" },
  { label: "유시 (17:00~19:00)", value: "유시" },
  { label: "술시 (19:00~21:00)", value: "술시" },
  { label: "해시 (21:00~23:00)", value: "해시" },
];

const particlePositions = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  top: `${Math.random() * 100}%`,
  delay: `${Math.random() * 5}s`,
  duration: `${3 + Math.random() * 4}s`,
  size: `${2 + Math.random() * 4}px`,
}));

export default function SajuApp() {
  const [step, setStep] = useState("intro"); // intro | form | loading | result
  const [form, setForm] = useState({ name: "", year: "", month: "", day: "", hour: "모름", gender: "여성" });
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!form.name || !form.year || !form.month || !form.day) {
      setError("이름, 생년월일을 모두 입력해주세요.");
      return;
    }
    setError("");
    setStep("loading");

    const zodiac = getZodiac(parseInt(form.year));
    const stem = getStem(parseInt(form.year));
    const branch = getBranch(parseInt(form.year));

    const prompt = `당신은 수십 년 경력의 사주명리학 전문가입니다. 아래 정보를 바탕으로 사주풀이를 해주세요.

이름: ${form.name}
성별: ${form.gender}
생년월일: ${form.year}년 ${form.month}월 ${form.day}일
태어난 시: ${form.hour}
띠: ${zodiac}띠
연주(年柱): ${stem}${branch}

다음 항목을 각각 풀이해주세요. 각 항목은 2~3문장으로 구체적이고 따뜻하게 작성해주세요:

## ✨ 전체 운세 요약
## 💼 직업 & 재물운
## ❤️ 연애 & 결혼운
## 🌿 건강운
## 🔮 2025년 운세
## 💡 이 사주의 핵심 조언

마지막에 한 줄 사자성어와 그 의미로 마무리해주세요.`;

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [{ role: "user", content: prompt }],
        }),
      });
      const data = await response.json();
      const text = data.content?.map((c) => c.text || "").join("\n") || "결과를 가져오지 못했습니다.";
      setResult(text);
      setStep("result");
    } catch (e) {
      setError("오류가 발생했습니다. 다시 시도해주세요.");
      setStep("form");
    }
  };

  const renderMarkdown = (text) => {
    return text
      .split("\n")
      .map((line, i) => {
        if (line.startsWith("## ")) {
          return (
            <h3 key={i} style={{ color: "#f5c842", fontFamily: "'Noto Serif KR', serif", fontSize: "1.05rem", marginTop: "1.4rem", marginBottom: "0.4rem", letterSpacing: "0.02em" }}>
              {line.replace("## ", "")}
            </h3>
          );
        }
        if (line.trim() === "") return <br key={i} />;
        return (
          <p key={i} style={{ color: "#e8dfc8", lineHeight: 1.8, fontSize: "0.92rem", margin: "0.1rem 0" }}>
            {line}
          </p>
        );
      });
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0a0612", fontFamily: "'Noto Sans KR', sans-serif", position: "relative", overflow: "hidden" }}>
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@400;700;900&family=Noto+Sans+KR:wght@300;400;500&display=swap');
        @keyframes float { 0%,100%{transform:translateY(0) scale(1);opacity:0.4} 50%{transform:translateY(-18px) scale(1.2);opacity:0.9} }
        @keyframes spin-slow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes spin-rev { from{transform:rotate(360deg)} to{transform:rotate(0deg)} }
        @keyframes shimmer { 0%{background-position:-200% center} 100%{background-position:200% center} }
        @keyframes pulse-glow { 0%,100%{box-shadow:0 0 20px rgba(245,200,66,0.3)} 50%{box-shadow:0 0 50px rgba(245,200,66,0.7),0 0 80px rgba(200,100,255,0.3)} }
        @keyframes fade-in { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        @keyframes orbit { from{transform:rotate(0deg) translateX(60px) rotate(0deg)} to{transform:rotate(360deg) translateX(60px) rotate(-360deg)} }
        input, select { background:#1a1030 !important; color:#e8dfc8 !important; border:1px solid rgba(245,200,66,0.3) !important; border-radius:10px !important; padding:12px 16px !important; width:100% !important; box-sizing:border-box !important; font-family:inherit !important; font-size:0.95rem !important; outline:none !important; transition:border 0.2s; }
        input:focus, select:focus { border:1px solid rgba(245,200,66,0.8) !important; }
        input::placeholder { color:#6a5a80 !important; }
        select option { background:#1a1030; }
        ::-webkit-scrollbar { width:6px; } ::-webkit-scrollbar-track { background:#0a0612; } ::-webkit-scrollbar-thumb { background:#3a2860; border-radius:3px; }
      `}</style>

      {/* Floating particles */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
        {particlePositions.map((p) => (
          <div key={p.id} style={{ position: "absolute", left: p.left, top: p.top, width: p.size, height: p.size, borderRadius: "50%", background: "radial-gradient(circle, #f5c842, #c864ff)", animation: `float ${p.duration} ${p.delay} infinite ease-in-out`, opacity: 0.5 }} />
        ))}
        <div style={{ position: "absolute", top: "-200px", right: "-200px", width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(circle, rgba(200,100,255,0.08), transparent 70%)" }} />
        <div style={{ position: "absolute", bottom: "-200px", left: "-200px", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle, rgba(245,200,66,0.06), transparent 70%)" }} />
      </div>

      <div style={{ position: "relative", zIndex: 1, maxWidth: "480px", margin: "0 auto", padding: "0 20px 60px" }}>

        {/* INTRO */}
        {step === "intro" && (
          <div style={{ animation: "fade-in 0.8s ease both", textAlign: "center", paddingTop: "60px" }}>
            {/* Ornament */}
            <div style={{ position: "relative", width: "140px", height: "140px", margin: "0 auto 32px" }}>
              <div style={{ position: "absolute", inset: 0, border: "1.5px solid rgba(245,200,66,0.4)", borderRadius: "50%", animation: "spin-slow 20s linear infinite" }} />
              <div style={{ position: "absolute", inset: "14px", border: "1px solid rgba(200,100,255,0.3)", borderRadius: "50%", animation: "spin-rev 15s linear infinite" }} />
              <div style={{ position: "absolute", inset: "28px", background: "radial-gradient(circle, #2a1a50, #1a0c30)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2.8rem" }}>
                ☯
              </div>
              {["✦", "◈", "✧", "◇"].map((s, i) => (
                <div key={i} style={{ position: "absolute", top: "50%", left: "50%", fontSize: "0.7rem", color: "#f5c842", animation: `orbit ${4 + i}s ${i * 0.5}s linear infinite`, transformOrigin: "0 0" }}>{s}</div>
              ))}
            </div>

            <p style={{ color: "#c864ff", fontSize: "0.75rem", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: "12px" }}>AI 사주명리</p>
            <h1 style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "2.4rem", fontWeight: 900, color: "#fff", lineHeight: 1.2, marginBottom: "8px" }}>
              당신의 운명을<br />
              <span style={{ background: "linear-gradient(90deg, #f5c842, #ff8c42, #c864ff)", backgroundSize: "200%", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", animation: "shimmer 3s linear infinite" }}>읽어드립니다</span>
            </h1>
            <p style={{ color: "#8a7a9a", fontSize: "0.9rem", lineHeight: 1.7, marginBottom: "40px" }}>
              생년월일 하나로<br />AI가 당신의 사주를 풀어드려요
            </p>

            <div style={{ background: "linear-gradient(135deg, rgba(245,200,66,0.08), rgba(200,100,255,0.08))", border: "1px solid rgba(245,200,66,0.2)", borderRadius: "16px", padding: "20px", marginBottom: "32px", textAlign: "left" }}>
              {[["✦", "연애·결혼운"], ["✦", "직업·재물운"], ["✦", "건강운"], ["✦", "2025년 운세"]].map(([icon, text]) => (
                <div key={text} style={{ display: "flex", gap: "10px", marginBottom: "10px", alignItems: "center" }}>
                  <span style={{ color: "#f5c842", fontSize: "0.7rem" }}>{icon}</span>
                  <span style={{ color: "#c8b8e8", fontSize: "0.88rem" }}>{text}</span>
                </div>
              ))}
            </div>

            <button onClick={() => setStep("form")} style={{ width: "100%", padding: "16px", background: "linear-gradient(135deg, #f5c842, #ff8c42)", border: "none", borderRadius: "12px", color: "#1a0c30", fontFamily: "'Noto Serif KR', serif", fontSize: "1.1rem", fontWeight: 700, cursor: "pointer", animation: "pulse-glow 2s ease-in-out infinite", letterSpacing: "0.05em" }}>
              무료로 사주 보기 →
            </button>
            <p style={{ color: "#4a3a6a", fontSize: "0.75rem", marginTop: "12px" }}>AI가 생성한 콘텐츠입니다 · 재미로 즐겨주세요</p>
          </div>
        )}

        {/* FORM */}
        {step === "form" && (
          <div style={{ animation: "fade-in 0.5s ease both", paddingTop: "48px" }}>
            <button onClick={() => setStep("intro")} style={{ background: "none", border: "none", color: "#6a5a80", cursor: "pointer", fontSize: "0.85rem", marginBottom: "24px", padding: 0 }}>← 돌아가기</button>
            <h2 style={{ fontFamily: "'Noto Serif KR', serif", color: "#f5c842", fontSize: "1.6rem", fontWeight: 700, marginBottom: "6px" }}>생년월일 입력</h2>
            <p style={{ color: "#6a5a80", fontSize: "0.85rem", marginBottom: "32px" }}>정확할수록 풀이가 정밀해요</p>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label style={{ color: "#c8b8e8", fontSize: "0.8rem", marginBottom: "6px", display: "block" }}>이름</label>
                <input placeholder="이름을 입력하세요" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
              </div>
              <div>
                <label style={{ color: "#c8b8e8", fontSize: "0.8rem", marginBottom: "6px", display: "block" }}>성별</label>
                <select value={form.gender} onChange={e => setForm({ ...form, gender: e.target.value })}>
                  <option>여성</option>
                  <option>남성</option>
                </select>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px" }}>
                <div>
                  <label style={{ color: "#c8b8e8", fontSize: "0.8rem", marginBottom: "6px", display: "block" }}>년</label>
                  <input placeholder="1995" value={form.year} onChange={e => setForm({ ...form, year: e.target.value })} type="number" />
                </div>
                <div>
                  <label style={{ color: "#c8b8e8", fontSize: "0.8rem", marginBottom: "6px", display: "block" }}>월</label>
                  <input placeholder="08" value={form.month} onChange={e => setForm({ ...form, month: e.target.value })} type="number" />
                </div>
                <div>
                  <label style={{ color: "#c8b8e8", fontSize: "0.8rem", marginBottom: "6px", display: "block" }}>일</label>
                  <input placeholder="15" value={form.day} onChange={e => setForm({ ...form, day: e.target.value })} type="number" />
                </div>
              </div>
              <div>
                <label style={{ color: "#c8b8e8", fontSize: "0.8rem", marginBottom: "6px", display: "block" }}>태어난 시간 (선택)</label>
                <select value={form.hour} onChange={e => setForm({ ...form, hour: e.target.value })}>
                  {HOUR_BRANCHES.map(h => <option key={h.value} value={h.value}>{h.label}</option>)}
                </select>
              </div>
            </div>

            {error && <p style={{ color: "#ff6b6b", fontSize: "0.85rem", marginTop: "12px" }}>{error}</p>}

            {form.year && (
              <div style={{ marginTop: "20px", background: "rgba(245,200,66,0.06)", border: "1px solid rgba(245,200,66,0.15)", borderRadius: "12px", padding: "14px 16px" }}>
                <p style={{ color: "#f5c842", fontSize: "0.82rem", margin: 0 }}>
                  {getZodiac(parseInt(form.year))}띠 · {getStem(parseInt(form.year))}{getBranch(parseInt(form.year))}년
                </p>
              </div>
            )}

            <button onClick={handleSubmit} style={{ width: "100%", marginTop: "28px", padding: "16px", background: "linear-gradient(135deg, #c864ff, #6a30ff)", border: "none", borderRadius: "12px", color: "#fff", fontFamily: "'Noto Serif KR', serif", fontSize: "1.05rem", fontWeight: 700, cursor: "pointer", letterSpacing: "0.05em" }}>
              🔮 사주 풀어보기
            </button>
          </div>
        )}

        {/* LOADING */}
        {step === "loading" && (
          <div style={{ textAlign: "center", paddingTop: "120px", animation: "fade-in 0.5s ease both" }}>
            <div style={{ position: "relative", width: "100px", height: "100px", margin: "0 auto 32px" }}>
              <div style={{ position: "absolute", inset: 0, border: "2px solid transparent", borderTopColor: "#f5c842", borderRadius: "50%", animation: "spin-slow 1s linear infinite" }} />
              <div style={{ position: "absolute", inset: "14px", border: "1.5px solid transparent", borderTopColor: "#c864ff", borderRadius: "50%", animation: "spin-rev 1.5s linear infinite" }} />
              <div style={{ position: "absolute", inset: "28px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.8rem" }}>☯</div>
            </div>
            <h3 style={{ fontFamily: "'Noto Serif KR', serif", color: "#f5c842", fontSize: "1.2rem", marginBottom: "8px" }}>사주를 읽는 중...</h3>
            <p style={{ color: "#6a5a80", fontSize: "0.85rem" }}>천간지지를 분석하고 있어요</p>
          </div>
        )}

        {/* RESULT */}
        {step === "result" && (
          <div style={{ animation: "fade-in 0.6s ease both", paddingTop: "40px" }}>
            <div style={{ textAlign: "center", marginBottom: "28px" }}>
              <p style={{ color: "#c864ff", fontSize: "0.75rem", letterSpacing: "0.2em", marginBottom: "6px" }}>✦ 사주 풀이 완료 ✦</p>
              <h2 style={{ fontFamily: "'Noto Serif KR', serif", color: "#fff", fontSize: "1.6rem", fontWeight: 700 }}>
                {form.name}님의 사주
              </h2>
              <p style={{ color: "#6a5a80", fontSize: "0.82rem", marginTop: "4px" }}>
                {form.year}.{form.month}.{form.day} · {getZodiac(parseInt(form.year))}띠 · {getStem(parseInt(form.year))}{getBranch(parseInt(form.year))}년
              </p>
            </div>

            <div style={{ background: "linear-gradient(160deg, rgba(26,16,48,0.95), rgba(15,8,30,0.98))", border: "1px solid rgba(245,200,66,0.2)", borderRadius: "20px", padding: "24px 20px", backdropFilter: "blur(10px)" }}>
              {renderMarkdown(result)}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginTop: "20px" }}>
              <button onClick={() => { setStep("form"); setResult(""); }} style={{ padding: "13px", background: "rgba(245,200,66,0.1)", border: "1px solid rgba(245,200,66,0.3)", borderRadius: "10px", color: "#f5c842", fontSize: "0.85rem", cursor: "pointer", fontFamily: "inherit" }}>
                다시 보기
              </button>
              <button onClick={() => { setStep("intro"); setForm({ name: "", year: "", month: "", day: "", hour: "모름", gender: "여성" }); setResult(""); }} style={{ padding: "13px", background: "rgba(200,100,255,0.1)", border: "1px solid rgba(200,100,255,0.3)", borderRadius: "10px", color: "#c864ff", fontSize: "0.85rem", cursor: "pointer", fontFamily: "inherit" }}>
                처음으로
              </button>
            </div>
            <p style={{ color: "#3a2860", fontSize: "0.72rem", textAlign: "center", marginTop: "16px" }}>AI가 생성한 콘텐츠입니다 · 재미로 즐겨주세요</p>
          </div>
        )}
      </div>
    </div>
  );
}
