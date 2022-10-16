import React from "react";
import logo from "../assets/images/logo.svg";
import main from "../assets/images/main.svg";
import Logo from "../components/Logo";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        {/* <img src={logo} alt="jobster" className="logo" /> */}
        <Logo />
      </nav>
      <div className="container page">
        {/* info */}
        <div className="info">
          <h1>
            job <span>tracking</span> app
          </h1>
          <p>some text</p>
          <Link to="/register" className="btn btn-hero">
            Loging/Register
          </Link>
        </div>

        <img src={main} alt="img" className="img main-img" />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  nav {
    width: var(--fluid-width);
    max-width: var(--max-width);
    margin-inline: auto;
    height: var(--nav-height);
    display: flex;
    align-items: center;
  }

  .page {
    min-height: var(--fluid-height);
    display: grid;
    align-items: center;
  }

  h1 {
    font-weight: 700;
    span {
      color: var(--primary-500);
    }
  }

  p {
    color: var(--gray-600);
  }

  .main-img {
    display: none;
  }

  @media (min-width: 992px) {
    .page {
      grid-template-columns: 1fr 1fr;
      column-gap: 2rem;
    }

    .main-img {
      display: block;
    }
  }
`;

export default Landing;
