import styled from "styled-components";
import React, {useState} from "react";
interface categoryProps {
    children?:React.ReactNode;
    value:('-'|'+');
    onChange:(c:('-'|'+'))=>void;
}
const Category = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  > ul {
    display: flex;
    flex-direction: row;
    width: 100%;
    background: linear-gradient(90deg, #f6d0a0 0%, #f7e2c0 100%);
    // border-radius: 14px 14px 0 0;
    box-shadow: 0 2px 8px 0 rgba(180,140,80,0.13), 0 1.5px 0 #fff inset;
    height: 44px;
    // margin: 0 0 6px 0;
    overflow: hidden;
    >li {
      width: 50%;
      text-align: center;
      font-family: 'Segoe UI', 'Arial', 'PingFang SC', 'Microsoft YaHei', sans-serif;
      font-size: 18px;
      font-weight: 600;
      padding: 8px 0 6px 0;
      border: none;
      background: none;
      color: #a06a2b;
      cursor: pointer;
      transition: background 0.18s, color 0.18s;
      position: relative;
      z-index: 1;
      &.selected {
        background: linear-gradient(90deg, #f7c97c 0%, #f6b96a 100%);
        color: #d94a4a;
        font-weight: 800;
        box-shadow: 0 2px 8px 0 rgba(232,131,147,0.13), 0 2.5px 0 #d94a4a inset;
      }
      &.selected::after {
        content: '';
        display: block;
        position: absolute;
        left: 18%;
        right: 18%;
        bottom: 0;
        height: 4px;
        border-radius: 2px 2px 0 0;
        background: linear-gradient(90deg, #e88393 0%, #f6d0a0 100%);
        z-index: 2;
      }
      &:not(.selected):hover {
        background: #f7e2c0;
        color: #e88393;
      }
    }
  }
`

const CategorySection:React.FC<categoryProps> = (props) =>{
    const category = props.value;
    const [categoryList] = useState<('-'|'+')[]>(['-','+'])
    const categoryMap = {'-':'Spend','+':'Income'}
    return (
        <Category>
            <ul>
                {categoryList.map(c =>
                    <li key={c}
                        className={category === c ? 'selected':''}
                        onClick={() => {props.onChange(c)}}
                    >{categoryMap[c]}
                    </li>
                )}
            </ul>
        </Category>
    );
}
export {CategorySection};