import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RepositoryHelper } from '../../../../common/helpers/repository.helper';
import { DealDocument, DealModel } from '../../../database/models/deal_model';

@Injectable()
export class DealRepository extends RepositoryHelper<DealDocument> {
  constructor(
    @InjectModel(DealModel.name)
    private dealModel: Model<DealDocument>,
  ) {
    super({
      model: dealModel,
      logger: new Logger('Deal Repository'),
      repositoryName: 'Deal Repository',
    });
  }
}
