const InMemoryLocalStorage = () => {
  let store: { [key: string]: string } = {};

  const getItem = (key: string) => store[key];
  const setItem = (key: string, value: string) => (store[key] = value);
  const clear = () => (store = {});
  const removeItem = (key: string) => delete store[key];
  const print = () => console.log(store);

  return {
    getItem,
    setItem,
    clear,
    removeItem,
    print,
  };
};

const mockLocalStorage = () => {
  const mockedLocalStorage = InMemoryLocalStorage();

  Object.defineProperty(window, 'localStorage', {
    value: mockedLocalStorage,
  });

  afterEach(() => {
    mockedLocalStorage.clear();
  });
};

export default mockLocalStorage;
