import { Transformer } from '@libs/core';

export class JobDetailTransformer extends Transformer {

  async transform(job: Record<string, any>): Promise<Record<string, any>> {
    return {
      id: job.id,
      title: job.title,
      salary_range : job.salaryRange,
      description : job.description,
      created_at : job.createdAt,
      tags: job.tags,
      company: job.company,
      company_logo_url: job.company_logo_url,
    };
  }
}
