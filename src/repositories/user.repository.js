import cryptoJS from 'crypto-js'
const { SHA256: sha256 } = cryptoJS

export class UserRepository {
    constructor(prisma) {
        this.prisma = prisma
    }
    findUserByClientId = async (clientId) => {
        return await this.prisma.user.findFirst({
            where: { clientId },
        })
    }
    findUserByEmail = async (email) => {
        return await this.prisma.user.findFirst({
            where: { email },
        })
    }
    createUserWithClientId = async (clientId, name, grade) => {
        return await this.prisma.user.create({
            data: {
                clientId,
                name,
                grade,
            },
        })
    }
    createUserWithEmail = async (email, password, name, grade) => {
        return await this.prisma.user.create({
            data: {
                email,
                password: sha256(password).toString(),
                name,
                grade,
            },
        })
    }
    findUserByEmailAndPassword = async (email, password) => {
        return await this.prisma.user.findFirst({
            where: {
                email,
                password: sha256(password).toString(),
            },
        })
    }
}
