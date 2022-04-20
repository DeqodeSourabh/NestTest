import { Controller, Get, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Request , Response } from 'express';
@Controller('payments')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getPayment(@Req() request: Request, @Res() response:Response): void {
    const {count, page} = request.query;
    if(!count || !page){
      response
      .status(400)
      .send({msg:'missing count or page'});
    }
    else{
      response.send(200)
    }

  }
}
