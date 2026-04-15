import { DialogBackdrop, DialogCloseButton, DialogContent, DialogDescription, DialogPositioner, DialogRoot, DialogTitle, DialogTrigger } from "./index";

const dialogSmoke = (
  <DialogRoot defaultOpen={false}>
    <DialogTrigger>open</DialogTrigger>
    <DialogBackdrop />
    <DialogPositioner>
      <DialogContent>
        <DialogTitle>title</DialogTitle>
        <DialogDescription>description</DialogDescription>
        <DialogCloseButton>close</DialogCloseButton>
      </DialogContent>
    </DialogPositioner>
  </DialogRoot>
);

void dialogSmoke;
