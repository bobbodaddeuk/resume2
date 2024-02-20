export class ResumeRepository {
    constructor(prisma) {
        this.prisma = prisma
    }
    createResume = async (title, content, userId) => {
        return await prisma.resume.create({
            data: {
                title,
                content,
                status: 'APPLY',
                userId,
            },
        })
    }
}
