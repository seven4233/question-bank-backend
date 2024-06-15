import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

// **选择题选项表（MultipleChoiceOptions）**
//
// - **ID** (主键, 自增) - 每个选项的唯一标识符
// - **题目ID（QuestionID）** (外键) - 对应题库表中的题目ID
// - **选项内容（OptionContent）** - 选项的文本内容
// - **是否正确（IsCorrect）** - 标识该选项是否为正确答案
@Entity()
export class MultipleChoiceOptions {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  question_id: number;

  // A,B,C,D
  @Column()
  label: string;

  @Column()
  option_content: string;

  @Column({default:false})
  isCorrect: boolean;



  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date;
}
