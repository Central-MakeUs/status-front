import { z } from 'zod';

export const nicknameSchema = z.object({
  nickname: z
    .string()
    .min(1, '닉네임을 입력해주세요.')
    .max(10, '최대 글자수를 넘었어요.')
    .regex(/^[a-zA-Z0-9가-힣\s]+$/, '한글, 영문, 숫자만 사용 가능해요.'),
});
