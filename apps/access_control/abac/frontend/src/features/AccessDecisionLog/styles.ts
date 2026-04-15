import { styled } from 'styled-components';

export const LogTimeline = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

interface LogEntryProps {
  allowed: boolean;
}

export const LogEntry = styled.div<LogEntryProps>`
  padding: 16px 16px 16px 20px;
  border-radius: 12px;
  background: #ffffff;
  border: 1px solid rgba(17, 17, 17, 0.08);
  border-left: 4px solid ${({ allowed }) => (allowed ? '#16a34a' : '#dc2626')};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
`;

interface DecisionBadgeProps {
  allowed: boolean;
}

export const DecisionBadge = styled.span<DecisionBadgeProps>`
  display: inline-flex;
  align-items: center;
  padding: 2px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.05em;
  background: ${({ allowed }) =>
    allowed ? 'rgba(22, 163, 74, 0.1)' : 'rgba(220, 38, 38, 0.1)'};
  color: ${({ allowed }) => (allowed ? '#16a34a' : '#dc2626')};
`;
