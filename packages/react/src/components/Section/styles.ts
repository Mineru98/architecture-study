import styled from "styled-components";
import type { SectionProps } from "./types";

type StyledSectionProps = Required<Pick<SectionProps, "children">>;

export const StyledSection = styled.section<StyledSectionProps>`
  border: 1px solid var(--va-color-border-default);
  border-radius: var(--va-radius-12);
  background-color: var(--va-color-bg-default);
  color: var(--va-color-fg-default);
  padding: var(--va-space-20);
  box-sizing: border-box;
`;

export const StyledSectionHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: var(--va-space-12);
  margin-bottom: var(--va-space-16);
`;

export const StyledSectionHeaderText = styled.div`
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: var(--va-space-4);
`;

export const StyledSectionTitle = styled.h3`
  margin: 0;
  font-size: var(--va-font-size-20);
  font-weight: var(--va-font-weight-700);
  line-height: 1.35;
  color: var(--va-color-fg-default);
`;

export const StyledSectionDescription = styled.p`
  margin: 0;
  font-size: var(--va-font-size-14);
  font-weight: var(--va-font-weight-400);
  line-height: 1.4;
  color: var(--va-color-fg-muted);
`;

export const StyledSectionAction = styled.div`
  margin-top: var(--va-space-2);
  color: var(--va-color-fg-default);
  display: flex;
  align-items: center;
`;

export const StyledSectionBody = styled.div`
  min-width: 0;
`;
