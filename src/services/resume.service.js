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
    updateResume = async ({ resumeId, user, title, content, status }) => {
        if (!resumeId) {
            throw new Error('resumeId 는 필수값입니다')
        }
        if (!title) {
            throw new Error('이력서 제목은 필수값입니다')
        }

        if (!content) {
            throw new Error('자기소개는 필수값입니다')
        }
        if (!status) {
            throw new Error('상태값은 필수값입니다')
        }
        if (
            ![
                'APPLY',
                'DROP',
                'PASS',
                'INTERVIEW1',
                'INTERVIEW2',
                'FINAL_PASS',
            ].includes(status)
        ) {
            throw new Error('올바르지 않은 상태값 입니다.')
        }
        const resume = await this.resumeRepository.findResumeById(resumeId)

        if (!resume) {
            throw new Error('존재하지 않는 이력서 입니다.')
        }

        // 이력서 업데이트
        return await this.resumeRepository.updateResume({
            resumeId,
            user,
            title,
            content,
            status,
        })
    }
}
