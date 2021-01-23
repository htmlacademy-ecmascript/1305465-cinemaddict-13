import dayjs from "dayjs";
import AbstractView from "../view/abstract-view.js";

const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

const render = (container, place, child) => {
  if (container instanceof AbstractView) {
    container = container.getElement();
  }

  if (child instanceof AbstractView) {
    child = child.getElement();
  }
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(child);
      break;
    case RenderPosition.BEFOREEND:
      container.append(child);
      break;
    default:
      throw new Error(`place is not valid`);
  }
};

const remove = (component) => {
  if (!(component instanceof AbstractView)) {
    throw new Error(`Can remove only components`);
  }

  component.getElement().remove();
  component.removeElement();
};

const addElement = (place, element) => {
  if (!(element instanceof AbstractView)) {
    throw new Error(`Can remove only components`);
  }

  place.appendChild(element.getElement());
};

const removeElement = (place, element) => {
  if (!(element instanceof AbstractView)) {
    throw new Error(`Can remove only components`);
  }

  place.removeChild(element.getElement());
};

const formatDate = (date, format) => {
  return dayjs(date).format(format);
};

export {
  createElement,
  RenderPosition,
  render,
  remove,
  addElement,
  removeElement,
  formatDate
};
