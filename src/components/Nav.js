import Link from "next/link";
import styled from "styled-components";

const NavContainer = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5rem;
  font-family: "Brand";
`;

function Nav() {
  return (
    <NavContainer>
      <Link href="/">Vanessa&apos;s Blog Site</Link>
    </NavContainer>
  );
}

export default Nav;
