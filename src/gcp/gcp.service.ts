import { Injectable, Logger } from '@nestjs/common';
import axios, { AxiosResponse } from 'axios';

@Injectable()
export class GcpService {
  private readonly logger = new Logger(GcpService.name);

  private readonly cloudFunctionUrl = process.env.CLOUD_FUNCTION_URL;

  /**
   * Notifica a la Cloud Function sobre una acumulación de puntos
   */
  async notifyPurchase(data: {
    userId: string;
    points: number;
  }): Promise<void> {
    if (!this.cloudFunctionUrl) {
      this.logger.warn(
        'CLOUD_FUNCTION_URL no está configurado. Notificación omitida.',
        {},
      );
      return;
    }

    try {
      const res: AxiosResponse = await axios.post(this.cloudFunctionUrl, data);
      this.logger.log(
        `Cloud Function invocada con éxito. Respuesta: ${res.status}`,
        {},
      );
    } catch (error) {
      this.logger.error(`Error al llamar a la Cloud Function`, error);
      throw error;
    }
  }

  /**
   * Simulación de envío a BigQuery
   */
  sendSummaryToBigQuery(userId: string, totalPoints: number): void {
    this.logger.log(
      `[Simulado] Enviando resumen a BigQuery: usuario ${userId}, puntos ${totalPoints}`,
    );
  }
}
