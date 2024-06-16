import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { QbService } from './qb.service';
import { CreateQbDto } from './dto/create-qb.dto';
import { UpdateQbDto } from './dto/update-qb.dto';

@Controller('qb')
export class QbController {
  constructor(private readonly qbService: QbService) {}

  @Get('bank')
  queryBankList(){
    return this.qbService.queryBankList()
  }



  // 所有题目
  @Get()
  findAll() {
    return this.qbService.findAll();
  }


}
