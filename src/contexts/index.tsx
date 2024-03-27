import React, { createContext, useContext, useState } from "react";

// Interfays
interface MyContextType {
  state: {
    obj: {
      value1: string;
      value2: string;
    };
  };
  setValue: (newValue1: string, newValue2: string) => void;
}

// Boshlang'ich holat
const initialContext: MyContextType = {
  state: {
    obj: {
      value1: "",
      value2: "",
    },
  },
  setValue: () => {},
};

const MyContext = createContext<MyContextType>(initialContext);

// Provayder komponenti
export const MyContextProvider: React.FC = ({ children }: any) => {
  const [state, setState] = useState(initialContext.state);

  const setValue = (newValue1: string, newValue2: string) => {
    setState({
      obj: {
        value1: newValue1,
        value2: newValue2,
      },
    });
  };

  return (
    <MyContext.Provider value={{ state, setValue }}>
      {children}
    </MyContext.Provider>
  );
};
