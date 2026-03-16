const AppDataSource = require('../config/datasource');

class BaseRepository {
    constructor(entity) {
        this.repo = AppDataSource.getRepository(entity);
    }

    async create(data) {
        const entity = this.repo.create(data);
        return await this.repo.save(entity);
    }

    async findAll() {
        return await this.repo.find({
            where: { deleted_at: null }
        });
    }

    async findById(id) {
        return await this.repo.findOne({
            where: {
                id,
                deleted_at: null
            }
        });
    }

    async update(id, data) {
        await this.repo.update(id, data);
        return this.findById(id);
    }

    async softDelete(id) {
        return await this.repo.update(id, {
            deleted_at: new Date()
        });
    }
}

module.exports = BaseRepository;