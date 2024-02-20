export class ResumeRepository {
    constructor(prisma) {
        this.prisma = prisma
    }
    createResume = async ({ title, content, userId }) => {
        const resume = await this.prisma.resume.create({
            data: {
                title,
                content,
                status: 'APPLY',
                userId,
            },
        })
        return resume
    }
    findAllResumes = async ({ orderKey, orderValue }) => {
        const resumes = await this.prisma.resume.findMany({
            select: {
                resumeId: true,
                title: true,
                content: true,
                status: true,
                user: {
                    select: {
                        name: true,
                    },
                },
                createdAt: true,
            },
            orderBy: [
                {
                    [orderKey]: orderValue.toLowerCase(),
                },
            ],
        })

        return resumes
    }
    findResumeById = async (resumeId) => {
        const resume = await this.prisma.resume.findFirst({
            where: { resumeId: +resumeId },
        })
        return resume
    }
}
