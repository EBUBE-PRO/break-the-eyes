import jwt from 'jsonwebtoken';
import { logger } from '../utils/logger';

export default defineEventHandler(async (event) => {
  const path = getRequestPath(event);
  const method = getMethod(event);
  
  // Only apply to our CMS API
  if (!path.startsWith('/api/cms')) return;

  // Skip auth for login and public routes
  const publicRoutes = ['/api/cms/auth/login', '/api/cms/auth/register'];
  if (publicRoutes.includes(path)) return;

  // For write operations or protected reads, check token
  const authHeader = getHeader(event, 'authorization');
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    logger.warn(`Unauthorized access attempt to ${path} [${method}]`);
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
      message: 'Authentication token is missing or invalid'
    });
  }

  const token = authHeader.split(' ')[1];
  try {
    const config = useRuntimeConfig();
    const decoded = jwt.verify(token, config.jwtSecret || 'bte-default-secret');
    event.context.user = decoded;
    logger.info(`Authenticated request from ${decoded.username} for ${path}`);
  } catch (error) {
    logger.error(`Invalid token for path ${path}`);
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
      message: 'Token has expired or is invalid'
    });
  }
});
