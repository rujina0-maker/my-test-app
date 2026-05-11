import { useState } from "react";

const QUESTIONS = [
  {
    id: 1,
    text: "아침에 눈을 떴을 때 가장 먼저 하는 생각은?",
    options: [
      { text: "오늘 해야 할 일을 머릿속으로 정리한다", type: "A" },
      { text: "어젯밤 꿈이 무슨 의미인지 생각해본다", type: "B" },
      { text: "오늘 뭐 먹을지부터 고민한다", type: "C" },
      { text: "사람들 만날 생각에 설렌다", type: "D" },
    ],
  },
  {
    id: 2,
    text: "모임에서 갈등이 생겼을 때 나는?",
    options: [
      { text: "논리적으로 옳고 그름을 따진다", type: "A" },
      { text: "분위기 파악하며 중재한다", type: "D" },
      { text: "일단 피하고 나중에 해결한다", type: "C" },
      { text: "내 감정을 솔직하게 표현한다", type: "B" },
    ],
  },
  {
    id: 3,
    text: "가장 끌리는 생활 방식은?",
    options: [
      { text: "책과 학문에 둘러싸인 조용한 삶", type: "A" },
      { text: "자연 속에서 자유롭게 사는 삶", type: "B" },
      { text: "화려하고 풍요로운 삶", type: "D" },
      { text: "몸을 쓰며 활동적으로 사는 삶", type: "C" },
    ],
  },
  {
    id: 4,
    text: "친구들 사이에서 나의 역할은?",
    options: [
      { text: "조언해주는 멘토형", type: "A" },
      { text: "분위기 띄우는 엔터테이너", type: "D" },
      { text: "묵묵히 도와주는 조력자", type: "C" },
      { text: "독특한 아이디어를 내는 크리에이터", type: "B" },
    ],
  },
  {
    id: 5,
    text: "돈이 생기면 가장 먼저?",
    options: [
      { text: "책이나 배움에 투자한다", type: "A" },
      { text: "좋은 음식과 즐거운 시간에 쓴다", type: "D" },
      { text: "미래를 위해 저축한다", type: "C" },
      { text: "예쁜 것, 멋진 것을 산다", type: "B" },
    ],
  },
  {
    id: 6,
    text: "스트레스를 받을 때 나는?",
    options: [
      { text: "혼자 조용히 생각을 정리한다", type: "A" },
      { text: "맛있는 걸 먹으며 푼다", type: "C" },
      { text: "사람들과 어울리며 잊는다", type: "D" },
      { text: "글쓰기, 그림 등 창작으로 푼다", type: "B" },
    ],
  },
  {
    id: 7,
    text: "이상적인 하루는?",
    options: [
      { text: "도서관에서 책 읽으며 보내는 하루", type: "A" },
      { text: "산과 들을 자유롭게 돌아다니는 하루", type: "B" },
      { text: "맛집 투어하며 여유롭게 보내는 하루", type: "C" },
      { text: "사람들과 왁자지껄하게 보내는 하루", type: "D" },
    ],
  },
  {
    id: 8,
    text: "나의 가장 큰 강점은?",
    options: [
      { text: "뛰어난 분석력과 기억력", type: "A" },
      { text: "독창적인 감각과 표현력", type: "B" },
      { text: "성실함과 추진력", type: "C" },
      { text: "사교성과 친화력", type: "D" },
    ],
  },
];

const RESULTS = {
  A: {
    job: "대학자 (大學者)",
    emoji: "📚",
    hanja: "學",
    rank: "양반",
    color: "#1a3a5c",
    accent: "#4a9eff",
    bg: "linear-gradient(135deg, #0a1628, #1a3a5c)",
    badge: "학문의 길",
    desc: "깊은 사색과 뛰어난 분석력으로 학문의 세계에서 빛나는 유형이에요. 조선시대 최고의 지식인으로서 나라의 경전을 논하고 후학을 가르쳤을 거예요. 퇴계 이황이나 율곡 이이처럼 학파를 이끄는 대학자가 되었을지도 몰라요.",
    life: "한양 성균관에서 경전을 연구하며, 제자들에게 학문을 전수하는 삶",
    strength: "탁월한 기억력과 논리적 사고",
    weakness: "현실 감각이 부족할 수 있음",
    historical: "퇴계 이황, 율곡 이이",
  },
  B: {
    job: "화원 (畵員)",
    emoji: "🎨",
    hanja: "藝",
    rank: "중인",
    color: "#3a1a5c",
    accent: "#c084fc",
    bg: "linear-gradient(135deg, #1a0a28, #3a1a5c)",
    badge: "예술의 길",
    desc: "독창적인 감각과 섬세한 표현력을 가진 예술가형이에요. 조선 최고의 화원으로 왕실의 행사를 그리고, 자연의 아름다움을 화폭에 담았을 거예요. 단원 김홍도처럼 백성들의 삶을 생생하게 그려낸 민중의 화가가 되었을지도 몰라요.",
    life: "도화서에서 그림을 그리며, 틈틈이 민간의 풍경을 화폭에 담는 삶",
    strength: "뛰어난 감수성과 창의력",
    weakness: "현실적인 부분에서 어려움을 겪을 수 있음",
    historical: "단원 김홍도, 혜원 신윤복",
  },
  C: {
    job: "보부상 (褓負商)",
    emoji: "🎒",
    hanja: "商",
    rank: "평민",
    color: "#3a2a0a",
    accent: "#f59e0b",
    bg: "linear-gradient(135deg, #1a1200, #3a2a0a)",
    badge: "상업의 길",
    desc: "성실하고 추진력 있는 실용주의형이에요. 전국을 발로 뛰며 물건을 팔고 정보를 나르던 보부상이 딱 맞아요. 억척스러운 생활력으로 어디서든 살아남고, 발 넓은 인맥으로 전국 방방곡곡 모르는 곳이 없었을 거예요.",
    life: "봇짐을 짊어지고 전국 장터를 누비며, 사람들과 정을 나누는 삶",
    strength: "강한 생활력과 적응력",
    weakness: "너무 현실적이라 꿈이 부족할 수 있음",
    historical: "임상옥 (조선 최고의 거상)",
  },
  D: {
    job: "기생 (妓生) / 광대",
    emoji: "🎭",
    hanja: "樂",
    rank: "천민",
    color: "#3a0a1a",
    accent: "#f43f5e",
    bg: "linear-gradient(135deg, #1a0008, #3a0a1a)",
    badge: "풍류의 길",
    desc: "뛰어난 사교성과 끼로 좌중을 사로잡는 엔터테이너형이에요. 조선 최고의 예인으로서 가무와 시로 사람들의 마음을 움직였을 거예요. 황진이처럼 시대를 초월한 매력으로 수많은 이들의 마음을 사로잡는 전설이 되었을지도 몰라요.",
    life: "노래와 춤, 시로 사람들에게 즐거움을 주며 세상을 누비는 삶",
    strength: "탁월한 표현력과 친화력",
    weakness: "안정적인 삶과는 거리가 멀 수 있음",
    historical: "황진이, 논개",
  },
};

function getResult(answers) {
  const count = { A: 0, B: 0, C: 0, D: 0 };
  answers.forEach((a) => count[a]++);
  return Object.entries(count).sort((a, b) => b[1] - a[1])[0][0];
}

const PARTICLES = Array.from({ length: 25 }, (_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  top: `${Math.random() * 100}%`,
  delay: `${Math.random() * 5}s`,
  dur: `${4 + Math.random() * 4}s`,
  char: ["✦", "◇", "❋", "⋆", "✿"][i % 5],
  size: `${0.6 + Math.random() * 0.6}rem`,
}));

export default function JoseonTest() {
  const [step, setStep] = useState("intro");
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);
  const [selected, setSelected] = useState(null);
  const [copied, setCopied] = useState(false);

  const progress = (current / QUESTIONS.length) * 100;

  const handleAnswer = (type) => {
    if (selected) return;
    setSelected(type);
    setTimeout(() => {
      const newAnswers = [...answers, type];
      if (current + 1 >= QUESTIONS.length) {
        setResult(RESULTS[getResult(newAnswers)]);
        setStep("result");
      } else {
        setCurrent(current + 1);
        setAnswers(newAnswers);
        setSelected(null);
      }
    }, 400);
  };

  const handleShare = async () => {
    const text = `나는 조선시대에 ${result.job} ${result.emoji}\n"${result.desc.slice(0, 40)}..."\n\n너도 해봐! 👇`;
    if (navigator.share) {
      try { await navigator.share({ title: "조선시대 직업 테스트", text }); } catch {}
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
    <div style={{ minHeight: "100vh", background: "#0d0800", fontFamily: "'Noto Serif KR', serif", position: "relative", overflow: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@400;600;700;900&family=Noto+Sans+KR:wght@300;400;500&display=swap');
        @keyframes float { 0%,100%{transform:translateY(0);opacity:.2} 50%{transform:translateY(-14px);opacity:.7} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        @keyframes popIn { 0%{transform:scale(.85);opacity:0} 70%{transform:scale(1.04)} 100%{transform:scale(1);opacity:1} }
        @keyframes inkDrop { from{opacity:0;transform:scale(.5)} to{opacity:1;transform:scale(1)} }
        @keyframes brushStroke { from{width:0} to{width:100%} }
        .opt-btn { transition:all .2s; cursor:pointer; }
        .opt-btn:hover { transform:translateX(6px); }
        .opt-btn:active { transform:scale(.97); }
        .fade-up { animation: fadeUp .5s ease both; }
        .pop-in { animation: popIn .6s cubic-bezier(.34,1.56,.64,1) both; }
      `}</style>

      {/* 배경 파티클 */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
        {PARTICLES.map(p => (
          <div key={p.id} style={{ position: "absolute", left: p.left, top: p.top, fontSize: p.size, color: "#c8a96e", animation: `float ${p.dur} ${p.delay} infinite ease-in-out`, opacity: 0.3 }}>{p.char}</div>
        ))}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "300px", background: "radial-gradient(ellipse at 50% 0%, rgba(200,169,110,0.08), transparent 70%)" }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "200px", background: "radial-gradient(ellipse at 50% 100%, rgba(180,60,60,0.06), transparent 70%)" }} />
      </div>

      <div style={{ position: "relative", zIndex: 1, maxWidth: "460px", margin: "0 auto", padding: "0 20px 80px" }}>

        {/* INTRO */}
        {step === "intro" && (
          <div className="fade-up" style={{ textAlign: "center", paddingTop: "60px" }}>
            <div style={{ fontSize: "0.7rem", color: "#c8a96e", letterSpacing: "0.4em", marginBottom: "20px", opacity: 0.8 }}>朝鮮時代 職業 테스트</div>

            {/* 대형 한자 장식 */}
            <div style={{ position: "relative", marginBottom: "24px" }}>
              <div style={{ fontSize: "8rem", color: "rgba(200,169,110,0.06)", position: "absolute", top: "-20px", left: "50%", transform: "translateX(-50%)", fontWeight: 900, lineHeight: 1 }}>朝</div>
              <div style={{ fontSize: "5rem", position: "relative", zIndex: 1, lineHeight: 1 }}>🏯</div>
            </div>

            <h1 style={{ fontSize: "1.9rem", fontWeight: 900, color: "#f0e6cc", lineHeight: 1.3, marginBottom: "10px" }}>
              내가 조선시대에<br />태어났다면?
            </h1>
            <p style={{ color: "#8a7a5a", fontSize: "0.88rem", lineHeight: 1.7, marginBottom: "36px" }}>
              8가지 질문으로 알아보는<br />나의 조선시대 직업과 신분
            </p>

            {/* 직업 미리보기 */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "32px" }}>
              {[
                { emoji: "📚", title: "대학자", sub: "양반" },
                { emoji: "🎨", title: "화원", sub: "중인" },
                { emoji: "🎒", title: "보부상", sub: "평민" },
                { emoji: "🎭", title: "기생/광대", sub: "예인" },
              ].map(c => (
                <div key={c.title} style={{ background: "rgba(200,169,110,0.05)", border: "1px solid rgba(200,169,110,0.15)", borderRadius: "12px", padding: "14px", textAlign: "center" }}>
                  <div style={{ fontSize: "1.6rem", marginBottom: "4px" }}>{c.emoji}</div>
                  <div style={{ color: "#f0e6cc", fontSize: "0.85rem", fontWeight: 700 }}>{c.title}</div>
                  <div style={{ color: "#8a7a5a", fontSize: "0.72rem", marginTop: "2px" }}>{c.sub}</div>
                </div>
              ))}
            </div>

            <button onClick={() => setStep("quiz")} style={{ width: "100%", padding: "17px", background: "linear-gradient(135deg, #8b6914, #c8a96e)", border: "none", borderRadius: "12px", color: "#1a0d00", fontFamily: "'Noto Serif KR', serif", fontSize: "1.05rem", fontWeight: 700, cursor: "pointer", boxShadow: "0 8px 24px rgba(200,169,110,0.25)", letterSpacing: "0.05em" }}>
              🏯 테스트 시작하기
            </button>
            <p style={{ color: "#4a3a2a", fontSize: "0.72rem", marginTop: "12px" }}>8문항 · 약 2분</p>
          </div>
        )}

        {/* QUIZ */}
        {step === "quiz" && (
          <div style={{ paddingTop: "44px" }}>
            {/* 진행바 */}
            <div style={{ marginBottom: "28px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                <span style={{ color: "#6a5a3a", fontSize: "0.75rem", fontFamily: "'Noto Sans KR', sans-serif" }}>{current + 1} / {QUESTIONS.length}</span>
                <span style={{ color: "#c8a96e", fontSize: "0.75rem", fontFamily: "'Noto Sans KR', sans-serif" }}>{Math.round(progress)}%</span>
              </div>
              <div style={{ height: "4px", background: "rgba(200,169,110,0.1)", borderRadius: "999px" }}>
                <div style={{ height: "100%", width: `${progress}%`, background: "linear-gradient(90deg, #8b6914, #c8a96e)", borderRadius: "999px", transition: "width .4s ease" }} />
              </div>
            </div>

            {/* 질문 */}
            <div key={current} className="fade-up" style={{ background: "rgba(200,169,110,0.04)", border: "1px solid rgba(200,169,110,0.12)", borderRadius: "20px", padding: "24px 20px", marginBottom: "16px" }}>
              <div style={{ fontSize: "0.68rem", color: "#c8a96e", letterSpacing: "0.15em", marginBottom: "10px", fontFamily: "'Noto Sans KR', sans-serif" }}>질문 {current + 1}</div>
              <p style={{ fontSize: "1.1rem", color: "#f0e6cc", lineHeight: 1.6, margin: 0, fontWeight: 600 }}>
                {QUESTIONS[current].text}
              </p>
            </div>

            {/* 선택지 */}
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {QUESTIONS[current].options.map((opt, i) => (
                <button
                  key={i}
                  className="opt-btn"
                  onClick={() => handleAnswer(opt.type)}
                  style={{
                    padding: "16px 18px",
                    background: selected === opt.type ? "linear-gradient(135deg, #8b6914, #c8a96e)" : "rgba(200,169,110,0.04)",
                    border: selected === opt.type ? "1px solid transparent" : "1px solid rgba(200,169,110,0.15)",
                    borderRadius: "12px",
                    color: selected === opt.type ? "#1a0d00" : "#c8b896",
                    fontFamily: "'Noto Sans KR', sans-serif",
                    fontSize: "0.9rem",
                    textAlign: "left",
                    fontWeight: selected === opt.type ? 700 : 400,
                    lineHeight: 1.5,
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                  }}
                >
                  <span style={{ fontSize: "0.7rem", opacity: 0.6, minWidth: "16px" }}>{["一", "二", "三", "四"][i]}</span>
                  {opt.text}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* RESULT */}
        {step === "result" && result && (
          <div style={{ paddingTop: "40px" }}>
            {/* 결과 헤더 */}
            <div className="pop-in" style={{ background: result.bg, borderRadius: "24px", padding: "32px 24px", textAlign: "center", marginBottom: "16px", border: `1px solid ${result.accent}22`, boxShadow: `0 12px 48px ${result.accent}18`, position: "relative", overflow: "hidden" }}>
              {/* 배경 한자 */}
              <div style={{ position: "absolute", top: "-10px", right: "-10px", fontSize: "8rem", color: `${result.accent}08`, fontWeight: 900 }}>{result.hanja}</div>

              <div style={{ fontSize: "0.68rem", color: result.accent, letterSpacing: "0.2em", marginBottom: "8px", fontFamily: "'Noto Sans KR', sans-serif" }}>결과 발표</div>
              <div style={{ fontSize: "3.5rem", marginBottom: "12px" }}>{result.emoji}</div>
              <div style={{ display: "inline-block", background: `${result.accent}22`, border: `1px solid ${result.accent}44`, borderRadius: "999px", padding: "4px 14px", fontSize: "0.72rem", color: result.accent, marginBottom: "12px", fontFamily: "'Noto Sans KR', sans-serif" }}>
                {result.rank} · {result.badge}
              </div>
              <h2 style={{ fontSize: "1.8rem", fontWeight: 900, color: "#f0e6cc", marginBottom: "8px" }}>{result.job}</h2>
              <p style={{ color: "#a89878", fontSize: "0.86rem", lineHeight: 1.8, textAlign: "left" }}>{result.desc}</p>
            </div>

            {/* 상세 정보 */}
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "16px" }}>
              <div style={{ background: "rgba(200,169,110,0.05)", border: "1px solid rgba(200,169,110,0.12)", borderRadius: "14px", padding: "16px 18px" }}>
                <div style={{ fontSize: "0.68rem", color: "#c8a96e", letterSpacing: "0.1em", marginBottom: "6px", fontFamily: "'Noto Sans KR', sans-serif" }}>⚔ 조선에서의 삶</div>
                <p style={{ color: "#c8b896", fontSize: "0.85rem", lineHeight: 1.6, margin: 0, fontFamily: "'Noto Sans KR', sans-serif" }}>{result.life}</p>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                <div style={{ background: "rgba(200,169,110,0.05)", border: "1px solid rgba(100,200,100,0.15)", borderRadius: "14px", padding: "14px" }}>
                  <div style={{ fontSize: "0.65rem", color: "#6abf6a", marginBottom: "6px", fontFamily: "'Noto Sans KR', sans-serif" }}>강점</div>
                  <div style={{ color: "#c8b896", fontSize: "0.8rem", lineHeight: 1.5, fontFamily: "'Noto Sans KR', sans-serif" }}>{result.strength}</div>
                </div>
                <div style={{ background: "rgba(200,169,110,0.05)", border: "1px solid rgba(200,100,100,0.15)", borderRadius: "14px", padding: "14px" }}>
                  <div style={{ fontSize: "0.65rem", color: "#bf6a6a", marginBottom: "6px", fontFamily: "'Noto Sans KR', sans-serif" }}>약점</div>
                  <div style={{ color: "#c8b896", fontSize: "0.8rem", lineHeight: 1.5, fontFamily: "'Noto Sans KR', sans-serif" }}>{result.weakness}</div>
                </div>
              </div>

              <div style={{ background: "rgba(200,169,110,0.05)", border: "1px solid rgba(200,169,110,0.12)", borderRadius: "14px", padding: "14px 18px", display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{ fontSize: "1.4rem" }}>📜</div>
                <div>
                  <div style={{ fontSize: "0.65rem", color: "#c8a96e", marginBottom: "3px", fontFamily: "'Noto Sans KR', sans-serif" }}>역사 속 닮은꼴</div>
                  <div style={{ color: "#f0e6cc", fontSize: "0.88rem", fontWeight: 700 }}>{result.historical}</div>
                </div>
              </div>
            </div>

            {/* 버튼 */}
            <button onClick={handleShare} style={{ width: "100%", padding: "16px", background: copied ? "#16a34a" : "linear-gradient(135deg, #8b6914, #c8a96e)", border: "none", borderRadius: "12px", color: "#1a0d00", fontFamily: "'Noto Serif KR', serif", fontSize: "1rem", fontWeight: 700, cursor: "pointer", marginBottom: "10px", transition: "background .3s", letterSpacing: "0.03em" }}>
              {copied ? "✓ 복사됐어요!" : "📤 결과 공유하기"}
            </button>
            <button onClick={restart} style={{ width: "100%", padding: "14px", background: "transparent", border: "1px solid rgba(200,169,110,0.2)", borderRadius: "12px", color: "#8a7a5a", fontFamily: "'Noto Sans KR', sans-serif", fontSize: "0.9rem", cursor: "pointer" }}>
              다시 테스트하기
            </button>
            <p style={{ color: "#3a2a1a", fontSize: "0.72rem", textAlign: "center", marginTop: "14px", fontFamily: "'Noto Sans KR', sans-serif" }}>재미로 즐기는 콘텐츠예요 😊</p>
          </div>
        )}
      </div>
    </div>
  );
}
