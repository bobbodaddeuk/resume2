// import { jest } from '@jest/globals'
// import { ResumeRepository } from '../../../src/repositories/resume.repository'

// let mockPrisma = {
//     resume: {
//         create: jest.fn(),
//         findMany: jest.fn(),
//         findFirst: jest.fn(),
//         update: jest.fn(),
//         delete: jest.fn(),
//     },
// }

// let resumeRepository = new ResumeRepository(mockPrisma)

// describe('Resume Repository Unit Test', () => {
//     beforeEach(() => {
//         jest.resetAllMocks()
//     })

//     test('createResume', async () => {
//         const mockReturn = 'create Return String'
//         mockPrisma.resume.create.mockReturnValue(mockReturn)

//         const createResumeParams = {
//             title: 'title',
//             content: 'content',
//             status: 'APPLY',
//             userId: 1,
//         }

//         const createdResumeData = await resumeRepository.createResume(
//             createResumeParams
//         )

//         expect(createdResumeData).toBe(mockReturn)

//         expect(mockPrisma.resume.create).toHaveBeenCalledTimes(1)

//         expect(mockPrisma.resume.create).toHaveBeenCalledWith({
//             data: createResumeParams,
//         })
//     })
//     test('findAllResumes', async () => {
//         const mockReturn = 'findMany string'
//         mockPrisma.resume.findMany.mockReturnValue(mockReturn)

//         const resumes = await resumeRepository.findAllResumes({
//             orderKey: 'orderKey',
//             orderValue: 'desc',
//         })

//         expect(resumes).toBe(mockReturn)

//         expect(resumeRepository.prisma.resume.findMany).toHaveBeenCalledTimes(1)
//     })
//     test('findResumeById', async () => {
//         const mockReturn = 'findFirst string'
//         mockPrisma.resume.findFirst.mockReturnValue(mockReturn)

//         const resume = await resumeRepository.findResumeById({
//             resumeId: '2',
//         })

//         expect(resume).toBe(mockReturn)

//         expect(resumeRepository.prisma.resume.findFirst).toHaveBeenCalledTimes(
//             1
//         )
//     })
//     test('updateResume', async () => {
//         const mockReturn = 'update string'
//         mockPrisma.resume.update.mockReturnValue(mockReturn)

//         const updateResumeParams = {
//             resumeId: 5500,
//             title: 'title',
//             content: 'content',
//             status: 'APPLY',
//         }

//         const updatedResumeData = await resumeRepository.updateResume(
//             updateResumeParams
//         )
//         expect(mockPrisma.resume.update).toHaveBeenCalledWith({
//             data: {
//                 title: updateResumeParams.title,
//                 content: updateResumeParams.content,
//                 status: updateResumeParams.status,
//             },
//             where: { resumeId: updateResumeParams.resumeId },
//         })
//         expect(updatedResumeData).toBe(mockReturn)

//         expect(resumeRepository.prisma.resume.update).toHaveBeenCalledTimes(1)
//     })
//     test('deleteResume', async () => {
//         const mockReturn = 'delete string'
//         mockPrisma.resume.delete.mockReturnValue(mockReturn)

//         const deletedResume = await resumeRepository.deleteResume({
//             resumeId: '321',
//         })
//         expect(deletedResume).toBe(mockReturn)

//         expect(resumeRepository.prisma.resume.delete).toHaveBeenCalledTimes(1)
//     })
// })
