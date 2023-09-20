const init = {
  email: "",
  password: "",
};

function userReducer(state = init, action) {
  if (action.type == "login") {
    return {
      ...state,
      id: action.payload.id,
      first_name: action.payload.first_name,
      last_name: action.payload.last_name,
      email: action.payload.email,
      phone_number: action.payload.phone_number,
      id_number: action.payload.id_number,
      id_image: action.payload.id_image,
      profile_picture: action.payload.profile_picture,
      is_verified: action.payload.is_verified,
    };
  } else if (action.type == "logout") {
    return init;
  }

  return state;
}

export default userReducer;
