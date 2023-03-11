import { ApodService } from '../services/apod.service';

export class ListApodsResolver {
  private apodService: ApodService

  constructor(startDate: string, endDate: string) {
    this.apodService = new ApodService(startDate, endDate);
  }

  async listApod() {
    const apod = await this.apodService.getApod()

    return apod
  }
}