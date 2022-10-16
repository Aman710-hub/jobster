import { Logo, FormRow } from "../components";
import Wrapper from "../assets/wrappers/RegisterPage";
import { useState, useEffect } from "react";

const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: true,
};
const Register = () => {
  const [value, setValue] = useState(initialState);
  // redux toolkit and useNavigate later

  const handleChange = (e) => {
    console.log(e.target);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(e.target);
  };

  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={onSubmit}>
        <Logo />
        <h3>Login</h3>
        {/* name field */}
        <FormRow
          type="text"
          name="name"
          value={value.name}
          handleChange={handleChange}
        />
        {/* email field */}
        <FormRow
          type="email"
          name="email"
          value={value.email}
          handleChange={handleChange}
        />
        {/* password field */}
        <FormRow
          type="password"
          name="password"
          value={value.password}
          handleChange={handleChange}
        />
        <button className="btn btn-block" type="submit">
          submit
        </button>
      </form>
    </Wrapper>
  );
};

export default Register;
