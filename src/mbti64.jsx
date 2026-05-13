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
    "INFJ-A-H": { rare: "SSR", pct: "0.2%", title: "세계관 최강자", desc: "깊은 통찰력과 따뜻한 공감능력을 동시에 가진 극희귀 유형. 비전을 제시하면서도 사람들을 하나로 묶는 천부적 리더.", keyword: ["카리스마", "통찰", "공감"], love: "연인의 감정 변화를 귀신같이 알아채요. 헌신적이지만 가끔 너무 많은 걸 기대해서 실망할 수 있어요.", job: "심리상담사, 작가, NGO 활동가, 교육자, 예술감독", good: "ENFP, ENTP", bad: "ESTP, ESTJ", celebrity: "마틴 루터 킹, 넬슨 만델라", caution: "혼자 감정을 삭이다 번아웃이 와요. 주기적으로 혼자만의 시간을 가지세요." },
    "INFJ-A-C": { rare: "SSR", pct: "0.3%", title: "조용한 혁명가", desc: "강한 신념과 자신감으로 세상을 바꾸려는 유형. 말보다 행동으로 보여주는 침묵의 리더.", keyword: ["신념", "독립", "추진력"], love: "연애보다 신념을 더 중요시할 때도 있어요. 가치관이 맞는 사람과 깊고 진한 관계를 맺어요.", job: "사회운동가, 변호사, 전략기획자, 작가, 정치인", good: "ENFP, ENFJ", bad: "ESFP, ESTP", celebrity: "간디, 테일러 스위프트", caution: "내 방식이 옳다는 고집이 관계를 힘들게 할 수 있어요." },
    "INFJ-T-H": { rare: "SR", pct: "0.5%", title: "인간 힐링 포션", desc: "섬세한 감수성으로 사람들의 마음을 치유하는 유형. 주변 사람들이 자연스럽게 고민을 털어놓는 존재.", keyword: ["치유", "공감", "섬세함"], love: "상대방의 감정을 누구보다 잘 이해해요. 상처를 잘 받아서 표현을 못 하고 혼자 앓는 경우가 많아요.", job: "심리치료사, 간호사, 사회복지사, 상담교사", good: "ENFP, INFP", bad: "ENTJ, ESTJ", celebrity: "아이유, 레이디 가가", caution: "타인의 감정을 너무 흡수해서 내 감정이 없어지는 느낌이 들어요. 경계를 만드세요." },
    "INFJ-T-C": { rare: "R", pct: "0.9%", title: "신념에 미친 광인", desc: "내 신념을 위해서라면 모든 걸 거는 유형. 아무도 믿지 않는 꿈을 혼자 끝까지 밀어붙인다.", keyword: ["집념", "완벽주의", "몰입"], love: "연인에게 이상적인 모습을 투영하다 실망하는 패턴이 있어요. 있는 그대로 보는 연습이 필요해요.", job: "예술가, 작가, 연구원, 혁신가", good: "ENFP, ENTP", bad: "ESFJ, ESTJ", celebrity: "도스토옙스키, 버지니아 울프", caution: "완벽주의가 스스로를 갉아먹어요. 80점도 충분히 훌륭해요." },
    "INTJ-A-C": { rare: "SSR", pct: "0.3%", title: "냉혹한 전략가", desc: "감정 없는 체스판 위에서 10수 앞을 내다보는 유형. 목표 앞에선 모든 것이 변수일 뿐.", keyword: ["전략", "냉철", "독립"], love: "감정 표현이 서툴러서 오해받아요. 행동으로 사랑을 보여주는 타입이에요.", job: "CEO, 전략컨설턴트, 과학자, 소프트웨어 아키텍트, 투자가", good: "ENFP, ENTP", bad: "ESFJ, ISFJ", celebrity: "일론 머스크, 크리스토퍼 놀란", caution: "타인의 감정을 무시하면 중요한 관계를 잃을 수 있어요." },
    "INTJ-A-H": { rare: "SR", pct: "0.5%", title: "숨겨진 설계자", desc: "혼자 큰 그림을 그리면서도 팀을 위해 헌신하는 유형. 드러내지 않지만 조직의 핵심.", keyword: ["설계", "헌신", "통찰"], love: "연애에서도 계획적이에요. 감정보다 논리로 관계를 분석하는 편이에요.", job: "건축가, 프로젝트 매니저, 데이터 과학자, 정책 입안자", good: "ENFP, INFP", bad: "ESFP, ESTP", celebrity: "마크 저커버그, 체 게바라", caution: "너무 계획적이어서 즉흥적인 순간의 즐거움을 놓쳐요." },
    "INTJ-T-C": { rare: "R", pct: "1.2%", title: "완벽주의 독재자", desc: "내 기준에 못 미치는 건 용납 못 하는 유형. 스스로에게 가장 가혹한 비평가.", keyword: ["완벽", "기준", "냉정"], love: "연인에게도 높은 기준을 요구해서 부담을 줄 수 있어요. 칭찬을 더 해주세요.", job: "외과의사, 법조인, 퀄리티 엔지니어, 감사관", good: "ENFP, ENTJ", bad: "INFP, ISFP", celebrity: "니체, 스티브 잡스", caution: "완벽함을 추구하다 아무것도 못 끝내는 함정에 빠질 수 있어요." },
    "INTJ-T-H": { rare: "R", pct: "1.0%", title: "고독한 몽상가", desc: "머릿속엔 거대한 세계가 있지만 밖으로 꺼내기 어려운 유형. 이해받는 날을 꿈꾼다.", keyword: ["상상", "내면", "이상주의"], love: "진심으로 이해해주는 사람을 만나면 엄청난 헌신을 보여줘요. 그 사람이 나타날 때까지 오래 걸려요.", job: "소설가, 게임 디자이너, 연구원, 철학자", good: "ENFP, ENFJ", bad: "ESTP, ESFP", celebrity: "아이작 뉴턴, 나쓰메 소세키", caution: "머릿속 이상과 현실의 괴리로 항상 실망감을 느껴요. 현실도 나쁘지 않아요." },
    "INFP-A-H": { rare: "SR", pct: "0.8%", title: "자유로운 영혼", desc: "세상과 평화롭게 공존하는 따뜻한 이상주의자. 모든 것에서 아름다움을 찾아낸다.", keyword: ["자유", "따뜻함", "이상"], love: "사랑에 빠지면 온 세상이 핑크빛이에요. 이상화하는 경향이 있어서 현실과 부딪힐 때 힘들어요.", job: "작가, 디자이너, 음악가, 상담사, 사진작가", good: "ENFJ, ENTJ", bad: "ESTJ, ENTJ", celebrity: "존 레논, 윌리엄 셰익스피어", caution: "감수성이 너무 풍부해서 상처받기 쉬워요. 모든 말을 다 마음에 담지 않아도 돼요." },
    "INFP-A-C": { rare: "SR", pct: "0.9%", title: "조용한 반항아", desc: "겉은 순해 보이지만 내면에 강한 신념이 있는 유형. 옳지 않다고 생각하면 절대 타협하지 않는다.", keyword: ["신념", "반항", "독립"], love: "자유를 억압받는 느낌이 들면 바로 거리를 두는 편이에요. 간섭하지 않는 연인을 원해요.", job: "프리랜서 작가, 독립 예술가, 사회활동가, 스타트업 창업자", good: "ENFJ, INFJ", bad: "ESTJ, ESFJ", celebrity: "커트 코베인, 조앤 롤링", caution: "이상과 현실의 괴리에 자주 좌절해요. 작은 성취도 의미 있어요." },
    "INFP-T-H": { rare: "R", pct: "2.1%", title: "감성 과부하", desc: "세상 모든 것에 감동받고 상처받는 유형. 풍부한 감수성이 창작의 원동력.", keyword: ["감수성", "창작", "공감"], love: "연애 감정을 글이나 그림으로 표현하는 로맨티스트예요. 하지만 상처를 오래 기억해요.", job: "시인, 웹툰 작가, 감성 콘텐츠 크리에이터, 상담사", good: "ENFJ, ESFJ", bad: "ESTP, ENTJ", celebrity: "빈센트 반 고흐, 버지니아 울프", caution: "감정의 파도가 너무 크면 일상이 힘들어요. 감정 일기를 써보세요." },
    "INFP-T-C": { rare: "N", pct: "2.8%", title: "내면의 전사", desc: "겉으로는 조용하지만 내면에서는 끊임없이 싸우는 유형. 자신만의 정의를 위해 투쟁한다.", keyword: ["정의", "내면", "투쟁"], love: "진심을 보여주기까지 오래 걸려요. 한번 마음을 열면 깊고 진한 관계를 맺어요.", job: "사회운동가, 변호사, 독립 작가, 탐사 저널리스트", good: "ENFJ, INFJ", bad: "ESTP, ESFP", celebrity: "톨킨, 프란츠 카프카", caution: "내면의 싸움이 너무 격렬하면 소진돼요. 가끔 멈추고 쉬어도 돼요." },
    "INTP-A-C": { rare: "SR", pct: "1.0%", title: "지식의 신", desc: "모든 것을 알고 싶어하는 냉정한 탐구자. 틀린 것을 보면 참을 수 없다.", keyword: ["지식", "논리", "탐구"], love: "감정 표현이 매우 서툴러요. 하지만 연인을 위해 방대한 분량의 정보를 찾아주는 것으로 사랑을 표현해요.", job: "연구원, 소프트웨어 개발자, 철학자, 수학자, AI 연구자", good: "ENTJ, ENFJ", bad: "ESFJ, ISFJ", celebrity: "알버트 아인슈타인, 빌 게이츠", caution: "토론에서 이기려다 관계를 잃을 수 있어요. 항상 옳을 필요는 없어요." },
    "INTP-A-H": { rare: "R", pct: "1.5%", title: "철학자 프로", desc: "혼자 생각하는 걸 좋아하지만 공동체도 소중히 여기는 유형.", keyword: ["철학", "사고", "균형"], love: "관계에서도 논리적으로 접근해요. 감정적인 대화보다 지적인 대화를 나눌 때 더 친밀감을 느껴요.", job: "철학자, 교수, 연구원, 시스템 분석가", good: "ENTJ, ENFP", bad: "ESFJ, ISFJ", celebrity: "찰스 다윈, 소크라테스", caution: "너무 분석적이어서 감정적인 순간을 놓칠 수 있어요." },
    "INTP-T-C": { rare: "R", pct: "2.0%", title: "영원한 의심자", desc: "아무것도 확신할 수 없어서 계속 파고드는 유형. 진실을 향한 끝없는 여정.", keyword: ["의심", "탐구", "완벽"], love: "연인에게도 '왜?'를 자주 물어요. 집착처럼 보일 수 있지만 사실 그게 관심의 표현이에요.", job: "탐사기자, 철학 연구자, 보안 전문가, 법의학자", good: "ENTJ, INFJ", bad: "ESFP, ISFP", celebrity: "데카르트, 니체", caution: "의심이 너무 많으면 아무것도 시작을 못 해요. 일단 해보세요." },
    "INTP-T-H": { rare: "N", pct: "3.0%", title: "몽상 과학자", desc: "현실보다 머릿속 이론이 더 흥미로운 유형. 관계보다 아이디어에 몰입.", keyword: ["이론", "몽상", "내향"], love: "연인이 먼저 다가와줘야 해요. 관계 유지에 에너지를 쏟는 게 힘들 수 있어요.", job: "이론 물리학자, SF 작가, 게임 기획자", good: "ENFJ, ENTJ", bad: "ESFJ, ESTJ", celebrity: "닐스 보어, 테슬라", caution: "현실 적응이 어려울 수 있어요. 실용적인 친구를 곁에 두세요." },
    "ENFJ-A-H": { rare: "SSR", pct: "0.4%", title: "인류의 선생님", desc: "사람들의 잠재력을 끌어내는 타고난 멘토. 함께하면 모두가 성장하는 느낌.", keyword: ["멘토", "성장", "영감"], love: "연인의 성장을 진심으로 응원해요. 자신이 희생하면서도 행복해하는 타입이에요.", job: "교사, 코치, HR 전문가, 정치인, 라이프코치", good: "INFP, ISFP", bad: "ISTP, INTP", celebrity: "오바마, 오프라 윈프리", caution: "너무 많이 주다가 정작 본인이 소진돼요. 나 자신도 챙기세요." },
    "ENFJ-A-C": { rare: "SR", pct: "0.7%", title: "카리스마 리더", desc: "사람을 끌어당기는 마력과 목표 달성 의지를 동시에 가진 유형.", keyword: ["카리스마", "리더십", "목표"], love: "연인을 열정적으로 사랑하고 관계에서 주도권을 가지려 해요.", job: "CEO, 정치인, 방송인, 스포츠 코치", good: "INFP, INFJ", bad: "ISTP, INTP", celebrity: "버락 오바마, 저스틴 트뤼도", caution: "주도권을 너무 쥐려 하면 상대방이 숨막혀할 수 있어요." },
    "ENFJ-T-H": { rare: "R", pct: "1.3%", title: "감정 스펀지", desc: "주변 사람들의 감정을 너무 잘 흡수해서 지치기도 하는 유형. 그래도 돕는 걸 멈출 수 없다.", keyword: ["공감", "헌신", "감수성"], love: "상대방의 기분을 자기 것처럼 느껴요. 연인이 힘들면 같이 힘들어요.", job: "상담사, 사회복지사, 간호사, 선생님", good: "INFP, ISFP", bad: "ENTJ, ESTJ", celebrity: "다이애나 왕세자비", caution: "감정 경계를 만드는 연습이 필요해요. 모든 걸 내 책임으로 느끼지 않아도 돼요." },
    "ENFJ-T-C": { rare: "R", pct: "1.5%", title: "완벽한 조율사", desc: "팀의 성과와 개인의 감정 모두를 챙기려다 혼자 번아웃 오는 유형.", keyword: ["조율", "완벽", "번아웃"], love: "연인과의 관계도 완벽하게 만들려다 오히려 갈등을 만들어요.", job: "프로젝트 매니저, 중재자, 이벤트 플래너", good: "INFP, INFJ", bad: "ISTP, INTP", celebrity: "마틴 루터 킹", caution: "완벽한 관계는 없어요. 불완전함을 받아들이는 연습을 해보세요." },
    "ENFP-A-H": { rare: "SR", pct: "0.9%", title: "에너지 태양", desc: "가는 곳마다 분위기를 밝히는 인간 태양. 모든 사람이 소중하고 세상이 아름답다.", keyword: ["에너지", "긍정", "따뜻함"], love: "새로운 사랑에 온몸을 던지는 타입이에요. 권태기가 오면 힘들어해요.", job: "방송인, 크리에이터, 마케터, 이벤트 플래너", good: "INFJ, INTJ", bad: "ISTJ, ISFJ", celebrity: "로빈 윌리엄스, 빌리 아이리시", caution: "에너지가 넘쳐서 시작은 잘 하지만 마무리가 약해요. 끝까지 해내는 연습을 하세요." },
    "ENFP-A-C": { rare: "SR", pct: "1.1%", title: "꿈 제조기", desc: "아이디어가 폭발하고 실행력도 있는 희귀한 조합. 다음 프로젝트가 항상 준비되어 있다.", keyword: ["아이디어", "실행", "열정"], love: "연애도 하나의 프로젝트처럼 신나게 임해요. 상대방을 놀라게 해주는 걸 좋아해요.", job: "스타트업 창업자, 광고 크리에이터, 작가, 연예인", good: "INFJ, INTJ", bad: "ISTJ, ESTJ", celebrity: "엘런 드제너러스", caution: "아이디어를 너무 자주 바꾸면 주변 사람들이 지쳐요." },
    "ENFP-T-H": { rare: "R", pct: "2.5%", title: "열정 과부하", desc: "모든 것에 열정적이지만 현실과 이상 사이에서 흔들리는 유형.", keyword: ["열정", "감성", "갈등"], love: "사랑할 때 세상 전부를 줄 것 같은 열정을 보여요. 하지만 감정 기복이 심해요.", job: "배우, 콘텐츠 크리에이터, 사회운동가", good: "INFJ, INTJ", bad: "ISTJ, ESTJ", celebrity: "앤 해서웨이", caution: "열정이 식으면 번아웃이 와요. 페이스 조절이 중요해요." },
    "ENFP-T-C": { rare: "N", pct: "3.2%", title: "산만한 천재", desc: "천재적인 아이디어가 넘치지만 집중력이 문제인 유형. ADHD 의심 1순위.", keyword: ["창의", "산만", "천재"], love: "연애도 즉흥적이에요. 계획 없는 데이트를 선호하고 자유로운 관계를 원해요.", job: "프리랜서 크리에이터, 아이디어 기획자, 예술가", good: "INFJ, ENFJ", bad: "ISTJ, ISFJ", celebrity: "짐 캐리", caution: "집중력을 키우는 훈련이 필요해요. 포모도로 기법을 써보세요." },
    "ENTJ-A-C": { rare: "SSR", pct: "0.5%", title: "타고난 황제", desc: "태어날 때부터 리더였던 유형. 모든 상황을 장악하고 목표를 향해 군단을 이끈다.", keyword: ["지배", "목표", "카리스마"], love: "연인에게도 목표 지향적이에요. 함께 성장하는 관계를 원해요.", job: "CEO, 군 장교, 정치인, 투자은행가", good: "INTP, INFP", bad: "INFP, ISFP", celebrity: "스티브 잡스, 나폴레옹", caution: "모든 걸 통제하려는 성향이 관계를 피로하게 만들어요." },
    "ENTJ-A-H": { rare: "SR", pct: "0.8%", title: "개혁하는 황제", desc: "강력한 리더십에 팀원을 챙기는 마음까지 갖춘 이상적인 보스.", keyword: ["리더십", "개혁", "팀워크"], love: "강하지만 따뜻한 면도 있어요. 연인을 진심으로 서포트하는 타입이에요.", job: "CEO, 스타트업 창업자, 사회개혁가", good: "INTP, INFP", bad: "ISFP, INFP", celebrity: "잭 웰치, 인디라 간디", caution: "바쁜 일상 속에 연인과의 시간을 챙기는 게 중요해요." },
    "ENTJ-T-C": { rare: "R", pct: "1.4%", title: "독재자 직전", desc: "완벽한 결과를 위해 과정도 사람도 통제하려는 유형. 부드러움이 필요하다.", keyword: ["통제", "완벽", "독재"], love: "연인에게 높은 기준을 요구하고 잔소리가 많을 수 있어요.", job: "경영진, 군사 전략가, 감사관", good: "INTP, INTJ", bad: "INFP, ISFP", celebrity: "도널드 트럼프", caution: "완벽함의 기준을 낮추면 삶이 훨씬 편해져요." },
    "ENTJ-T-H": { rare: "R", pct: "1.6%", title: "고민 많은 CEO", desc: "결단력 있는 리더이지만 내면에선 항상 더 잘할 수 있다는 압박감에 시달리는 유형.", keyword: ["리더십", "불안", "성장"], love: "연인 앞에서 약한 모습을 보이기 싫어해요. 사실 엄청 많이 신경 써요.", job: "CEO, 컨설턴트, 프로젝트 매니저", good: "INFP, INTP", bad: "ISFP, ESFP", celebrity: "앤젤라 메르켈", caution: "불완전한 자신을 받아들이는 연습이 필요해요." },
    "ENTP-A-C": { rare: "SR", pct: "1.2%", title: "논쟁 중독자", desc: "토론이 취미이자 삶의 낙인 유형. 반박을 위한 반박도 즐긴다.", keyword: ["논쟁", "분석", "도발"], love: "연인과 논쟁하는 것도 즐겨요. 지적으로 자극받는 관계를 원해요.", job: "변호사, 정치인, 토론자, 컨설턴트", good: "INFJ, INTJ", bad: "ISFJ, ESTJ", celebrity: "소크라테스, 볼테르", caution: "이기는 것보다 관계가 더 중요할 때도 있어요." },
    "ENTP-A-H": { rare: "SR", pct: "1.3%", title: "아이디어 폭탄", desc: "끝없이 아이디어를 쏟아내면서 팀의 에너지를 올리는 유형.", keyword: ["아이디어", "창의", "에너지"], love: "데이트도 창의적으로 계획해요. 매번 새로운 경험을 선물하는 연인이에요.", job: "스타트업 창업자, 마케터, R&D 기획자", good: "INFJ, INTJ", bad: "ISFJ, ESTJ", celebrity: "리처드 브랜슨", caution: "아이디어가 너무 많으면 실행이 안 돼요. 선택과 집중을 해보세요." },
    "ENTP-T-C": { rare: "R", pct: "2.2%", title: "천재 반항아", desc: "기존 시스템을 의심하고 부수려는 유형. 규칙보다 가능성을 믿는다.", keyword: ["반항", "천재", "혁신"], love: "틀에 박힌 연애를 싫어해요. 자유롭고 독립적인 관계를 원해요.", job: "해커, 혁신가, 사회운동가, 독립 연구자", good: "INFJ, INTJ", bad: "ISFJ, ESFJ", celebrity: "줄리안 어산지, 에드워드 스노든", caution: "반항을 위한 반항은 에너지 낭비예요." },
    "ENTP-T-H": { rare: "N", pct: "3.5%", title: "머리 복잡한 친구", desc: "아이디어는 많지만 불안감에 실행이 늦어지는 유형. 생각이 너무 많다.", keyword: ["분석", "불안", "가능성"], love: "마음에 드는 사람이 생겨도 분석하느라 타이밍을 놓쳐요.", job: "연구원, 기획자, 작가", good: "INFJ, ENFJ", bad: "ISFJ, ESTJ", celebrity: "우디 앨런", caution: "생각을 멈추고 일단 해보세요. 완벽한 타이밍은 없어요." },
    "ISTJ-A-C": { rare: "SR", pct: "1.5%", title: "철벽 관리자", desc: "규칙과 시스템으로 세상을 운영하는 유형. 흔들리지 않는 기둥 같은 존재.", keyword: ["규칙", "책임", "안정"], love: "연애에서도 약속을 철저히 지켜요. 신뢰를 가장 중요하게 여겨요.", job: "공무원, 회계사, 법조인, 군인, 감사관", good: "ESFP, ESTP", bad: "ENFP, INFP", celebrity: "조지 워싱턴, 앤젤라 메르켈", caution: "규칙에 너무 집착하면 변화에 적응하기 어려워요." },
    "ISTJ-A-H": { rare: "R", pct: "2.0%", title: "든든한 버팀목", desc: "말없이 묵묵히 주변을 지키는 유형. 있을 때는 몰랐다가 없어지면 가장 그리운 사람.", keyword: ["신뢰", "안정", "헌신"], love: "화려하지 않지만 매일 꾸준히 옆에 있어주는 연인이에요.", job: "공무원, 관리자, 의사, 엔지니어", good: "ESFP, ENFP", bad: "ENTP, ENFP", celebrity: "워렌 버핏", caution: "감정을 표현하는 연습을 해보세요. 행동만큼 말도 중요해요." },
    "ISTJ-T-C": { rare: "R", pct: "2.5%", title: "완벽주의 공무원", desc: "실수 하나도 용납 못 하는 꼼꼼함의 끝판왕. 본인도 힘들고 주변도 힘들다.", keyword: ["완벽", "꼼꼼", "규율"], love: "연인의 실수도 잘 못 넘어가요. 기준을 조금 낮추면 관계가 훨씬 편해져요.", job: "감사원, 품질관리자, 세무사, 법의학자", good: "ESFP, ENFP", bad: "ENFP, INFP", celebrity: "칸트", caution: "완벽하지 않아도 괜찮아요. 80점도 훌륭한 점수예요." },
    "ISTJ-T-H": { rare: "N", pct: "4.0%", title: "걱정 많은 성실맨", desc: "성실하게 다 해내지만 항상 뭔가 부족한 것 같아 불안한 유형.", keyword: ["성실", "걱정", "책임"], love: "연인을 위해 뭐든 열심히 하지만 인정받지 못할까봐 불안해해요.", job: "회계사, 행정직, 관리자", good: "ESFP, ENFJ", bad: "ENTP, ENFP", celebrity: "앤더슨 쿠퍼", caution: "충분히 잘 하고 있어요. 자신을 좀 더 믿어보세요." },
    "ISFJ-A-H": { rare: "R", pct: "2.0%", title: "세상의 수호자", desc: "조용히 모든 사람을 챙기는 진짜 어른. 받는 것보다 주는 게 더 행복한 유형.", keyword: ["헌신", "보호", "따뜻함"], love: "연인을 위해 모든 걸 기억하고 챙겨줘요. 본인이 받는 건 어색해해요.", job: "간호사, 초등교사, 사회복지사, 상담사", good: "ESTP, ESFP", bad: "ENTP, ENTJ", celebrity: "마더 테레사, 케이트 미들턴", caution: "주기만 하면 소진돼요. 받는 것도 연습하세요." },
    "ISFJ-A-C": { rare: "R", pct: "2.2%", title: "숨은 프로", desc: "겸손하지만 내면에 강한 자기 기준이 있는 유형. 조용히 최고의 결과를 낸다.", keyword: ["성실", "겸손", "프로"], love: "조용하지만 연인을 위한 준비를 꼼꼼히 해요.", job: "의료인, 연구원, 전문직", good: "ESTP, ENFP", bad: "ENTP, ENTJ", celebrity: "비욘세", caution: "겸손함이 지나치면 자신의 가치를 인정받지 못해요." },
    "ISFJ-T-H": { rare: "N", pct: "3.8%", title: "과보호 엄마형", desc: "걱정이 사랑인 유형. 너무 많이 챙겨줘서 오히려 부담 줄 때도 있다.", keyword: ["걱정", "사랑", "헌신"], love: "연인에게 지나치게 많이 물어봐요. 표현 방식을 좀 더 가볍게 해보세요.", job: "교사, 간호사, 상담사", good: "ESTP, ESFP", bad: "ENTP, ENTJ", celebrity: "로사 파크스", caution: "걱정을 사랑으로 표현하되, 상대방의 공간도 존중해주세요." },
    "ISFJ-T-C": { rare: "N", pct: "4.2%", title: "참는 게 미덕", desc: "다 알면서도 참고 넘어가는 유형. 쌓이다 보면 언젠가 폭발한다.", keyword: ["인내", "억압", "배려"], love: "상처받아도 표현을 못 해요. 감정을 적절히 표현하는 연습이 필요해요.", job: "사무직, 서비스직, 의료 보조", good: "ESTP, ENFP", bad: "ENTJ, ENTP", celebrity: "비틀즈 링고 스타", caution: "억압된 감정은 반드시 출구를 찾아요. 건강하게 표현하는 법을 배우세요." },
    "ISTP-A-C": { rare: "SR", pct: "1.4%", title: "쿨한 장인", desc: "말보다 손으로 보여주는 유형. 어떤 문제든 혼자 해결하는 독립적인 전문가.", keyword: ["독립", "실용", "쿨함"], love: "연애에서 독립적인 공간을 중요시해요. 집착하는 연인은 힘들어요.", job: "엔지니어, 파일럿, 외과의사, 프로그래머, 운동선수", good: "ENFJ, ESFJ", bad: "ENFJ, ENTJ", celebrity: "클린트 이스트우드, 키아누 리브스", caution: "감정 표현이 너무 없으면 연인이 혼자라는 느낌을 받아요." },
    "ISTP-A-H": { rare: "R", pct: "2.0%", title: "말없는 협력자", desc: "혼자 잘하지만 팀을 위해서도 기꺼이 헌신하는 유형. 과묵하지만 믿음직하다.", keyword: ["실용", "신뢰", "협력"], love: "말보다 행동으로 챙겨줘요. 표현이 서툴 뿐 깊이 사랑해요.", job: "기술직, 의료인, 스포츠 코치", good: "ENFJ, ESFJ", bad: "ENTJ, ENFP", celebrity: "마이클 조던", caution: "팀을 위해 너무 희생하지 않도록 자신도 챙기세요." },
    "ISTP-T-C": { rare: "R", pct: "2.3%", title: "냉소적 현실주의자", desc: "세상을 있는 그대로 보는 유형. 감상 따위는 없고 오직 사실만 본다.", keyword: ["현실", "냉소", "분석"], love: "로맨틱한 것을 어색해해요. 실용적인 방식으로 사랑을 표현해요.", job: "형사, 외과의사, 군인, 기술 전문가", good: "ENFJ, ESFJ", bad: "INFP, ENFP", celebrity: "제임스 본드 (캐릭터)", caution: "냉소주의가 모든 것의 즐거움을 빼앗을 수 있어요." },
    "ISTP-T-H": { rare: "N", pct: "3.2%", title: "감정 숨긴 공학도", desc: "감정이 없는 척하지만 사실 많이 신경 쓰는 유형. 표현이 서툴 뿐이다.", keyword: ["내면", "억압", "논리"], love: "티는 안 내지만 연인의 SNS를 다 보고 있어요.", job: "개발자, 엔지니어, 분석가", good: "ENFJ, ESFJ", bad: "ENFP, INFP", celebrity: "키아누 리브스", caution: "감정을 숨기는 습관이 관계를 멀어지게 해요." },
    "ISFP-A-H": { rare: "R", pct: "2.3%", title: "감성 아티스트", desc: "세상을 아름답게 보는 따뜻한 예술가. 경쟁보다 자기만의 세계가 더 소중하다.", keyword: ["감성", "예술", "자유"], love: "연인에게 소소하지만 감동적인 것들을 선물해요. 진심이 담긴 작은 것들이 특기예요.", job: "사진작가, 화가, 음악가, 인테리어 디자이너", good: "ENFJ, ENTJ", bad: "ESTJ, ENTJ", celebrity: "마이클 잭슨, 프리다 칼로", caution: "갈등을 피하다 보면 쌓인 감정이 터질 수 있어요. 표현하는 연습을 하세요." },
    "ISFP-A-C": { rare: "R", pct: "2.5%", title: "조용한 승부사", desc: "겉은 평화로워 보이지만 내면엔 강한 경쟁심이 있는 유형.", keyword: ["승부", "감성", "독립"], love: "독립적인 공간을 중요시해요. 간섭받지 않는 자유로운 연애를 원해요.", job: "운동선수, 프리랜서 디자이너, 독립 예술가", good: "ENFJ, ENTJ", bad: "ESTJ, ISFJ", celebrity: "리오넬 메시", caution: "경쟁심이 지나치면 불필요한 스트레스를 만들어요." },
    "ISFP-T-H": { rare: "N", pct: "4.5%", title: "예민한 힐러", desc: "타인의 고통에 지나치게 공감해서 같이 힘들어지는 유형.", keyword: ["공감", "예민", "치유"], love: "연인의 감정을 자기 것처럼 느껴요. 함께 울고 함께 웃는 타입이에요.", job: "상담사, 간호사, 동물 치료사", good: "ENFJ, ESFJ", bad: "ESTJ, ENTJ", celebrity: "다이애나 왕세자비", caution: "감정 경계를 만드는 게 자신을 보호하는 방법이에요." },
    "ISFP-T-C": { rare: "N", pct: "5.0%", title: "고독한 예술가", desc: "인정받고 싶지만 상처받기 싫어서 혼자 작업하는 유형.", keyword: ["고독", "예술", "인정욕구"], love: "먼저 다가가지 못하고 기다리는 타입이에요. 상대방이 먼저 다가와줘야 해요.", job: "독립 예술가, 작가, 개인 창작자", good: "ENFJ, ENTJ", bad: "ESTJ, ESTP", celebrity: "반 고흐", caution: "고독 속에서 성장하지만 때로는 나와야 해요." },
    "ESTJ-A-C": { rare: "SR", pct: "1.8%", title: "살아있는 규정집", desc: "규칙과 질서의 화신. 모든 것이 제자리에 있어야 직성이 풀리는 유형.", keyword: ["규율", "질서", "통제"], love: "연애에서도 계획적이에요. 즉흥적인 변화를 힘들어해요.", job: "판사, 군 장교, 경영자, 감사관, 행정가", good: "ISFP, INFP", bad: "INFP, ENFP", celebrity: "힐러리 클린턴, 율리우스 카이사르", caution: "융통성 없는 모습이 주변을 피로하게 해요." },
    "ESTJ-A-H": { rare: "R", pct: "2.5%", title: "믿음직한 대장", desc: "강한 리더십과 팀원 배려를 동시에 갖춘 현실적인 리더.", keyword: ["리더십", "신뢰", "실용"], love: "연인을 책임지고 보호하는 것을 좋아해요.", job: "관리자, 경찰, 군인, 사업가", good: "ISFP, INFP", bad: "INFP, ENFP", celebrity: "드와이트 아이젠하워", caution: "때론 연인에게 결정권을 넘겨주는 것도 배려예요." },
    "ESTJ-T-C": { rare: "R", pct: "2.8%", title: "꼰대 전 단계", desc: "내 방식이 옳다는 확신이 강한 유형. 아직은 괜찮지만 조심해야 한다.", keyword: ["고집", "원칙", "통제"], love: "내 방식대로 연애하려는 경향이 있어요. 상대방 방식도 존중해보세요.", job: "관리자, 감사역, 규정 담당자", good: "ISFP, INFP", bad: "ENFP, INFP", celebrity: "리처드 닉슨", caution: "다양성을 인정하면 삶이 더 풍요로워져요." },
    "ESTJ-T-H": { rare: "N", pct: "4.0%", title: "걱정하는 반장", desc: "책임감이 강해서 모든 걸 완벽히 해내려다 혼자 번아웃 오는 유형.", keyword: ["책임", "완벽", "불안"], love: "연인을 위해 걱정을 달고 살아요. 연인의 행복이 곧 나의 행복이에요.", job: "관리자, 팀장, 행정직", good: "ISFP, INFP", bad: "ENFP, ENTP", celebrity: "앤 해서웨이", caution: "혼자 다 짊어지지 않아도 돼요. 믿고 맡겨보세요." },
    "ESFJ-A-H": { rare: "R", pct: "2.8%", title: "마을 이장님", desc: "모두를 챙기고 분위기를 살리는 커뮤니티의 핵심. 없으면 섭섭한 존재.", keyword: ["배려", "화합", "사교"], love: "연인의 주변 사람들까지 챙기는 따뜻한 타입이에요.", job: "교사, 간호사, HR 담당자, 이벤트 기획자", good: "ISFP, ISTP", bad: "INTP, ISTP", celebrity: "테일러 스위프트, 젠니퍼 가너", caution: "모든 사람을 만족시키려다 정작 나를 잃어버릴 수 있어요." },
    "ESFJ-A-C": { rare: "R", pct: "2.5%", title: "인기쟁이 반장", desc: "인기도 있고 추진력도 있는 유형. 목표를 향해 사람들을 자연스럽게 이끈다.", keyword: ["인기", "추진력", "사교"], love: "연인과 함께 무언가를 이뤄나가는 것을 좋아해요.", job: "세일즈, 마케터, 이벤트 플래너, 교사", good: "ISFP, ISTP", bad: "INTP, INTJ", celebrity: "엘튼 존", caution: "인기에 너무 의존하면 자아를 잃을 수 있어요." },
    "ESFJ-T-H": { rare: "N", pct: "5.2%", title: "눈치 100단", desc: "모든 사람의 기분을 파악하느라 정작 내 감정을 챙기지 못하는 유형.", keyword: ["눈치", "배려", "희생"], love: "연인의 기분을 귀신같이 알아챠요. 하지만 자신의 감정은 표현 못 해요.", job: "상담사, 교사, 서비스직, 의료 보조", good: "ISTP, ISFP", bad: "INTP, INTJ", celebrity: "몇몇 아이돌", caution: "눈치 보느라 정작 내가 원하는 게 뭔지 잊지 마세요." },
    "ESFJ-T-C": { rare: "N", pct: "5.5%", title: "인정욕구 최강", desc: "칭찬과 인정이 삶의 원동력인 유형. 무시당하면 정말 힘들다.", keyword: ["인정욕구", "사교", "불안"], love: "연인의 칭찬 한마디가 하루를 살게 해요. 인정받는 관계를 원해요.", job: "서비스직, 교사, 영업직", good: "ISTP, ISFP", bad: "INTP, INTJ", celebrity: "마릴린 먼로", caution: "타인의 인정 없이도 나는 충분히 가치 있는 사람이에요." },
    "ESTP-A-C": { rare: "SR", pct: "1.6%", title: "타고난 승부사", desc: "어떤 상황에서도 기회를 포착하고 행동으로 옮기는 유형. 현장의 왕자.", keyword: ["승부", "행동", "기회"], love: "연애도 게임처럼 즐기는 경향이 있어요. 도전적인 연인을 원해요.", job: "주식 트레이더, 영업인, 기업인, 스포츠선수", good: "ISFJ, ISTJ", bad: "INFJ, INTJ", celebrity: "도널드 트럼프, 어니스트 헤밍웨이", caution: "즉흥적인 행동이 주변 사람들을 힘들게 할 수 있어요." },
    "ESTP-A-H": { rare: "R", pct: "2.2%", title: "팀의 엔진", desc: "에너지 넘치는 행동파이면서 팀을 위해 불태우는 유형.", keyword: ["에너지", "행동", "팀워크"], love: "연인을 위해 직접 문제를 해결해주는 스타일이에요.", job: "영업인, 스포츠 코치, 기업가", good: "ISFJ, ISTJ", bad: "INFJ, INTJ", celebrity: "잭 니콜슨", caution: "팀을 위해 달리다 자신을 잃지 않도록 해요." },
    "ESTP-T-C": { rare: "R", pct: "2.6%", title: "충동적 도박사", desc: "스릴을 즐기고 즉흥적으로 행동하는 유형. 후회는 나중에 한다.", keyword: ["충동", "스릴", "현재"], love: "지루한 연애는 못 버텨요. 매번 새로운 자극을 원해요.", job: "트레이더, 모험가, 스턴트맨", good: "ISFJ, ISTJ", bad: "INFJ, INFP", celebrity: "제임스 딘", caution: "충동적인 결정 전에 3초만 생각해보세요." },
    "ESTP-T-H": { rare: "N", pct: "3.8%", title: "관심종자 산만형", desc: "에너지는 넘치지만 집중이 안 되고 인정받고 싶어하는 유형.", keyword: ["산만", "에너지", "인정"], love: "연인의 관심을 독차지하고 싶어해요.", job: "방송인, 영업직, 이벤트 진행자", good: "ISFJ, ISTJ", bad: "INFJ, INTJ", celebrity: "아무 예능인", caution: "주목받으려는 욕구보다 진정성 있는 관계에 집중해보세요." },
    "ESFP-A-H": { rare: "R", pct: "2.5%", title: "인간 축제", desc: "존재 자체가 파티인 유형. 어딜 가든 웃음과 에너지를 만든다.", keyword: ["에너지", "즐거움", "사교"], love: "연인과 함께하는 모든 순간을 특별하게 만들어요.", job: "연예인, 이벤트 플래너, 관광가이드, 유튜버", good: "ISFJ, ISTJ", bad: "INTJ, INFJ", celebrity: "아델, 제이미 폭스", caution: "즐거움을 추구하다 책임을 미루지 않도록 해요." },
    "ESFP-A-C": { rare: "R", pct: "2.7%", title: "무대 위의 주인공", desc: "주목받는 걸 좋아하고 경쟁에서도 뒤처지기 싫어하는 유형.", keyword: ["주목", "경쟁", "활기"], love: "연인에게 최고의 파트너가 되고 싶어해요. 인정받고 싶은 마음이 강해요.", job: "연예인, 스포츠선수, 방송인, 인플루언서", good: "ISFJ, ISTJ", bad: "INTJ, INTP", celebrity: "마일리 사이러스", caution: "주목받는 것에 집착하면 진짜 나를 잃을 수 있어요." },
    "ESFP-T-H": { rare: "N", pct: "5.0%", title: "감성 폭탄", desc: "기쁨도 슬픔도 온몸으로 표현하는 유형. 감정 기복이 크지만 진심이다.", keyword: ["감성", "표현", "진심"], love: "감정 기복이 심해서 연인이 당황할 수 있어요. 하지만 사랑도 그만큼 진심이에요.", job: "배우, 가수, 상담사, 유튜버", good: "ISFJ, ISTJ", bad: "INTJ, INTP", celebrity: "리한나", caution: "감정을 표현하는 것은 좋지만 조절하는 연습도 필요해요." },
    "ESFP-T-C": { rare: "N", pct: "5.8%", title: "핵인싸 부적응자", desc: "사람을 좋아하지만 상처도 잘 받는 유형. 겉은 밝지만 속은 복잡하다.", keyword: ["인싸", "상처", "복잡"], love: "사랑에 빠지면 올인하지만 상처도 크게 받아요.", job: "서비스직, 영업, 방송", good: "ISFJ, ISTJ", bad: "INTJ, INTP", celebrity: "브리트니 스피어스", caution: "겉으로 밝게 보이는 게 다가 아니에요. 나 자신을 솔직하게 들여다보세요." },
  };
  return typeMap[key] || { rare: "N", pct: "3.0%", title: "신비로운 유형", desc: "아직 분석이 완료되지 않은 희귀한 유형이에요.", keyword: ["신비", "희귀", "독특"], love: "독특한 매력을 가지고 있어요.", job: "다양한 분야", good: "ENFP", bad: "없음", celebrity: "미분류", caution: "자신만의 길을 개척해나가세요." };
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

            {/* 연애 스타일 */}
            <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(244,114,182,0.2)", borderRadius: "16px", padding: "16px 18px", marginBottom: "10px" }}>
              <div style={{ fontSize: "0.68rem", color: "#f472b6", marginBottom: "8px", letterSpacing: "0.08em", fontWeight: 700 }}>💕 연애 스타일</div>
              <p style={{ color: "#9ca3af", fontSize: "0.84rem", lineHeight: 1.7, margin: 0 }}>{result.love}</p>
            </div>

            {/* 추천 직업 */}
            <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(52,211,153,0.2)", borderRadius: "16px", padding: "16px 18px", marginBottom: "10px" }}>
              <div style={{ fontSize: "0.68rem", color: "#34d399", marginBottom: "8px", letterSpacing: "0.08em", fontWeight: 700 }}>💼 추천 직업</div>
              <p style={{ color: "#9ca3af", fontSize: "0.84rem", lineHeight: 1.7, margin: 0 }}>{result.job}</p>
            </div>

            {/* 궁합 */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "10px" }}>
              <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(52,211,153,0.2)", borderRadius: "14px", padding: "14px" }}>
                <div style={{ fontSize: "0.65rem", color: "#34d399", fontWeight: 700, marginBottom: "6px" }}>💚 찰떡 궁합</div>
                <div style={{ color: "#f3f4f6", fontSize: "0.9rem", fontWeight: 700 }}>{result.good}</div>
              </div>
              <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(248,113,113,0.2)", borderRadius: "14px", padding: "14px" }}>
                <div style={{ fontSize: "0.65rem", color: "#f87171", fontWeight: 700, marginBottom: "6px" }}>💔 최악 궁합</div>
                <div style={{ color: "#f3f4f6", fontSize: "0.9rem", fontWeight: 700 }}>{result.bad}</div>
              </div>
            </div>

            {/* 유명인 닮은꼴 */}
            <div style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${accentColor}22`, borderRadius: "14px", padding: "14px 18px", marginBottom: "10px", display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{ fontSize: "1.4rem" }}>🌟</div>
              <div>
                <div style={{ fontSize: "0.65rem", color: accentColor, marginBottom: "3px", fontWeight: 700 }}>유명인 닮은꼴</div>
                <div style={{ color: "#f3f4f6", fontSize: "0.88rem", fontWeight: 600 }}>{result.celebrity}</div>
              </div>
            </div>

            {/* 주의사항 */}
            <div style={{ background: "rgba(251,191,36,0.05)", border: "1px solid rgba(251,191,36,0.2)", borderRadius: "14px", padding: "14px 18px", marginBottom: "14px" }}>
              <div style={{ fontSize: "0.65rem", color: "#fbbf24", fontWeight: 700, marginBottom: "6px" }}>⚠️ 이것만 주의하세요</div>
              <p style={{ color: "#9ca3af", fontSize: "0.84rem", lineHeight: 1.7, margin: 0 }}>{result.caution}</p>
            </div>

            {/* MBTI 분석 바 */}
            <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "16px", padding: "16px 18px", marginBottom: "14px" }}>
              <div style={{ fontSize: "0.68rem", color: "#4b5563", marginBottom: "12px", letterSpacing: "0.08em" }}>📊 유형 분석</div>
              {[
                { label: result.mbti[0], desc: result.mbti[0] === "E" ? "외향형" : "내향형", pct: 70 },
                { label: result.mbti[1], desc: result.mbti[1] === "S" ? "감각형" : "직관형", pct: 65 },
                { label: result.mbti[2], desc: result.mbti[2] === "T" ? "사고형" : "감정형", pct: 72 },
                { label: result.mbti[3], desc: result.mbti[3] === "J" ? "판단형" : "인식형", pct: 60 },
                { label: result.at, desc: result.at === "A" ? "자기확신형" : "민감형", pct: 68 },
                { label: result.hc, desc: result.hc === "H" ? "조화형" : "경쟁형", pct: 63 },
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                  <span style={{ color: accentColor, fontWeight: 700, fontSize: "0.85rem", minWidth: "16px" }}>{item.label}</span>
                  <div style={{ flex: 1, height: "4px", background: "rgba(255,255,255,0.05)", borderRadius: "999px" }}>
                    <div style={{ height: "100%", width: `${item.pct}%`, background: `linear-gradient(90deg, ${accentColor}, ${accentColor}88)`, borderRadius: "999px" }} />
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
