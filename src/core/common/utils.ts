import * as dayjs from 'dayjs';
import { CookieOptions } from 'express';

interface CookieData {
  value: Record<string, any>;
  options: CookieOptions;
}

class Utils {
  public toArray<T>(v: any): T[] {
    return Array.isArray(v) ? v : [v];
  }

  public buildCookie(accessToken: string, refreshToken: string): CookieData {
    return {
      value: {
        accessToken,
        refreshToken,
      },
      options: {
        httpOnly: true,
        sameSite: 'strict',
        secure: true,
        signed: true,
        expires: dayjs().add(1, 'month').toDate(),
      },
    };
  }
}

export const utils = new Utils();
