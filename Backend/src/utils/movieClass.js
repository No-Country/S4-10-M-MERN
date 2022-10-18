import GlobalClass from "./globalClass.js";
import { movieModel } from '../models/movieModel.js'
import awsFileDeleting from "./awsFileHandle/awsFileDelete.js";

class Movie extends GlobalClass {

    async findByTitle(title) {
        const foundMovie = await this.model.findOne({ $or: [{ englishTitle: title, }, { spanishTitle: title }] });
        return foundMovie
    }

    async findRandom(game) {
        const neededProps = game === "hangedman" ? "originalTitle spanishTitle img" : game === "soundgame" ? "originalTitle spanishTitle img audio" : ""
        const numOfMovies = await this.model.countDocuments()
        const movie = await this.model.findOne().select(neededProps).skip(Math.floor(Math.random() * numOfMovies)).lean()
        return movie
    }

    async createNewMovie({ originalTitle, spanishTitle, category, isSerie, img, audio }) {
        const movieExists = await this.model.findOne({ $or: [{ originalTitle }, { spanishTitle }] })
        if (movieExists) throw new Error('A movie with the same name has been created');
        const newMovie = new movieModel({
            originalTitle,
            spanishTitle,
            category,
            isSerie,
            img,
            audio
        });
        return await newMovie.save()
    }
}

export default new Movie('movies');