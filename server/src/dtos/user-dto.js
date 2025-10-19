class UserDto {
    constructor(user) {
        this.id = user.id;
        this.email = user.email;
    }

    toJSON() {
        return {
            id: this.id,
            email: this.email,
        };
    }
}

module.exports = UserDto;