import { createContext, useState, useContext, useEffect } from 'react';

const ExpandableContext = createContext({
  state: [0],
  setOpenItem: () => {},
  onClose: () => {},
});

const ExpandableProvider = ({ children, itemsNumbers, ...props }) => {
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
  useEffect(() => {
    setState((oldState) => {
      const openedCard = oldState.findIndex((e) => e);
      const initialArr = Array(itemsNumbers).fill(false);
      if (openedCard) {
        initialArr[openedCard] = true;
      }
      return initialArr;
    });
  }, [itemsNumbers]);

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
