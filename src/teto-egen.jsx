import { useState } from "react";

// ── 질문 데이터 ──────────────────────────────────────────────
const QUESTIONS = [
  {
    id: 1,
    text: "친구가 갑자기 연락이 끊겼다. 나는?",
    a: { text: "먼저 연락해서 무슨 일인지 물어본다", type: "T" },
    b: { text: "혹시 내가 뭔가 잘못한 건지 계속 신경 쓰인다", type: "E" },
  },
  {
    id: 2,
    text: "단체 채팅방에서 내 의견이 무시당했을 때",
    a: { text: "다시 한번 논리적으로 설명한다", type: "T" },
    b: { text: "기분이 상하고 조용해진다", type: "E" },
  },
  {
    id: 3,
    text: "여행 계획을 짤 때 나는",
    a: { text: "일정·교통·숙소 먼저 딱 잡아야 안심된다", type: "T" },
    b: { text: "느낌 가는 대로 즉흥적으로 다니는 게 좋다", type: "E" },
  },
  {
    id: 4,
    text: "좋아하는 사람에게 먼저 고백하는 편인가요?",
    a: { text: "분위기 봐서 타이밍 맞으면 한다", type: "T" },
    b: { text: "상대가 어떻게 생각할지 너무 신경 쓰여서 못 한다", type: "E" },
  },
  {
    id: 5,
    text: "친구가 나한테 고민을 털어놨을 때",
    a: { text: "해결책을 바로 제시해준다", type: "T" },
    b: { text: "일단 공감하고 같이 속상해한다", type: "E" },
  },
  {
    id: 6,
    text: "SNS에 사진을 올릴 때",
    a: { text: "좋아요·댓글 반응이 은근 신경 쓰인다", type: "E" },
    b: { text: "그냥 내 기록용이라 반응은 별로 안 궁금하다", type: "T" },
  },
  {
    id: 7,
    text: "갈등 상황에서 나는",
    a: { text: "바로 얘기해서 해결하려 한다", type: "T" },
    b: { text: "분위기 나빠질까봐 참고 넘어간다", type: "E" },
  },
  {
    id: 8,
    text: "칭찬을 받았을 때 나의 반응은?",
    a: { text: "고맙다고 하고 쿨하게 넘긴다", type: "T" },
    b: { text: "너무 기뻐서 하루종일 기억한다", type: "E" },
  },
  {
    id: 9,
    text: "처음 보는 사람이 많은 자리에서 나는",
    a: { text: "먼저 말 걸고 분위기를 푼다", type: "T" },
    b: { text: "아는 사람 옆에 붙어 있는다", type: "E" },
  },
  {
    id: 10,
    text: "연인이 서운하다고 할 때",
    a: { text: "왜 서운한지 이유를 물어보고 해결한다", type: "T" },
    b: { text: "내가 뭘 잘못했나 바로 미안해진다", type: "E" },
  },
  {
    id: 11,
    text: "혼자 있는 주말이 생겼다면?",
    a: { text: "혼자만의 시간이 너무 좋다 — 완전 힐링", type: "T" },
    b: { text: "누구라도 불러서 같이 뭔가 하고 싶다", type: "E" },
  },
  {
    id: 12,
    text: "내가 실수를 했을 때",
    a: { text: "원인을 분석하고 다음엔 어떻게 할지 생각한다", type: "T" },
    b: { text: "한동안 자책하고 계속 머릿속에 맴돈다", type: "E" },
  },
];

// ── 결과 정의 ────────────────────────────────────────────────
const RESULTS = {
  TT: {
    type: "테토남 / 테토녀",
    emoji: "🦊",
    gradient: "linear-gradient(135deg, #ff6b35, #f7c59f)",
    color: "#ff6b35",
    bg: "#fff8f4",
    badge: "T형 테토",
    summary: "논리적이고 독립적인 여우형 인간",
    desc: "감정보다 이성이 앞서는 타입이에요. 쿨하고 자기 주관이 뚜렷하며, 혼자서도 잘 놀고 어디서든 적응을 잘 해요. 다가가기 어려워 보이지만 친해지면 진짜 편한 친구예요.",
    good: ["✦ 자기 관리 최강", "✦ 감정에 휘둘리지 않음", "✦ 독립적·주체적"],
    bad: ["△ 차갑게 보일 수 있음", "△ 공감이 부족해 보이기도 함"],
    match: "에겐녀 / 에겐남",
    matchEmoji: "🐰",
    celebrities: ["뉴진스 하니", "BTS 슈가", "아이유"],
  },
  EE: {
    type: "에겐남 / 에겐녀",
    emoji: "🐰",
    gradient: "linear-gradient(135deg, #a78bfa, #f0abfc)",
    color: "#8b5cf6",
    bg: "#faf5ff",
    badge: "E형 에겐",
    summary: "감성 풍부하고 눈치 빠른 토끼형 인간",
    desc: "공감 능력이 탁월하고 분위기를 잘 읽어요. 타인의 감정에 민감하고 상처도 잘 받지만, 그만큼 따뜻하고 사람을 끌어당기는 매력이 있어요. 주변에 팬이 많은 유형이에요.",
    good: ["✦ 공감 능력 최상", "✦ 분위기 메이커", "✦ 사랑받는 타입"],
    bad: ["△ 남 눈치를 너무 봄", "△ 감정 기복이 있을 수 있음"],
    match: "테토남 / 테토녀",
    matchEmoji: "🦊",
    celebrities: ["카리나", "차은우", "아이유"],
  },
  TE: {
    type: "테토-에겐 혼합형",
    emoji: "🦝",
    gradient: "linear-gradient(135deg, #34d399, #60a5fa)",
    color: "#10b981",
    bg: "#f0fdf4",
    badge: "균형형",
    summary: "이성과 감성을 자유롭게 오가는 너구리형",
    desc: "상황에 따라 논리적으로도, 감성적으로도 유연하게 대처해요. 어느 한쪽으로 치우치지 않아 다양한 사람과 잘 어울리고, 갈등 조율 능력도 뛰어나요. 진짜 희귀한 타입이에요.",
    good: ["✦ 상황 적응력 최강", "✦ 누구와도 잘 맞음", "✦ 갈등 해결사"],
    bad: ["△ 내가 뭘 원하는지 가끔 모를 수 있음", "△ 중간자 역할에 지칠 수 있음"],
    match: "누구와도 잘 맞아요",
    matchEmoji: "🌈",
    celebrities: ["다양한 유형 모두"],
  },
  ET: {
    type: "에겐-테토 혼합형",
    emoji: "🦝",
    gradient: "linear-gradient(135deg, #f472b6, #fbbf24)",
    color: "#ec4899",
    bg: "#fdf4ff",
    badge: "반전형",
    summary: "겉은 감성, 속은 이성인 반전 너구리형",
    desc: "처음엔 감수성 넘치고 공감을 잘 해주는 것처럼 보이지만, 사실 내면은 꽤 논리적이에요. 감정도 있고 이성도 있어서 사람들이 당신을 예측하기 어렵다고 해요. 그게 매력 포인트!",
    good: ["✦ 반전 매력 보유자", "✦ 감성+이성 밸런스", "✦ 신비로운 분위기"],
    bad: ["△ 가끔 내 마음도 내가 몰라", "△ 양면성에 피로감 올 수 있음"],
    match: "누구와도 잘 맞아요",
    matchEmoji: "🌈",
    celebrities: ["다양한 유형 모두"],
  },
};

function getResult(answers) {
  const tCount = answers.filter((a) => a === "T").length;
  const eCount = answers.filter((a) => a === "E").length;
  const ratio = tCount / answers.length;
  if (ratio >= 0.65) return "TT";
  if (ratio <= 0.35) return "EE";
  if (ratio >= 0.5) return "TE";
  return "ET";
}

// ── 파티클 ───────────────────────────────────────────────────
const PARTICLES = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  left: `${5 + Math.random() * 90}%`,
  top: `${5 + Math.random() * 90}%`,
  delay: `${Math.random() * 4}s`,
  dur: `${3 + Math.random() * 3}s`,
  char: ["✦", "◇", "✧", "◈", "⋆"][i % 5],
}));

export default function TetoEgen() {
  const [step, setStep] = useState("intro"); // intro | quiz | result
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);
  const [selected, setSelected] = useState(null);
  const [copied, setCopied] = useState(false);
  const [animating, setAnimating] = useState(false);

  const progress = (current / QUESTIONS.length) * 100;

  const handleAnswer = (type) => {
    if (animating) return;
    setSelected(type);
    setAnimating(true);
    setTimeout(() => {
      const newAnswers = [...answers, type];
      if (current + 1 >= QUESTIONS.length) {
        const key = getResult(newAnswers);
        setResult(RESULTS[key]);
        setStep("result");
      } else {
        setCurrent(current + 1);
        setAnswers(newAnswers);
        setSelected(null);
      }
      setAnimating(false);
    }, 380);
  };

  const handleShare = async () => {
    const text = `나는 ${result.badge} — ${result.type} ${result.emoji}\n"${result.summary}"\n\n너도 테토-에겐 테스트 해봐! 👇`;
    if (navigator.share) {
      try { await navigator.share({ title: "테토-에겐 테스트", text }); } catch {}
    } else {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const restart = () => {
    setStep("intro"); setCurrent(0); setAnswers([]); setResult(null); setSelected(null);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#fafaf8", fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif", position: "relative", overflow: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Gowun+Batang:wght@400;700&family=Noto+Sans+KR:wght@300;400;500;700&display=swap');
        @keyframes floatUp { 0%,100%{transform:translateY(0);opacity:.3} 50%{transform:translateY(-12px);opacity:.8} }
        @keyframes fadeSlideUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fadeSlideDown { from{opacity:0;transform:translateY(-20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes popIn { 0%{transform:scale(.8);opacity:0} 70%{transform:scale(1.05)} 100%{transform:scale(1);opacity:1} }
        @keyframes shimmer { 0%{background-position:-200% center} 100%{background-position:200% center} }
        @keyframes barFill { from{width:0} to{width:var(--w)} }
        .q-card { animation: fadeSlideUp .4s ease both; }
        .r-card { animation: popIn .5s cubic-bezier(.34,1.56,.64,1) both; }
        .opt-btn { transition: transform .15s, box-shadow .15s, background .15s; cursor:pointer; border:2px solid transparent; }
        .opt-btn:hover { transform:translateY(-2px); }
        .opt-btn:active { transform:scale(.97); }
      `}</style>

      {/* BG decoration */}
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, pointerEvents: "none", zIndex: 0 }}>
        {PARTICLES.map(p => (
          <div key={p.id} style={{ position: "absolute", left: p.left, top: p.top, fontSize: "0.65rem", color: "#d4c5f9", animation: `floatUp ${p.dur} ${p.delay} infinite ease-in-out` }}>{p.char}</div>
        ))}
        <div style={{ position: "absolute", top: "-100px", right: "-100px", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle, rgba(167,139,250,0.08), transparent 70%)" }} />
        <div style={{ position: "absolute", bottom: "-120px", left: "-80px", width: "350px", height: "350px", borderRadius: "50%", background: "radial-gradient(circle, rgba(251,191,36,0.07), transparent 70%)" }} />
      </div>

      <div style={{ position: "relative", zIndex: 1, maxWidth: "440px", margin: "0 auto", padding: "0 20px 80px" }}>

        {/* ── INTRO ── */}
        {step === "intro" && (
          <div style={{ animation: "fadeSlideUp .6s ease both", textAlign: "center", paddingTop: "64px" }}>
            <div style={{ display: "inline-block", background: "linear-gradient(135deg, #f3f0ff, #fef3f2)", border: "1px solid #e9d8fd", borderRadius: "20px", padding: "8px 18px", fontSize: "0.75rem", color: "#7c3aed", letterSpacing: "0.1em", marginBottom: "24px", fontWeight: 600 }}>
              2024 최신 유행 · 테토-에겐 유형 검사
            </div>

            <div style={{ fontSize: "5rem", marginBottom: "16px", lineHeight: 1 }}>🦊🐰</div>

            <h1 style={{ fontFamily: "'Gowun Batang', serif", fontSize: "2rem", fontWeight: 700, color: "#1a1a2e", lineHeight: 1.3, marginBottom: "12px" }}>
              나는 테토일까,<br />에겐일까?
            </h1>
            <p style={{ color: "#6b7280", fontSize: "0.9rem", lineHeight: 1.7, marginBottom: "8px" }}>
              요즘 MZ세대 사이에서 난리난 유형 테스트
            </p>
            <p style={{ color: "#9ca3af", fontSize: "0.8rem", marginBottom: "36px" }}>12문항 · 약 2분 소요</p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "32px", textAlign: "left" }}>
              {[
                { emoji: "🦊", title: "테토형", desc: "이성적·독립적·쿨한 여우" },
                { emoji: "🐰", title: "에겐형", desc: "감성적·공감형·따뜻한 토끼" },
              ].map(card => (
                <div key={card.title} style={{ background: "#fff", border: "1.5px solid #f0ebff", borderRadius: "16px", padding: "16px", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
                  <div style={{ fontSize: "1.8rem", marginBottom: "6px" }}>{card.emoji}</div>
                  <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "#1a1a2e", marginBottom: "4px" }}>{card.title}</div>
                  <div style={{ fontSize: "0.78rem", color: "#9ca3af" }}>{card.desc}</div>
                </div>
              ))}
            </div>

            <button onClick={() => setStep("quiz")} style={{ width: "100%", padding: "17px", background: "linear-gradient(135deg, #7c3aed, #a855f7)", border: "none", borderRadius: "14px", color: "#fff", fontFamily: "inherit", fontSize: "1rem", fontWeight: 700, cursor: "pointer", boxShadow: "0 8px 24px rgba(124,58,237,0.35)", letterSpacing: "0.03em" }}>
              테스트 시작하기 →
            </button>
            <p style={{ color: "#d1d5db", fontSize: "0.72rem", marginTop: "12px" }}>재미로 즐기는 콘텐츠예요 😊</p>
          </div>
        )}

        {/* ── QUIZ ── */}
        {step === "quiz" && (
          <div style={{ paddingTop: "40px" }}>
            {/* 진행 바 */}
            <div style={{ marginBottom: "32px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                <span style={{ fontSize: "0.75rem", color: "#9ca3af" }}>질문 {current + 1} / {QUESTIONS.length}</span>
                <span style={{ fontSize: "0.75rem", color: "#7c3aed", fontWeight: 600 }}>{Math.round(progress)}%</span>
              </div>
              <div style={{ height: "6px", background: "#f3f0ff", borderRadius: "999px", overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${progress}%`, background: "linear-gradient(90deg, #7c3aed, #a855f7)", borderRadius: "999px", transition: "width .4s ease" }} />
              </div>
            </div>

            {/* 질문 카드 */}
            <div key={current} className="q-card" style={{ background: "#fff", borderRadius: "24px", padding: "28px 24px", boxShadow: "0 4px 24px rgba(0,0,0,0.07)", marginBottom: "20px", border: "1.5px solid #f5f0ff" }}>
              <div style={{ fontSize: "0.72rem", color: "#a78bfa", letterSpacing: "0.1em", fontWeight: 600, marginBottom: "12px" }}>Q{current + 1}.</div>
              <p style={{ fontFamily: "'Gowun Batang', serif", fontSize: "1.15rem", color: "#1a1a2e", lineHeight: 1.6, margin: 0, fontWeight: 700 }}>
                {QUESTIONS[current].text}
              </p>
            </div>

            {/* 선택지 */}
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {[
                { key: "a", data: QUESTIONS[current].a },
                { key: "b", data: QUESTIONS[current].b },
              ].map(({ key, data }) => (
                <button
                  key={`${current}-${key}`}
                  className="opt-btn"
                  onClick={() => handleAnswer(data.type)}
                  style={{
                    padding: "18px 20px",
                    background: selected === data.type ? "linear-gradient(135deg, #7c3aed, #a855f7)" : "#fff",
                    border: selected === data.type ? "2px solid transparent" : "2px solid #f0ebff",
                    borderRadius: "14px",
                    color: selected === data.type ? "#fff" : "#374151",
                    fontFamily: "inherit",
                    fontSize: "0.92rem",
                    lineHeight: 1.5,
                    textAlign: "left",
                    boxShadow: selected === data.type ? "0 6px 20px rgba(124,58,237,0.3)" : "0 2px 8px rgba(0,0,0,0.04)",
                    fontWeight: selected === data.type ? 600 : 400,
                  }}
                >
                  <span style={{ marginRight: "10px", opacity: 0.5, fontSize: "0.8rem" }}>{key === "a" ? "A" : "B"}</span>
                  {data.text}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── RESULT ── */}
        {step === "result" && result && (
          <div style={{ paddingTop: "40px" }}>
            <div className="r-card" style={{ background: result.bg, borderRadius: "28px", padding: "32px 24px", textAlign: "center", border: `2px solid ${result.color}22`, boxShadow: `0 8px 40px ${result.color}18`, marginBottom: "20px" }}>
              <div style={{ fontSize: "0.72rem", color: result.color, letterSpacing: "0.12em", fontWeight: 700, marginBottom: "8px" }}>결과 발표 ✦</div>
              <div style={{ fontSize: "4rem", marginBottom: "12px" }}>{result.emoji}</div>
              <div style={{ display: "inline-block", background: result.gradient, borderRadius: "999px", padding: "5px 16px", fontSize: "0.75rem", color: "#fff", fontWeight: 700, marginBottom: "14px", letterSpacing: "0.05em" }}>
                {result.badge}
              </div>
              <h2 style={{ fontFamily: "'Gowun Batang', serif", fontSize: "1.5rem", fontWeight: 700, color: "#1a1a2e", marginBottom: "6px" }}>
                {result.type}
              </h2>
              <p style={{ color: result.color, fontWeight: 600, fontSize: "0.9rem", marginBottom: "16px" }}>{result.summary}</p>
              <p style={{ color: "#4b5563", fontSize: "0.87rem", lineHeight: 1.8, textAlign: "left" }}>{result.desc}</p>
            </div>

            {/* 장단점 */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "16px" }}>
              <div style={{ background: "#fff", borderRadius: "16px", padding: "16px", border: "1.5px solid #dcfce7" }}>
                <div style={{ fontSize: "0.72rem", color: "#16a34a", fontWeight: 700, marginBottom: "8px" }}>장점</div>
                {result.good.map((g, i) => <div key={i} style={{ fontSize: "0.78rem", color: "#374151", marginBottom: "5px", lineHeight: 1.4 }}>{g}</div>)}
              </div>
              <div style={{ background: "#fff", borderRadius: "16px", padding: "16px", border: "1.5px solid #fee2e2" }}>
                <div style={{ fontSize: "0.72rem", color: "#dc2626", fontWeight: 700, marginBottom: "8px" }}>주의점</div>
                {result.bad.map((b, i) => <div key={i} style={{ fontSize: "0.78rem", color: "#374151", marginBottom: "5px", lineHeight: 1.4 }}>{b}</div>)}
              </div>
            </div>

            {/* 궁합 */}
            <div style={{ background: "#fff", borderRadius: "16px", padding: "16px 20px", border: "1.5px solid #f0ebff", marginBottom: "20px", display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{ fontSize: "1.6rem" }}>{result.matchEmoji}</div>
              <div>
                <div style={{ fontSize: "0.72rem", color: "#7c3aed", fontWeight: 700, marginBottom: "2px" }}>최고 궁합</div>
                <div style={{ fontSize: "0.88rem", color: "#1a1a2e", fontWeight: 600 }}>{result.match}</div>
              </div>
            </div>

            {/* 공유 버튼 */}
            <button onClick={handleShare} style={{ width: "100%", padding: "16px", background: copied ? "#16a34a" : `linear-gradient(135deg, ${result.color}, #a855f7)`, border: "none", borderRadius: "14px", color: "#fff", fontFamily: "inherit", fontSize: "1rem", fontWeight: 700, cursor: "pointer", boxShadow: `0 8px 24px ${result.color}33`, marginBottom: "12px", transition: "background .3s", letterSpacing: "0.03em" }}>
              {copied ? "✓ 복사됐어요!" : "📤 결과 공유하기"}
            </button>

            <button onClick={restart} style={{ width: "100%", padding: "14px", background: "transparent", border: "2px solid #e5e7eb", borderRadius: "14px", color: "#6b7280", fontFamily: "inherit", fontSize: "0.9rem", cursor: "pointer" }}>
              다시 테스트하기
            </button>

            <p style={{ color: "#d1d5db", fontSize: "0.72rem", textAlign: "center", marginTop: "16px" }}>재미로 즐기는 콘텐츠예요 😊</p>
          </div>
        )}
      </div>
    </div>
  );
}
