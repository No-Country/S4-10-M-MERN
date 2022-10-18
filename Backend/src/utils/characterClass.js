import GlobalClass from "./globalClass.js";
import awsFileDeleting from "./awsFileHandle/awsFileDelete.js";
import { CharacterModel } from "../models/characterModel.js";

class Character extends GlobalClass {

    async findByTitle(title) {
        const foundCharacter = await this.model.findOne({ $or: [{ englishTitle: title, }, { spanishTitle: title }] });
        return foundCharacter
    }

    async findRandom(game) {
        const numOfCharacters = await this.model.countDocuments()
        const character = await this.model.findOne().select("name img").skip(Math.floor(Math.random() * numOfCharacters)).lean()
        return character
    }

    async createNewCharacter({ name, aliases, img, characterId }) {
        const characterExists = await this.model.findOne({ name })
        if (characterExists) throw new Error('A character with the same name has been created')
        const newCharacter = new CharacterModel({ name, aliases, img, characterId })
        return await newCharacter.save()
    }
}

export default new Character('characters');