/**
 * 사용자 컨트롤러
 * GET /api/users
 * GET /api/users/:id
 */

import { Controller, Get, Param, Headers, HttpException, HttpStatus } from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { UserService } from "./user.service.js";

@ApiTags("users")
@Controller("api/users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: "사용자 목록 조회 (admin만)" })
  findAll(@Headers("x-user-role") role: string) {
    if (role !== "admin") {
      throw new HttpException("Forbidden", HttpStatus.FORBIDDEN);
    }
    return this.userService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "사용자 상세 조회 (admin 또는 본인)" })
  findOne(
    @Param("id") id: string,
    @Headers("x-user-id") userId: string,
    @Headers("x-user-role") role: string
  ) {
    const user = this.userService.findById(id);
    if (!user) {
      throw new HttpException("User not found", HttpStatus.NOT_FOUND);
    }
    // admin 또는 본인만 조회 가능
    if (role !== "admin" && userId !== id) {
      throw new HttpException("Forbidden", HttpStatus.FORBIDDEN);
    }
    return user;
  }
}