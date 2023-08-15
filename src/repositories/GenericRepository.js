export class GenericRepository {
    #dao;
    constructor(dao) {
        this.#dao = dao;
    }

    get dao() {
        return this.#dao;
    }

    create(data) {
        return this.#dao.create(data);
    }

    readOne(criteria, validate) {
        return this.#dao.readOne(criteria, validate);
    }

    readMany(criteria) {
        return this.#dao.readMany(criteria);
    }

    updateOne(criteria, newData) {
        return this.#dao.updateOne(criteria, newData);
    }

    updateMany(criteria, newData) {
        return this.#dao.updateMany(criteria, newData);
    }

    deleteOne(criteria) {
        return this.#dao.deleteOne(criteria);
    }

    deleteMany(criteria) {
        return this.#dao.deleteMany(criteria);
    }
}
