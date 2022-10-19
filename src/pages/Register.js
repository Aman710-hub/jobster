import { Logo, FormRow } from "../components";
import Wrapper from "../assets/wrappers/RegisterPage";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// redux
import { useSelector, useDispatch } from "react-redux";
import { loginUser, registerUser } from "../features/user/userSlice";
// Tost
import { toast } from "react-toastify";

const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: true,
};
const Register = () => {
  const [value, setValue] = useState(initialState);
  // redux toolkit and useNavigate later
  const dispatch = useDispatch();
  const { isLoading, user } = useSelector((store) => store.user);

  // auto navigate to the home page

  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    const name = e.target.name;
    const valueOfInput = e.target.value;
    setValue({ ...value, [name]: valueOfInput });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, isMember } = value;
    if (!email || !password || (!isMember && !name)) {
      toast.error("Please Fill Out all The Feilds");
      return;
    }

    if (isMember) {
      dispatch(loginUser({ email: email, password: password }));
      return;
    }
    if (!isMember) {
      dispatch(registerUser({ name: name, email: email, password: password }));
      return;
    }
  };

  const toggleMember = () => {
    setValue({ ...value, isMember: !value.isMember });
  };

  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={onSubmit}>
        <Logo />
        <h3>{value.isMember ? "Login" : "Register"}</h3>
        {/* name field */}
        {value.isMember === false && (
          <FormRow
            type="text"
            name="name"
            value={value.name}
            handleChange={handleChange}
          />
        )}
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
        <button className="btn btn-block" type="submit" disabled={isLoading}>
          submit
        </button>

        <p>
          {value.isMember ? "Not a member yet" : "Alredy a member"}

          <button className="member-btn" onClick={toggleMember} type="button">
            {value.isMember ? "Register" : "Login"}
          </button>
        </p>
      </form>
    </Wrapper>
  );
};

export default Register;
