import type {
  MAIN_QUEST_STATUS,
  REWARD_STEP,
  SUB_QUEST_FREQUENCY,
  ACTION_UNIT_TYPES,
} from '@/shared/config/quest-template';
import type {
  ThemeResponseDTO,
  MainQuestResponseDTO,
  SubQuestResponseDTO,
} from '@/shared/api/quest-template.dto';

export type Theme = ThemeResponseDTO;

export type MainQuest = MainQuestResponseDTO;

export type RewardStep = (typeof REWARD_STEP)[keyof typeof REWARD_STEP];

export type Status = (typeof MAIN_QUEST_STATUS)[keyof typeof MAIN_QUEST_STATUS];

export type SubQuestFrequencyValue =
  (typeof SUB_QUEST_FREQUENCY)[keyof typeof SUB_QUEST_FREQUENCY]['value'];

export type SubQuest = SubQuestResponseDTO;

export type SubQuestInfo = Pick<
  SubQuestResponseDTO,
  'id' | 'frequencyType' | 'actionUnitNum'
>;

export type SubQuestDifficulty = 'EASY' | 'NORMAL' | 'HARD';

export type ActionUnitTypeValue =
  (typeof ACTION_UNIT_TYPES)[keyof typeof ACTION_UNIT_TYPES];
