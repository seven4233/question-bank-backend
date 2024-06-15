import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

// **题库表（QuestionBank）**
//
// - **ID** (主键, 自增) - 每个题目的唯一标识符
// - **题目内容（Content）** - 题目的文本内容
// - **类型（Type）** - 题目的类型（选择题、填空题、简答题等）
// - **难度（Difficulty）** - 题目的难度级别（简单、中等、困难）
// - **创建时间（CreatedTime）** - 题目的创建时间
// - **更新时间（UpdatedTime）** - 题目的最后更新时间
@Entity()
export class QuestionBank {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({default: 1})
  bank_id: number;

  @Column()
  content: string;

  @Column()
  type: string;
  //难度
  @Column({type: 'int', default: 0})
  difficulty: number;




  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date;
}
