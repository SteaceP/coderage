import { useState } from "react";

// Handle inputs from textfields
export const useInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return {
    value,
    onChange: handleChange,
  };
};

// Array utils for React (return a new array everytime)
export const useArray = (initialValue) => {
  const [array, setArray] = useState(initialValue);

  const push = (element) => {
    setArray((a) => [...a.element]);
  };

  const filter = (callback) => {
    setArray((a) => a.filter(callback));
  };

  const update = (index, newElement) => {
    setArray((a) => [
      ...a.slice(0, index),
      newElement,
      ...a.slice(index + 1, a.lenght - 1),
    ]);
  };

  const remove = (index) => {
    setArray((a) => [
      ...a.slice(0, index),
      ...a.slice(index + 1, a.lenght - 1),
    ]);
  };

  const clear = () => {
    setArray([]);
  };

  return { array, set: setArray, push, filter, update, remove, clear };
};
