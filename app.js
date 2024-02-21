import express from 'express'
import bodyParser from 'body-parser'

import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

import userRouter from './src/routes/user.router.js'
import resumeRouter from './src/routes/resume.router.js'

const app = express()
const port = process.env.PORT

app.use(bodyParser.json())
app.use('/api', userRouter, resumeRouter)

const options = {
    swaggerDefinition: {
        restapi: '3.0.0',
        info: {
            title: 'Resume API',
            version: '1.0.0',
            description: '이력서 API Swagger 문서 입니다.',
        },
    },
    apis: ['./routers/**/*.js'],
}

const specs = swaggerJsdoc(options)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
