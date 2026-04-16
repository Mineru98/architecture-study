import { Controller, Get, HttpStatus } from '@nestjs/common';
import { MqttService } from './mqtt.service';

@Controller('v1/mqtt')
export class MqttController {
  constructor(private mqttService: MqttService) {}

  @Get('status')
  async getStatus() {
    return {
      data: {
        subscriptions: this.mqttService.getSubscriptions(),
        messageLog: this.mqttService.getMessageLog().slice(-20).reverse(),
      },
      statusCode: HttpStatus.OK,
    };
  }
}
