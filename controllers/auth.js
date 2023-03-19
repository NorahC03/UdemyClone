import User from "../model/RegisterSchema"
import { hashPassword, ComparePassword, } from "../utils/authPassword";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    try {
        // console.log(req.body);
        const { name, password, email } = req.body;
        if (!name) return res.status(400).send("Enter a valid Name")
        if (!password || password.length < 6) return res.status(400).send("Enter a valid Password ")
        let userExist = await User.findOne({ email }).exec();
        if (userExist) return res.status(400).send("Email already exists Go to hell")

        //Hash the password and Store
        const hashedPassword = await hashPassword(password);
        // console.log(hashedPassword);
        // hashPassword(password).then(response => console.log(response));
        const user = await new User({
            name, email, password: hashedPassword,
        }).save();


        // console.log(user);
        return res.send("User Registred").status(200)


    } catch (err) {
        res.status(403).send(err.message)
    }

}

export const login = async (req, res) => {
    try {
        const { email, password } = await req.body;
        console.log(email);
        const user = await User.findOne({ email }).exec();
        // console.log(user);
        if (!user) return res.status(400).send("No user found");
        const match = ComparePassword(password, user.password);
        if (match) {
            const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
            user.password = undefined;
            res.header('token', token, {
                httpOnly: true,
                //secure:true,          for production use in https server
            });
            res.json(user);
        }
        else res.send("Login failed Try again later").status(404).end();

    } catch (err) {
        console.log(err);
        res.send(err.message).status(404);
    }

}

export const logout = async (req, res) => {
    try {
        res.clearCookie("token");
        return res.json({ message: "Signout Succesfull" });

    }
    catch (err) {
        console.error(err);
    }
}

export const currentUser = async (req, res) => {
    try {
        console.log(req);
        const user = await User.findById(req.user._id).select("-password").exec();
        console.log(user);
        //send everything except password
        return res.json(user);
    } catch (err) {
        console.log(err);
    }
}

