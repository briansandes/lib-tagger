class BaseService {

    constructor(repository) {
        this.repository = repository;
    }

    async create(data) {
        return this.repository.create(data);
    }

    async getAll() {
        return this.repository.findAll();
    }

    async getById(id) {
        return this.repository.findById(id);
    }

    async update(id, data) {
        return this.repository.update(id, data);
    }

    async delete(id) {
        return this.repository.softDelete(id);
    }

}

module.exports = BaseService;