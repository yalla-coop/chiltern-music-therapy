import { createContext, useState, useContext } from 'react';

const ExpandableContext = createContext({
  state: [0],
  setOpenItem: () => {},
  onClose: () => {},
});

const ExpandableProvider = ({ children, itemsNumbers, props }) => {
  const [state, setState] = useState(Array(itemsNumbers).fill(false));
  const closeAll = () => setState(Array(itemsNumbers).fill(false));
  const setOpenItem = (index) => {
    setState((oldState) =>
      oldState.map((e, i) => {
        let currentIndex = i + 1;
        return index === currentIndex;
      })
    );
  };
  const value = { state, setOpenItem, closeAll };
  return (
    <ExpandableContext.Provider value={value} {...props}>
      {children}
    </ExpandableContext.Provider>
  );
};

export const useExpandable = () => {
  const value = useContext(ExpandableContext);
  return value;
};

export default ExpandableProvider;
