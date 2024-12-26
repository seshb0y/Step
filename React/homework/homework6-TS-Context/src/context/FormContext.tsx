import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'

type FormContextType = {
    name: string[],
    number: string[],
    addContact: (name: string, number:string) => void,
    deleteContact: (name: string, number:string) => void,
}


export const FormContext = createContext<FormContextType>({} as FormContextType);

export const useForm = () => {
    const context = useContext(FormContext);
    if(!context){
        throw new Error("useContext must be used within a FormProvider")
    }
    return context
}

type FormProviderProps = { 
  children: ReactNode;
}



export const FormProvider: React.FC<FormProviderProps> = ({children}) => {
  const [names, setName] = useState<string[]>();
  const [numbers, setNumber] = useState<string[]>();


  useEffect(() => {
    const storedNames = localStorage.getItem('Names');
    const storedNumbers = localStorage.getItem('Numbers');

    if (storedNames) {
        setName(JSON.parse(storedNames));
    }
    if (storedNumbers) {
        setNumber(JSON.parse(storedNumbers));
    }
}, []);

  useEffect(() => {
    if(names){
      localStorage.setItem("Names", JSON.stringify(names))
      localStorage.setItem("Numbers", JSON.stringify(numbers))
    }
}, [names, numbers]);


  const addContact = (name: string, number: string):void => {
    if(names){
      setName((prev) => [...prev, name])
      setNumber((prev) => [...prev, number])
    }
    else{
      setName([name]);
      setNumber([number])
    }

  }

  const deleteContact = (name: string, number: string): void => {
    const updatedNames = names.filter((n) => n !== name);
    const updatedNumbers = numbers.filter((num) => num !== number);
    setName(updatedNames)
    setNumber(updatedNumbers)
    localStorage.setItem('Names', JSON.stringify(updatedNames));
    localStorage.setItem('Numbers', JSON.stringify(updatedNumbers));
  };


  return (
    <FormContext.Provider value={{names, numbers, addContact, deleteContact}}>
      {children}
    </FormContext.Provider>
  )

}