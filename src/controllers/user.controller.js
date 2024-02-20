export class UserController {
    constructor(userService) {
        this.userService = userService
    }
    signUp = async (req, res) => {
        try {
            const result = await this.userService.signUp(req.body)
            res.status(201).json(result)
        } catch (error) {
            res.status(400).json({ success: false, message: error.message })
        }
    }
}
