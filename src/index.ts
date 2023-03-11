import { App } from "./app"

const main = () => {
    const app = new App()

    const PORT = Number(process.env.PORT) || 4000

    app.run(PORT)
}

main()