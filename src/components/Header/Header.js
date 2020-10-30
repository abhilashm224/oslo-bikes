import React from "react";
import styled from 'styled-components';

//header component
const Header = () => (
    <Wrapper>
        <Title>Oslo City Bikes</Title>
        <ColorListwrapper>
            <ColorList>
                <li><span style={{background: 'red'}}></span>No Bikes</li>
                <li><span style={{background: 'blue'}}></span>No Docks</li>
                <li><span style={{background: 'green'}}></span>Bikes & Docks</li>
            </ColorList>
        </ColorListwrapper>
    </Wrapper>
)


// styled components
const Title = styled.h1`
  text-align: left;
  color: #ffffff;
  margin: 0px;
`;

const Wrapper = styled.header`
  background: darkslategray;
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items:center;
  width:100%;
  z-index: 1;
  position: relative;
`;

const ColorListwrapper = styled.div`
  width:60%;
  display: flex;
  justify-content: flex-end;
`;

const ColorList = styled.ul`
display:flex;
align-items:center;
justify-content: flex-end;
flex-direction: column;
list-style: none;

li {
	display: flex;
	align-items:center;
	width: 100%;
    padding: 2px;
	color: #ffffff;
}

span {
    width: 20px;
    height: 20px;
    background: red;
    border-radius: 50%;
	display: inline-block;
	margin-right: 10px;
}
`;
export default Header;