import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  Req,
  Query,
  UseInterceptors,
  UploadedFile
} from "@nestjs/common";
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor } from "@nestjs/platform-express";

@Controller('user')
export class UserController {

  constructor(private readonly userService: UserService) {}

  @Post('login')
  login(@Body() loginParams:{account:string, password:string}) {
    console.log(loginParams );

    return this.userService.login(loginParams.account, loginParams.password);
  }

  //更新用户信息的接口
  @Put('update')
  update(@Body() userInfo: UpdateUserDto, @Req() req) {

    const userId = req.currentUser?.id;
    return this.userService.updateUserinfo(userInfo, userId);
  }

  // 获取用户详情
  @Get('detail')
  getDetail(@Req() req) {

    const userId = req.currentUser?.id;
    return this.userService.queryUserInfo(userId)
  }

  // 更新头像的接口
  @Post('avatar')
  @UseInterceptors(FileInterceptor('file'))
  avatar(@UploadedFile() file: any, @Req() req,) {

    console.log(11);

    const userId = req.currentUser?.id;
    return this.userService.updateAvatar(file, userId);
  }



}
