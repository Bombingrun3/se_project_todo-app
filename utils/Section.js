class Section {
  constructor({ items, renderer, containerSelector }) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    this._items.forEach((item) => {
      // call the renderer and pass it the item
      const element = this._renderer(item);
      this.addItem(element);
    });
  }
  addItem(element) {
    this._container.append(element);
  }
}

export default Section;
