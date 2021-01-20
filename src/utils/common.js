const checkButtonPress = (evt, action, button) => {
  if (evt.key === button || evt.button === button) {
    evt.preventDefault();
    action(evt);
  }
};

export {checkButtonPress};
