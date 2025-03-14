export const isEmpty = (value) => {
  if (typeof value === 'number') {
    return false;
  } else if (typeof value === 'string') {
    return value.trim().length === 0;
  } else if (Array.isArray(value)) {
    return value.length === 0;
  } else if (typeof value === 'object') {
    return value == null || Object.keys(value).length === 0;
  } else if (typeof value === 'boolean') {
    return false;
  } else {
    return !value;
  }
};
export const getValFromObjectByPath = (obj, path) => {
  // getValFromObjectByPath({item:{name:'chanavee'}}, 'item.name')
  const parts = path.split('.');
  if (Array.isArray(parts)) {
    const last = parts.pop();
    const l = parts.length;
    let i = 1;
    let current = parts[0];
    // eslint-disable-next-line no-cond-assign
    while ((obj = obj[current]) && i < l) {
      current = parts[i];
      i++;
    }

    if (!isEmpty(obj)) {
      return obj[last];
    }
  }
};
