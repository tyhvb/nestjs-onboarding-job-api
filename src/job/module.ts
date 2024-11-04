import { Module, HttpModule } from '@nestjs/common';
import { JobController } from './controllers';
import { JobService } from './services';
import { JOB_REPOSITORY } from './constants';
import { JobRepository } from './repositories';

@Module({
  imports: [HttpModule],
  controllers: [JobController],
  providers: [
    JobService,
    { provide: JOB_REPOSITORY, useClass: JobRepository },
  ],
})
export class JobModule {}
