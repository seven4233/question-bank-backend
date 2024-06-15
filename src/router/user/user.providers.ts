import { DataSource } from "typeorm";
import { User } from "./entities/user.entity";


export const userProviders = [
    {
        provide:'USER_REPOSITORY',
        useFactory:(dataSource:DataSource)=> dataSource.getRepository(User),
        inject:["DATA_SOURCE"]
    },
    // {
    //     provide:'USER_FAVOR_REPOSITORY',
    //     useFactory:(dataSource:DataSource)=> dataSource.getRepository(UserFavor),
    //     inject:["DATA_SOURCE"]
    // },
    // {
    //     provide:'USER_QUESTION_REPOSITORY',
    //     useFactory:(dataSource:DataSource)=> dataSource.getRepository(UserQuestion),
    //     inject:["DATA_SOURCE"]
    // },
    // {
    //     provide:'ROLE_REPOSITORY',
    //     useFactory:(dataSource:DataSource)=> dataSource.getRepository(Role),
    //     inject:["DATA_SOURCE"]
    // },
    // {
    //     provide:'USER_ROLE_REPOSITORY',
    //     useFactory:(dataSource:DataSource)=> dataSource.getRepository(UserRole),
    //     inject:["DATA_SOURCE"]
    // },
    // {
    //     provide:'LEVEL_REPOSITORY',
    //     useFactory:(dataSource:DataSource)=> dataSource.getRepository(Level),
    //     inject:["DATA_SOURCE"]
    // },
    // {
    //     provide:'USER_LEVEL_REPOSITORY',
    //     useFactory:(dataSource:DataSource)=> dataSource.getRepository(UserLevel),
    //     inject:["DATA_SOURCE"]
    // },
    // {
    //     provide:'NOTIFY_REPOSITORY',
    //     useFactory:(dataSource:DataSource)=> dataSource.getRepository(Notify),
    //     inject:["DATA_SOURCE"]
    // },
    // // 搜索历史
    // {
    //     provide:'HISTORY_REPOSITORY',
    //     useFactory:(dataSource:DataSource)=> dataSource.getRepository(History),
    //     inject:["DATA_SOURCE"]
    // }
]