/**
 *
 * Author: Ferin Patel
 * Banner ID: B00891975
 * Email: ferin@dal.ca
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
export type PaginatedResponse = {
  from: any;
  to: any;
  per_page: any;
  total: any;
  current_page: number;
  prev_page?: number | null | undefined;
  next_page?: number | null | undefined;
  data: any;
};
