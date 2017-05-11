import { menuItems, filterMenuItems } from 'js/mocked_data/old_mocked_data/menu_items';

 const initialState = menuItems;

 const menuReducer = (state = initialState, action) => {
  switch(action.type) {
  case "FILTER_METRICS":
    return filterMenuItems(action.term);
  default:
    return state;
  }
};

export default menuReducer;
