import { useQuery } from '@tanstack/react-query';
import { registrationApi } from '@/api';

export function useFormOptions() {
  return useQuery({
    queryKey: ['formOptions'],
    queryFn: registrationApi.getFormOptions,
    staleTime: Infinity,
  });
}
