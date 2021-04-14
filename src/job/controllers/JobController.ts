import { ApiController, Request, Response, WithAlias } from '@libs/core';
import {Controller, Delete, Get, Post, Put, Req, Res} from '@nestjs/common';
import { JobService } from '../services';
import { JobDetailTransformer } from '@app/transformer';


@Controller('jobs')
export class JobController extends ApiController {
  constructor(private jobs: JobService) {
    super();
  }

  @Get('/')
  @WithAlias('job.list')
  async getJobs(
      @Req() req: Request,
      @Res() res: Response,
  ): Promise<Response> {
    const {limit, offset} = req.query;
    const jobs = await this.jobs.list(parseInt(limit), parseInt(offset));
    return res.success(
        await this.collection(jobs, new JobDetailTransformer(), {req}),
    );
  }

  @Get('/:id')
  @WithAlias('job.detail')
  async getJobDetail(
      @Req() req: Request,
      @Res() res: Response,
  ): Promise<Response> {
    const { id } = req.params;
    const job = await this.jobs.get(id);
    return res.success(
        await this.transform(job, new JobDetailTransformer(), {req}),
    );
  }

  @Post('/')
  @WithAlias('job.create')
  async create(
      @Req() req: Request,
      @Res() res: Response,
  ): Promise<Response> {
    const job = await this.jobs.create(req.all());
    
    return res.success(
        await this.transform(job, new JobDetailTransformer(), {req}),
    );
  }

  @Put('/:id')
  @WithAlias('job.update')
  async update(
      @Req() req: Request,
      @Res() res: Response,
  ): Promise<Response> {
    const { id } = req.params;
    await this.jobs.updateWhere(id, req.all());
    const job = await this.jobs.get(id);

    return res.success(
        await this.transform(job, new JobDetailTransformer(), {req}),
    );
  }

  @Delete('/:id')
  @WithAlias('job.update')
  async delete(
      @Req() req: Request,
      @Res() res: Response,
  ): Promise<Response> {
    const { id } = req.params;
    const isDeleted = await this.jobs.deleteWhere(id);
    
    if (isDeleted) {
      return res.success({});
    }
    
    return res.error({});
  }
}
