import express from 'express'
import cors from 'cors'
import { graphqlHTTP } from 'express-graphql'
import { ListApodsResolver } from './resolvers/listNames.resolver'
import { buildSchema } from 'graphql'

export class App {
  public app

  constructor() {
    this.app = express()
    this.app.use(cors())
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))
    this.middleware()
  }

  private schemaGQL() {
    const namesSchema = buildSchema(`
      type Apods {
        id: ID!
        copyright: String!
        explanation: String!
        url: String!
        title: String!
        date: String!
      }

      type Query {
        getApods(startDate: String!, endDate: String!): [Apods] 
      }
    `)

    return namesSchema
  }

  private async rootGQL() {
    const root = {
      getApods: async ({ startDate, endDate }: { startDate: string, endDate: string }) => {
        const listApodsResolver = new ListApodsResolver(startDate, endDate)

        const data = await listApodsResolver.listApod()

        return data
      }
    }

    return root
  }

  private async middleware() {
    this.app.use('/graphql', graphqlHTTP({
      schema: this.schemaGQL(),
      rootValue: await this.rootGQL(),
      graphiql: true
    }))
  }

  public run(PORT: number | string) {
    this.app.listen(PORT, () => console.log('Running on port', PORT))
  }
}