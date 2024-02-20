export class ResumeController {
    constructor(resumeService) {
        this.resumeService = resumeService
    }

    createResume = async (req, res) => {
        try {
            const user = res.locals.user
            const { title, content } = req.body
            const resume = await this.resumeService.createResume({
                user,
                title,
                content,
            })
            res.status(201).json({ data: resume })
        } catch (error) {
            res.status(400).json({ success: false, message: error.message })
        }
    }
}
