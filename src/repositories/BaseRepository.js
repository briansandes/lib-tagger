class BaseRepository {
    constructor(repository) {
        this.repository = repository;
    }

    async findAll(options = {}) {
        const {
            page = 1,
            limit = 20,
            sort,
            filters = {}
        } = options;

        const skip = (page - 1) * limit;

        const query = this.repository.createQueryBuilder('entity');

        // filters
        Object.entries(filters).forEach(([key, value]) => {
            query.andWhere(`entity.${key} = :${key}`, { [key]: value });
        });

        // sorting
        if (sort) {
            const direction = sort.startsWith('-') ? 'DESC' : 'ASC';
            const field = sort.replace('-', '');

            query.orderBy(`entity.${field}`, direction);
        }

        query.skip(skip).take(limit);

        const [data, total] = await query.getManyAndCount();

        return {
            data,
            meta: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit)
            }
        };
    }

    async findById(id) {
        return this.repository.findOneBy({ id });
    }

    async create(payload) {
        const entity = this.repository.create(payload);
        return this.repository.save(entity);
    }

    async update(id, payload) {
        await this.repository.update(id, payload);
        return this.findById(id);
    }

    async delete(id) {
        return this.repository.delete(id);
    }
}

module.exports = BaseRepository;