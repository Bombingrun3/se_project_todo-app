import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor({
    popupSelector,
    handleFormSubmit,
    formValues,
    inputList,
    popupForm,
  }) {
    super({ popupSelector });
    this._handleFormSubmit = handleFormSubmit;
    this._formValues = formValues;
    this._inputList = this._popupElement.querySelectorAll(".popup__input");
    this._popupForm = this._popupElement.querySelector(".popup__form");
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      super.close();
      this._popupForm.reset();
    });
  }
}

export default PopupWithForm;
