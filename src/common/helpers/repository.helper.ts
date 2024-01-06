import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { errorIfNull } from './utils.helper';
import {
  ClientSession,
  FilterQuery,
  Model,
  PipelineStage,
  QueryOptions,
  SortOrder,
  UpdateQuery,
} from 'mongoose';
import { RepositoryFindAll } from '../types';

@Injectable()
export class RepositoryHelper<T> implements OnModuleInit {
  private model: Model<T>;
  private repositoryName: string;
  logger: Logger;

  constructor(data: {
    model: Model<T>;
    repositoryName: string;
    logger: Logger;
  }) {
    this.model = data.model;
    this.repositoryName = data.repositoryName;
    this.logger = data.logger;
  }

  onModuleInit = () => this.logger.log(`Initialized ${this.repositoryName}`);

  async create(
    query: FilterQuery<T>,
    options?: {
      errorIfNull?: [boolean] | [boolean, string];
      transaction?: ClientSession;
    },
  ): Promise<never | T> {
    const doc = new this.model(query);

    try {
      await doc.save({
        validateBeforeSave: true,
        ...(options?.transaction && { session: options.transaction }),
      });

      if (options?.errorIfNull && options?.errorIfNull[0]) {
        errorIfNull(doc, options?.errorIfNull[1] || 'Error creating doc!');
      }

      return doc as T;
    } catch (e) {
      throw e;
    }
  }

  async findOne(
    query: FilterQuery<T>,
    options?: Pick<QueryOptions<T>, 'select' | 'populate'> & {
      errorIfNull?: [boolean] | [boolean, string];
      transaction?: ClientSession;
    },
  ) {
    try {
      const doc = this.model.findOne(query);

      options?.transaction && doc.session(options.transaction);
      options?.select && doc.select(options.select as string[]);
      options?.populate && doc.populate(options.populate as string[]);

      const foundDoc = await doc.exec();

      if (options?.errorIfNull && options?.errorIfNull[0]) {
        errorIfNull(
          foundDoc,
          options?.errorIfNull[1] || 'Error doc not found!',
        );
      }

      return foundDoc as T;
    } catch (e) {
      throw e;
    }
  }

  async findAll(
    query: FilterQuery<T>,
    options?: {
      errorIfNull?: [boolean] | [boolean, string];
      select?: Array<keyof T>;
      populate?: Array<keyof T>;
      page?: number;
      limit?: number;
      sort?: Record<string, 'asc' | 'desc'>;
      transaction?: ClientSession;
    },
  ): Promise<never | RepositoryFindAll<T>> {
    try {
      const limit = options?.limit ?? 20;
      const page = options?.page ? (options.page < 1 ? 1 : options.page) : 1;
      const skip = limit * (page - 1);
      const sort = options?.sort
        ? options?.sort
        : { created_at: 'desc' as SortOrder };

      const doc = this.model
        .find(query)
        .limit(limit)
        .skip(skip)
        .sort(sort)
        .allowDiskUse(true);

      options?.transaction && doc.session(options.transaction);
      options?.select && doc.select(options.select as string[]);
      options?.populate && doc.populate(options.populate as string[]);

      const [foundDocs, totalDocs] = await Promise.all([
        doc.exec(),
        this.count(),
      ]);

      if (options?.errorIfNull && options?.errorIfNull[0]) {
        errorIfNull(
          foundDocs,
          options?.errorIfNull[1] || 'Error docs not found!',
        );
      }

      return {
        docs: foundDocs,
        limit,
        total: totalDocs,
        currentPage: page,
        hasNext: totalDocs > limit * page,
        remainingCount: totalDocs - limit * page,
        totalPages: Math.ceil(totalDocs / limit),
      };
    } catch (e) {
      throw e;
    }
  }

  async upsert(
    query: FilterQuery<T>,
    data: Partial<T>,
    options?: {
      errorIfNull?: [boolean] | [boolean, string];
      transaction?: ClientSession;
    },
  ): Promise<never | T> {
    try {
      const doc = await this.model.findOneAndUpdate(
        query,
        { $set: data },
        {
          new: true,
          upsert: true,
          ...(options?.transaction && { session: options.transaction }),
        },
      );

      if (options?.errorIfNull && options?.errorIfNull[0]) {
        errorIfNull(doc, options?.errorIfNull[1] || 'Error upserting doc!');
      }

      return doc as T;
    } catch (e) {
      throw e;
    }
  }

  async updateOne(
    query: FilterQuery<T>,
    data: UpdateQuery<T>,
    options?: {
      errorIfNull?: [boolean] | [boolean, string];
      select?: Array<keyof T>;
      populate?: Array<keyof T>;
      transaction?: ClientSession;
    },
  ): Promise<never | T> {
    try {
      const doc = this.model.findOneAndUpdate(
        query,
        { $set: data },
        { new: true },
      );

      options?.transaction && doc.session(options.transaction);
      options?.select && doc.select(options.select as string[]);
      options?.populate && doc.populate(options.populate as string[]);

      const updatedDoc = await doc.exec();

      if (options?.errorIfNull && options?.errorIfNull[0]) {
        errorIfNull(
          updatedDoc,
          options?.errorIfNull[1] || 'Error updating doc!',
        );
      }

      return updatedDoc as T;
    } catch (e) {
      throw e;
    }
  }

  async updateMany(
    query: FilterQuery<T>,
    data: UpdateQuery<T>,
    options?: {
      errorIfNull?: [boolean] | [boolean, string];
      select?: Array<keyof T>;
      populate?: Array<keyof T>;
      transaction?: ClientSession;
    },
  ): Promise<never | T[]> {
    try {
      const doc = this.model.updateMany(query, { $set: data });

      options?.transaction && doc.session(options.transaction);
      options?.select && doc.select(options.select as string[]);
      options?.populate && doc.populate(options.populate as string[]);

      const updatedDoc = await doc.exec();

      if (options?.errorIfNull && options?.errorIfNull[0]) {
        errorIfNull(
          updatedDoc,
          options?.errorIfNull[1] || 'Error updating doc!',
        );
      }

      const foundDoc = await this.findAll(query, options);

      return foundDoc.docs;
    } catch (e) {
      throw e;
    }
  }

  async deleteOne(
    query: FilterQuery<T>,
    options?: {
      errorIfNull?: [boolean] | [boolean, string];
      transaction?: ClientSession;
    },
  ): Promise<never | T> {
    try {
      const doc = await this.model.findOneAndDelete(query, {
        ...(options?.transaction && { session: options.transaction }),
      });

      if (options?.errorIfNull && options?.errorIfNull[0]) {
        errorIfNull(doc, options?.errorIfNull[1] || 'Error deleting doc!');
      }

      return doc as T;
    } catch (e) {
      throw e;
    }
  }

  async deleteMany(
    query: FilterQuery<T>,
    options?: {
      errorIfNull?: [boolean] | [boolean, string];
      transaction?: ClientSession;
    },
  ): Promise<never | boolean> {
    try {
      const doc = await this.model.deleteMany(query, {
        ...(options?.transaction && { session: options.transaction }),
      });

      if (options?.errorIfNull && options?.errorIfNull[0]) {
        errorIfNull(doc, options?.errorIfNull[1] || 'Error deleting doc!');
      }

      return doc?.acknowledged;
    } catch (e) {
      throw e;
    }
  }

  async aggregate(
    pipeline: PipelineStage[],
    options?: { transaction?: ClientSession },
  ): Promise<never | T> {
    try {
      const doc = await this.model.aggregate(pipeline, {
        ...(options?.transaction && { session: options.transaction }),
      });

      return doc as T;
    } catch (e) {
      throw e;
    }
  }

  async exists(
    query: FilterQuery<T>,
    options?: { errorIfNull?: [boolean] | [boolean, string] },
  ): Promise<never | boolean> {
    try {
      const doc = await this.model.exists(query);

      if (options?.errorIfNull && options?.errorIfNull[0]) {
        errorIfNull(doc, options?.errorIfNull[1] || 'Error deleting doc!');
      }

      return doc?._id ? true : false;
    } catch (e) {
      throw e;
    }
  }

  async transaction(): Promise<ClientSession> {
    try {
      const session = await this.model.startSession();
      return session;
    } catch (e) {
      throw e;
    }
  }

  async count(query?: FilterQuery<T>): Promise<never | number> {
    try {
      const doc = await this.model.countDocuments(query);
      return doc;
    } catch (e) {
      throw e;
    }
  }
}
