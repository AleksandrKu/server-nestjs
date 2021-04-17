import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getPing(): object {
    return {
    statusCode: 200,
    message: "OK",
    time: new Date(),
  };
  }
}
