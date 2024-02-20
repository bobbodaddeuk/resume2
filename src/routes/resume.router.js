import express from 'express'
import { prisma } from '../config/index.js'
import { ResumeController } from '../controllers/resume.controller.js'
import { ResumeService } from '../services/resume.service.js'
import { ResumeRepository } from '../repositories/resume.repository.js'
import jwtValidate from '../middlewares/jwt-validate.middleware.js'

const resumeRepository = new ResumeRepository(prisma)
const resumeService = new ResumeService(resumeRepository)
const resumeController = new ResumeController(resumeService)

const router = express.Router()

// 이력서 작성 API
router.post('/resume', jwtValidate, resumeController.createResume)
// 이력서 조회 API
router.get('/resume', resumeController.getResumes)
// 이력서 상세 조회 API
router.get('/resume/:resumeId', resumeController.getResumeById)
// 이력서 수정 API
router.patch('/resume/:resumeId', jwtValidate, resumeController.updateResume)
// 이력서 삭제 API
// router.delete('/resume/:resumeId', jwtValidate, resumeController.deleteResume)
export default router
