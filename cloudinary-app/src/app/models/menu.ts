export class Menu {
    constructor(_id = '', type = '', type_name= '', name = '', description = '', price = 0, image = '', public_id = '') {
        this._id = _id;
        this.type = type;
        this.type_name = type_name;
        this.name = name;
        this.description = description;
        this.price = price;
        this.image = image;
        this.public_id = public_id;
    }

    _id: string;
    type: string;
    type_name: string;
    name: string;
    description: string;
    price: number;
    image: string;
    public_id: string;
}
