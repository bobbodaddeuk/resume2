export class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository
    }

    signUp = async ({ email, clientId, password, name, grade }) => {
        if (grade && !['user', 'admin'].includes(grade)) {
            throw new Error('등급이 올바르지 않습니다.')
        }

        if (!clientId) {
            if (!email) {
                throw new Error('이메일은 필수값입니다.')
            }

            if (!password) {
                throw new Error('비밀번호는 필수값입니다.')
            }

            if (password.length < 6) {
                throw new Error('비밀번호는 최소 6자 이상입니다.')
            }
        }

        if (!name) {
            throw new Error('이름은 필수값입니다.')
        }

        if (clientId) {
            const user = await this.userRepository.findUserByClientId(clientId)

            if (user) {
                throw new Error('이미 가입된 사용자 입니다.')
            }

            await this.userRepository.createUserWithClientId(
                clientId,
                name,
                grade
            )
        } else {
            const user = await this.userRepository.findUserByEmail(email)

            if (user) {
                throw new Error('이미 가입된 이메일 입니다.')
            }

            await this.userRepository.createUserWithEmail(
                email,
                password,
                name,
                grade
            )
        }

        return {
            email,
            name,
        }
    }
}
