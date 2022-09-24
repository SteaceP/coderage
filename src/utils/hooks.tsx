import { useState } from "react";

// Handle inputs from textfields
export const useInput = (initialValue: string) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (event: React.SyntheticEvent) => {
    setValue((event.target as HTMLInputElement).value);
  };

  return {
    value,
    onChange: handleChange,
  };
};

//? Array utils for React

export const useArray = (initialValue: any) => {
  const [array, setArray] = useState(initialValue);

  const push = () => {
    setArray((array: { element: any }) => [...array.element]);
  };

  const filter = (callback) => {
    setArray((array) => array.filter(callback));
  };

  const update = (index: number, newElement: any) => {
    setArray(
      (array: {
        slice: (arg0: number, arg1: number) => any;
        length: number;
      }) => [
        ...array.slice(0, index),
        newElement,
        ...array.slice(index + 1, array.length - 1),
      ]
    );
  };

  const remove = (index: number) => {
    setArray(
      (array: {
        slice: (arg0: number, arg1: number) => any;
        length: number;
      }) => [
        ...array.slice(0, index),
        ...array.slice(index + 1, array.length - 1),
      ]
    );
  };

  const clear = () => {
    setArray([]);
  };

  return { array, set: setArray, push, filter, update, remove, clear };
};
