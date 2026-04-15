import { Injectable } from "@nestjs/common";
import { v4 as uuidv4 } from "uuid";
import { CreateStudyMemoDto } from "./dto/create-study-memo.dto";
import { initialStudyMemos, projectMeta } from "./project.data";

@Injectable()
export class ProjectService {
  private readonly studyMemos = [...initialStudyMemos];

  getHealth() {
    return {
      status: "ok",
      updatedAt: new Date().toISOString(),
    };
  }

  getProjectMeta() {
    return projectMeta;
  }

  getStudyMemos() {
    return this.studyMemos;
  }

  createStudyMemo(payload: CreateStudyMemoDto) {
    const nextMemo = {
      id: uuidv4(),
      ...payload,
      createdAt: new Date().toISOString(),
    };

    this.studyMemos.unshift(nextMemo);
    return nextMemo;
  }
}
