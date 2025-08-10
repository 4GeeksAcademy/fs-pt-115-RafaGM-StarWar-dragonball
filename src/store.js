export const initialStore = () => {
  return {
    characters: [],
    planets: [],
    favorite: [],
    searchTerm: ""
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "set_characters":
      return {
        ...store,
        characters: action.payload
      }
    case "set_planets":
      return {
        ...store,
        planets: action.payload
      }
    case "set_favorite":
      return {
        ...store,
        favorite: action.payload
      }
      case "set_searchTerm":
      return { ...store, searchTerm: action.payload };
    default:
      throw Error('Unknown action.');
  }
}
