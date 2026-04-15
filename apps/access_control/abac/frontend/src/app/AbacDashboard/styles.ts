import { styled } from 'styled-components';

export const DashboardShell = styled.div`
  min-height: 100vh;
  padding: 48px 0 72px;
`;

export const HeroPanel = styled.div`
  padding: 32px;
  border-radius: 28px;
  background: rgba(255, 255, 255, 0.76);
  border: 1px solid rgba(17, 17, 17, 0.08);
  box-shadow: 0 24px 80px rgba(62, 48, 18, 0.08);
`;

export const ScenarioGrid = styled.div`
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
`;

export const ScenarioCard = styled.div`
  padding: 18px;
  border-radius: 16px;
  background: rgba(17, 17, 17, 0.04);
  border: 1px solid rgba(17, 17, 17, 0.06);
`;
