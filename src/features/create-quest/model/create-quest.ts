import type { SubQuestResponseDTO } from '@/shared/api/quest-template.dto';
import type {
  CreateQuestResponseDTO,
  CreateQuestRequestDTO,
} from '../api/create-quest.dto';

export type CreateQuestRequest = CreateQuestRequestDTO;

export type CreateQuestResponse = CreateQuestResponseDTO;

export type SubQuestInfo = Pick<
  SubQuestResponseDTO,
  'id' | 'frequencyType' | 'actionUnitNum'
>;
