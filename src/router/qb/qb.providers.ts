import { DataSource } from "typeorm";
import { MultipleChoiceOptions } from "./entities/mco.entity";
import { QuestionBank } from "./entities/qb.entity";
import { Answers } from "./entities/answers.entity";
import { Bank } from "./entities/bank.entity";

export const qbProviders = [
    {
        provide:'QUESTION_BANK_REPOSITORY',
        useFactory:(dataSource:DataSource)=> dataSource.getRepository(QuestionBank),
        inject:["DATA_SOURCE"]
    },
    {
        provide:'MULTIPLE_CHOICE_OPTIONS_REPOSITORY',
        useFactory:(dataSource:DataSource)=> dataSource.getRepository(MultipleChoiceOptions),
        inject:["DATA_SOURCE"]
    },
    {
        provide:'ANSWERS_REPOSITORY',
        useFactory:(dataSource:DataSource)=> dataSource.getRepository(Answers),
        inject:["DATA_SOURCE"]
    },
    {
        provide:'BANK_REPOSITORY',
        useFactory:(dataSource:DataSource)=> dataSource.getRepository(Bank),
        inject:["DATA_SOURCE"]
    },
]