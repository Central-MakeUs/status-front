import { api } from '@/shared/api/client';
import type { RewardResponseDto } from '@/entities/main-quest/api/dto';
import type { ApiResponse } from '@/shared/api/types';
import type {
  GetSubQuestsParams,
  RerollSubQuestRequestDTO,
  SubQuestLogDTO,
  SubQuestResponseDTO,
  UsersSubQuestResponseDTO,
} from './dto';

export const getSubQuests = async ({
  attributes = [],
  mainQuest,
}: GetSubQuestsParams): Promise<SubQuestResponseDTO[]> => {
  const params: Record<string, string> = {
    attributes: attributes.join(','),
    mainQuest: mainQuest.toString(),
  };

  const response = await api.get<ApiResponse<SubQuestResponseDTO[]>>(
    '/quest/get-subquests',
    {
      params,
    }
  );
  return response.data ?? [];
};

export const getRandomSubQuests = async (
  data: RerollSubQuestRequestDTO
): Promise<SubQuestResponseDTO[]> => {
  const response = await api.post<ApiResponse<SubQuestResponseDTO[]>>(
    '/quest/reroll-subquests',
    data
  );
  return response.data ?? [];
};

export const getUserSubQuestsAll = async (): Promise<
  UsersSubQuestResponseDTO[]
> => {
  const response =
    await api.get<ApiResponse<UsersSubQuestResponseDTO[]>>(`/quest/today`);
  return response.data ?? [];
};

export const getUserSubQuests = async (
  id: number
): Promise<UsersSubQuestResponseDTO[]> => {
  const response = await api.get<ApiResponse<UsersSubQuestResponseDTO[]>>(
    `/quest/${id}/today`
  );
  return response.data ?? [];
};

export const postUserSubQuestLog = async (
  data: SubQuestLogDTO
): Promise<RewardResponseDto> => {
  const response = await api.post<ApiResponse<RewardResponseDto>>(
    `/quest/sub`,
    data
  );

  return (
    response.data ?? {
      subQuestRewards: [],
      mainQuestRewards: [],
      isMainQuestCompleted: false,
    }
  );
};

export const patchUserSubQuestLog = async (data: SubQuestLogDTO) => {
  const response = await api.patch<ApiResponse<SubQuestLogDTO>>(
    `/quest/sub`,
    data
  );
  return response.data ?? {};
};
