let events = [];

export const registerEvent = (event, callback) => {
  const item = events.find(i => i.event == event);
  if (item) {
    item.callback.push(callback);
  } else {
    events.push({event: event, callback: [callback]});
  }
};

export const fireEvent = event => {
  const item = events.find(i => i.event == event);
  if (item?.callback?.length) {
    item.callback[item.callback.length - 1]();
  }
};

export const removeEvent = event => {
  const index = events.findIndex(i => i.event == event);
  if (index != -1) {
    const item = events[index];
    if (item?.callback) {
      item.callback.splice(-1, 1);
      if (item.callback.length == 0) {
        events.splice(index, 1);
      }
    }
  }
};
