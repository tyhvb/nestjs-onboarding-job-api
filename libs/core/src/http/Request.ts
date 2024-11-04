import { Request as BaseRequest } from 'express';

export interface Request extends BaseRequest {
  /**
   * Get the current url query
   */
  query: {
    limit: string;
    offset: string
  }
  /**
   * Get all inputs from the request object
   */
  all(): Record<string, any>;

  /**
   * Get the current user from the request object
   */
  user: Record<string, any>;
}
