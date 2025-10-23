import type { Status } from '@/entities/main-quest/model/types';
import type { AttributeDTO } from '@/entities/users-attribute/api/dto';

export interface UsersMainQuestResponseDTO {
  id: number;
  startDate: string;
  endDate: string;
  totalWeeks: number;
  title: string;
  attributes: AttributeDTO[];
  progress: number;
}

export interface WithStatusUsersMainQuestResponseDTO
  extends UsersMainQuestResponseDTO {
  status: Status;
}
