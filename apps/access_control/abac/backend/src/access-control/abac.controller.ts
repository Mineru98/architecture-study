import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { AbacService } from './abac.service';
import { EvaluationContext } from './policy.types';

@Controller()
export class AbacController {
  constructor(private readonly abacService: AbacService) {}

  @Get('policies')
  getPolicies() {
    return this.abacService.getPolicies();
  }

  @Post('access-check')
  evaluate(@Body() body: { subject: any; resource: any; action: string; environment: any }) {
    const context: EvaluationContext = {
      subject: body.subject,
      resource: body.resource,
      action: body.action,
      environment: body.environment,
    };
    return this.abacService.evaluate(context);
  }

  @Get('audit-log')
  getAuditLog(@Req() req: any) {
    const userId = req.user?.sub;
    return this.abacService.getAuditLog(userId);
  }
}
