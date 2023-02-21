export function isDate(date: any): boolean {
  return date instanceof Date;
}

export function equalDates(date1: Date, date2: Date): boolean {
  return date1.getTime() === date2.getTime();
}

export function isObject(object: any): boolean {
  return (
    object != null &&
    !Array.isArray(object) &&
    !isDate(object) &&
    typeof object === 'object'
  );
}
export function equalObjects(
  object1: Record<string, any>,
  object2: Record<string, any>
): boolean {
  const keys1: string[] = Object.keys(object1);
  const keys2: string[] = Object.keys(object2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    if (isDifferent(object1[key], object2[key])) {
      return false;
    }
  }
  return true;
}

export function equalArrays(array1: Array<any>, array2: Array<any>): boolean {
  if (array1.length !== array2.length) {
    return false;
  }
  const smallestArrayLen = Math.min(array1.length, array2.length);
  for (let i = 0; i < smallestArrayLen; ++i) {
    if (isDifferent(array1[i], array2[i])) {
      return false;
    }
  }
  return true;
}

export function isDifferent(newValue: any, oldValue: any): boolean {
  if (Array.isArray(newValue) && Array.isArray(oldValue)) {
    return !equalArrays(newValue ?? [], oldValue ?? []);
  } else if (isDate(newValue) && isDate(oldValue)) {
    return !equalDates(newValue, oldValue);
  } else if (isObject(newValue) && isObject(oldValue)) {
    return !equalObjects(oldValue, newValue);
  } else if (!isNaN(oldValue) && isNaN(newValue)) {
    return true;
  }
  return newValue !== oldValue;
}
