import { DataSource } from "typeorm";
import { Bank } from "./entities/bank.entity";
import { Single } from "./entities/single.entity";
import { Multiple } from "./entities/multiple.entity";
import { Blank } from "./entities/blank.entity";
import { Judge } from "./entities/judge.entity";
import { UserQuestion } from "./entities/uq.entity";
import { UserFavor } from "./entities/user_favor.entity";
import { UserComment } from "./entities/uc.entity";

export const qbProviders = [
    {
        provide:'BANK_REPOSITORY',
        useFactory:(dataSource:DataSource)=> dataSource.getRepository(Bank),
        inject:["DATA_SOURCE"]
    },
    {
        provide:'SINGLE_REPOSITORY',
        useFactory:(dataSource:DataSource)=> dataSource.getRepository(Single),
        inject:["DATA_SOURCE"]
    },
    {
        provide:'MULTIPLE_REPOSITORY',
        useFactory:(dataSource:DataSource)=> dataSource.getRepository(Multiple),
        inject:["DATA_SOURCE"]
    },
    {
        provide:'BLANK_REPOSITORY',
        useFactory:(dataSource:DataSource)=> dataSource.getRepository(Blank),
        inject:["DATA_SOURCE"]
    },
    {
        provide:'JUDGE_REPOSITORY',
        useFactory:(dataSource:DataSource)=> dataSource.getRepository(Judge),
        inject:["DATA_SOURCE"]
    },

    {
        provide:'UQ_REPOSITORY',
        useFactory:(dataSource:DataSource)=> dataSource.getRepository(UserQuestion),
        inject:["DATA_SOURCE"]
    },

    {
        provide:'UF_REPOSITORY',
        useFactory:(dataSource:DataSource)=> dataSource.getRepository(UserFavor),
        inject:["DATA_SOURCE"]
    }
    ,
    {
        provide:'UC_REPOSITORY',
        useFactory:(dataSource:DataSource)=> dataSource.getRepository(UserComment),
        inject:["DATA_SOURCE"]
    }

]