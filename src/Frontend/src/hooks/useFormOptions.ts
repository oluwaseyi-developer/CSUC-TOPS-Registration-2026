import { useQuery } from '@tanstack/react-query';
import { registrationApi } from '@/api';
import type { FormOptions } from '@/types';

// Default form options for immediate display (no loading state)
const defaultFormOptions: FormOptions = {
  gender: [
    { value: 1, label: 'Male' },
    { value: 2, label: 'Female' },
  ],
  transportation: [
    { value: 1, label: 'Public Transport' },
    { value: 2, label: 'Private Vehicle' },
    { value: 3, label: 'Join the Brethren' },
  ],
  comingWith: [
    { value: 1, label: 'Alone' },
    { value: 2, label: 'With Brethren' },
    { value: 3, label: 'With Family' },
  ],
};

export function useFormOptions() {
  return useQuery({
    queryKey: ['formOptions'],
    queryFn: registrationApi.getFormOptions,
    staleTime: Infinity, // Never refetch
    gcTime: Infinity, // Keep in cache forever
    placeholderData: defaultFormOptions, // Show immediately while fetching
    retry: 2,
  });
}
