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

    async updateUserScore(id, newScore, game) {
        try {

            const scoreToUpdate = this.model.findById(id);

            const allUserScores = scoreToUpdate.scores;

            let gameScoreLocation = 0;

            const gameScore = allUserScores.filter((userScore, index) => userScore.game == game ? gameScoreLocation = index : false);

            if (gameScore.length === 0) {

                scoreToUpdate.scores.push({ game, score: newScore });

            } else {

                scoreToUpdate.scores[index].score.push(newScore);

                scoreToUpdate.save();

                const userHighScore = Math.max(...gameScore.score);

                return userHighScore;
            }
        } catch (err) {
            console.log(err);
        }
    }

    async getHighScore(game) {
        const allUsers = await this.model.find();

        const userScores = allUsers.map(user => {
            const usersGameScores = user.scores.filter(gameScore => {
                gameScore.game == game;
            })
            return usersGameScores.score;
        });

        const usersHighScore = Math.max(...userScores);

        return usersHighScore;
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