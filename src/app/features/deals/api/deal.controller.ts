import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { DealService } from './deal.service';
import { DealInfoDto } from '../common/deal.dtos';
import { AuthGuard } from 'src/common/guards/auth.guard';

@Controller('deals')
@UseGuards(AuthGuard)
export class DealController {
  constructor(private readonly dealService: DealService) {}

  @Post('/create')
  async createDeal(@Body() data: DealInfoDto) {
    return this.dealService.createNewDeal(data);
  }

  @Get('/')
  async fetchDeals(@Query('page') page: number, @Query('limit') limit: number) {
    return this.dealService.fetchDeals(page, limit);
  }

  @Get('/:id')
  async fetchDealById(@Param('id') id: string) {
    return this.dealService.fetchDealById(id);
  }

  @Put('/:id/update')
  async updateDealInfo(@Param('id') id: string, @Body() data: DealInfoDto) {
    return this.dealService.updateDealInfo(id, data);
  }

  @Delete('/:id/delete')
  async deleteDealInfo(@Param('id') id: string) {
    return this.dealService.deleteDealById(id);
  }
}
