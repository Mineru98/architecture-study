import { Injectable } from '@nestjs/common';
import { Filter } from '../filters/product-filters';

@Injectable()
export class PipelineRunner {
  async run<T>(input: T, filters: Filter<T>[]): Promise<T> {
    let result = input;
    for (const filter of filters) {
      result = await filter.execute(result);
    }
    return result;
  }
}
