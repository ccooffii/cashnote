import React, {useEffect, useState} from "react";
import styled from "styled-components";
const Wrapper = styled.div`
  border: 1px solid grey;
  /* min-height: 100vh; */
  display: flex;
  flex-direction: column;
  background-color: rgb(254,251,240);
  position: relative;
`
const Main = styled.div`
  flex: 1 1 auto;
  min-height: 0;
  overflow-x: hidden;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  /* 不再需要 padding-bottom，底部控件顺序渲染 */
  @media (min-width: 500px) {
    overflow: hidden;
  }
`

const Layout = (props : any) => {
  const [vh, setVh] = useState(window.innerHeight);
  useEffect(() => {
    const onResize = () => {
      setVh(window.innerHeight);
    };
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);
  return (
    <Wrapper style={{height: vh}}>
      <Main className={props.className}>
        {props.children}
      </Main>
    </Wrapper>
  )
}

export  default Layout;