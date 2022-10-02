import mongoose from "mongoose";
import GlobalClass from "./globalClass";


class Movie extends GlobalClass {

    async findByTitle(title) {
        const foundMovieEnglish = await this.model.findOne({ englishTitle: title });
        if (!foundMovie) {
            const foundMovieSpanish = await this.model.findOne({ spanishTitle: title });
            return !foundMovieSpanish ? false : foundMovieSpanish;
        }
        return foundMovieEnglish;
    }

    async updateMovieByCat(cat, updateInfo) {
        const updatedMovie = await this.model.findOneAndUpdate({ [cat]: updateInfo }, { new: true });
        return updatedMovie.length === 0 ? true : false;
    }

    async deleteByMovieTitle(title) {
        const deletedEnglishMovie = this.model.findOneAndDelete({ englishTitle: title });
        if (deletedEnglishMovie[0].length == 0) {
            const deletedSpanishMovie = this.model.findOneAndDelete({ spanishTitle: title });
            return deletedSpanishMovie[0].length == 0 ? false : true;
        }
        return true;
    }

}

export default new Movie('movies');