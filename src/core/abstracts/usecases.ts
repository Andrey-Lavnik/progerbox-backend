import { TokenPair } from '@core/common/types';

export interface Usecase {
  execute(...args: any): any;
}

export interface TokenPairUsecase extends Usecase {
  execute(...args: any): Promise<TokenPair>;
}

export abstract class UsecaseResolver {
  public static list: any[];
}
