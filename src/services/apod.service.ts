import axios from "axios"
import { differenceInDays, format, subDays } from "date-fns"
import { v4 as uuid } from 'uuid'

interface ResponseData {
  data: {
    id: string,
    copyright: string
    date: string
    explanation: string
    hdurl: string
    media_type: string
    service_version: string
    title: string
    url: string
  }
}

export class ApodService {
  private startDate: string
  private endDate: string

  constructor(startDate: string, endDate: string) {
    this.startDate = startDate
    this.endDate = endDate
  }

  private listDates() {
    const leftDate = new Date(this.startDate)
    const rightDate = new Date(this.endDate)

    const datesDiff = differenceInDays(leftDate, rightDate)

    const dates = Array(datesDiff + 1).fill('').map((_, i) => {
      return format(subDays(leftDate, i), 'yyyy-MM-dd')
    })

    return dates
  }

  async getApod() {
    const apods = this.listDates().map(async date => {
      const url = `https://api.nasa.gov/planetary/apod?date=${date}&api_key=uWaojn6m9CcmxHWChbokvF8zi3KLeeU95Xfi8ky3`
      const { data }: ResponseData = await axios.get(url)

      const mappedResponse = {
        id: uuid(),
        copyright: data?.copyright,
        explanation: data.explanation,
        url: data.url,
        title: data.title,
        date: data.date
      }
      return mappedResponse
    })


    return apods
  }
}
