import { Controller, Get, Post, Body, Patch, Param, Delete, Req, ParseIntPipe, Query } from '@nestjs/common';
import { CreateQbDto } from './dto/create-qb.dto';
import { UpdateQbDto } from './dto/update-qb.dto';
import { QbService } from "./qb.service";

@Controller('qb')
export class QbController {
  constructor(private readonly qbService: QbService) {}

  //  获取题库列表
  @Get('/bank')
  getQuestionBankList() {
    return this.qbService.getBankList()
  }

  // 获取分类信息
  @Get(":id/sort")
  sortInfo(@Req() req, @Param('id', ParseIntPipe) bankId) {
    const userId = req.currentUser?.id
    return this.qbService.getSortInfo(userId, bankId)
  }


  // 获取单选题
  @Get(":id/single")
  singleList(@Req() req, @Param("id", ParseIntPipe) bankId) {
    const userId = req.currentUser?.id
    return this.qbService.getSingleList(userId, bankId)
  }

  // 获取多选题
  @Get(":id/multiple")
  mulList(@Req() req, @Param("id", ParseIntPipe) bankId) {
    const userId = req.currentUser?.id
    return this.qbService.getMulList(userId, bankId)
  }
  // 获取判断题
  @Get(":id/judge")
  judgeList(@Req() req, @Param("id", ParseIntPipe) bankId) {

    const userId = req.currentUser?.id
    return this.qbService.getJudgeList(userId, bankId)
  }


  // 添加已完成题目
  @Post('/finish')
  addFinishedQuestion(@Body() body, @Req() req) {
    const { id: userId } = req.currentUser
    return this.qbService.insertFinishedQuestion(body, userId)
  }

  // 浏览加yi
  @Get("/fever")
  feverAddOne(@Query() query){
    console.log(query)
    const bankId = query?.bankId
    return this.qbService.addFever(+bankId);
  }




}
