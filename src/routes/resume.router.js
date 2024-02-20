import express from 'express'
import { prisma } from '../config/index.js'
import { ResumeController } from '../controllers/resume.controller.js'
import { ResumeService } from '../services/resume.service.js'
import { ResumeRepository } from '../repositories/resume.repository.js'

const resumeRepository = new ResumeRepository(prisma)
const resumeService = new ResumeService(resumeRepository)
const resumeController = new ResumeController(resumeService)

const router = express.Router()

// 이력서 작성 API
router.post('/resume', resumeController.createResume)
// 이력서 조회 API

// 이력서 상세 조회 API

// 이력서 수정 API

// 이력서 삭제 API

export default router
