export class ResumeService {
    constructor(resumeRepository) {
        this.resumeRepository = resumeRepository
    }
    createResume = async ({ user, title, content }) => {
        if (!title) {
            throw new Error('이력서 제목은 필수값 입니다')
        }

        if (!content) {
            throw new Error('자기소개는 필수값 입니다')
        }

        const resume = await this.resumeRepository.createResume({
            title,
            content,
            userId: user.userId,
        })
        return resume
    }
    findAllResumes = async ({ orderKey, orderValue }) => {
        if (!['resumeId', 'status'].includes(orderKey)) {
            throw new Error('orderKey 가 올바르지 않습니다.')
        }
        if (!['asc', 'desc'].includes(orderValue.toLowerCase())) {
            throw new Error('orderValue 가 올바르지 않습니다.')
        }
        const resumes = await this.resumeRepository.findAllResumes({
            orderKey,
            orderValue,
        })

        return resumes
    }
    findResumeById = async (postId) => {
        const resume = await this.resumeRepository.findResumeById(postId)

        return {
            resumeId: resume.resumeId,
            title: resume.title,
            content: resume.content,
            status: resume.status,
            name: resume.name,
        }
    }
}
