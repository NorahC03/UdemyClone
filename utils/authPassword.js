import bcrypt from "bcrypt";

//Hashing function
export const hashPassword = (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(10, (err, salt) => {
            if (err) {
                reject(err);
            }
            bcrypt.hash(password, salt, (err, hash) => {
                if (err) {
                    reject(err);
                }
                resolve(hash);

            })
        })
    })
}

//Comparing function(HashPassword to Incoming Password)
export const ComparePassword = (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword);
}