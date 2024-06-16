import { Controller, Get, Post, Body, Patch, Param, Delete, Req, ParseIntPipe, Query } from '@nestjs/common';
import { QbService } from './qb.service';
import { CreateQbDto } from './dto/create-qb.dto';
import { UpdateQbDto } from './dto/update-qb.dto';

@Controller('qb')
export class QbController {
  constructor(private readonly qbService: QbService) {}

  // 获取题库列表
  @Get('bank')
  queryBankList(){
    return this.qbService.queryBankList()
  }


  // 获取所有单选题
  @Get('single')
  querySingleListAll(@Req() req:any ,@Query() query){

    const userId = req.currentUser?.id

    return this.qbService.querySingleListAll(userId,query.bankId)
  }


  // 添加已完成题目
  @Post('/finish')
  addFinishedQuestion(@Body() body, @Req() req) {
    const { id: userId } = req.currentUser
    return this.qbService.insertFinishedQuestion(body, userId)
  }

  // 获取已做题目
  @Get('done')
  queryDoneQuestion(@Req() req){
    const { id: userId } = req.currentUser
    return this.qbService.queryDoneList(userId)
  }


  // 所有题目
  @Get()
  findAll() {
    return this.qbService.findAll();
  }


}
