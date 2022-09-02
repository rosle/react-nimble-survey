const localStorage = () => {
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
  const myLocalStorage = localStorage();

  beforeAll(() => {
    Object.defineProperty(window, 'localStorage', {
      value: myLocalStorage,
    });
  });

  afterEach(() => myLocalStorage.clear());

  return myLocalStorage;
};

export default mockLocalStorage;
