import { PartialType } from '@nestjs/mapped-types';
import { CreateQbDto } from './create-qb.dto';

export class UpdateQbDto extends PartialType(CreateQbDto) {}
