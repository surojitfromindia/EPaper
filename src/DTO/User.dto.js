class UserDTO {

    static toUserDTO(user) {
        return {
            first_name: user.firstName,
            last_name: user.lastName,
            user_id: user.id,
            email: user.email,
            middle_name: user.middleName
        }
    }

    // transform a request to a user like entity
    static toUserCreate(user_dto) {
        return {
            firstName: user_dto.first_name,
            lastName: user_dto.last_name,
            password: user_dto.password,
            email: user_dto.email,
            middleName: user_dto.middle_name
        }
    }
}

export default UserDTO