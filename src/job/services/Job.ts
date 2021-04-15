import { JOB_REPOSITORY } from '../constants';
import { Injectable, Inject, HttpService } from '@nestjs/common';
import { JobRepositoryContract } from '../repositories';
import { InjectRepository, RepositoryContract } from '@libs/core';
import { Job } from '../models';

@Injectable()
export class JobService {
  @InjectRepository(Job) private repo: RepositoryContract;

  constructor(
    @Inject(JOB_REPOSITORY) private jobs: JobRepositoryContract,
    private http: HttpService,
  ) {}

  async get(id): Promise<Record<string, any>> {
    console.log(this.jobs);
    console.log(this.repo);
    return this.jobs.firstWhere({id: id});
  }

  async list(limit:number = 10, offset: number = 0): Promise<Array<Record<string, any>>> {
    return this.jobs.query().limit(limit).offset(offset);
  }

  async create(params): Promise<Record<string, any>> {
    return this.jobs.create(params);
  }

  async updateWhere(id, params): Promise<number | null> {
    return this.jobs.updateWhere({id: id}, params);
  }

  async deleteWhere(id): Promise<boolean> {
    return this.jobs.deleteWhere({id: id});
  }
}
