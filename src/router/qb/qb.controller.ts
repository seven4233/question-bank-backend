import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { QbService } from './qb.service';
import { CreateQbDto } from './dto/create-qb.dto';
import { UpdateQbDto } from './dto/update-qb.dto';

@Controller('qb')
export class QbController {
  constructor(private readonly qbService: QbService) {}

  @Post()
  create(@Body() createQbDto: CreateQbDto) {
    return this.qbService.create(createQbDto);
  }


  // 所有题目
  @Get()
  findAll() {
    return this.qbService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.qbService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQbDto: UpdateQbDto) {
    return this.qbService.update(+id, updateQbDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.qbService.remove(+id);
  }
}
