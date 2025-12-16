import { FastifyInstance } from 'fastify';
import { UserPhonePayload, UserPhoneQuery } from '../types/interfaces';

export async function apiRoutes(app: FastifyInstance) {
  app.get<{ Querystring: UserPhoneQuery }>(
    '/otp-rate-limit',
    async (request, reply) => {
      const { phone_number, user_id } = request.query;

      // Validate query parameters
      if (!phone_number || !user_id) {
        return reply.status(400).send({
          error: 'Missing required query parameters: phone_number and user_id',
        });
      }

      // Handle the request
      return reply.status(200).send({
        success: true,
        message: 'User phone information retrieved successfully',
        data: {
          user_id,
          phone_number,
        },
      });
    }
  );

  app.post<{ Body: UserPhonePayload }>(
    '/send-sms-otp',
    async (request, reply) => {
      const { phone_number, user_id } = request.body;

      // Validate payload
      if (!phone_number || !user_id) {
        return reply.status(400).send({
          error: 'Missing required fields: phone_number and user_id',
        });
      }

      // Handle the request
      return {
        success: true,
        message: `SMS OTP sent for ${phone_number} successfully`,
        data: {
          user_id,
          phone_number,
        },
      };
    }
  );
}
