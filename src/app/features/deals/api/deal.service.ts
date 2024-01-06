import { Injectable, Logger } from '@nestjs/common';
import { DealRepository } from '../repository/deal.repository';

@Injectable()
export class DealService {
  constructor(private readonly dealRepository: DealRepository) {}
  private logger = new Logger('User Service');
}
