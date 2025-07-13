import { getUserAbttributes } from '@/api/attribute';
import { useQuery } from '@tanstack/react-query';

export const useGetUserAttribute = (userId: string) => {
  return useQuery({
    queryKey: ['attributes', 'user', userId],
    queryFn: () => getUserAbttributes(userId),
    // 현재는 DTO와 Domain 타입이 동일하므로 변환 불필요
    // 나중에 비즈니스 로직이 필요하면 select 추가 가능
  });
};
