import type {
  OAuthProviderDTO,
  SignUpRequestDTO,
} from '@/features/auth/api/dto';
import type { BasicUsersDTO } from '@/shared/api/user.dto';
import type {
  PROVIDER_TYPE,
  SOCIAL_PROVIDER,
} from '@/features/auth/config/constants';
import type { SIGN_UP_STEP } from '@/features/auth/config/constants';

export type SocialProvider =
  (typeof SOCIAL_PROVIDER)[keyof typeof SOCIAL_PROVIDER];

export type ProviderType = (typeof PROVIDER_TYPE)[keyof typeof PROVIDER_TYPE];

export type SignUpForm = SignUpRequestDTO;
export type SignUpStep = (typeof SIGN_UP_STEP)[keyof typeof SIGN_UP_STEP];

export type OAuthProvider = OAuthProviderDTO;

export type SocialLoginReturnDTO = OAuthProviderDTO | BasicUsersDTO;

export interface AuthConfig {
  endpoint: string;
  clientId: string;
  redirectUri: string;
  responseType: string;
  responseMode?: string;
  scope?: string;
  state?: string;
  nonce?: string;
}
