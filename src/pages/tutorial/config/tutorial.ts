export const TUTORIAL_STEPS = {
  FIRST: {
    title: '제 1장. 정신적 능력치 / 기술적 능력치',
    description:
      '능력치는 정신/기술 분야로, 각 6가지 세부 능력치로 이루어져 있어요',
    path: '/videos/tutorial-animation-1.mp4',
  },
  SECOND: {
    title: '제 2장. 전체 레벨',
    description:
      '전체 레벨은 서비스를 관통하는 나의 통합레벨이에요.\n내 모든 성장이 모여 만들어지는 하나의 레벨이죠.',
    path: '/videos/tutorial-animation-2.mp4',
  },
  THIRD: {
    title: '제 3장. 메인퀘스트 / 서브퀘스트',
    description:
      '서브퀘스트 하나를 수행할 때마다 보상이 주어지며\n모든 서브퀘스트를 마무리하면 메인퀘스트 보너스가 주어져요!',
    path: '/videos/tutorial-animation-3.mp4',
  },
} as const;

export type TutorialStep = (typeof TUTORIAL_STEPS)[keyof typeof TUTORIAL_STEPS];
