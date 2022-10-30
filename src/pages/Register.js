import { useState, useEffect } from "react";
import Logo from "../components/Logo";
import Wrapper from "../assets/wrappers/RegisterPage";
import { useDispatch, useSelector } from "react-redux";
import FormRow from "../components/FormRow";
import { toast } from "react-toastify";
import { loginUser, registerUser } from "../features/user/userSlice";
import { useNavigate } from "react-router-dom";

//

const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: false,
};

const Register = () => {
  const [values, setValues] = useState(initialState);
  const dispatch = useDispatch();
  const { isLoading, user } = useSelector((store) => store.user);
  console.log("🚀 ~ Register ~ user", user);

  // auto navigate
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
    const value = e.target.value;

    setValues({ ...values, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, isMember } = values;
    if (!email || !password || (!isMember && !name)) {
      toast.error("Please Fill Out All Fields");
      return;
    }

    if (!isMember) {
      dispatch(registerUser({ name: name, email: email, password: password }));
      return;
    }
    if (isMember) {
      dispatch(loginUser({ email: email, password: password }));
      return;
    }
  };

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={onSubmit}>
        <Logo />
        <h3>{values.isMember ? "Login" : "Register"}</h3>
        {/* name field */}
        {values.isMember === false && (
          <FormRow
            type="text"
            name="name"
            value={values.name}
            handleChange={handleChange}
          />
        )}
        {/* email field */}
        <FormRow
          type="email"
          name="email"
          value={values.email}
          handleChange={handleChange}
        />
        {/* password field */}
        <FormRow
          type="password"
          name="password"
          value={values.password}
          handleChange={handleChange}
        />
        <button className="btn btn-block" type="submit" disabled={isLoading}>
          submit
        </button>

        <p>
          {values.isMember ? "Not a member yet" : "Alredy a member"}

          <button className="member-btn" onClick={toggleMember} type="button">
            {values.isMember ? "Register" : "Login"}
          </button>
        </p>
      </form>
    </Wrapper>
  );
};

export default Register;
