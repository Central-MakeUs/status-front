import { TUTORIAL_STEPS } from '@/pages/tutorial/config/constants';

export type TutorialStep = (typeof TUTORIAL_STEPS)[keyof typeof TUTORIAL_STEPS];
