import { useState } from "react";

// ── 질문 데이터 (24문항) ──────────────────────────────────────
const QUESTIONS = [
  // E/I
  { id: 1, axis: "EI", text: "주말에 에너지를 충전하는 방법은?", a: { text: "친구들과 만나 신나게 놀기", type: "E" }, b: { text: "혼자 조용히 쉬기", type: "I" } },
  { id: 2, axis: "EI", text: "처음 보는 사람과 대화할 때", a: { text: "먼저 말을 걸고 금방 친해진다", type: "E" }, b: { text: "상대가 먼저 말 걸어주길 기다린다", type: "I" } },
  { id: 3, axis: "EI", text: "모임에서 나는?", a: { text: "여러 사람과 두루두루 이야기한다", type: "E" }, b: { text: "마음 맞는 한두 명과 깊게 얘기한다", type: "I" } },
  // S/N
  { id: 4, axis: "SN", text: "새로운 아이디어를 접할 때", a: { text: "실제로 적용 가능한지 먼저 따진다", type: "S" }, b: { text: "가능성과 미래를 먼저 상상한다", type: "N" } },
  { id: 5, axis: "SN", text: "여행 계획을 짤 때", a: { text: "구체적인 일정과 장소를 꼼꼼히 짠다", type: "S" }, b: { text: "큰 그림만 잡고 즉흥적으로 움직인다", type: "N" } },
  { id: 6, axis: "SN", text: "정보를 받아들일 때 나는?", a: { text: "사실과 세부 내용에 집중한다", type: "S" }, b: { text: "패턴과 숨겨진 의미를 찾는다", type: "N" } },
  // T/F
  { id: 7, axis: "TF", text: "친구가 고민을 털어놨을 때", a: { text: "해결책을 먼저 제시한다", type: "T" }, b: { text: "공감하고 감정을 먼저 받아준다", type: "F" } },
  { id: 8, axis: "TF", text: "중요한 결정을 내릴 때", a: { text: "논리와 데이터를 기반으로 판단한다", type: "T" }, b: { text: "내 감정과 주변 사람들의 영향을 고려한다", type: "F" } },
  { id: 9, axis: "TF", text: "누군가와 의견이 충돌할 때", a: { text: "논리적으로 내 주장을 관철시킨다", type: "T" }, b: { text: "관계가 상하지 않도록 조율한다", type: "F" } },
  // J/P
  { id: 10, axis: "JP", text: "일을 처리하는 방식은?", a: { text: "계획을 세우고 순서대로 처리한다", type: "J" }, b: { text: "상황 봐가며 유연하게 처리한다", type: "P" } },
  { id: 11, axis: "JP", text: "마감 기한이 있을 때", a: { text: "미리미리 끝내야 마음이 편하다", type: "J" }, b: { text: "마감 직전 집중력이 폭발한다", type: "P" } },
  { id: 12, axis: "JP", text: "내 방/책상 상태는?", a: { text: "항상 정리정돈 되어 있다", type: "J" }, b: { text: "나만 아는 나만의 질서가 있다", type: "P" } },
  // A/T (Assertive vs Turbulent)
  { id: 13, axis: "AT", text: "실수를 했을 때 나는?", a: { text: "빨리 잊고 다음에 잘하면 된다고 생각한다", type: "A" }, b: { text: "한동안 자책하고 계속 마음에 걸린다", type: "T" } },
  { id: 14, axis: "AT", text: "다른 사람이 나를 어떻게 생각하는지", a: { text: "크게 신경 쓰지 않는다", type: "A" }, b: { text: "은근히 많이 신경 쓰인다", type: "T" } },
  { id: 15, axis: "AT", text: "중요한 일을 앞두고 나는?", a: { text: "침착하게 준비한다", type: "A" }, b: { text: "걱정이 많아지고 긴장된다", type: "T" } },
  { id: 16, axis: "AT", text: "내 현재 삶의 만족도는?", a: { text: "대체로 만족스럽다", type: "A" }, b: { text: "더 잘할 수 있는데 아쉬운 게 많다", type: "T" } },
  // H/C (Harmonious vs Competitive)  
  { id: 17, axis: "HC", text: "팀 프로젝트에서 나는?", a: { text: "팀워크와 분위기를 중시한다", type: "H" }, b: { text: "결과와 성과를 중시한다", type: "C" } },
  { id: 18, axis: "HC", text: "경쟁 상황에서 나는?", a: { text: "경쟁보다 협력이 더 중요하다고 생각한다", type: "H" }, b: { text: "이기고 싶은 승부욕이 생긴다", type: "C" } },
  { id: 19, axis: "HC", text: "갈등이 생겼을 때", a: { text: "관계 유지를 위해 내가 양보한다", type: "H" }, b: { text: "옳고 그름을 따지고 해결한다", type: "C" } },
  { id: 20, axis: "HC", text: "성공의 기준은?", a: { text: "주변 사람들과 함께 행복한 것", type: "H" }, b: { text: "목표를 달성하고 인정받는 것", type: "C" } },
];

// ── 희귀도 ──────────────────────────────────────────────────
const RARITY = {
  "SSR": { label: "SSR", color: "#ff6b35", bg: "rgba(255,107,53,0.15)", border: "rgba(255,107,53,0.4)", star: "★★★★★" },
  "SR": { label: "SR", color: "#a855f7", bg: "rgba(168,85,247,0.15)", border: "rgba(168,85,247,0.4)", star: "★★★★☆" },
  "R": { label: "R", color: "#3b82f6", bg: "rgba(59,130,246,0.15)", border: "rgba(59,130,246,0.4)", star: "★★★☆☆" },
  "N": { label: "N", color: "#6b7280", bg: "rgba(107,114,128,0.15)", border: "rgba(107,114,128,0.4)", star: "★★☆☆☆" },
};

// ── 64유형 데이터 ────────────────────────────────────────────
function getTypeData(mbti, at, hc) {
  const key = `${mbti}-${at}-${hc}`;
  const typeMap = {
    // INFJ
    "INFJ-A-H": { rare: "SSR", pct: "0.2%", title: "세계관 최강자", desc: "깊은 통찰력과 따뜻한 공감능력을 동시에 가진 극희귀 유형. 비전을 제시하면서도 사람들을 하나로 묶는 천부적 리더.", keyword: ["카리스마", "통찰", "공감"] },
    "INFJ-A-C": { rare: "SSR", pct: "0.3%", title: "조용한 혁명가", desc: "강한 신념과 자신감으로 세상을 바꾸려는 유형. 말보다 행동으로 보여주는 침묵의 리더.", keyword: ["신념", "독립", "추진력"] },
    "INFJ-T-H": { rare: "SR", pct: "0.5%", title: "인간 힐링 포션", desc: "섬세한 감수성으로 사람들의 마음을 치유하는 유형. 주변 사람들이 자연스럽게 고민을 털어놓는 존재.", keyword: ["치유", "공감", "섬세함"] },
    "INFJ-T-C": { rare: "R", pct: "0.9%", title: "신념에 미친 광인", desc: "내 신념을 위해서라면 모든 걸 거는 유형. 아무도 믿지 않는 꿈을 혼자 끝까지 밀어붙인다.", keyword: ["집념", "완벽주의", "몰입"] },
    // INTJ
    "INTJ-A-C": { rare: "SSR", pct: "0.3%", title: "냉혹한 전략가", desc: "감정 없는 체스판 위에서 10수 앞을 내다보는 유형. 목표 앞에선 모든 것이 변수일 뿐.", keyword: ["전략", "냉철", "독립"] },
    "INTJ-A-H": { rare: "SR", pct: "0.5%", title: "숨겨진 설계자", desc: "혼자 큰 그림을 그리면서도 팀을 위해 헌신하는 유형. 드러내지 않지만 조직의 핵심.", keyword: ["설계", "헌신", "통찰"] },
    "INTJ-T-C": { rare: "R", pct: "1.2%", title: "완벽주의 독재자", desc: "내 기준에 못 미치는 건 용납 못 하는 유형. 스스로에게 가장 가혹한 비평가.", keyword: ["완벽", "기준", "냉정"] },
    "INTJ-T-H": { rare: "R", pct: "1.0%", title: "고독한 몽상가", desc: "머릿속엔 거대한 세계가 있지만 밖으로 꺼내기 어려운 유형. 이해받는 날을 꿈꾼다.", keyword: ["상상", "내면", "이상주의"] },
    // INFP
    "INFP-A-H": { rare: "SR", pct: "0.8%", title: "자유로운 영혼", desc: "세상과 평화롭게 공존하는 따뜻한 이상주의자. 모든 것에서 아름다움을 찾아낸다.", keyword: ["자유", "따뜻함", "이상"] },
    "INFP-A-C": { rare: "SR", pct: "0.9%", title: "조용한 반항아", desc: "겉은 순해 보이지만 내면에 강한 신념이 있는 유형. 옳지 않다고 생각하면 절대 타협하지 않는다.", keyword: ["신념", "반항", "독립"] },
    "INFP-T-H": { rare: "R", pct: "2.1%", title: "감성 과부하", desc: "세상 모든 것에 감동받고 상처받는 유형. 풍부한 감수성이 창작의 원동력.", keyword: ["감수성", "창작", "공감"] },
    "INFP-T-C": { rare: "N", pct: "2.8%", title: "내면의 전사", desc: "겉으로는 조용하지만 내면에서는 끊임없이 싸우는 유형. 자신만의 정의를 위해 투쟁한다.", keyword: ["정의", "내면", "투쟁"] },
    // INTP
    "INTP-A-C": { rare: "SR", pct: "1.0%", title: "지식의 신", desc: "모든 것을 알고 싶어하는 냉정한 탐구자. 틀린 것을 보면 참을 수 없다.", keyword: ["지식", "논리", "탐구"] },
    "INTP-A-H": { rare: "R", pct: "1.5%", title: "철학자 프로", desc: "혼자 생각하는 걸 좋아하지만 공동체도 소중히 여기는 유형.", keyword: ["철학", "사고", "균형"] },
    "INTP-T-C": { rare: "R", pct: "2.0%", title: "영원한 의심자", desc: "아무것도 확신할 수 없어서 계속 파고드는 유형. 진실을 향한 끝없는 여정.", keyword: ["의심", "탐구", "완벽"] },
    "INTP-T-H": { rare: "N", pct: "3.0%", title: "몽상 과학자", desc: "현실보다 머릿속 이론이 더 흥미로운 유형. 관계보다 아이디어에 몰입.", keyword: ["이론", "몽상", "내향"] },
    // ENFJ
    "ENFJ-A-H": { rare: "SSR", pct: "0.4%", title: "인류의 선생님", desc: "사람들의 잠재력을 끌어내는 타고난 멘토. 함께하면 모두가 성장하는 느낌.", keyword: ["멘토", "성장", "영감"] },
    "ENFJ-A-C": { rare: "SR", pct: "0.7%", title: "카리스마 리더", desc: "사람을 끌어당기는 마력과 목표 달성 의지를 동시에 가진 유형.", keyword: ["카리스마", "리더십", "목표"] },
    "ENFJ-T-H": { rare: "R", pct: "1.3%", title: "감정 스펀지", desc: "주변 사람들의 감정을 너무 잘 흡수해서 지치기도 하는 유형. 그래도 돕는 걸 멈출 수 없다.", keyword: ["공감", "헌신", "감수성"] },
    "ENFJ-T-C": { rare: "R", pct: "1.5%", title: "완벽한 조율사", desc: "팀의 성과와 개인의 감정 모두를 챙기려다 혼자 번아웃 오는 유형.", keyword: ["조율", "완벽", "번아웃"] },
    // ENFP
    "ENFP-A-H": { rare: "SR", pct: "0.9%", title: "에너지 태양", desc: "가는 곳마다 분위기를 밝히는 인간 태양. 모든 사람이 소중하고 세상이 아름답다.", keyword: ["에너지", "긍정", "따뜻함"] },
    "ENFP-A-C": { rare: "SR", pct: "1.1%", title: "꿈 제조기", desc: "아이디어가 폭발하고 실행력도 있는 희귀한 조합. 다음 프로젝트가 항상 준비되어 있다.", keyword: ["아이디어", "실행", "열정"] },
    "ENFP-T-H": { rare: "R", pct: "2.5%", title: "열정 과부하", desc: "모든 것에 열정적이지만 현실과 이상 사이에서 흔들리는 유형.", keyword: ["열정", "감성", "갈등"] },
    "ENFP-T-C": { rare: "N", pct: "3.2%", title: "산만한 천재", desc: "천재적인 아이디어가 넘치지만 집중력이 문제인 유형. ADHD 의심 1순위.", keyword: ["창의", "산만", "천재"] },
    // ENTJ
    "ENTJ-A-C": { rare: "SSR", pct: "0.5%", title: "타고난 황제", desc: "태어날 때부터 리더였던 유형. 모든 상황을 장악하고 목표를 향해 군단을 이끈다.", keyword: ["지배", "목표", "카리스마"] },
    "ENTJ-A-H": { rare: "SR", pct: "0.8%", title: "개혁하는 황제", desc: "강력한 리더십에 팀원을 챙기는 마음까지 갖춘 이상적인 보스.", keyword: ["리더십", "개혁", "팀워크"] },
    "ENTJ-T-C": { rare: "R", pct: "1.4%", title: "독재자 직전", desc: "완벽한 결과를 위해 과정도 사람도 통제하려는 유형. 부드러움이 필요하다.", keyword: ["통제", "완벽", "독재"] },
    "ENTJ-T-H": { rare: "R", pct: "1.6%", title: "고민 많은 CEO", desc: "결단력 있는 리더이지만 내면에선 항상 더 잘할 수 있다는 압박감에 시달리는 유형.", keyword: ["리더십", "불안", "성장"] },
    // ENTP
    "ENTP-A-C": { rare: "SR", pct: "1.2%", title: "논쟁 중독자", desc: "토론이 취미이자 삶의 낙인 유형. 반박을 위한 반박도 즐긴다.", keyword: ["논쟁", "분석", "도발"] },
    "ENTP-A-H": { rare: "SR", pct: "1.3%", title: "아이디어 폭탄", desc: "끝없이 아이디어를 쏟아내면서 팀의 에너지를 올리는 유형.", keyword: ["아이디어", "창의", "에너지"] },
    "ENTP-T-C": { rare: "R", pct: "2.2%", title: "천재 반항아", desc: "기존 시스템을 의심하고 부수려는 유형. 규칙보다 가능성을 믿는다.", keyword: ["반항", "천재", "혁신"] },
    "ENTP-T-H": { rare: "N", pct: "3.5%", title: "머리 복잡한 친구", desc: "아이디어는 많지만 불안감에 실행이 늦어지는 유형. 생각이 너무 많다.", keyword: ["분석", "불안", "가능성"] },
    // ISTJ
    "ISTJ-A-C": { rare: "SR", pct: "1.5%", title: "철벽 관리자", desc: "규칙과 시스템으로 세상을 운영하는 유형. 흔들리지 않는 기둥 같은 존재.", keyword: ["규칙", "책임", "안정"] },
    "ISTJ-A-H": { rare: "R", pct: "2.0%", title: "든든한 버팀목", desc: "말없이 묵묵히 주변을 지키는 유형. 있을 때는 몰랐다가 없어지면 가장 그리운 사람.", keyword: ["신뢰", "안정", "헌신"] },
    "ISTJ-T-C": { rare: "R", pct: "2.5%", title: "완벽주의 공무원", desc: "실수 하나도 용납 못 하는 꼼꼼함의 끝판왕. 본인도 힘들고 주변도 힘들다.", keyword: ["완벽", "꼼꼼", "규율"] },
    "ISTJ-T-H": { rare: "N", pct: "4.0%", title: "걱정 많은 성실맨", desc: "성실하게 다 해내지만 항상 뭔가 부족한 것 같아 불안한 유형.", keyword: ["성실", "걱정", "책임"] },
    // ISFJ
    "ISFJ-A-H": { rare: "R", pct: "2.0%", title: "세상의 수호자", desc: "조용히 모든 사람을 챙기는 진짜 어른. 받는 것보다 주는 게 더 행복한 유형.", keyword: ["헌신", "보호", "따뜻함"] },
    "ISFJ-A-C": { rare: "R", pct: "2.2%", title: "숨은 프로", desc: "겸손하지만 내면에 강한 자기 기준이 있는 유형. 조용히 최고의 결과를 낸다.", keyword: ["성실", "겸손", "프로"] },
    "ISFJ-T-H": { rare: "N", pct: "3.8%", title: "과보호 엄마형", desc: "걱정이 사랑인 유형. 너무 많이 챙겨줘서 오히려 부담 줄 때도 있다.", keyword: ["걱정", "사랑", "헌신"] },
    "ISFJ-T-C": { rare: "N", pct: "4.2%", title: "참는 게 미덕", desc: "다 알면서도 참고 넘어가는 유형. 쌓이다 보면 언젠가 폭발한다.", keyword: ["인내", "억압", "배려"] },
    // ISTP
    "ISTP-A-C": { rare: "SR", pct: "1.4%", title: "쿨한 장인", desc: "말보다 손으로 보여주는 유형. 어떤 문제든 혼자 해결하는 독립적인 전문가.", keyword: ["독립", "실용", "쿨함"] },
    "ISTP-A-H": { rare: "R", pct: "2.0%", title: "말없는 협력자", desc: "혼자 잘하지만 팀을 위해서도 기꺼이 헌신하는 유형. 과묵하지만 믿음직하다.", keyword: ["실용", "신뢰", "협력"] },
    "ISTP-T-C": { rare: "R", pct: "2.3%", title: "냉소적 현실주의자", desc: "세상을 있는 그대로 보는 유형. 감상 따위는 없고 오직 사실만 본다.", keyword: ["현실", "냉소", "분석"] },
    "ISTP-T-H": { rare: "N", pct: "3.2%", title: "감정 숨긴 공학도", desc: "감정이 없는 척하지만 사실 많이 신경 쓰는 유형. 표현이 서툴 뿐이다.", keyword: ["내면", "억압", "논리"] },
    // ISFP
    "ISFP-A-H": { rare: "R", pct: "2.3%", title: "감성 아티스트", desc: "세상을 아름답게 보는 따뜻한 예술가. 경쟁보다 자기만의 세계가 더 소중하다.", keyword: ["감성", "예술", "자유"] },
    "ISFP-A-C": { rare: "R", pct: "2.5%", title: "조용한 승부사", desc: "겉은 평화로워 보이지만 내면엔 강한 경쟁심이 있는 유형.", keyword: ["승부", "감성", "독립"] },
    "ISFP-T-H": { rare: "N", pct: "4.5%", title: "예민한 힐러", desc: "타인의 고통에 지나치게 공감해서 같이 힘들어지는 유형.", keyword: ["공감", "예민", "치유"] },
    "ISFP-T-C": { rare: "N", pct: "5.0%", title: "고독한 예술가", desc: "인정받고 싶지만 상처받기 싫어서 혼자 작업하는 유형.", keyword: ["고독", "예술", "인정욕구"] },
    // ESTJ
    "ESTJ-A-C": { rare: "SR", pct: "1.8%", title: "살아있는 규정집", desc: "규칙과 질서의 화신. 모든 것이 제자리에 있어야 직성이 풀리는 유형.", keyword: ["규율", "질서", "통제"] },
    "ESTJ-A-H": { rare: "R", pct: "2.5%", title: "믿음직한 대장", desc: "강한 리더십과 팀원 배려를 동시에 갖춘 현실적인 리더.", keyword: ["리더십", "신뢰", "실용"] },
    "ESTJ-T-C": { rare: "R", pct: "2.8%", title: "꼰대 전 단계", desc: "내 방식이 옳다는 확신이 강한 유형. 아직은 괜찮지만 조심해야 한다.", keyword: ["고집", "원칙", "통제"] },
    "ESTJ-T-H": { rare: "N", pct: "4.0%", title: "걱정하는 반장", desc: "책임감이 강해서 모든 걸 완벽히 해내려다 혼자 번아웃 오는 유형.", keyword: ["책임", "완벽", "불안"] },
    // ESFJ
    "ESFJ-A-H": { rare: "R", pct: "2.8%", title: "마을 이장님", desc: "모두를 챙기고 분위기를 살리는 커뮤니티의 핵심. 없으면 섭섭한 존재.", keyword: ["배려", "화합", "사교"] },
    "ESFJ-A-C": { rare: "R", pct: "2.5%", title: "인기쟁이 반장", desc: "인기도 있고 추진력도 있는 유형. 목표를 향해 사람들을 자연스럽게 이끈다.", keyword: ["인기", "추진력", "사교"] },
    "ESFJ-T-H": { rare: "N", pct: "5.2%", title: "눈치 100단", desc: "모든 사람의 기분을 파악하느라 정작 내 감정을 챙기지 못하는 유형.", keyword: ["눈치", "배려", "희생"] },
    "ESFJ-T-C": { rare: "N", pct: "5.5%", title: "인정욕구 최강", desc: "칭찬과 인정이 삶의 원동력인 유형. 무시당하면 정말 힘들다.", keyword: ["인정욕구", "사교", "불안"] },
    // ESTP
    "ESTP-A-C": { rare: "SR", pct: "1.6%", title: "타고난 승부사", desc: "어떤 상황에서도 기회를 포착하고 행동으로 옮기는 유형. 현장의 왕자.", keyword: ["승부", "행동", "기회"] },
    "ESTP-A-H": { rare: "R", pct: "2.2%", title: "팀의 엔진", desc: "에너지 넘치는 행동파이면서 팀을 위해 불태우는 유형.", keyword: ["에너지", "행동", "팀워크"] },
    "ESTP-T-C": { rare: "R", pct: "2.6%", title: "충동적 도박사", desc: "스릴을 즐기고 즉흥적으로 행동하는 유형. 후회는 나중에 한다.", keyword: ["충동", "스릴", "현재"] },
    "ESTP-T-H": { rare: "N", pct: "3.8%", title: "관심종자 산만형", desc: "에너지는 넘치지만 집중이 안 되고 인정받고 싶어하는 유형.", keyword: ["산만", "에너지", "인정"] },
    // ESFP
    "ESFP-A-H": { rare: "R", pct: "2.5%", title: "인간 축제", desc: "존재 자체가 파티인 유형. 어딜 가든 웃음과 에너지를 만든다.", keyword: ["에너지", "즐거움", "사교"] },
    "ESFP-A-C": { rare: "R", pct: "2.7%", title: "무대 위의 주인공", desc: "주목받는 걸 좋아하고 경쟁에서도 뒤처지기 싫어하는 유형.", keyword: ["주목", "경쟁", "활기"] },
    "ESFP-T-H": { rare: "N", pct: "5.0%", title: "감성 폭탄", desc: "기쁨도 슬픔도 온몸으로 표현하는 유형. 감정 기복이 크지만 진심이다.", keyword: ["감성", "표현", "진심"] },
    "ESFP-T-C": { rare: "N", pct: "5.8%", title: "핵인싸 부적응자", desc: "사람을 좋아하지만 상처도 잘 받는 유형. 겉은 밝지만 속은 복잡하다.", keyword: ["인싸", "상처", "복잡"] },
  };
  return typeMap[key] || { rare: "N", pct: "3.0%", title: "신비로운 유형", desc: "아직 분석이 완료되지 않은 희귀한 유형이에요.", keyword: ["신비", "희귀", "독특"] };
}

function calcResult(answers) {
  const score = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0, A: 0, Turb: 0, H: 0, C: 0 };
  answers.forEach(({ axis, type }) => {
    if (axis === "EI") type === "E" ? score.E++ : score.I++;
    else if (axis === "SN") type === "S" ? score.S++ : score.N++;
    else if (axis === "TF") type === "T" ? score.T++ : score.F++;
    else if (axis === "JP") type === "J" ? score.J++ : score.P++;
    else if (axis === "AT") type === "A" ? score.A++ : score.Turb++;
    else if (axis === "HC") type === "H" ? score.H++ : score.C++;
  });
  const mbti = `${score.E >= score.I ? "E" : "I"}${score.S >= score.N ? "S" : "N"}${score.T >= score.F ? "T" : "F"}${score.J >= score.P ? "J" : "P"}`;
  const at = score.A >= score.Turb ? "A" : "T";
  const hc = score.H >= score.C ? "H" : "C";
  return { mbti, at, hc, full: `${mbti}-${at}-${hc}` };
}

const MBTI_COLORS = {
  INFJ: "#6366f1", INTJ: "#8b5cf6", INFP: "#ec4899", INTP: "#3b82f6",
  ENFJ: "#f59e0b", ENFP: "#f97316", ENTJ: "#ef4444", ENTP: "#10b981",
  ISTJ: "#64748b", ISFJ: "#84cc16", ISTP: "#06b6d4", ISFP: "#a78bfa",
  ESTJ: "#f43f5e", ESFJ: "#fb7185", ESTP: "#fbbf24", ESFP: "#34d399",
};

const PARTICLES = Array.from({ length: 20 }, (_, i) => ({
  id: i, left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`,
  delay: `${Math.random() * 4}s`, dur: `${3 + Math.random() * 3}s`,
}));

export default function MBTI64() {
  const [step, setStep] = useState("intro");
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(false);

  const progress = (current / QUESTIONS.length) * 100;

  const handleAnswer = (type) => {
    if (selected) return;
    setSelected(type);
    setTimeout(() => {
      const newAnswers = [...answers, { axis: QUESTIONS[current].axis, type }];
      if (current + 1 >= QUESTIONS.length) {
        const res = calcResult(newAnswers);
        const data = getTypeData(res.mbti, res.at, res.hc);
        setResult({ ...res, ...data });
        setStep("result");
      } else {
        setCurrent(current + 1);
        setAnswers(newAnswers);
        setSelected(null);
      }
    }, 380);
  };

  const handleShare = async () => {
    if (!result) return;
    const text = `나의 MBTI 64유형은 ${result.full} ${result.rare === "SSR" ? "🌟" : "✨"}\n"${result.title}" (${result.pct} 희귀도)\n\n너도 해봐! 👇`;
    if (navigator.share) {
      try { await navigator.share({ title: "MBTI 64유형 테스트", text }); } catch {}
    } else {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const restart = () => {
    setStep("intro"); setCurrent(0); setAnswers([]); setSelected(null); setResult(null);
  };

  const accentColor = result ? (MBTI_COLORS[result.mbti] || "#6366f1") : "#6366f1";
  const rarity = result ? RARITY[result.rare] : RARITY["N"];

  return (
    <div style={{ minHeight: "100vh", background: "#07070f", fontFamily: "'Noto Sans KR', sans-serif", position: "relative", overflow: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700;900&display=swap');
        @keyframes float { 0%,100%{transform:translateY(0);opacity:.15} 50%{transform:translateY(-16px);opacity:.5} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes popIn { 0%{transform:scale(.8);opacity:0} 70%{transform:scale(1.05)} 100%{transform:scale(1);opacity:1} }
        @keyframes glow { 0%,100%{box-shadow:0 0 20px rgba(99,102,241,0.2)} 50%{box-shadow:0 0 50px rgba(99,102,241,0.5)} }
        @keyframes shimmer { 0%{background-position:-200% center} 100%{background-position:200% center} }
        .fade-up { animation: fadeUp .5s ease both; }
        .pop-in { animation: popIn .6s cubic-bezier(.34,1.56,.64,1) both; }
        .opt-btn { transition: all .18s; cursor: pointer; }
        .opt-btn:hover { transform: translateX(4px); }
        .opt-btn:active { transform: scale(.97); }
      `}</style>

      {/* 배경 */}
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, pointerEvents: "none", zIndex: 0 }}>
        {PARTICLES.map(p => (
          <div key={p.id} style={{ position: "absolute", left: p.left, top: p.top, width: "2px", height: "2px", borderRadius: "50%", background: "#6366f1", animation: `float ${p.dur} ${p.delay} infinite ease-in-out` }} />
        ))}
        <div style={{ position: "absolute", top: "-200px", left: "50%", transform: "translateX(-50%)", width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.06), transparent 70%)" }} />
      </div>

      <div style={{ position: "relative", zIndex: 1, maxWidth: "460px", margin: "0 auto", padding: "0 20px 80px" }}>

        {/* INTRO */}
        {step === "intro" && (
          <div className="fade-up" style={{ textAlign: "center", paddingTop: "56px" }}>
            <div style={{ display: "inline-block", background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.3)", borderRadius: "999px", padding: "6px 16px", fontSize: "0.72rem", color: "#818cf8", letterSpacing: "0.1em", marginBottom: "20px", fontWeight: 600 }}>
              MBTI 64유형 · 최신 업데이트
            </div>
            <h1 style={{ fontSize: "2.2rem", fontWeight: 900, color: "#fff", lineHeight: 1.2, marginBottom: "10px" }}>
              같은 MBTI도<br />
              <span style={{ background: "linear-gradient(90deg, #818cf8, #c084fc, #f472b6)", backgroundSize: "200%", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", animation: "shimmer 3s linear infinite" }}>다 달라요</span>
            </h1>
            <p style={{ color: "#6b7280", fontSize: "0.88rem", lineHeight: 1.7, marginBottom: "32px" }}>
              기존 16유형에서 한 단계 더 나아간<br />64가지 세부 유형 중 나는 어디?
            </p>

            {/* 희귀도 설명 */}
            <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "16px", padding: "20px", marginBottom: "28px", textAlign: "left" }}>
              <div style={{ fontSize: "0.72rem", color: "#6b7280", marginBottom: "12px", letterSpacing: "0.08em" }}>희귀도 등급</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                {Object.entries(RARITY).map(([key, r]) => (
                  <div key={key} style={{ background: r.bg, border: `1px solid ${r.border}`, borderRadius: "10px", padding: "10px 12px", display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ color: r.color, fontWeight: 900, fontSize: "0.85rem" }}>{r.label}</span>
                    <span style={{ color: "#9ca3af", fontSize: "0.7rem" }}>{r.star}</span>
                  </div>
                ))}
              </div>
            </div>

            <button onClick={() => setStep("quiz")} style={{ width: "100%", padding: "17px", background: "linear-gradient(135deg, #4f46e5, #7c3aed)", border: "none", borderRadius: "14px", color: "#fff", fontFamily: "inherit", fontSize: "1.05rem", fontWeight: 700, cursor: "pointer", boxShadow: "0 8px 32px rgba(79,70,229,0.4)", letterSpacing: "0.03em", animation: "glow 2s ease-in-out infinite" }}>
              🔍 내 유형 찾기
            </button>
            <p style={{ color: "#374151", fontSize: "0.72rem", marginTop: "12px" }}>20문항 · 약 3분</p>
          </div>
        )}

        {/* QUIZ */}
        {step === "quiz" && (
          <div style={{ paddingTop: "44px" }}>
            <div style={{ marginBottom: "28px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                <span style={{ color: "#4b5563", fontSize: "0.75rem" }}>Q{current + 1} / {QUESTIONS.length}</span>
                <span style={{ color: "#818cf8", fontSize: "0.75rem", fontWeight: 600 }}>{Math.round(progress)}%</span>
              </div>
              <div style={{ height: "5px", background: "rgba(255,255,255,0.05)", borderRadius: "999px" }}>
                <div style={{ height: "100%", width: `${progress}%`, background: "linear-gradient(90deg, #4f46e5, #7c3aed)", borderRadius: "999px", transition: "width .4s ease" }} />
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "6px" }}>
                <span style={{ fontSize: "0.65rem", color: "#374151", background: "rgba(99,102,241,0.1)", padding: "2px 8px", borderRadius: "999px" }}>{QUESTIONS[current].axis}</span>
              </div>
            </div>

            <div key={current} className="fade-up" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "20px", padding: "26px 22px", marginBottom: "16px" }}>
              <p style={{ fontSize: "1.1rem", color: "#f3f4f6", lineHeight: 1.65, margin: 0, fontWeight: 600 }}>
                {QUESTIONS[current].text}
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {[
                { key: "a", data: QUESTIONS[current].a },
                { key: "b", data: QUESTIONS[current].b },
              ].map(({ key, data }) => (
                <button
                  key={`${current}-${key}`}
                  className="opt-btn"
                  onClick={() => handleAnswer(data.type)}
                  style={{
                    padding: "17px 20px",
                    background: selected === data.type ? "linear-gradient(135deg, #4f46e5, #7c3aed)" : "rgba(255,255,255,0.03)",
                    border: selected === data.type ? "1px solid transparent" : "1px solid rgba(255,255,255,0.07)",
                    borderRadius: "13px",
                    color: selected === data.type ? "#fff" : "#9ca3af",
                    fontFamily: "inherit",
                    fontSize: "0.9rem",
                    textAlign: "left",
                    fontWeight: selected === data.type ? 700 : 400,
                    lineHeight: 1.5,
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    boxShadow: selected === data.type ? "0 6px 20px rgba(79,70,229,0.3)" : "none",
                  }}
                >
                  <span style={{ fontSize: "0.68rem", opacity: 0.5, minWidth: "14px", fontWeight: 700 }}>{key.toUpperCase()}</span>
                  {data.text}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* RESULT */}
        {step === "result" && result && (
          <div style={{ paddingTop: "36px" }}>
            {/* 메인 결과 카드 */}
            <div className="pop-in" style={{ background: `linear-gradient(135deg, ${accentColor}18, rgba(0,0,0,0.6))`, border: `1px solid ${accentColor}33`, borderRadius: "24px", padding: "28px 22px", marginBottom: "14px", position: "relative", overflow: "hidden" }}>
              {/* 배경 MBTI 텍스트 */}
              <div style={{ position: "absolute", top: "-10px", right: "-10px", fontSize: "6rem", fontWeight: 900, color: `${accentColor}08`, lineHeight: 1 }}>{result.mbti}</div>

              {/* 희귀도 뱃지 */}
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
                <span style={{ background: rarity.bg, border: `1px solid ${rarity.border}`, color: rarity.color, fontSize: "0.72rem", fontWeight: 900, padding: "4px 10px", borderRadius: "999px", letterSpacing: "0.05em" }}>{rarity.label}</span>
                <span style={{ color: "#4b5563", fontSize: "0.72rem" }}>희귀도 {result.pct}</span>
                <span style={{ color: rarity.color, fontSize: "0.75rem" }}>{rarity.star}</span>
              </div>

              {/* 유형명 */}
              <div style={{ fontSize: "2.4rem", fontWeight: 900, color: "#fff", marginBottom: "4px", letterSpacing: "0.05em" }}>
                {result.full}
              </div>
              <div style={{ fontSize: "1rem", color: accentColor, fontWeight: 700, marginBottom: "14px" }}>
                "{result.title}"
              </div>
              <p style={{ color: "#9ca3af", fontSize: "0.86rem", lineHeight: 1.75, margin: 0 }}>{result.desc}</p>
            </div>

            {/* 키워드 */}
            <div style={{ display: "flex", gap: "8px", marginBottom: "14px", flexWrap: "wrap" }}>
              {result.keyword.map(k => (
                <span key={k} style={{ background: `${accentColor}15`, border: `1px solid ${accentColor}30`, color: accentColor, fontSize: "0.78rem", padding: "5px 12px", borderRadius: "999px", fontWeight: 500 }}>
                  #{k}
                </span>
              ))}
            </div>

            {/* MBTI 분석 바 */}
            <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "16px", padding: "16px 18px", marginBottom: "14px" }}>
              <div style={{ fontSize: "0.68rem", color: "#4b5563", marginBottom: "12px", letterSpacing: "0.08em" }}>유형 분석</div>
              {[
                { label: result.mbti[0], vs: result.mbti[0] === "E" ? "I" : "E", desc: result.mbti[0] === "E" ? "외향형" : "내향형" },
                { label: result.mbti[1], vs: result.mbti[1] === "S" ? "N" : "S", desc: result.mbti[1] === "S" ? "감각형" : "직관형" },
                { label: result.mbti[2], vs: result.mbti[2] === "T" ? "F" : "T", desc: result.mbti[2] === "T" ? "사고형" : "감정형" },
                { label: result.mbti[3], vs: result.mbti[3] === "J" ? "P" : "J", desc: result.mbti[3] === "J" ? "판단형" : "인식형" },
                { label: result.at, vs: result.at === "A" ? "T" : "A", desc: result.at === "A" ? "자기확신형" : "민감형" },
                { label: result.hc, vs: result.hc === "H" ? "C" : "H", desc: result.hc === "H" ? "조화형" : "경쟁형" },
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                  <span style={{ color: accentColor, fontWeight: 700, fontSize: "0.85rem", minWidth: "16px" }}>{item.label}</span>
                  <div style={{ flex: 1, height: "4px", background: "rgba(255,255,255,0.05)", borderRadius: "999px" }}>
                    <div style={{ height: "100%", width: "70%", background: `linear-gradient(90deg, ${accentColor}, ${accentColor}88)`, borderRadius: "999px" }} />
                  </div>
                  <span style={{ color: "#4b5563", fontSize: "0.72rem", minWidth: "60px" }}>{item.desc}</span>
                </div>
              ))}
            </div>

            {/* 버튼 */}
            <button onClick={handleShare} style={{ width: "100%", padding: "16px", background: copied ? "#16a34a" : `linear-gradient(135deg, ${accentColor}, #7c3aed)`, border: "none", borderRadius: "13px", color: "#fff", fontFamily: "inherit", fontSize: "1rem", fontWeight: 700, cursor: "pointer", marginBottom: "10px", transition: "background .3s", letterSpacing: "0.03em", boxShadow: `0 8px 24px ${accentColor}33` }}>
              {copied ? "✓ 복사됐어요!" : "📤 결과 공유하기"}
            </button>
            <button onClick={restart} style={{ width: "100%", padding: "13px", background: "transparent", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "13px", color: "#4b5563", fontFamily: "inherit", fontSize: "0.9rem", cursor: "pointer" }}>
              다시 테스트하기
            </button>
            <p style={{ color: "#1f2937", fontSize: "0.72rem", textAlign: "center", marginTop: "14px" }}>재미로 즐기는 콘텐츠예요 😊</p>
          </div>
        )}
      </div>
    </div>
  );
}
