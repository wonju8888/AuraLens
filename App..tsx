import React, { useState, useEffect } from 'react';
import { Camera, Sparkles, Share2, Download, ArrowLeft, Users, BarChart3 } from 'lucide-react';

const App = () => {
  const [step, setStep] = useState('intro');
  const [answers, setAnswers] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [result, setResult] = useState(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showStatsModal, setShowStatsModal] = useState(false);
  const [showCompareModal, setShowCompareModal] = useState(false);
  const [friendAuraCode, setFriendAuraCode] = useState('');
  const [myAuraCode, setMyAuraCode] = useState('');

  // 아우라별 통계 (가상 데이터 - 실제로는 서버에서 가져와야 함)
  const auraStats = {
    '사파이어 아우라': { percentage: 8, rarity: '희귀' },
    '에메랄드 아우라': { percentage: 15, rarity: '일반' },
    '아쿠아마린 아우라': { percentage: 12, rarity: '일반' },
    '루비 아우라': { percentage: 6, rarity: '매우 희귀' },
    '로즈 골드 아우라': { percentage: 18, rarity: '흔함' },
    '피치 아우라': { percentage: 14, rarity: '일반' },
    '오팔 아우라': { percentage: 5, rarity: '매우 희귀' },
    '라벤더 아우라': { percentage: 11, rarity: '일반' },
    '펄 아우라': { percentage: 9, rarity: '희귀' },
    '오로라 아우라': { percentage: 4, rarity: '전설' },
    '터키석 아우라': { percentage: 7, rarity: '희귀' },
    '코랄 아우라': { percentage: 13, rarity: '일반' },
    '프리즘 아우라': { percentage: 3, rarity: '전설' },
    '시트린 아우라': { percentage: 10, rarity: '일반' },
    '인디고 아우라': { percentage: 5, rarity: '매우 희귀' }
  };

  const questions = [
    {
      id: 'mood',
      question: '오늘 당신의 기분은?',
      // 현재 감정 상태를 파악 - 사용자의 즉각적인 정서적 에너지 측정
      // warm: 활동적이고 외향적인 에너지
      // cool: 차분하고 내성적인 에너지
      // neutral: 균형잡힌 복합적 에너지
      options: [
        { value: 'peaceful', label: '평온하고 차분해요', color: '#A8E6CF', temp: 'cool' },
        { value: 'energetic', label: '에너지 넘쳐요!', color: '#FFD93D', temp: 'warm' },
        { value: 'creative', label: '창의적이고 영감이 가득해요', color: '#C77DFF', temp: 'cool' },
        { value: 'contemplative', label: '깊이 생각하고 있어요', color: '#6C5CE7', temp: 'cool' },
        { value: 'passionate', label: '열정적이고 뜨거워요', color: '#FF6B6B', temp: 'warm' },
        { value: 'mystical', label: '신비롭고 몽환적이에요', color: '#9D84B7', temp: 'neutral' }
      ]
    },
    {
      id: 'activity',
      question: '주말에 가장 하고 싶은 활동은?',
      // 선호하는 활동 유형으로 라이프스타일과 에너지 소비 패턴 파악
      // 혼자 vs 함께, 정적 vs 동적, 실내 vs 야외 성향 측정
      options: [
        { value: 'nature', label: '자연 속에서 산책하기', color: '#7BC96F', temp: 'cool' },
        { value: 'social', label: '친구들과 즐거운 시간', color: '#FF6B6B', temp: 'warm' },
        { value: 'creative', label: '예술 작품 만들기', color: '#C77DFF', temp: 'neutral' },
        { value: 'rest', label: '집에서 편히 쉬기', color: '#74B9FF', temp: 'cool' },
        { value: 'adventure', label: '새로운 곳 탐험하기', color: '#FFA07A', temp: 'warm' },
        { value: 'learning', label: '책 읽고 공부하기', color: '#9370DB', temp: 'neutral' }
      ]
    },
    {
      id: 'value',
      question: '당신에게 가장 중요한 가치는?',
      // 핵심 가치관 파악 - 삶의 우선순위와 내적 동기 측정
      // 인생에서 중요하게 여기는 것이 아우라 색상에 큰 영향을 미침
      options: [
        { value: 'harmony', label: '조화와 평화', color: '#A8E6CF', temp: 'cool' },
        { value: 'passion', label: '열정과 도전', color: '#FF6B6B', temp: 'warm' },
        { value: 'wisdom', label: '지혜와 성장', color: '#6C5CE7', temp: 'cool' },
        { value: 'connection', label: '사랑과 연결', color: '#FF9FF3', temp: 'warm' },
        { value: 'freedom', label: '자유와 독립', color: '#87CEEB', temp: 'cool' },
        { value: 'creativity', label: '창의성과 표현', color: '#DDA0DD', temp: 'neutral' }
      ]
    },
    {
      id: 'element',
      question: '가장 끌리는 자연 요소는?',
      // 원초적 성향 파악 - 4원소 이론 기반 성격 분석
      // 물(유연함), 불(열정), 땅(안정), 공기(자유), 빛(희망), 수정(순수)
      options: [
        { value: 'water', label: '물', color: '#74B9FF', temp: 'cool' },
        { value: 'fire', label: '불', color: '#FF6B6B', temp: 'warm' },
        { value: 'earth', label: '땅', color: '#8B7355', temp: 'neutral' },
        { value: 'air', label: '공기', color: '#E0F7FA', temp: 'cool' },
        { value: 'light', label: '빛', color: '#FFE66D', temp: 'warm' },
        { value: 'crystal', label: '수정', color: '#B0E0E6', temp: 'cool' }
      ]
    },
    {
      id: 'time',
      question: '가장 좋아하는 시간대는?',
      // 생체 리듬과 에너지 피크 시간 파악
      // 아침형 vs 저녁형 인간, 활동 패턴, 감성적 순간 선호도 측정
      options: [
        { value: 'dawn', label: '새벽', color: '#B0C4DE', temp: 'cool' },
        { value: 'morning', label: '아침', color: '#FFD700', temp: 'warm' },
        { value: 'afternoon', label: '오후', color: '#FF9A76', temp: 'warm' },
        { value: 'sunset', label: '석양', color: '#FF6B9D', temp: 'warm' },
        { value: 'night', label: '밤', color: '#4A148C', temp: 'cool' },
        { value: 'midnight', label: '자정', color: '#1A237E', temp: 'cool' }
      ]
    },
    {
      id: 'place',
      question: '가장 평화로운 장소는?',
      // 심리적 안정감을 느끼는 환경 파악
      // 넓은 공간 vs 아늑한 공간, 개방성 vs 보호성 성향 측정
      options: [
        { value: 'ocean', label: '바다', color: '#0077BE', temp: 'cool' },
        { value: 'mountain', label: '산', color: '#2E7D32', temp: 'cool' },
        { value: 'forest', label: '숲', color: '#4CAF50', temp: 'cool' },
        { value: 'desert', label: '사막', color: '#D4A574', temp: 'warm' },
        { value: 'garden', label: '정원', color: '#81C784', temp: 'cool' },
        { value: 'sky', label: '하늘', color: '#87CEEB', temp: 'cool' }
      ]
    },
    {
      id: 'season',
      question: '가장 좋아하는 계절은?',
      // 계절 선호도로 성격의 순환성과 변화 수용도 파악
      // 봄(새로움), 여름(열정), 가을(성숙), 겨울(고요) 각각의 에너지 의미
      options: [
        { value: 'spring', label: '봄', color: '#FFB7CE', temp: 'warm' },
        { value: 'summer', label: '여름', color: '#FFD93D', temp: 'warm' },
        { value: 'autumn', label: '가을', color: '#D4761F', temp: 'warm' },
        { value: 'winter', label: '겨울', color: '#B0E0E6', temp: 'cool' }
      ]
    },
    {
      id: 'emotion',
      question: '가장 자주 느끼는 감정은?',
      // 주된 정서 상태 파악 - 감정의 기본 색조 측정
      // 자주 느끼는 감정이 아우라의 기본 색상을 결정하는 핵심 요소
      options: [
        { value: 'joy', label: '기쁨', color: '#FFE66D', temp: 'warm' },
        { value: 'calm', label: '평온', color: '#A8E6CF', temp: 'cool' },
        { value: 'excitement', label: '흥분', color: '#FF6B6B', temp: 'warm' },
        { value: 'curiosity', label: '호기심', color: '#9C88FF', temp: 'neutral' },
        { value: 'compassion', label: '연민', color: '#FFB6C1', temp: 'warm' },
        { value: 'wonder', label: '경이', color: '#B19CD9', temp: 'neutral' }
      ]
    }
  ];

  // 아우라 코드 생성 (공유용)
  useEffect(() => {
    if (result) {
      // 한글을 안전하게 인코딩
      const encoder = new TextEncoder();
      const data = encoder.encode(result.auraName);
      const hashCode = Array.from(data)
        .reduce((acc, byte) => acc + byte, 0)
        .toString(36)
        .toUpperCase()
        .substring(0, 8)
        .padEnd(8, '0');
      setMyAuraCode(hashCode);
    }
  }, [result]);

  // 아우라 궁합 계산
  const calculateCompatibility = (aura1, aura2) => {
    const compatibilityMap = {
      '사파이어 아우라': ['에메랄드 아우라', '라벤더 아우라', '인디고 아우라'],
      '에메랄드 아우라': ['사파이어 아우라', '아쿠아마린 아우라', '펄 아우라'],
      '아쿠아마린 아우라': ['에메랄드 아우라', '터키석 아우라', '코랄 아우라'],
      '루비 아우라': ['로즈 골드 아우라', '시트린 아우라', '피치 아우라'],
      '로즈 골드 아우라': ['루비 아우라', '피치 아우라', '코랄 아우라'],
      '피치 아우라': ['로즈 골드 아우라', '루비 아우라', '시트린 아우라'],
      '오팔 아우라': ['프리즘 아우라', '오로라 아우라', '라벤더 아우라'],
      '라벤더 아우라': ['오팔 아우라', '사파이어 아우라', '인디고 아우라'],
      '펄 아우라': ['에메랄드 아우라', '아쿠아마린 아우라', '라벤더 아우라'],
      '오로라 아우라': ['프리즘 아우라', '오팔 아우라', '터키석 아우라'],
      '터키석 아우라': ['아쿠아마린 아우라', '오로라 아우라', '코랄 아우라'],
      '코랄 아우라': ['로즈 골드 아우라', '터키석 아우라', '피치 아우라'],
      '프리즘 아우라': ['오로라 아우라', '오팔 아우라', '인디고 아우라'],
      '시트린 아우라': ['루비 아우라', '로즈 골드 아우라', '피치 아우라'],
      '인디고 아우라': ['사파이어 아우라', '라벤더 아우라', '프리즘 아우라']
    };

    const compatible = compatibilityMap[aura1] || [];
    if (compatible.includes(aura2)) {
      return { score: 95, message: '환상의 궁합! 💖', description: '두 아우라가 완벽하게 조화를 이룹니다.' };
    } else if (aura1 === aura2) {
      return { score: 85, message: '같은 아우라! ✨', description: '서로를 깊이 이해할 수 있습니다.' };
    } else if (Math.random() > 0.5) {
      return { score: 70, message: '좋은 궁합 😊', description: '서로 다른 매력으로 균형을 맞춥니다.' };
    } else {
      return { score: 55, message: '보완 관계 🌈', description: '서로의 부족한 면을 채워줍니다.' };
    }
  };
  const auraDatabase = {
    // 차가운 계열 (cool dominant)
    'cool-high': {
      auraName: '사파이어 아우라',
      hexCode: '#0F52BA',
      shortPersonality: '당신은 깊이 있고 지혜로운 에너지를 가진 사람입니다.',
      detailedDescription: '당신의 아우라는 깊은 바다의 사파이어처럼 신비롭고 강력합니다. 차분하고 이성적인 판단력으로 주변 사람들에게 신뢰를 주며, 깊은 통찰력으로 문제의 본질을 꿰뚫어봅니다. 당신은 감정에 휩쓸리지 않고 냉철하게 상황을 분석하는 능력이 뛰어납니다.\n\n조용하지만 강한 카리스마를 가지고 있으며, 진정한 리더십을 발휘합니다. 지적 호기심이 왕성하고 끊임없이 배우며 성장하는 사람입니다.',
      socialCaption: '나의 아우라는 사파이어! 💎 깊이 있고 지혜로운 에너지를 가진 나를 발견했어요. 당신의 아우라는 어떤 색일까요?',
      hashtags: ['#아우라', '#아우라분석', '#AuraLens', '#사파이어아우라', '#성격테스트', '#MBTI', '#나의색깔'],
      gradientColors: ['#0F52BA', '#4682B4']
    },
    'cool-medium': {
      auraName: '에메랄드 아우라',
      hexCode: '#50C878',
      shortPersonality: '당신은 평온하고 치유의 에너지를 가진 사람입니다.',
      detailedDescription: '당신의 아우라는 싱그러운 숲의 에메랄드처럼 생명력과 치유의 에너지로 가득합니다. 주변 사람들에게 평화와 안정감을 주는 특별한 능력이 있으며, 자연스럽게 사람들의 마음을 편안하게 만듭니다. 균형 잡힌 시각으로 세상을 바라봅니다.\n\n성장과 발전을 추구하면서도 조화를 잃지 않는 사람입니다. 당신의 존재 자체가 주변에 긍정적인 영향을 미치며, 힐링의 에너지를 전파합니다.',
      socialCaption: '나의 아우라는 에메랄드! 🌿 평온하고 치유의 에너지를 가진 나를 발견했어요.',
      hashtags: ['#아우라', '#아우라분석', '#AuraLens', '#에메랄드아우라', '#힐링', '#평온', '#치유'],
      gradientColors: ['#50C878', '#A8E6CF']
    },
    'cool-low': {
      auraName: '아쿠아마린 아우라',
      hexCode: '#7FFFD4',
      shortPersonality: '당신은 맑고 순수한 에너지를 가진 사람입니다.',
      detailedDescription: '당신의 아우라는 투명한 바닷물의 아쿠아마린처럼 맑고 청량합니다. 순수하고 진실된 마음으로 세상을 대하며, 거짓이나 꾸밈이 없는 솔직함이 매력입니다. 당신은 자유로운 영혼의 소유자입니다.\n\n가볍고 경쾌한 에너지로 주변을 밝게 만들며, 긍정적인 분위기를 조성합니다. 유연한 사고방식으로 변화에 잘 적응하고, 새로운 경험을 즐깁니다.',
      socialCaption: '나의 아우라는 아쿠아마린! 💧 맑고 순수한 에너지를 발견했어요.',
      hashtags: ['#아우라', '#아우라분석', '#AuraLens', '#아쿠아마린', '#순수', '#자유', '#청량'],
      gradientColors: ['#7FFFD4', '#E0F7FA']
    },

    // 따뜻한 계열 (warm dominant)
    'warm-high': {
      auraName: '루비 아우라',
      hexCode: '#E0115F',
      shortPersonality: '당신은 열정적이고 강렬한 에너지를 가진 사람입니다.',
      detailedDescription: '당신의 아우라는 타오르는 루비처럼 뜨겁고 강렬합니다. 무엇이든 열정적으로 몰입하며, 강한 추진력으로 목표를 달성합니다. 당신의 에너지는 주변 사람들에게 동기부여를 주고 영감을 불어넣습니다.\n\n용기 있게 도전하며, 어려움 앞에서도 굴하지 않는 강인함을 가졌습니다. 사랑과 열정으로 가득한 당신의 마음은 세상을 변화시키는 힘이 있습니다.',
      socialCaption: '나의 아우라는 루비! 💎🔥 열정적이고 강렬한 에너지를 발견했어요!',
      hashtags: ['#아우라', '#아우라분석', '#AuraLens', '#루비아우라', '#열정', '#도전', '#강렬'],
      gradientColors: ['#E0115F', '#FF6B6B']
    },
    'warm-medium': {
      auraName: '로즈 골드 아우라',
      hexCode: '#B76E79',
      shortPersonality: '당신은 따뜻하고 우아한 에너지를 가진 사람입니다.',
      detailedDescription: '당신의 아우라는 부드러운 로즈 골드처럼 따뜻하고 세련됩니다. 사랑과 친절로 사람들을 대하며, 우아함과 품위를 자연스럽게 풍깁니다. 당신은 주변 사람들에게 따뜻함과 위로를 주는 존재입니다.\n\n감성적이면서도 실용적인 면모를 동시에 가지고 있어, 아름다움과 기능성을 모두 추구합니다. 세련된 취향과 뛰어난 심미안으로 주변을 아름답게 가꿉니다.',
      socialCaption: '나의 아우라는 로즈 골드! 🌹✨ 따뜻하고 우아한 나만의 색을 발견했어요.',
      hashtags: ['#아우라', '#아우라분석', '#AuraLens', '#로즈골드', '#우아함', '#따뜻함', '#감성'],
      gradientColors: ['#B76E79', '#FFB7CE']
    },
    'warm-low': {
      auraName: '피치 아우라',
      hexCode: '#FFE5B4',
      shortPersonality: '당신은 부드럽고 다정한 에너지를 가진 사람입니다.',
      detailedDescription: '당신의 아우라는 달콤한 피치처럼 부드럽고 포근합니다. 다정다감한 성격으로 사람들에게 편안함을 주며, 자연스럽게 사람들이 당신 곁에 모이게 됩니다. 따뜻한 미소와 친절한 말 한마디로 세상을 밝게 만듭니다.\n\n긍정적이고 낙천적인 태도로 어려운 상황도 잘 극복하며, 주변 사람들에게 희망과 용기를 줍니다. 부드러움 속에 강한 의지를 가진 사람입니다.',
      socialCaption: '나의 아우라는 피치! 🍑 부드럽고 다정한 에너지를 발견했어요.',
      hashtags: ['#아우라', '#아우라분석', '#AuraLens', '#피치아우라', '#다정함', '#부드러움', '#긍정'],
      gradientColors: ['#FFE5B4', '#FFD1DC']
    },

    // 중립 계열 (neutral dominant)
    'neutral-high': {
      auraName: '오팔 아우라',
      hexCode: '#A8C3BC',
      shortPersonality: '당신은 신비롭고 다면적인 에너지를 가진 사람입니다.',
      detailedDescription: '당신의 아우라는 오팔처럼 여러 색깔을 품고 있는 신비로운 에너지입니다. 상황에 따라 다양한 면모를 보이며, 어떤 환경에서든 적응하는 능력이 뛰어납니다. 복잡하고 깊이 있는 내면 세계를 가지고 있습니다.\n\n창의적이고 독특한 시각으로 세상을 바라보며, 예술적 감각이 뛰어납니다. 당신의 다채로운 매력은 사람들에게 끊임없는 흥미를 불러일으킵니다.',
      socialCaption: '나의 아우라는 오팔! 🌈✨ 신비롭고 다면적인 나를 발견했어요.',
      hashtags: ['#아우라', '#아우라분석', '#AuraLens', '#오팔아우라', '#신비', '#다채로움', '#독특함'],
      gradientColors: ['#A8C3BC', '#E0E7FF']
    },
    'neutral-medium': {
      auraName: '라벤더 아우라',
      hexCode: '#E6E6FA',
      shortPersonality: '당신은 영적이고 직관적인 에너지를 가진 사람입니다.',
      detailedDescription: '당신의 아우라는 은은한 라벤더처럼 영적이고 평화롭습니다. 뛰어난 직관력으로 사람과 상황의 본질을 꿰뚫어보며, 깊은 통찰력을 가지고 있습니다. 내면의 평화를 중시하고 정신적 성장을 추구합니다.\n\n조화와 균형을 사랑하며, 갈등 상황에서 중재자 역할을 잘 합니다. 차분하고 사려 깊은 당신은 주변에 안정감을 줍니다.',
      socialCaption: '나의 아우라는 라벤더! 💜 영적이고 직관적인 에너지를 발견했어요.',
      hashtags: ['#아우라', '#아우라분석', '#AuraLens', '#라벤더', '#영적', '#직관', '#평화'],
      gradientColors: ['#E6E6FA', '#DDA0DD']
    },
    'neutral-low': {
      auraName: '펄 아우라',
      hexCode: '#F0EAD6',
      shortPersonality: '당신은 순수하고 세련된 에너지를 가진 사람입니다.',
      detailedDescription: '당신의 아우라는 진주처럼 은은하게 빛나는 우아함을 지녔습니다. 절제된 아름다움과 고요한 강인함을 동시에 가지고 있으며, 시간이 지날수록 깊이를 더해가는 매력이 있습니다. 겉으로는 부드럽지만 내면은 단단합니다.\n\n품격 있는 태도로 모든 일을 대하며, 진정한 가치를 아는 사람입니다. 조용하지만 확실한 존재감으로 주변에 영향을 미칩니다.',
      socialCaption: '나의 아우라는 펄! ✨ 순수하고 세련된 에너지를 발견했어요.',
      hashtags: ['#아우라', '#아우라분석', '#AuraLens', '#펄아우라', '#우아함', '#세련', '#품격'],
      gradientColors: ['#F0EAD6', '#FFFACD']
    },

    // 혼합 계열 - Cool + Warm
    'cool-warm-balanced': {
      auraName: '오로라 아우라',
      hexCode: '#8A2BE2',
      shortPersonality: '당신은 조화롭고 균형 잡힌 에너지를 가진 사람입니다.',
      detailedDescription: '당신의 아우라는 북극의 오로라처럼 여러 색깔이 조화롭게 어우러져 신비로운 아름다움을 만듭니다. 이성과 감성, 논리와 직관, 차분함과 열정이 완벽한 균형을 이루고 있습니다. 당신은 양극단을 모두 이해하고 조화시킬 수 있는 능력이 있습니다.\n\n변화무쌍하면서도 안정적이며, 예측할 수 없는 매력으로 사람들을 끌어당깁니다. 당신의 다재다능함은 어떤 상황에서든 빛을 발합니다.',
      socialCaption: '나의 아우라는 오로라! 🌌✨ 조화롭고 신비로운 나를 발견했어요!',
      hashtags: ['#아우라', '#아우라분석', '#AuraLens', '#오로라', '#균형', '#조화', '#신비'],
      gradientColors: ['#8A2BE2', '#FF69B4']
    },
    'cool-warm-cool': {
      auraName: '터키석 아우라',
      hexCode: '#40E0D0',
      shortPersonality: '당신은 차분하면서도 활력 있는 에너지를 가진 사람입니다.',
      detailedDescription: '당신의 아우라는 터키석처럼 시원하면서도 생기 넘치는 에너지를 가지고 있습니다. 안정적이면서도 활동적이며, 평화를 사랑하지만 도전도 즐깁니다. 이러한 이중성이 당신만의 독특한 매력을 만듭니다.\n\n차분한 외면 아래 열정적인 내면을 감추고 있으며, 필요한 순간에 강한 추진력을 발휘합니다. 균형 잡힌 접근으로 목표를 달성합니다.',
      socialCaption: '나의 아우라는 터키석! 💎 차분하면서 활력 있는 나를 발견했어요.',
      hashtags: ['#아우라', '#아우라분석', '#AuraLens', '#터키석', '#활력', '#균형', '#독특함'],
      gradientColors: ['#40E0D0', '#98D8C8']
    },
    'cool-warm-warm': {
      auraName: '코랄 아우라',
      hexCode: '#FF7F50',
      shortPersonality: '당신은 따뜻하면서도 차분한 에너지를 가진 사람입니다.',
      detailedDescription: '당신의 아우라는 산호처럼 따뜻한 온기와 바다의 평온함을 동시에 지니고 있습니다. 열정적이지만 안정적이며, 활발하지만 신중합니다. 이러한 조화로운 에너지가 주변 사람들에게 편안함과 활력을 동시에 줍니다.\n\n사교적이면서도 깊이 있는 관계를 추구하며, 밝은 에너지로 사람들을 끌어들입니다. 따뜻한 카리스마를 가진 사람입니다.',
      socialCaption: '나의 아우라는 코랄! 🪸 따뜻하고 조화로운 에너지를 발견했어요.',
      hashtags: ['#아우라', '#아우라분석', '#AuraLens', '#코랄', '#따뜻함', '#조화', '#활력'],
      gradientColors: ['#FF7F50', '#FFB6C1']
    },

    // 특별한 조합들
    'creative-mystical': {
      auraName: '프리즘 아우라',
      hexCode: '#9370DB',
      shortPersonality: '당신은 창의적이고 신비로운 에너지를 가진 사람입니다.',
      detailedDescription: '당신의 아우라는 프리즘처럼 빛을 받으면 무지개 색으로 빛나는 다채로운 에너지입니다. 무한한 창의력과 상상력을 가지고 있으며, 세상을 독특한 시각으로 바라봅니다. 예술적 감각이 뛰어나고 영감이 풍부합니다.\n\n평범함을 거부하고 독창성을 추구하며, 새로운 아이디어로 세상을 놀라게 합니다. 당신의 존재 자체가 예술작품입니다.',
      socialCaption: '나의 아우라는 프리즘! 🌈 창의적이고 신비로운 나를 발견했어요!',
      hashtags: ['#아우라', '#아우라분석', '#AuraLens', '#프리즘', '#창의력', '#예술', '#독창성'],
      gradientColors: ['#9370DB', '#FF69B4']
    },
    'energetic-joyful': {
      auraName: '시트린 아우라',
      hexCode: '#FFD700',
      shortPersonality: '당신은 밝고 긍정적인 에너지를 가진 사람입니다.',
      detailedDescription: '당신의 아우라는 햇살처럼 밝게 빛나는 시트린의 에너지를 가지고 있습니다. 넘치는 활력과 긍정적인 에너지로 주변을 밝게 만들며, 당신이 있는 곳은 언제나 즐겁고 활기찹니다. 낙천적인 성격으로 어려움도 기회로 만듭니다.\n\n자신감 넘치고 당당하며, 사람들에게 용기와 희망을 줍니다. 태양처럼 빛나는 당신의 에너지는 모두를 행복하게 만듭니다.',
      socialCaption: '나의 아우라는 시트린! ☀️ 밝고 긍정적인 에너지를 발견했어요!',
      hashtags: ['#아우라', '#아우라분석', '#AuraLens', '#시트린', '#긍정', '#활력', '#행복'],
      gradientColors: ['#FFD700', '#FFA500']
    },
    'calm-wise': {
      auraName: '인디고 아우라',
      hexCode: '#4B0082',
      shortPersonality: '당신은 깊이 있고 통찰력 있는 에너지를 가진 사람입니다.',
      detailedDescription: '당신의 아우라는 깊은 밤하늘의 인디고처럼 신비롭고 지혜롭습니다. 뛰어난 통찰력과 직관으로 사물의 본질을 꿰뚫어보며, 깊은 사색과 명상을 즐깁니다. 영적인 깊이를 가지고 있으며, 진리를 탐구하는 철학적 성향이 강합니다.\n\n조용하지만 강력한 존재감으로 주변에 영향을 미치며, 지혜로운 조언으로 사람들을 이끕니다. 내면의 깊이가 외면의 아름다움을 만듭니다.',
      socialCaption: '나의 아우라는 인디고! 🌌 깊이 있고 지혜로운 나를 발견했어요.',
      hashtags: ['#아우라', '#아우라분석', '#AuraLens', '#인디고', '#지혜', '#통찰', '#영성'],
      gradientColors: ['#4B0082', '#6A5ACD']
    }
  };

  const calculateAura = (userAnswers) => {
    const temps = Object.values(userAnswers).map(a => a.temp);
    const colors = Object.values(userAnswers).map(a => a.color);
    
    // 온도 경향 계산
    const warmCount = temps.filter(t => t === 'warm').length;
    const coolCount = temps.filter(t => t === 'cool').length;
    const neutralCount = temps.filter(t => t === 'neutral').length;
    
    // 주요 경향 결정
    let primaryTrend, intensity;
    
    if (coolCount >= 5) {
      primaryTrend = 'cool';
      intensity = coolCount >= 7 ? 'high' : coolCount >= 6 ? 'medium' : 'low';
    } else if (warmCount >= 5) {
      primaryTrend = 'warm';
      intensity = warmCount >= 7 ? 'high' : warmCount >= 6 ? 'medium' : 'low';
    } else if (neutralCount >= 4) {
      primaryTrend = 'neutral';
      intensity = neutralCount >= 6 ? 'high' : neutralCount >= 5 ? 'medium' : 'low';
    } else if (Math.abs(warmCount - coolCount) <= 1) {
      // 거의 균형잡힌 경우
      primaryTrend = 'cool-warm';
      intensity = warmCount > coolCount ? 'warm' : coolCount > warmCount ? 'cool' : 'balanced';
    } else {
      // 특별한 조합
      const values = Object.values(userAnswers).map(a => a.value);
      if (values.includes('creative') && values.includes('mystical')) {
        return auraDatabase['creative-mystical'];
      } else if (values.includes('energetic') && values.includes('joy')) {
        return auraDatabase['energetic-joyful'];
      } else if (values.includes('calm') && values.includes('wisdom')) {
        return auraDatabase['calm-wise'];
      } else {
        primaryTrend = 'cool-warm';
        intensity = 'balanced';
      }
    }
    
    const key = `${primaryTrend}-${intensity}`;
    return auraDatabase[key] || auraDatabase['neutral-medium'];
  };

  const handleAnswer = (questionId, value, color, temp) => {
    setAnswers({ ...answers, [questionId]: { value, color, temp } });
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setStep('loading');
      setTimeout(() => {
        const auraResult = calculateAura({ ...answers, [questionId]: { value, color, temp } });
        setResult(auraResult);
        setStep('result');
      }, 2000);
    }
  };

  // 이전 질문으로 돌아가기
  const handlePrevious = () => {
    if (currentQuestion > 0) {
      const prevQuestionId = questions[currentQuestion - 1].id;
      const newAnswers = { ...answers };
      delete newAnswers[questions[currentQuestion].id];
      setAnswers(newAnswers);
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const resetQuiz = () => {
    setStep('intro');
    setAnswers({});
    setCurrentQuestion(0);
    setResult(null);
  };

  const shareResult = () => {
    if (!result) return;
    setShowShareModal(true);
  };

  const copyToClipboard = (text) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        alert('✅ 클립보드에 복사되었습니다!');
      }).catch(() => {
        fallbackCopy(text);
      });
    } else {
      fallbackCopy(text);
    }
  };

  const fallbackCopy = (text) => {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      alert('✅ 클립보드에 복사되었습니다!');
    } catch (err) {
      alert('공유 텍스트:\n\n' + text);
    }
    document.body.removeChild(textArea);
  };

  const shareToKakao = () => {
    const shareText = `나의 아우라는 ${result.auraName}! ✨\n\n${result.shortPersonality}\n\n${result.hashtags.join(' ')}`;
    copyToClipboard(shareText);
    setShowShareModal(false);
  };

  const shareToInstagram = () => {
    const shareText = `나의 아우라는 ${result.auraName}! ✨\n\n${result.shortPersonality}\n\n${result.hashtags.join(' ')}`;
    copyToClipboard(shareText);
    setShowShareModal(false);
  };

  const downloadImage = () => {
    alert('🎨 이미지 다운로드 기능은 곧 추가될 예정입니다!');
  };

  if (step === 'intro') {
    return (
      <div className="min-h-screen flex items-center justify-center p-4" 
           style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
        <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 text-center">
          <div className="mb-6">
            <Sparkles className="w-16 h-16 mx-auto text-purple-600 animate-pulse" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">AuraLens</h1>
          <p className="text-gray-600 mb-8 text-lg">
            당신만의 특별한 아우라 색깔을 발견하세요 ✨
          </p>
          <button
            onClick={() => setStep('questions')}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-full font-semibold text-lg hover:shadow-lg transform hover:scale-105 transition-all"
          >
            시작하기
          </button>
        </div>
      </div>
    );
  }

  if (step === 'questions') {
    const q = questions[currentQuestion];
    return (
      <div className="min-h-screen flex items-center justify-center p-4"
           style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
        <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                {currentQuestion > 0 && (
                  <button
                    onClick={handlePrevious}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                    title="이전 질문"
                  >
                    <ArrowLeft className="w-5 h-5 text-gray-600" />
                  </button>
                )}
                <span className="text-sm text-gray-500">질문 {currentQuestion + 1}/{questions.length}</span>
              </div>
              <div className="flex gap-1">
                {questions.map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-2 w-8 rounded-full ${
                      idx <= currentQuestion ? 'bg-purple-600' : 'bg-gray-200'
                    }`}
                  />
                ))}
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">{q.question}</h2>
          </div>
          
          <div className="space-y-3">
            {q.options.map((option) => (
              <button
                key={option.value}
                onClick={() => handleAnswer(q.id, option.value, option.color, option.temp)}
                className="w-full p-4 rounded-2xl border-2 border-gray-200 hover:border-purple-400 hover:bg-purple-50 transition-all text-left group"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: option.color }}
                  />
                  <span className="text-gray-700 group-hover:text-purple-700 font-medium">
                    {option.label}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (step === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center p-4"
           style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
        <div className="text-center">
          <Sparkles className="w-20 h-20 text-white mx-auto animate-spin mb-6" />
          <h2 className="text-white text-2xl font-bold mb-3">당신의 아우라를 분석하고 있어요</h2>
          <p className="text-white text-lg opacity-90">잠시만 기다려주세요...</p>
          <div className="mt-8 flex justify-center gap-2">
            <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'result' && result) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4"
           style={{ 
             background: `linear-gradient(135deg, ${result.gradientColors[0]} 0%, ${result.gradientColors[1]} 100%)` 
           }}>
        <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8">
          <div className="text-center mb-6">
            <div
              className="w-32 h-32 mx-auto rounded-full mb-4 shadow-lg animate-pulse"
              style={{ backgroundColor: result.hexCode }}
            />
            <h2 className="text-3xl font-bold text-gray-800 mb-2">{result.auraName}</h2>
            <p className="text-lg text-gray-600 font-medium mb-4">{result.shortPersonality}</p>
            <div className="inline-block bg-gray-100 px-4 py-2 rounded-full">
              <code className="text-sm text-gray-700">{result.hexCode}</code>
            </div>
          </div>

          <div className="bg-gray-50 rounded-2xl p-6 mb-6">
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {result.detailedDescription}
            </p>
          </div>

          {/* 통계 정보 */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-4 mb-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">이 아우라의 희귀도</p>
                <p className="text-2xl font-bold text-purple-600">
                  {auraStats[result.auraName]?.rarity || '특별'}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600 mb-1">보유 비율</p>
                <p className="text-2xl font-bold text-purple-600">
                  상위 {auraStats[result.auraName]?.percentage || 10}%
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowStatsModal(true)}
              className="w-full mt-3 text-sm text-purple-600 hover:text-purple-700 font-medium flex items-center justify-center gap-1"
            >
              <BarChart3 className="w-4 h-4" />
              전체 통계 보기
            </button>
          </div>

          <div className="bg-purple-50 rounded-2xl p-4 mb-6">
            <p className="text-sm text-gray-700 mb-3">{result.socialCaption}</p>
            <div className="flex flex-wrap gap-2">
              {result.hashtags.map((tag, idx) => (
                <span key={idx} className="text-xs bg-white px-3 py-1 rounded-full text-purple-600">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="flex gap-3 mb-4">
            <button
              onClick={shareResult}
              className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-full font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition-shadow active:scale-95"
            >
              <Share2 className="w-5 h-5" />
              공유하기
            </button>
            <button
              onClick={() => setShowCompareModal(true)}
              className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-3 rounded-full font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition-shadow active:scale-95"
            >
              <Users className="w-5 h-5" />
              친구와 비교
            </button>
          </div>

          <button
            onClick={resetQuiz}
            className="w-full bg-gray-200 text-gray-700 py-3 rounded-full font-semibold hover:bg-gray-300 transition-colors active:scale-95 mb-4"
          >
            다시하기
          </button>

          {/* 제작자 정보 */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Made by <span className="font-semibold text-gray-700">최원준</span>
            </p>
          </div>

          {showShareModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" onClick={() => setShowShareModal(false)}>
              <div className="bg-white rounded-3xl p-6 max-w-sm w-full" onClick={(e) => e.stopPropagation()}>
                <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">공유하기</h3>
                
                <div className="space-y-3">
                  <button
                    onClick={shareToKakao}
                    className="w-full bg-yellow-400 text-gray-800 py-3 rounded-2xl font-semibold flex items-center justify-center gap-2 hover:bg-yellow-500 transition-colors"
                  >
                    💬 카카오톡으로 공유
                  </button>
                  
                  <button
                    onClick={shareToInstagram}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-2xl font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition-shadow"
                  >
                    📸 인스타그램으로 공유
                  </button>
                  
                  <button
                    onClick={() => {
                      const shareText = `나의 아우라는 ${result.auraName}! ✨\n\n${result.shortPersonality}\n\n${result.hashtags.join(' ')}`;
                      copyToClipboard(shareText);
                      setShowShareModal(false);
                    }}
                    className="w-full bg-gray-200 text-gray-700 py-3 rounded-2xl font-semibold flex items-center justify-center gap-2 hover:bg-gray-300 transition-colors"
                  >
                    📋 텍스트 복사
                  </button>
                  
                  <button
                    onClick={downloadImage}
                    className="w-full bg-blue-500 text-white py-3 rounded-2xl font-semibold flex items-center justify-center gap-2 hover:bg-blue-600 transition-colors"
                  >
                    <Download className="w-5 h-5" />
                    이미지로 저장
                  </button>
                </div>
                
                <button
                  onClick={() => setShowShareModal(false)}
                  className="w-full mt-4 text-gray-500 py-2 text-sm"
                >
                  닫기
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return null;
};

export default App;
