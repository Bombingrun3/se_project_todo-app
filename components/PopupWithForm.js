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
    this._inputList = inputList;
    this._popupForm = popupForm;
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList = this._popupElement.querySelectorAll(".popup__input");
    inputList.forEach((input) => {
      formValues[input.name] = input.value;
    });
    return formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm = this._popupElement.querySelector(".popup__form");
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      super.close();
      this._popupForm.reset();
    });
  }
}

export default PopupWithForm;
