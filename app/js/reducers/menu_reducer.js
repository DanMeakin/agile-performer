import {menuItems } from 'js/mocked_data/menu_items'
 
 const initialState = menuItems;

 const menuReducer = (state = initialState, action) => {
  switch(action.type) {
  default:
    return state;
  }
};

export default menuReducer;
