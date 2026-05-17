import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminApi } from '@/api';
import toast from 'react-hot-toast';

export function useRegistrations(page = 1, pageSize = 10, search?: string) {
  return useQuery({
    queryKey: ['registrations', page, pageSize, search],
    queryFn: () => adminApi.getRegistrations(page, pageSize, search),
    retry: 1,
    staleTime: 0, // Always refetch
    refetchOnMount: true,
  });
}

export function useAllRegistrations() {
  return useQuery({
    queryKey: ['allRegistrations'],
    queryFn: adminApi.getAllRegistrations,
    retry: 1,
    staleTime: 0,
    refetchOnMount: true,
  });
}

export function useStatistics() {
  return useQuery({
    queryKey: ['statistics'],
    queryFn: adminApi.getStatistics,
    retry: 1,
    staleTime: 0,
    refetchOnMount: true,
  });
}

export function useDeleteRegistration() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: adminApi.deleteRegistration,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['registrations'] });
      queryClient.invalidateQueries({ queryKey: ['statistics'] });
      toast.success('Registration deleted successfully');
    },
    onError: () => {
      toast.error('Failed to delete registration');
    },
  });
}
