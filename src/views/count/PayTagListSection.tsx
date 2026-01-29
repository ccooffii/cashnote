import styled from "styled-components";
import React from "react";
import Icon from "../../components/Icon";
import {Link} from "react-router-dom";
import {useTags} from "../../hooks/useTags";
// import classnames from 'classnames'; // 未使用，移除

interface PayTagProps {
    children?:React.ReactNode | React.ReactNode[];
    idValue:number;
    idValueOnChange: (selected:number) => void;
}
const TagListSection = styled.ol`
  width: 100%;
  padding: 4px 2px 0 2px;
  background: linear-gradient(135deg, #fefbf0 70%, #f6d0a0 100%);
  list-style: none;
  margin: 0;
  >div {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 8px;
    >li, >a {
      display: grid;
      grid-template-columns: 28px 1fr;
      align-items: center;
      width: 100%;
      background: #f6d0a0;
      border: 2px solid #222;
      border-radius: 5px;
      min-height: 32px;
      height: auto;
      padding: 0 10px 0 10px;
      font-family: 'Segoe UI', 'Arial', 'PingFang SC', 'Microsoft YaHei', sans-serif;
      font-size: 15px;
      font-weight: 600;
      cursor: pointer;
      box-sizing: border-box;
      transition: border 0.18s, background 0.18s;
      margin-bottom: 0.5px;
        margin-bottom: 0;
        column-gap: 8px;
      box-shadow:
        0 2px 6px 0 rgba(180,140,80,0.08),
        0 1.5px 0 #fff inset,
        0 -2.5px 6px 0 rgba(180,140,80,0.18),
        0 2.5px 0 #e2b77a inset,
        0 -2.5px 0 #b88d4d inset,
        0 1.5px 0 #fff inset,
        0 -1.5px 0 #e2b77a inset,
        inset -10px 0 16px -2px rgba(180,140,80,0.22),
        inset -2px 0 6px 0 rgba(120,90,30,0.18);
      background: linear-gradient(90deg, #fefbf0 0%, #f6d0a0 100%);
      text-decoration: none;
      color: #222;
      .icon {
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 0;
        flex-shrink: 0;
          margin-right: 0;
      }
      span:last-child {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      &:hover {
        border: 1.5px solid #e88393;
        background: #f6e0c0;
      }
    }
    >li.selected {
      border: 2.5px solid #e88393;
      background: #f6e7d0;
      color: #b85c38;
      font-weight: 900;
      position: relative;
      box-shadow: 0 2px 8px 0 rgba(232,131,147,0.10);
    }
    >li.selected::before {
      content: '';
      position: absolute;
      left: 0;
      top: 12%;
      bottom: 12%;
      width: 5px;
      border-radius: 3px;
      background: #e88393;
    }
    >li.hidden {
      display: none;
    }
    >li:last-child, >a:last-child {
      margin-bottom: 0;
    }
  }
  @media(min-width: 600px){
    max-width: 420px;
    margin: 0 auto;
  }
`
const PayTagsSection: React.FC<PayTagProps> = (props) => {
    const selectedTagId = props.idValue;
    const onToggleTag = (tagId:number) => {
        if (tagId === selectedTagId){
            props.idValueOnChange(0);
        }else {
            props.idValueOnChange(tagId)
        }
    }
    const {tags,IconMap} = useTags();
    return(
        <TagListSection>
            <div>
            {tags.map(tag=>
                tag.category==='-' ? (
                    <li key={tag.id}
                        onClick={() => {onToggleTag(tag.id)}}
                        className={selectedTagId===tag.id ? 'selected': ''}
                    >
                        <span className="icon"><Icon name={IconMap[tag.iconId]?.name || 'cat'}/></span>
                        <span>{tag.name}</span>
                    </li>
                ) : null
            )}
            <Link to='/payTagsSettings'>
              <span className="icon"><Icon name="settings"/></span>
              <span>Settings</span>
            </Link>
            </div>
        </TagListSection>
    );
}

export {PayTagsSection,TagListSection};
// className={selectedTagIds.indexOf(tag.id) >= 0 ? 'selected': ''