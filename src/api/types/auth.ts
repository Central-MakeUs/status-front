import type { UserInfoDTO } from '@/api/types/user';

export interface AuthResponseDTO {
  user: UserInfoDTO;
}

export interface AuthConfig {
  endpoint: string;
  clientId: string;
  redirectUri: string;
  responseType: string;
  scope?: string;
}
