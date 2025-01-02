
export default class Controller {
  constructor(providedModel) {
    this.model = providedModel;
  }

  addEntry = (newMessage) => {
    return this.model.create(newMessage)
      .then((msg) => {
        return { status: 200, id: msg.id };
      })
      .catch((err) => {
        return { status: 500, message: err.message };
      });
  };

  getAllEntries = async () => {
    return await this.model.findAll();
  };

  getEntryById = async (id) => {
      const item = await this.model.findByPk(id);
      if (!item) {
        return { status: 500, message: "Item not found"};
      } else {
        return { status: 200, item:item};
      }
  };


  getEntryByQuery = async (query) => {
    const item = await this.model.findAll(query);
    if (!item) {
      return { status: 500, message: "Item not found"};
    } else {
      return { status: 200, item:item};
    }
};

  updateEntryById = async (id, obj) => {
      const item = await this.model.findByPk(id);
      if (!item) {
        return { status: 404, message: "Item not found", item: item };
      } else {
          Object.keys(obj).forEach(key=>{
              item[key] = obj[key]
          })
          await item.save();
        return { status: 200,  message: "Item updated successfully", item: item };
      }
  };

  removeEntryById = async (id) => {
    const item = await this.model.findByPk(id);
    if (!item) {
      return { status: 404, message: "Item not found" };
    } else {
      await item.destroy();
      return { status: 200, message: "Item deleted successfully" };
    }
  };
}