class BaseRepository {
  constructor(model) {
    this.model = model;
  }

  async findAll(options = {}) {
    return await this.model.findAll(options);
  }

  async findById(id, options = {}) {
    return await this.model.findByPk(id, options);
  }

  async findOne(options = {}) {
    return await this.model.findOne(options);
  }

  async create(data) {
    return await this.model.create(data);
  }

  async update(id, data) {
    const [updatedRowsCount] = await this.model.update(data, {
      where: { id },
      returning: true,
    });
    
    if (updatedRowsCount === 0) {
      return null;
    }
    
    return await this.findById(id);
  }

  async delete(id) {
    const deletedRowsCount = await this.model.destroy({
      where: { id },
    });
    
    return deletedRowsCount > 0;
  }

  async findAndCountAll(options = {}) {
    return await this.model.findAndCountAll(options);
  }

  async bulkCreate(data, options = {}) {
    return await this.model.bulkCreate(data, options);
  }

  async count(options = {}) {
    return await this.model.count(options);
  }
}

module.exports = BaseRepository;