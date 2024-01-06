import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { DealRepository } from '../repository/deal.repository';
import { DealInfoDto } from '../common/deal.dtos';
import { IResponse } from 'src/common/types';
import { GenericErrorMessages } from 'src/common/constants/enums';

@Injectable()
export class DealService {
  constructor(private readonly dealRepository: DealRepository) {}
  private logger = new Logger('Deal Service');

  async createNewDeal(data: DealInfoDto): Promise<IResponse> {
    const deal = await this.dealRepository.create(data);

    if (!deal) {
      throw new BadRequestException(
        GenericErrorMessages.MUTATE,
        'Unable to create deal, please try again!',
      );
    }

    return {
      status: true,
      message: 'Deal created successfully!',
      data: deal,
    };
  }

  async fetchDeals(page?: number, limit?: number): Promise<IResponse> {
    const deals = await this.dealRepository.findAll({}, { page, limit });

    if (!deals) {
      throw new BadRequestException(
        GenericErrorMessages.FETCH,
        'Unable to fetch deals, please try again!',
      );
    }
    return {
      status: true,
      message: 'Deals fetched successfully!',
      data: deals,
    };
  }

  async fetchDealById(id: string): Promise<IResponse> {
    const deal = await this.dealRepository.findOne({ _id: id });

    if (!deal) {
      throw new NotFoundException(
        'No deal found with this identifier',
        'Not found',
      );
    }

    return {
      status: true,
      message: 'Deal fetched successfully!',
      data: deal,
    };
  }

  async deleteDealById(id: string): Promise<IResponse> {
    const deal = await this.dealRepository.deleteOne({ _id: id });

    if (!deal) {
      throw new BadRequestException(
        'Unable to delete deal with this specified identifier',
        'Error occurred while deleting',
      );
    }

    return {
      status: true,
      message: 'Deal deleted successfully!',
      data: deal,
    };
  }

  async updateDealInfo(id: string, data: DealInfoDto): Promise<IResponse> {
    const deal = await this.dealRepository.updateOne({ _id: id }, data);

    if (!deal) {
      throw new BadRequestException(
        GenericErrorMessages.MUTATE,
        'Unable to update deal with specified identifier',
      );
    }

    return {
      status: true,
      message: 'Deal updated successfully!',
      data: deal,
    };
  }
}
