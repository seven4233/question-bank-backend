import { Inject, Injectable } from "@nestjs/common";
import { CreateQbDto } from './dto/create-qb.dto';
import { UpdateQbDto } from './dto/update-qb.dto';
import { Repository } from "typeorm";
import { QuestionBank } from "./entities/qb.entity";
import { MultipleChoiceOptions } from "./entities/mco.entity";
import { Answers } from "./entities/answers.entity";
import { Bank } from "./entities/bank.entity";

@Injectable()
export class QbService {


  constructor(
    @Inject('QUESTION_BANK_REPOSITORY') private qb: Repository<QuestionBank>,
    @Inject('MULTIPLE_CHOICE_OPTIONS_REPOSITORY') private mco: Repository<MultipleChoiceOptions>,
    @Inject('ANSWERS_REPOSITORY') private answer: Repository<Answers>,
    @Inject('BANK_REPOSITORY') private bank: Repository<Bank>,
             ) { }


  //
  async queryBankList(){
    const bank_list = await this.bank.find()
    return {result:bank_list, code :0, message:'ok'}
  }

  // 所有题目
  async findAll() {

    const qb_list:any = await this.qb.find();

    let options = [];
    // 找到选项
    for(let i = 0; i < qb_list.length; i++) {
      options = await this.mco.find({where:{question_id: qb_list[i].id}})
      qb_list[i].options = options;
    }
    return {res: qb_list};
  }


}
