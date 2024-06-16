import { Inject, Injectable } from "@nestjs/common";
import { CreateQbDto } from './dto/create-qb.dto';
import { UpdateQbDto } from './dto/update-qb.dto';
import { Repository } from "typeorm";
import { QuestionBank } from "./entities/qb.entity";
import { MultipleChoiceOptions } from "./entities/mco.entity";
import { Answers } from "./entities/answers.entity";
import { Bank } from "./entities/bank.entity";
import { UserQuestion } from './entities/uq.entity';

@Injectable()
export class QbService {


  constructor(
    @Inject('QUESTION_BANK_REPOSITORY') private qb: Repository<QuestionBank>,
    @Inject('MULTIPLE_CHOICE_OPTIONS_REPOSITORY') private mco: Repository<MultipleChoiceOptions>,
    @Inject('ANSWERS_REPOSITORY') private answer: Repository<Answers>,
    @Inject('BANK_REPOSITORY') private bank: Repository<Bank>,
    @Inject('UQ_REPOSITORY') private uq: Repository<UserQuestion>,
             ) { }


  //
  async queryBankList(){
    const bank_list = await this.bank.find()
    return {result:bank_list, code :0, message:'ok'}
  }


  // 所有单选题
   async querySingleListAll(userId:number, bankId:number){

    const singleList:any = await this.qb.find({where:{bank_id:bankId, type:'单选题'}, take:20})
     // 找选项
     for (let i = 0; i < singleList.length; i++) {
       let options = await this.mco.find({where: {question_id: singleList[i].id}})

       options =  options.map(option=>{
         return {
           ...option,
           selected: false
         }
       })
       singleList[i].options = options;
     }


     return singleList
   }


   // 获取已做题
   async queryDoneList (userId:number){
    const res = await this.uq.find({where:{user_id:userId}})
     return res
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

  // 插入已完成题目
  async insertFinishedQuestion(body: any, userId: number) {
    const { sort, bankId, question_id, option } = body

    const objectToSave = {
      sort,
      user_id: userId,
      bank_id: bankId,
      question_id: question_id,
      option: option,
    }

    const res = await this.uq.save(objectToSave)

    const count = await this.uq.count({ where: { user_id: userId } })

    return { code: 0, message: '提交成功!' }
  }

}
