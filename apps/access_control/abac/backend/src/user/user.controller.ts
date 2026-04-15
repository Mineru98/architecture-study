import { Controller, Get, NotFoundException, Param } from "@nestjs/common";
import { ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { UserService } from "./user.service";

@ApiTags("users")
@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: "전체 사용자 목록 조회" })
  findAll() {
    return this.userService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "사용자 단건 조회" })
  @ApiParam({ name: "id", description: "사용자 ID" })
  findById(@Param("id") id: string) {
    const user = this.userService.findById(id);
    if (!user) throw new NotFoundException(`User ${id} not found`);
    return user;
  }
}
