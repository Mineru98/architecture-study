import { CollapsibleContent, CollapsibleRoot, CollapsibleTrigger } from "./index";

const collapsibleSmoke = (
  <CollapsibleRoot defaultOpen={false}>
    <CollapsibleTrigger>toggle</CollapsibleTrigger>
    <CollapsibleContent>content</CollapsibleContent>
  </CollapsibleRoot>
);

void collapsibleSmoke;
