import IconAttribute101 from '@/assets/icons/attribute/icon-attribute101.svg?react';
import IconAttribute102 from '@/assets/icons/attribute/icon-attribute102.svg?react';
import IconAttribute103 from '@/assets/icons/attribute/icon-attribute103.svg?react';
import IconAttribute104 from '@/assets/icons/attribute/icon-attribute104.svg?react';
import IconAttribute105 from '@/assets/icons/attribute/icon-attribute105.svg?react';
import IconAttribute106 from '@/assets/icons/attribute/icon-attribute106.svg?react';
import IconAttribute201 from '@/assets/icons/attribute/icon-attribute201.svg?react';
import IconAttribute202 from '@/assets/icons/attribute/icon-attribute202.svg?react';
import IconAttribute203 from '@/assets/icons/attribute/icon-attribute203.svg?react';
import IconAttribute204 from '@/assets/icons/attribute/icon-attribute204.svg?react';
import IconAttribute205 from '@/assets/icons/attribute/icon-attribute205.svg?react';
import IconAttribute206 from '@/assets/icons/attribute/icon-attribute206.svg?react';

export const ATTRIBUTE_ICONS = {
  101: IconAttribute101,
  102: IconAttribute102,
  103: IconAttribute103,
  104: IconAttribute104,
  105: IconAttribute105,
  106: IconAttribute106,
  201: IconAttribute201,
  202: IconAttribute202,
  203: IconAttribute203,
  204: IconAttribute204,
  205: IconAttribute205,
  206: IconAttribute206,
} as const;

export const ATTRIBUTE_TYPES = {
  MENTALITY: 'MENTALITY',
  SKILL: 'SKILL',
} as const;

export const MAX_ATTRIBUTE_COUNT = 2;

export const ATTRIBUTE_TEXTS = {
  101: '인내',
  102: '집중',
  103: '제어',
  104: '영감',
  105: '성실',
  106: '용기',
  201: '건강',
  202: '전략',
  203: '기록',
  204: '기술',
  205: '화술',
  206: '탐구',
};

export const ATTRIBUTE_DESCS = {
  101: '실행 저항을 이겨내고 끝까지 밀어붙이는 내적 추진력',
  102: '몰입 상태를 유지하고 방해 요소를 차단하는 정신력',
  103: '감정과 욕구를 인식하고 절제하는 자기조절 능력',
  104: '새롭고 창의적인 아이디어를 떠올리고 구상하는 상상력',
  105: '단조로운 반복을 기꺼이 수행하는 루틴 기반의 꾸준함',
  106: '두려움과 불확실성을 넘어서 행동하는 실천 기반 도전성',
  201: '신체적 수련과 생리적 루틴 관리 능력',
  202: '시간/일정/우선순위 등을 기획하고 실행하는 능력',
  203: '정보를 정리하고, 습관적으로 기록하는 능력',
  204: '디지털 도구 및 기술을 활용하는 능력',
  205: '생각과 감정을 외부로 효과적으로 전달하는 능력',
  206: '새로운 지식을 습득하고 정리하는 능력',
};

export const attributeDatas = [
  [101, 102, 103, 104, 105, 106],
  [201, 202, 203, 204, 205, 206],
];
