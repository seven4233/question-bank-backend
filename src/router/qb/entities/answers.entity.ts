import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

// **答案表（Answers）**
//
// - **ID** (主键, 自增) - 每个答案的唯一标识符
// - **题目ID（QuestionID）** (外键) - 对应题库表中的题目ID
// - **答案内容（AnswerContent）** - 答案的文本内容
@Entity()
export class Answers {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  question_id: number;

  @Column()
  answer_content: string;

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date;
}
