import { styled } from 'styled-components';

export const SimulatorContainer = styled.div`
  display: grid;
  gap: 24px;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

export const SelectorGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const StyledSelect = styled.select`
  width: 100%;
  padding: 10px 14px;
  border-radius: 10px;
  border: 1px solid rgba(17, 17, 17, 0.14);
  background: #ffffff;
  font-size: 14px;
  color: #111111;
  cursor: pointer;
  outline: none;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23666' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  padding-right: 32px;

  &:focus {
    border-color: #4f46e5;
    box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
  }
`;

interface ResultPanelProps {
  allowed: boolean;
}

export const ResultPanel = styled.div<ResultPanelProps>`
  padding: 24px;
  border-radius: 12px;
  background: ${({ allowed }) => (allowed ? 'rgba(22, 163, 74, 0.06)' : 'rgba(220, 38, 38, 0.06)')};
  border: 2px solid ${({ allowed }) => (allowed ? '#16a34a' : '#dc2626')};
`;

interface AttributeChipProps {
  group: string;
  result: boolean;
}

const groupColorMap: Record<string, string> = {
  subject: '#4f46e5',
  resource: '#0891b2',
  action: '#ca8a04',
  environment: '#16a34a',
};

export const AttributeChip = styled.span<AttributeChipProps>`
  display: inline-block;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-family: monospace;
  background: ${({ group, result }) =>
    result
      ? `${groupColorMap[group] ?? '#6b7280'}22`
      : 'rgba(220, 38, 38, 0.1)'};
  color: ${({ group, result }) =>
    result ? (groupColorMap[group] ?? '#6b7280') : '#dc2626'};
  border: 1px solid ${({ group, result }) =>
    result
      ? `${groupColorMap[group] ?? '#6b7280'}44`
      : 'rgba(220, 38, 38, 0.3)'};
  margin: 2px;
`;

interface PolicyMatchCardProps {
  matched: boolean;
}

export const PolicyMatchCard = styled.div<PolicyMatchCardProps>`
  padding: 16px;
  border-radius: 12px;
  background: #ffffff;
  border: 1px solid ${({ matched }) => (matched ? 'rgba(22, 163, 74, 0.4)' : 'rgba(17, 17, 17, 0.1)')};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
`;

export const ChipWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-top: 8px;
`;
