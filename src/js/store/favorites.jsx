export const swStore = {
    favoritosStore: [], // [{name:"Luke", uid:1, categoria:"people", link:"/people/1"},{}]
  };
  
  export function swActions(getStore, getActions, setStore) {
    return {
      addFavorite: async (objeto) => {
        let store = getStore();
        let arrTemp = store.favoritosStore.slice(); //copio el estado centralizado
  
        if (arrTemp.length > 0) {
          for (let i = 0; i < arrTemp.length; i++) {
            if (arrTemp[i]["name"] == objeto.name) {
              return; //saldría de la función aquí
            }
          }
        }
  
        arrTemp.push(objeto);
        setStore({ ...store, favoritosStore: arrTemp }); // [..favoritos, objeto]
        return true;
      },
      deleteFavorite: async (index) => {
        let store = getStore();
        let arrTemp = store.favoritosStore.slice();
        arrTemp.splice(index, 1);
        setStore({ ...store, favoritosStore: arrTemp });
      },
    };
  }
  