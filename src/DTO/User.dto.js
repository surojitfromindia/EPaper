class UserDTO {

    static toUserDTO(user) {
        const user_dto = {
            first_name: user.firstName,
            last_name: user.lastName,
            user_id :  user.id
        }
        return user_dto
    }

    // transform a request to a user like entity
    static toUserCreate (user_dto){
        const user = {
            firstName:user_dto.first_name,
            lastName: user_dto.last_name,
            password: user_dto.password
        }
        return user
    }
}
export default UserDTO