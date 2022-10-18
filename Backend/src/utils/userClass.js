import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import GlobalClass from "./globalClass.js";

class User extends GlobalClass {

    async findByCategory({ cat, catName }) {
        try {

            if (catName == "username" || catName == "email" || catName == "_id") {

                const foundUser = await this.model.findOne({ [catName]: cat });

                const user = foundUser ? {
                    username: foundUser.username,
                    email: foundUser.email,
                    fullName: foundUser.fullName,
                    score: foundUser.score
                } : null;
                return user ? user : false;
            }
            return false;
        } catch (err) {
            console.log(err);
        }
    };

    async createNewUser({ username, fullName, email, password }) {
        try {
            const userExists = await this.model.findOne({ email });

            if (userExists) return false;

            const newUser = new userModel({
                username,
                fullName,
                email,
                password: await userModel.encryptPassword(password)
            });

            const verToken = jwt.sign(
                { userId: newUser._id },
                process.env.SECRET_ACCESS_KEY,
                { expiresIn: "10m" }
            );

            newUser.verToken = verToken;

            const createdUser = await newUser.save();

            return createdUser;

        } catch (err) {
            console.log(err);
        }
    }

    async findByEmail(email) {
        try {
            const user = await this.model.findOne({ email });
            return user ? user : false;
        } catch (error) {
            console.log(err);
        }
    }
    async updateById(cat, update, id) {
        try {

            const updatedUser = await this.model.findByIdAndUpdate(id, { [cat]: update }, { new: true });

            return updatedUser.length === 0 ? true : false;
        } catch (err) {
            console.log(err);
        }
    };
    async updateUserInfo({ cat, update, id }) {
        try {
            const userToUpdate = await this.model.findById(id);

            if (!userToUpdate || !userToUpdate[cat] || userToUpdate[cat] == update) return false;

            if (cat == "username" || cat == "fullName") {
                await this.model.findByIdAndUpdate(id, { [cat]: update }, { new: true });
                return true;
            }
            return false;
        } catch (err) {
            console.log(err);
        }
    }

    async updateUserScore(id, newScore, gameName) {
        const userToUpdate = await this.model.findById(id);

        const allUserScores = userToUpdate.scores;

        let gameScoreIndex = 0;

        const gameScore = allUserScores.filter((userScore, index) => {
            if (userScore.game == gameName) {
                gameScoreIndex = index
                return true
            } else {
                return false
            }
        });

        if (gameScore.length === 0) {

            userToUpdate.scores.push({ game: gameName, score: newScore });

        } else {

            userToUpdate.scores[gameScoreIndex].score.push(newScore);
        }

        const updatedUser = await userToUpdate.save();

        const userHighScore = Math.max(...updatedUser.scores[gameScoreIndex].score);

        if (updatedUser.errors) throw new Error(updatedUser.errors.message);

        return userHighScore;
    }

    async getHighScore(gameName) {
        const allUsers = await this.model.find();

        const userScores = allUsers.map(user => {
            const usersGameScores = user.scores.filter(gameScore => {
                return gameScore?.game == gameName
            });
            return usersGameScores[0]?.score;
        });

        const flatScores = userScores.flat().filter(Boolean);

        if (flatScores.length == 0) throw new Error("There's no highScore");

        const usersHighScore = Math.max(...flatScores);

        const highScoreUser = await this.model.findOne({ "scores.score": `${usersHighScore}` });

        return { user: highScoreUser.username, usersHighScore };
    }

    async deleteUser(id) {
        try {
            const deletedUser = await this.model.findByIdAndDelete(id);

            return deletedUser ? true : false;
        } catch (err) {
            console.log(err);
        }
    }
}

export default new User('users');