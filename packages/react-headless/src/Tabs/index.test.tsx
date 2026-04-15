import { TabsContent, TabsList, TabsRoot, TabsTrigger } from "./index";

const tabsSmoke = (
  <TabsRoot defaultValue="overview">
    <TabsList>
      <TabsTrigger value="overview">Overview</TabsTrigger>
      <TabsTrigger value="details">Details</TabsTrigger>
    </TabsList>
    <TabsContent value="overview">overview</TabsContent>
    <TabsContent value="details">details</TabsContent>
  </TabsRoot>
);

void tabsSmoke;
