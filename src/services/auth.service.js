import jwt from 'jsonwebtoken'

export class AuthService {
    constructor(userRepository) {
        this.userRepository = userRepository
    }

    signIn = async ({ clientId, email, password }) => {
        let user
        if (clientId) {
            user = await this.userRepository.findUserByClientId(clientId)
            if (!user) {
                throw new Error('올바르지 않은 로그인 정보입니다.')
            }
        } else {
            if (!email) {
                throw new Error('이메일은 필수값입니다.')
            }

            if (!password) {
                throw new Error('비밀번호는 필수값입니다.')
            }

            user = await this.userRepository.findUserByEmailAndPassword(
                email,
                password
            )
            if (!user) {
                throw new Error('올바르지 않은 로그인 정보입니다.')
            }
        }

        const accessToken = jwt.sign({ userId: user.userId }, 'resume@#', {
            expiresIn: '12h',
        })
        const refreshToken = jwt.sign({ userId: user.userId }, 'resume&%*', {
            expiresIn: '7d',
        })

        return {
            accessToken,
            refreshToken,
        }
    }
}
