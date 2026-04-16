import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { RpcService } from './rpc.service';

@Controller('rpc')
export class RpcController {
  constructor(private rpcService: RpcService) {}

  @Post()
  async handleRpc(@Body() body: { jsonrpc?: string; method: string; params?: any; id?: number | string }) {
    if (!body.jsonrpc || body.jsonrpc !== '2.0') {
      throw new HttpException({ jsonrpc: '2.0', error: { code: -32600, message: 'Invalid Request' }, id: body.id ?? null }, HttpStatus.BAD_REQUEST);
    }
    if (!body.method) {
      throw new HttpException({ jsonrpc: '2.0', error: { code: -32600, message: 'Method required' }, id: body.id ?? null }, HttpStatus.BAD_REQUEST);
    }

    try {
      const result = await this.rpcService.route(body.method, body.params || {});
      return { jsonrpc: '2.0', result, id: body.id ?? null };
    } catch (error: any) {
      return {
        jsonrpc: '2.0',
        error: { code: -32603, message: error.message || 'Internal error' },
        id: body.id ?? null,
      };
    }
  }
}
