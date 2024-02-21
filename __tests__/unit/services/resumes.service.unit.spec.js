import { beforeEach, describe, expect, jest } from '@jest/globals'
import { ResumeService } from '../../../src/services/resume.service.js'

let mockResumeRepository = {
    createResume: jest.fn(),
    findAllResumes: jest.fn(),
    findResumeById: jest.fn(),
    updateResume: jest.fn(),
    deleteResume: jest.fn(),
}

let resumeService = new ResumeService(mockResumeRepository)

describe('Resume service Unit Test', () => {
    beforeEach(() => {
        jest.resetAllMocks()
    })

    test('createResume Method By Success', async () => {
        const user = { userId: 1 }
        const sampleResume = {
            userId: user.userId,
            title: 'title',
            content: 'content',
        }
        mockResumeRepository.createResume.mockReturnValue(sampleResume)

        const createdResume = await resumeService.createResume({
            user: user, // 'user' 객체를 전달
            title: 'title',
            content: 'content',
        })

        expect(mockResumeRepository.createResume).toHaveBeenCalledTimes(1)
        expect(mockResumeRepository.createResume).toHaveBeenCalledWith(
            createdResume
        )
    })
    test('createResume Method Without Title', async () => {
        const user = { userId: 1 }

        const untitled = resumeService.createResume({
            user: user,
            content: 'content',
        })
        await expect(untitled).rejects.toThrow(Error)
        await expect(untitled).rejects.toThrow('이력서 제목은 필수값 입니다')

        expect(mockResumeRepository.createResume).toHaveBeenCalledTimes(0)
    })
    test('createResume Method Without Content', async () => {
        const user = { userId: 1 }

        const withoutContent = resumeService.createResume({
            user: user,
            title: 'title',
        })
        await expect(withoutContent).rejects.toThrow(Error)
        await expect(withoutContent).rejects.toThrow('자기소개는 필수값 입니다')

        expect(mockResumeRepository.createResume).toHaveBeenCalledTimes(0)
    })
    test('findAllResumes Method By Success', async () => {
        const orderKey = 'status'
        const orderValue = 'desc'
        const sampleResumes = [
            { title: 'title', content: 'content' },
            { title: 'title1', content: 'content1' },
        ]

        mockResumeRepository.findAllResumes.mockReturnValue(sampleResumes)

        const resume = await resumeService.findAllResumes({
            orderKey,
            orderValue,
        })

        expect(resume).toBe(sampleResumes)

        expect(mockResumeRepository.findAllResumes).toHaveBeenCalledTimes(1)
        expect(mockResumeRepository.findAllResumes).toHaveBeenCalledWith({
            orderKey,
            orderValue,
        })
    })
    test('findAllResumes Method With Incorrect OrderKey', async () => {
        const orderKey = '나는 바보야'

        const incorrectOrderKey = resumeService.findAllResumes({
            orderKey,
        })

        await expect(incorrectOrderKey).rejects.toThrow(Error)
        await expect(incorrectOrderKey).rejects.toThrow(
            'orderKey 가 올바르지 않습니다.'
        )

        expect(mockResumeRepository.findAllResumes).toHaveBeenCalledTimes(0)
    })
    test('findAllResumes Method With Incorrect OrderValue', async () => {
        const orderKey = 'status'
        const orderValue = '나는 천재야'

        const incorrectOrderValue = resumeService.findAllResumes({
            orderKey,
            orderValue,
        })

        await expect(incorrectOrderValue).rejects.toThrow(Error)
        await expect(incorrectOrderValue).rejects.toThrow(
            'orderValue 가 올바르지 않습니다.'
        )

        expect(mockResumeRepository.findAllResumes).toHaveBeenCalledTimes(0)
    })
    test('findResumeById Method By Success', async () => {
        const sampleResume = {
            resumeId: 1,
            title: 'title',
            content: 'content',
            status: 'DROP',
            name: 'name',
        }
        mockResumeRepository.findResumeById.mockReturnValue(sampleResume)

        const resume = await resumeService.findResumeById(sampleResume.resumeId)

        expect(resume).toEqual({
            resumeId: sampleResume.resumeId,
            title: sampleResume.title,
            content: sampleResume.content,
            status: sampleResume.status,
            name: sampleResume.name,
        })

        expect(mockResumeRepository.findResumeById).toHaveBeenCalledTimes(1)
        expect(mockResumeRepository.findResumeById).toHaveBeenCalledWith(
            sampleResume.resumeId
        )
    })
    test('findResumeById Method Without Resume', async () => {
        const resumeId = null

        const withoutResume = resumeService.findResumeById({
            resumeId: resumeId,
            title: 'title',
            content: 'content',
            status: 'DROP',
            name: 'name',
        })
        await expect(withoutResume).rejects.toThrow(Error)
        await expect(withoutResume).rejects.toThrow(
            '이력서가 존재하지 않습니다.'
        )

        expect(mockResumeRepository.createResume).toHaveBeenCalledTimes(0)
    })
    test('updateResume Method By Success', async () => {
        const sampleResume = {
            resumeId: 1,
            user: 'user',
            title: 'title',
            content: 'content',
            status: 'APPLY',
        }
        const updatedResume = {
            resumeId: 1,
            user: 'user',
            title: '타이틀',
            content: '컨텐츠',
            status: 'DROP',
        }
        mockResumeRepository.findResumeById.mockReturnValue(sampleResume)
        mockResumeRepository.updateResume.mockReturnValue(updatedResume)

        const result = await resumeService.updateResume(sampleResume)

        expect(result).toEqual(updatedResume)
        expect(mockResumeRepository.updateResume).toHaveBeenCalledTimes(1)
        expect(mockResumeRepository.updateResume).toHaveBeenCalledWith(
            sampleResume
        )
    })
    test('updateResume Method Without ResumeId', async () => {
        const sampleResume = {
            user: 'user',
            title: '타이틀',
            content: '컨텐츠',
            status: 'DROP',
        }
        const withoutResumeId = resumeService.updateResume(sampleResume)

        await expect(withoutResumeId).rejects.toThrow(Error)
        await expect(withoutResumeId).rejects.toThrow(
            'resumeId 는 필수값입니다'
        )
        expect(mockResumeRepository.updateResume).toHaveBeenCalledTimes(0)
    })
    test('updateResume Method Without Title', async () => {
        const sampleResume = {
            resumeId: 1,
            user: 'user',
            content: '컨텐츠',
            status: 'DROP',
        }
        const withoutTitle = resumeService.updateResume(sampleResume)

        await expect(withoutTitle).rejects.toThrow(Error)
        await expect(withoutTitle).rejects.toThrow('이력서 제목은 필수값입니다')

        expect(mockResumeRepository.updateResume).toHaveBeenCalledTimes(0)
    })
    test('updateResume Method Without Content', async () => {
        const sampleResume = {
            resumeId: 1,
            user: 'user',
            title: 'title',
            status: 'DROP',
        }
        const withoutContent = resumeService.updateResume(sampleResume)

        await expect(withoutContent).rejects.toThrow(Error)
        await expect(withoutContent).rejects.toThrow('자기소개는 필수값입니다')

        expect(mockResumeRepository.updateResume).toHaveBeenCalledTimes(0)
    })
    test('updateResume Method By Success', async () => {
        const sampleResume = {
            resumeId: 1,
            user: 'user',
            title: 'title',
            content: 'content',
        }
        const withoutStatus = resumeService.updateResume(sampleResume)

        await expect(withoutStatus).rejects.toThrow(Error)
        await expect(withoutStatus).rejects.toThrow('상태값은 필수값입니다')

        expect(mockResumeRepository.updateResume).toHaveBeenCalledTimes(0)
    })
    test('updateResume Method With Incorrect Status', async () => {
        const sampleResume = {
            resumeId: 1,
            user: 'user',
            title: 'title',
            content: 'content',
            status: '잘못된 상태',
        }

        const incorrectStatus = resumeService.updateResume(sampleResume)

        await expect(incorrectStatus).rejects.toThrow(Error)
        await expect(incorrectStatus).rejects.toThrow(
            '올바르지 않은 상태값 입니다.'
        )
    })
    test('updateResume Method Without Resume', async () => {
        const sampleResume = {
            resumeId: 1,
            title: 'title',
            content: 'content',
            status: 'DROP',
        }
        mockResumeRepository.findResumeById.mockReturnValue(null)

        const withoutResume = resumeService.updateResume(sampleResume)

        await expect(withoutResume).rejects.toThrow(Error)
        await expect(withoutResume).rejects.toThrow(
            '존재하지 않는 이력서 입니다.'
        )
    })
    test('deleteResume Method By Success', async () => {
        const sampleResume = {
            resumeId: 1,
            title: 'title',
            content: 'content',
            status: 'DROP',
        }
        mockResumeRepository.findResumeById.mockReturnValue(sampleResume)
        mockResumeRepository.deleteResume.mockReturnValue(sampleResume)

        const deleteResume = await resumeService.deleteResume('user', 1)

        expect(mockResumeRepository.findResumeById).toHaveBeenCalledTimes(1)
        expect(mockResumeRepository.findResumeById).toHaveBeenCalledWith(
            sampleResume.resumeId
        )

        expect(mockResumeRepository.deleteResume).toHaveBeenCalledTimes(1)
        expect(mockResumeRepository.deleteResume).toHaveBeenCalledWith(
            sampleResume.resumeId
        )

        expect(deleteResume).toEqual({
            resumeId: sampleResume.resumeId,
            title: sampleResume.title,
            content: sampleResume.content,
            status: sampleResume.status,
        })
    })
    test('deleteResume Method Without Resume', async () => {
        const sampleResume = {
            resumeId: 1,
            title: 'title',
            content: 'content',
            status: 'DROP',
        }
        mockResumeRepository.findResumeById.mockReturnValue(null)

        const withoutResume = resumeService.deleteResume(sampleResume)

        await expect(withoutResume).rejects.toThrow(Error)
        await expect(withoutResume).rejects.toThrow(
            '존재하지 않는 이력서 입니다.'
        )
        expect(mockResumeRepository.deleteResume).toHaveBeenCalledTimes(0)
    })
    test('deleteResume Method With Incorrect UserId', async () => {
        const sampleResume = {
            resumeId: 1,
            userId: 1,
            title: 'title',
            content: 'content',
            status: 'DROP',
        }
        mockResumeRepository.findResumeById.mockReturnValue(sampleResume)

        const withoutUserId = resumeService.deleteResume({ userId: 2 }, 1)

        await expect(withoutUserId).rejects.toThrow(Error)
        await expect(withoutUserId).rejects.toThrow('올바르지 않은 요청입니다.')

        expect(mockResumeRepository.deleteResume).toHaveBeenCalledTimes(0)
    })
})
