import { Job } from '../../models';
import { Injectable } from '@nestjs/common';
import { DatabaseRepository as DB, InjectModel } from '@libs/core';
import { JobRepositoryContract } from '../contracts';

@Injectable()
export class JobRepository extends DB implements JobRepositoryContract {
  @InjectModel(Job)
  model: Job;
}
