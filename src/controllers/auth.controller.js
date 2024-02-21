export class AuthController {
    constructor(authService) {
        this.authService = authService
    }

    signIn = async (req, res) => {
        try {
            const tokens = await this.authService.signIn(req.body)
            return res.json(tokens)
        } catch (error) {
            const status =
                error.message === '올바르지 않은 로그인 정보입니다.' ? 401 : 400
            return res
                .status(status)
                .json({ success: false, message: error.message })
        }
    }
}
