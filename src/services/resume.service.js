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

        return await this.resumeRepository.createResume({
            title,
            content,
            userId: user.userId,
        })
    }
}
