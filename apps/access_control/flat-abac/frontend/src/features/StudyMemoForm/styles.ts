import { styled } from "styled-components";

export const FormGrid = styled.div`
  display: grid;
  gap: 14px;
`;

export const FormHint = styled.div`
  padding: 14px 16px;
  border-radius: 16px;
  background: rgba(17, 17, 17, 0.04);
`;

export const Textarea = styled.textarea`
  width: 100%;
  min-height: 132px;
  resize: vertical;
  border-radius: 16px;
  border: 1px solid rgba(17, 17, 17, 0.18);
  padding: 14px 16px;
  font: inherit;
  background: rgba(255, 255, 255, 0.9);
`;
