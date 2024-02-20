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
            return res.status(201).json({ data: resume })
        } catch (error) {
            return res
                .status(400)
                .json({ success: false, message: error.message })
        }
    }
    getResumes = async (req, res) => {
        try {
            const orderKey = req.query.orderKey ?? 'resumeId'
            const orderValue = req.query.orderValue ?? 'desc'

            const resumes = await this.resumeService.findAllResumes({
                orderKey,
                orderValue,
            })
            return res.status(200).json({ data: resumes })
        } catch (error) {
            return res
                .status(400)
                .json({ success: false, message: error.message })
        }
    }
}
