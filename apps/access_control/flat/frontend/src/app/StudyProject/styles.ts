import { styled } from "styled-components";

export const ProjectShell = styled.div`
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

export const HeroGrid = styled.div`
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
`;

export const MetricCard = styled.div`
  padding: 18px;
  border-radius: 20px;
  background: rgba(17, 17, 17, 0.04);
`;

export const ContentGrid = styled.div`
  display: grid;
  gap: 24px;
  grid-template-columns: minmax(0, 1.35fr) minmax(320px, 0.95fr);

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

export const EndpointBox = styled.code`
  display: block;
  padding: 14px 16px;
  border-radius: 18px;
  background: #111111;
  color: #f7f1df;
`;

export const MemoList = styled.div`
  display: grid;
  gap: 12px;
`;
