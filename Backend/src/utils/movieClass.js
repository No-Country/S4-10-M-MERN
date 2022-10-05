import GlobalClass from "./globalClass.js";
import movieModel from "../models/movieModel.js";


class Movie extends GlobalClass {

    async findByTitle(title) {
        const foundMovie = await this.model.findOne({ $or: [{ englishTitle: title, }, { spanishTitle: title }] });
        return foundMovie ? foundMovie : false;
    }

    async createNewMovie({ englishTitle, spanishTitle, characters = [], category, isMovie = false, isSerie = false, img = "" }) {
        const movieExists = await this.model.findOne({ $or: [{ englishTitle }, { spanishTitle }] })
        if (!movieExists) return false;
        const newMovie = new movieModel({
            englishTitle,
            spanishTitle,
            characters,
            category,
            isMovie,
            isSerie,
            img
        });

    }

    async updateMovieByCat(cat, updateInfo) {
        const updatedMovie = await this.model.findOneAndUpdate({ [cat]: updateInfo }, { new: true });
        return updatedMovie.length === 0 ? true : false;
    }

    async deleteByMovieTitle(title) {
        const deletedEnglishMovie = this.model.findOneAndDelete({ $or: [{ englishTitle: title }, { spanishTitle: title }] });
        return deletedEnglishMovie[0].length === 0 ? false : true;
    }

}

export default new Movie('movies');