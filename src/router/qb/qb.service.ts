import { Inject, Injectable } from "@nestjs/common";
import { In, Not, Repository } from "typeorm";
import { Bank } from "./entities/bank.entity";
import { Single } from "./entities/single.entity";
import { Multiple } from "./entities/multiple.entity";
import { Blank } from "./entities/blank.entity";
import { Judge } from "./entities/judge.entity";
import { User } from "../user/entities/user.entity";
import { UserQuestion } from "./entities/uq.entity";
import { UserFavor } from "./entities/user_favor.entity";
import { UserComment } from "./entities/uc.entity";

@Injectable()
export class QbService {

  constructor(
    @Inject("BANK_REPOSITORY") private bank: Repository<Bank>,
    @Inject("SINGLE_REPOSITORY") private single: Repository<Single>,
    @Inject("MULTIPLE_REPOSITORY") private multiple: Repository<Multiple>,
    @Inject("BLANK_REPOSITORY") private blank: Repository<Blank>,
    @Inject("JUDGE_REPOSITORY") private judge: Repository<Judge>,
    @Inject("USER_REPOSITORY") private user: Repository<User>,
    @Inject("UQ_REPOSITORY") private uq: Repository<UserQuestion>,
    @Inject("UF_REPOSITORY") private uf: Repository<UserFavor>,
    @Inject("UC_REPOSITORY") private uc: Repository<UserComment>
  ) {
  }

  // 获取题库列表
  async getBankList() {
    const res = await this.bank.find({
      // relations:['questions']
    });
    return res;
  }

  /**
   * 获取分类信息
   */
  async getSortInfo(userId: number, bankId: number) {
    const singleCount = await this.single.countBy({ bank_id: bankId });
    const multipleCount = await this.multiple.countBy({ bank_id: bankId });
    const blankCount = await this.blank.countBy({ bank_id: bankId });
    const judgeCount = await this.judge.countBy({ bank_id: bankId });

    const singleDoneCount = await this.uq.countBy({ question_sort: "单选题", user_id: userId, bank_id: bankId });
    const multipleDoneCount = await this.uq.countBy({ question_sort: "多选题", user_id: userId, bank_id: bankId });
    const blankDoneCount = await this.uq.countBy({ question_sort: "填空题", user_id: userId, bank_id: bankId });
    const judgeDoneCount = await this.uq.countBy({ question_sort: "判断题", user_id: userId, bank_id: bankId });

    const bankInfo = await this.bank.findOneBy({ id: bankId });
    return {
      count: { singleCount, multipleCount, blankCount, judgeCount }, doneCount: {
        singleDoneCount,
        multipleDoneCount, blankDoneCount, judgeDoneCount
      }, bankInfo
    };
  }

  async redo(userId: number, bankId: number, question_sort: string) {
    await this.uq.delete({ user_id: userId, bank_id: bankId, question_sort });

    return { message: "重做!", code: 0 };
  }


  /**
   * 获取单选题
   */
  async getSingleList(userId: number, bankId: number) {
    // 根据用户id找到已做的 (单选) 题
    const doneList = await this.uq.find({ where: { user_id: userId, bank_id: bankId, question_sort: "单选题" } });
    const doneArr = doneList?.map(item => {
      return item.question_num;
    });

    // 寻找已收藏的 （单选）题
    const favoredList = await this.uf.find({ where: { user_id: userId, question_sort: "单选题" } });
    const favoredArr = favoredList?.map(item => {
      return item.question_num;
    });
    const singleList:any[] = await this.single.find({
      take: 5,
      where: {
        // question_num: Not(In(doneArr)),
        bank_id: bankId
      }
    });

    // 获取评论
    for (const item of singleList) {
      const index = singleList.indexOf(item);
       let comments:any = await  this.uc.find({where: {bank_id: bankId, question_num:item.question_num}});

       for(const comment of comments) {
         comment.userInfo = await this.user.findOne({ where: { id: comment.user_id } })
       }

       singleList[index].comments = comments
    }


    // 加工选项
    const newSingleList = singleList.map((item, index) => {

      let isFavored: boolean;
      if (favoredArr.includes(item.question_num)) {
        isFavored = true;
      } else {
        isFavored = false;
      }
      const newOptions = item.options.split("$").map((i: any, idx: number) => {
        const letter = "ABCD";
        return {
          label: i,
          value: letter[idx],
          question_num: item.question_num,
          answer: item.answer,
          selected: false,
          question_index: index
        };
      });


      const tar = doneList.find(doneItem => doneItem.question_num === item.question_num);

      return {
        ...item,
        question_index: index,
        options: newOptions,
        isFavored,
        your: tar?.your_answer || "",
      };
    });

    const singleCount = await this.single.countBy({ bank_id: bankId });
    return { list: newSingleList, totalCount: singleCount, doneCount: doneList?.length, lastPosition: 9 };
  }

  /**
   * 获取多选题
   */
  async getMulList(userId: number, bankId: number) {
    // 根据用户id找到已做的 (单选) 题
    const doneList = await this.uq.find({ where: { user_id: userId, bank_id: bankId, question_sort: "多选题" } });
    const doneArr = doneList?.map(item => {
      return item.question_num;
    });
    const mulList = await this.multiple.find({
      take: 5,
      where: {
        question_num: Not(In(doneArr)),
        bank_id: bankId
      }
    });
    // 加工选项
    const newMulList = mulList.map((item, index) => {

      const newOptions = item.options.split("$").map((i: any, idx: number) => {
        const letter = "ABCDEFG";
        return {
          label: i,
          value: letter[idx],
          question_num: item.question_num,
          answer: item.answer,
          selected: false,
          question_index: index,
          your: ""
        };
      });
      return {
        ...item,
        question_index: index,
        options: newOptions
      };
    });

    const mulCount = await this.multiple.countBy({ bank_id: bankId });
    return { list: newMulList, totalCount: mulCount, doneCount: doneList?.length };

  }

  /**
   * 获取判断题
   */
  async getJudgeList(userId: number, bankId: number) {
    // 根据用户id找到已做的 (判断) 题
    const doneList = await this.uq.find({ where: { user_id: userId, question_sort: "判断题", bank_id: bankId } });
    const doneArr = doneList.map(item => {
      return item.question_num;
    });
    const judgeList = await this.judge.find({
      take: 5,
      where: {
        question_num: Not(In(doneArr)),
        bank_id: bankId
      }
    });

    // 加工选项
    const newJudgeList = judgeList.map((item, index) => {
      const newOptions = [
        {
          label: "对",
          value: "A",
          question_num: item.question_num,
          answer: item.answer,
          selected: false,
          question_index: index
        },
        {
          label: "错",
          value: "B",
          question_num: item.question_num,
          answer: item.answer,
          selected: false,
          question_index: index
        }
      ];

      return {
        ...item,
        question_index: index,
        options: newOptions
      };
    });

    const judgeCount = await this.judge.count();
    return { list: newJudgeList, totalCount: judgeCount, doneCount: doneList?.length };
  }


  // 交一题
  async insertOneToUq(userId: number, bankId: number, question_num: string, question_sort: string, your_answer: string) {

    const isExist = await this.uq.findOne({
      where: {
        user_id: userId,
        question_num: question_num,
        your_answer: your_answer
      }
    });
    if (isExist) {
      return { code: 1, message: "已经做过" };
    }

    const isDup = await this.uq.findOne({
      where: {
        user_id: userId,
        question_num: question_num
      }
    });
    // 直接更新答案
    if (isDup) {
      isDup.your_answer = your_answer;
      await this.uq.save(isDup);
      return { res: isDup, message: "ok", code: 0 };
    }


    const objToSave = {
      user_id: userId,
      bank_id: bankId,
      question_num: question_num,
      question_sort: question_sort,
      your_answer: your_answer
    };
    const res = await this.uq.save(objToSave);
    return { res, message: "ok", code: 0 };
  }

  // 插入已完成题目
  async insertFinishedQuestion(body: any, userId: number) {
    const { sort, bankId, correctList } = body;
    console.log(sort);

    const doneArr = (correctList as any[]).map(item => {
      return {
        user_id: userId,
        bank_id: bankId,
        question_num: item.question_num,
        question_sort: sort
      };
    });

    for (let i = 0; i < doneArr.length; i++) {
      const res = await this.uq.save(doneArr[i]);
    }

    const count = await this.uq.count({ where: { user_id: userId } });


    let userToUpdate = await this.user.findOne({ where: { id: userId } });

    await this.user.save(userToUpdate);
    return { code: 0, message: "提交成功!" };
  }

  //浏览加1
  async addFever(bankId: number) {
    let bankToUpdate = await this.bank.findOne({ where: { id: bankId } });

    bankToUpdate.fever += 1;
    await this.bank.save(bankToUpdate);
    return { message: "浏览加一", code: 0 };
  }

  // 加评论
  async addComment(body, userId: number) {
    const { content, question_num, bank_id } = body;

    const ucObj = {
      user_id: userId,
      question_num: question_num,
      bank_id: bank_id,
      content: content
    };
     const res =   await this.uc.save(ucObj);
     return {res, code:'0', message:'评论成功~'}

  }
}

