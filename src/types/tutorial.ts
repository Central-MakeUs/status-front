import { TUTORIAL_STEPS } from '@/constants/tutorial';

export type TutorialStep = (typeof TUTORIAL_STEPS)[keyof typeof TUTORIAL_STEPS];
