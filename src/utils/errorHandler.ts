import { AppError } from './AppError';
import { logger } from '../lib/logger';

export const handleError = (error: any) => {
  logger.error(error);

  if (error instanceof AppError) {
    return Response.json(
      {
        success: false,
        message: error.message,
      },
      { status: error.statusCode },
    );
  }

  return Response.json(
    {
      success: false,
      message: 'Internal Server Error',
    },
    { status: 500 },
  );
};
