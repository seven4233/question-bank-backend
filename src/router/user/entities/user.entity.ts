import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  // 账号
  @Column()
  account: string;

  // 密码
  @Column({nullable:true})
  password: string;
  // 昵称
  @Column({nullable:true})
  nickname: string;

  //性别
  @Column({ type: 'tinyint', nullable: true,default:0 })
  gender: number;


  //刷题总数
  @Column({ default: 0 })
  questionDoneCount: number;

  // 头像
  @Column({
    type: 'varchar',
    default:
      'https://hualin-1314589919.cos.ap-beijing.myqcloud.com/file/avatar.jpg',
  })
  avatar: string;
  // 电话
  @Column({ nullable: true })
  phone: string;
  // 签名
  @Column({ nullable: true })
  desc: string;
  // 邮箱
  @Column({ nullable: true })
  email: string;

  // 地址
  @Column({ nullable: true })
  address: string;
  // 个性签名
  @Column({ nullable: true })
  sign: string; //

  @Column({ nullable: true })
  realName: string;

  // 权限
  @Column({ type: 'tinyint', default: 0 })
  access: number;

  @CreateDateColumn({ nullable: true })
  createdAt: Date;
}
