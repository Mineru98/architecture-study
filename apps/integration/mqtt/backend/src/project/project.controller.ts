import { Body, Controller, Get, Post } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { CreateStudyMemoDto } from "./dto/create-study-memo.dto";
import { ProjectService } from "./project.service";

@ApiTags("project")
@Controller()
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get("health")
  @ApiOperation({ summary: "Health check" })
  getHealth() {
    return this.projectService.getHealth();
  }

  @Get("project/meta")
  @ApiOperation({ summary: "Project meta" })
  getProjectMeta() {
    return this.projectService.getProjectMeta();
  }

  @Get("study-memos")
  @ApiOperation({ summary: "Study memo list" })
  getStudyMemos() {
    return this.projectService.getStudyMemos();
  }

  @Post("study-memos")
  @ApiOperation({ summary: "Create study memo" })
  createStudyMemo(@Body() payload: CreateStudyMemoDto) {
    return this.projectService.createStudyMemo(payload);
  }
}
