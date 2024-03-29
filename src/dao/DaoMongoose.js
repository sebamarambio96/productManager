import { ErrorNotFound } from "../models/errors/notFound.js";
import { toPojo } from "../utils/pojo.js";

export class DaoMongoose {
    #model;
    constructor(mongooseModel) {
        this.#model = mongooseModel;
    }

    get model() {
        return this.#model;
    }

    async create(element) {
        const pojo = toPojo(await this.#model.create(element));
        return pojo;
    }

    async readOne(criteria, validate = true) {
        const result = await this.#model.findOne(criteria).lean();
        if (validate) {
            if (!result) throw new ErrorNotFound("No se encontrado ningún resultado que coincida con la busqueda");
        }
        return result;
    }

    async readMany(criteria) {
        const result = await this.#model.find(criteria).select({}).lean();
        if (!result) throw new ErrorNotFound("No se encontrado ningún resultado que coincida con la busqueda");
        return result;
    }

    async getPaginate(category, options) {
        //Options example
        /* const options = {
            limit: req.query.limit || 10,
            page: req.query.page || 1,
            lean: true,
            sort,
        }; */
        const data = await this.#model.paginate(category, options);
        return data;
    }

    async updateOne(criteria, newData) {
        const modifiedUser = await this.#model.findOneAndUpdate(criteria, newData, { new: true, projection: { _id: 0 } }).lean();
        if (!modifiedUser) throw new ErrorNotFound("No se encontrado ningún resultado que coincida con la busqueda");
        delete modifiedUser._id;
        return modifiedUser;
    }

    async updateMany(criteria, newData) {
        await this.#model.updateMany(criteria, newData);
    }

    async deleteOne(criteria) {
        const deletedUser = await this.#model.findOneAndDelete(criteria, { projection: { _id: 0 } }).lean();
        if (!deletedUser) throw new ErrorNotFound("No se encontrado ningún resultado que coincida con la busqueda");
        delete deletedUser._id;
        return deletedUser;
    }

    async deleteMany(criteria) {
        const deletedUsers = await this.#model.deleteMany(criteria);
        return deletedUsers
    }

    // POPULATIONS ----------------------------------------------------------
    async readOnePopulated(criteria, localField) {
        // localfield example 'cartProducts.product'
        const result = await this.model.findById(criteria).populate(`${localField}`).lean();
        return result;
    }

    async readOnePopulated2(criteria, localField, from, foreignField) {
        const [result] = await this.model.aggregate([
            { $match: criteria },
            { $limit: 1 },
            {
                $lookup: {
                    from,
                    localField,
                    foreignField,
                    as: localField,
                    pipeline: [{ $project: { _id: false } }],
                },
            },
            { $project: { _id: false } },
        ]);

        if (!result) throw new ErrorNotFound("No se encontrado ningún resultado que coincida con la busqueda");
        delete result._id;
        return result;
    }

    async readManyPopulated2(criteria, localField, from, foreignField) {
        //Example
        /* const cart = await cartsDaoMoongose.readManyPopulated(
            { _id: '644699f414b4336cb400bc9f' },
            'cartProducts',
            'product',
            '_id'
        ) */
        const result = await this.model.aggregate([
            { $match: criteria },
            {
                $lookup: {
                    from,
                    localField,
                    foreignField,
                    as: localField,
                    pipeline: [{ $project: { _id: false } }],
                },
            },
            { $project: { _id: false } },
        ]);
        return result;
    }
}
