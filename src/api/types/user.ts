export interface UserInfoDTO {
  nickname: string;
  tier: 'Bronze' | 'Silver' | 'Gold' | 'Platinum' | 'Dia';
  level: number;
  levelPercent: number;
  profileImageUrl: string;
}
