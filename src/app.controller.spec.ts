import { RequestMethod } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { request } from 'http';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {Request, Response} from 'express'
describe('AppController', () => {
  let appController: AppController;

  const requestMock = {
    query:{},
  }as unknown as Request;

  const statusResponseMock ={
    send: jest.fn((x)=>x),
  }
  const responseMock ={
    status: jest.fn((x) => statusResponseMock),
    send: jest.fn((x) => x)
  }as unknown as Response;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('getPayment', () => {
    it('should return a status of 400', () => {
      appController.getPayment(requestMock,responseMock);
      console.log(requestMock)
      console.log( responseMock)
      expect(responseMock.status).toHaveBeenCalledWith(400);
      expect(statusResponseMock.send).toHaveBeenCalledWith({
        msg: "missing count or page"
      })
    });

    it('should return 200 when parameter is passed', ()=>{
      requestMock.query ={
        count: "10",
        page: "2"
      }
      appController.getPayment(requestMock, responseMock)
      expect(responseMock.send).toHaveBeenCalledWith(200);
    })
  });
});
