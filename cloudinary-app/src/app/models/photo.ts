export class Photo {
    constructor(_id = '', title = '', description = '', imageURL = '') {
        this._id = _id;
        this.title = title;
        this.description = description;
        this.imageURL = imageURL;
    }

    _id: string;
    title: string;
    description: string;
    imageURL: string;
}
