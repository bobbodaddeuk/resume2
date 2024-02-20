import express from 'express'
import { prisma } from '../config/index.js'
import { UserService } from '../services/user.service.js'
import { UserRepository } from '../repositories/user.repository.js'
import { UserController } from '../controllers/user.controller.js'

import { AuthController } from '../controllers/auth.controller.js'
import { AuthService } from '../services/auth.service.js'

const router = express.Router()

const userRepository = new UserRepository(prisma)
const userService = new UserService(userRepository)
const userController = new UserController(userService)

const authService = new AuthService(userRepository)
const authController = new AuthController(authService)
// 회원가입 API
router.post('/signup', userController.signUp)

// 로그인 API
router.get('/signin', authController.signIn)

export default router
