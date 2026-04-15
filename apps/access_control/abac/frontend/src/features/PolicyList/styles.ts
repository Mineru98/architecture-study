import { styled } from 'styled-components';

export const PolicyGrid = styled.div`
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(2, 1fr);

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

interface PolicyCardProps {
  effect: 'allow' | 'deny';
}

export const PolicyCard = styled.div<PolicyCardProps>`
  padding: 20px;
  border-radius: 12px;
  background: #ffffff;
  border: 1.5px solid ${({ effect }) => (effect === 'allow' ? '#16a34a' : '#dc2626')};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
`;

export const PriorityBadge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 2px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  background: rgba(17, 17, 17, 0.06);
  color: #444444;
`;

export const RuleChip = styled.span`
  display: inline-block;
  padding: 3px 8px;
  border-radius: 6px;
  font-size: 11px;
  font-family: monospace;
  background: rgba(17, 17, 17, 0.05);
  color: #555555;
  margin: 2px;
`;

export const RuleChipWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
`;
