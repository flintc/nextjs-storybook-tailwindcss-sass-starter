export const resolve = (valueOrFn, props) => {
  if (typeof valueOrFn === "function") {
    return valueOrFn(props);
  } else {
    return valueOrFn;
  }
};
