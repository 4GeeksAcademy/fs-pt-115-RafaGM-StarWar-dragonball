export const getcharacters = async (dispatch) => {
    const response = await fetch("https://dragonball-api.com/api/characters?limit=1000")
    if (!response.ok) {
        console.log("Fallo en getcharacters");
    }
    const data = await response.json()
    console.log(data);
    
    dispatch({ type: "set_characters", payload: data.items })
}
export const getplanets = async (dispatch) => {
    const response = await fetch("https://dragonball-api.com/api/planets?limit=1000")
    if (!response.ok) {
        console.log("Fallo en getplanets");
    }
    const data = await response.json()
    dispatch({ type: "set_planets", payload: data.items })
}
