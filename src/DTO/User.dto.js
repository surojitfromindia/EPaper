class UserDTO {

    static toUserDTO(user) {
        return {
            first_name: user.firstName,
            last_name: user.lastName,
            user_id: user.id
        }
    }

    // transform a request to a user like entity
    static toUserCreate(user_dto) {
        return {
            firstName: user_dto.first_name,
            lastName: user_dto.last_name,
            password: user_dto.password
        }
    }
}

export default UserDTO