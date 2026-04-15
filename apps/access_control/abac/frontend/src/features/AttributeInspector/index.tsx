import { Heading, Section, Text } from '@vibe-architecture/react';
import { useQuery } from '@tanstack/react-query';
import { abacApi } from '../../shared/api/abacApi';
import { useSimulatorStore } from '../../shared/store/simulatorStore';
import { AttributeGroup, AttributeGroupInner, AttributeRow, InspectorGrid } from './styles';

export function AttributeInspector() {
  const { selectedUserId, selectedResourceType, selectedResourceId, selectedAction, environment } =
    useSimulatorStore();

  const { data: users = [] } = useQuery({ queryKey: ['users'], queryFn: abacApi.getUsers });
  const { data: products = [] } = useQuery({ queryKey: ['products'], queryFn: abacApi.getProducts });
  const { data: refunds = [] } = useQuery({ queryKey: ['refunds'], queryFn: abacApi.getRefunds });

  const user = users.find((u) => u.id === selectedUserId);
  const resource =
    selectedResourceType === 'product'
      ? products.find((p) => p.id === selectedResourceId)
      : refunds.find((r) => r.id === selectedResourceId);

  return (
    <Section
      title="Attribute Inspector"
      description="현재 선택된 접근 요청의 4속성(Subject·Resource·Action·Environment)을 분해합니다."
    >
      <InspectorGrid>
        <AttributeGroup color="#4f46e5">
          <AttributeGroupInner>
            <Heading level={3}>Subject</Heading>
            <AttributeRow>
              <Text as="span">userId</Text>
              <Text as="span">{user?.id ?? '-'}</Text>
            </AttributeRow>
            <AttributeRow>
              <Text as="span">name</Text>
              <Text as="span">{user?.name ?? '-'}</Text>
            </AttributeRow>
            <AttributeRow>
              <Text as="span">role</Text>
              <Text as="span">{user?.role ?? '-'}</Text>
            </AttributeRow>
            <AttributeRow>
              <Text as="span">department</Text>
              <Text as="span">{user?.department ?? '-'}</Text>
            </AttributeRow>
            <AttributeRow>
              <Text as="span">trustLevel</Text>
              <Text as="span">{user?.trustLevel ?? '-'}</Text>
            </AttributeRow>
          </AttributeGroupInner>
        </AttributeGroup>

        <AttributeGroup color="#0891b2">
          <AttributeGroupInner>
            <Heading level={3}>Resource</Heading>
            <AttributeRow>
              <Text as="span">type</Text>
              <Text as="span">{selectedResourceType || '-'}</Text>
            </AttributeRow>
            <AttributeRow>
              <Text as="span">id</Text>
              <Text as="span">{resource?.id ?? '-'}</Text>
            </AttributeRow>
            {selectedResourceType === 'product' && resource && 'name' in resource && (
              <>
                <AttributeRow>
                  <Text as="span">name</Text>
                  <Text as="span">{resource.name}</Text>
                </AttributeRow>
                <AttributeRow>
                  <Text as="span">category</Text>
                  <Text as="span">{resource.category}</Text>
                </AttributeRow>
                <AttributeRow>
                  <Text as="span">price</Text>
                  <Text as="span">{resource.price}</Text>
                </AttributeRow>
                <AttributeRow>
                  <Text as="span">ownerId</Text>
                  <Text as="span">{resource.ownerId}</Text>
                </AttributeRow>
              </>
            )}
            {selectedResourceType === 'refund' && resource && 'orderId' in resource && (
              <>
                <AttributeRow>
                  <Text as="span">orderId</Text>
                  <Text as="span">{resource.orderId}</Text>
                </AttributeRow>
                <AttributeRow>
                  <Text as="span">amount</Text>
                  <Text as="span">{resource.amount}</Text>
                </AttributeRow>
                <AttributeRow>
                  <Text as="span">status</Text>
                  <Text as="span">{resource.status}</Text>
                </AttributeRow>
              </>
            )}
          </AttributeGroupInner>
        </AttributeGroup>

        <AttributeGroup color="#ca8a04">
          <AttributeGroupInner>
            <Heading level={3}>Action</Heading>
            <AttributeRow>
              <Text as="span">action</Text>
              <Text as="span">{selectedAction || '-'}</Text>
            </AttributeRow>
          </AttributeGroupInner>
        </AttributeGroup>

        <AttributeGroup color="#16a34a">
          <AttributeGroupInner>
            <Heading level={3}>Environment</Heading>
            <AttributeRow>
              <Text as="span">ipAddress</Text>
              <Text as="span">{environment.ipAddress}</Text>
            </AttributeRow>
            <AttributeRow>
              <Text as="span">currentHour</Text>
              <Text as="span">{environment.currentHour}</Text>
            </AttributeRow>
            <AttributeRow>
              <Text as="span">trusted</Text>
              <Text as="span">{environment.isTrustedNetwork ? 'true' : 'false'}</Text>
            </AttributeRow>
          </AttributeGroupInner>
        </AttributeGroup>
      </InspectorGrid>
    </Section>
  );
}
