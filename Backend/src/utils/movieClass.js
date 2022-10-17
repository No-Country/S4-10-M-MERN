import GlobalClass from "./globalClass.js";
import { MovieModel } from '../models/movieModel.js'
import awsFileDeleting from "./awsFileHandle/awsFileDelete.js";

class Movie extends GlobalClass {

    async findByTitle(title) {
        const foundMovie = await this.model.findOne({ $or: [{ englishTitle: title, }, { spanishTitle: title }] });
        return foundMovie
    }

    async findRandom() {
        const numOfMovies = await this.model.countDocuments()
        const movie = await this.model.findOne().skip(Math.floor(Math.random() * numOfMovies)).lean()
        return movie
    }

    async createNewMovie({ originalTitle, spanishTitle, category, isSerie, img, audio }) {
        const movieExists = await this.model.findOne({ $or: [{ originalTitle }, { spanishTitle }] })
        if (movieExists) throw new Error('A movie with the same name has been created');
        const newMovie = new MovieModel({
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