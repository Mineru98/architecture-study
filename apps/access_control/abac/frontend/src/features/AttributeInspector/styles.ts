import { styled } from 'styled-components';

export const InspectorGrid = styled.div`
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(4, 1fr);

  @media (max-width: 1100px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

interface AttributeGroupProps {
  color: string;
}

export const AttributeGroup = styled.div<AttributeGroupProps>`
  border-radius: 12px;
  background: #ffffff;
  border: 1px solid rgba(17, 17, 17, 0.08);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  overflow: hidden;

  &::before {
    content: '';
    display: block;
    height: 4px;
    background: ${({ color }) => color};
  }

  & > * {
    padding: 16px;
  }
`;

export const AttributeGroupInner = styled.div`
  padding: 16px;
`;

export const AttributeRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 8px;
  padding: 6px 0;
  border-bottom: 1px solid rgba(17, 17, 17, 0.05);

  &:last-child {
    border-bottom: none;
  }

  & > span:first-child {
    font-size: 12px;
    color: #888888;
    min-width: 80px;
  }

  & > span:last-child {
    font-size: 13px;
    font-weight: 500;
    text-align: right;
    word-break: break-all;
  }
`;
