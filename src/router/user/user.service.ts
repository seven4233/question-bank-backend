import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Like, Repository } from 'typeorm';
import * as jwt from 'jsonwebtoken';
import { User } from './entities/user.entity';
import { JWT_KEY } from "../../../config";
import { cos } from "../../utils/cos";

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY') private user: Repository<User>  ,
  ) {}

  /**
   * 登录
   * @param account
   * @param password
   * @returns
   */
  async login(account:string, password:string) {
    // 校验

    // 判断是否存在
    let user = await this.user.findOne({ where: { account, password } });
    if (!user) {
      return  { message: '账号或密码错误!', code:-1 };
    }

    const payload = {
      id: user.id,
      account: user.account,
    };

    const safetyUser = {
      ...user,
      password: '',
    };

    //  生成token
    const token = jwt.sign(payload, JWT_KEY, { expiresIn: '7 days' });

    return { message: '登录成功~', code: 0, result: safetyUser, token };
  }


  /**
   * 更新用户信息
   */
  async updateUserinfo(userInfo:any, userId: number) {

    let userToUpdate = await this.user.findOne({ where: { id: userId } });
    let res = await this.user.save({ ...userToUpdate, ...userInfo });

    return {
      message: '更新用户信息成功~',
      code: 0,
      result: { ...res },
    };
  }

  /**
   * 获取用户信息
   */
  async queryUserInfo(id:number){
    const user =  await this.user.findOne({where:{id}})
    return user
  }
  /**
   * 更新头像
   */
  async updateAvatar(file: any, userId: number) {
    console.log(file);

    let res:string = await new Promise((resolve, reject) => {
      cos.putObject({
        Bucket: 'hualin-1314589919', /* 必须 */
        Region: 'ap-beijing',    /* 必须 */
        Key: file?.originalname ,              /* 必须 */
        StorageClass: 'STANDARD',
        Body: file?.buffer, // 上传文件对象
        onProgress: function (progressData) {
          // console.log(JSON.stringify(progressData));
        }
      }, function (err, data) {
        if(err){console.log(err);
        }
        resolve('https://'+ data?.Location)
      })
    })
    const userToUpdate = await this.user.findOne({where:{id : userId}})
    userToUpdate.avatar = res
    await this.user.save(userToUpdate)

    return { message: '头像上传成功!', code: 0, result: res};
  }





}
