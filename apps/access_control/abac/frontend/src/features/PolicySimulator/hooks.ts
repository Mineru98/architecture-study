import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { abacApi } from '../../shared/api/abacApi';
import { useSimulatorStore } from '../../shared/store/simulatorStore';
import type { AccessDecision } from '../../shared/types/abac';

export function useSimulator() {
  const [decision, setDecision] = useState<AccessDecision | null>(null);

  const {
    selectedUserId,
    selectedResourceType,
    selectedResourceId,
    selectedAction,
    environment,
    setSelectedUserId,
    setSelectedResourceType,
    setSelectedResourceId,
    setSelectedAction,
    setEnvironment,
  } = useSimulatorStore();

  const usersQuery = useQuery({
    queryKey: ['users'],
    queryFn: abacApi.getUsers,
  });

  const productsQuery = useQuery({
    queryKey: ['products'],
    queryFn: abacApi.getProducts,
  });

  const refundsQuery = useQuery({
    queryKey: ['refunds'],
    queryFn: abacApi.getRefunds,
  });

  const mutation = useMutation({
    mutationFn: abacApi.checkAccess,
    onSuccess: (data) => setDecision(data),
  });

  const resources =
    selectedResourceType === 'product'
      ? (productsQuery.data ?? []).map((p) => ({ id: p.id, label: p.name }))
      : (refundsQuery.data ?? []).map((r) => ({ id: r.id, label: `Refund #${r.orderId}` }));

  function checkAccess() {
    if (!selectedUserId || !selectedResourceId) return;
    mutation.mutate({
      subjectId: selectedUserId,
      resourceType: selectedResourceType,
      resourceId: selectedResourceId,
      action: selectedAction,
      environment,
    });
  }

  return {
    decision,
    users: usersQuery.data ?? [],
    resources,
    isLoading: usersQuery.isLoading || productsQuery.isLoading || refundsQuery.isLoading,
    isPending: mutation.isPending,
    selectedUserId,
    selectedResourceType,
    selectedResourceId,
    selectedAction,
    environment,
    setSelectedUserId,
    setSelectedResourceType,
    setSelectedResourceId,
    setSelectedAction,
    setEnvironment,
    checkAccess,
  };
}
