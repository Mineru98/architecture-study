import {
  StyledSection,
  StyledSectionAction,
  StyledSectionBody,
  StyledSectionDescription,
  StyledSectionHeader,
  StyledSectionHeaderText,
  StyledSectionTitle,
} from "./styles";
import type { SectionProps } from "./types";

export function Section({ title, description, action, children, ...props }: SectionProps) {
  return (
    <StyledSection {...props}>
      {(title || description || action) && (
        <StyledSectionHeader>
          {(title || description) && (
            <StyledSectionHeaderText>
              {title && <StyledSectionTitle>{title}</StyledSectionTitle>}
              {description && <StyledSectionDescription>{description}</StyledSectionDescription>}
            </StyledSectionHeaderText>
          )}
          {action && <StyledSectionAction>{action}</StyledSectionAction>}
        </StyledSectionHeader>
      )}
      <StyledSectionBody>{children}</StyledSectionBody>
    </StyledSection>
  );
}

export type { SectionProps } from "./types";
