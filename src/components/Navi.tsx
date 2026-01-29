import Icon from "./Icon";
import {NavLink} from "react-router-dom";
import React from "react";
import styled from "styled-components";
const NaviWrapper = styled.div`
  width: 100%;
  background: #fff;
  box-shadow: 0 -1px 4px rgba(0,0,0,0.04);
  height: calc(56px + env(safe-area-inset-bottom));
  position: static;
  z-index: 2;
  /* 适配 iOS Safari 底部安全区，防止被地址栏遮挡 */
  padding-bottom: env(safe-area-inset-bottom);
  @media (min-width: 500px) {
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 10;
    border-bottom-left-radius: 28px;
    border-bottom-right-radius: 28px;
    height: 56px;
    padding-bottom: 0;
  }
  .highLight{
    background-color: rgb(246,209,180);
  }
  >ul {
    display: flex;
    flex-direction: row;
    > a {
      width: 50%;
      > li {
        border-radius: 8px;
        margin-left: 2px;
        margin-right: 2px;
        margin-top: 2px;
        height: 50px;
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        font-weight: bolder;
        .icon {
          width: 25px;
          height: 25px;
          display: inline-block;
        }
      }
    }
  }
`;
const Navi = () =>{
    let activeClassName = "highLight";
    return(
        <NaviWrapper>
            <ul>
                <NavLink to="/chart"
                         className = {({ isActive }) =>
                             isActive ? activeClassName : undefined }>
                        <li><Icon name="chart"></Icon>Analysis</li>
                </NavLink>
                <NavLink to="/count"
                         className = {({ isActive }) =>
                             isActive ? activeClassName : undefined }>
                    <li><Icon name="edit"></Icon>Record</li>
                </NavLink>
                <NavLink to="/statistics"
                         className = {({ isActive }) =>
                             isActive ? activeClassName : undefined }>
                    <li><Icon name="bill"></Icon>Bill</li>
                </NavLink>
            </ul>
        </NaviWrapper>
    );
}

export  default  Navi;