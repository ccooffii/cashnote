import React from "react";
import styled from "styled-components";
import {Link, useNavigate} from "react-router-dom";
import Icon from "../components/Icon";
import {useTags} from "../hooks/useTags";
export const AddTagBar = styled.button`
  display: block;
  background-color: rgba(232,130,148,0.7);
  border: none;
  font-size: 18px;
  padding: 8px 28px;
  border-radius: 14px;
  color: white;
  font-weight: bolder;
  box-shadow: inset -2px -3px 0px rgba(0,0,0,0.25);
  position: absolute;
  left: 50%;
  bottom: 64px;
  transform: translateX(-50%);
  z-index: 100;
`
export const Container = styled.div`
  font-weight: bolder;
  display: flex;
  flex-direction: column;
  background-color:rgb(254,251,240) ;
  position: relative;
  flex: 1 1 auto;
  min-height: 0;
`
export const TagsList = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 8px;
  padding-right: 8px;
  overflow-y: auto;
  flex-grow: 1;
  // margin-bottom: 120px;
  >li{
    flex-shrink: 0;
    background-color:rgb(254,251,240) ;
    border-radius: 5px;
    display: flex;
    align-items: center;
    height: 40px;
    width: 100%;
    margin-bottom: 4px;
    z-index: 2;
    border: 1px solid black;
    >a{
      flex-shrink: 0;
      box-shadow: inset -2px -3px 0px rgba(0,0,0,0.25);
      background-color:rgb(254,251,240) ;
      border-radius: 5px;
      display: flex;
      align-items: center;
      height: 40px;
      width: 100%;
      flex-direction: row;
      //padding: 10px;
      justify-content: space-between;
      z-index: 2;
      svg{
        height: 30px;
        width: 30px;
      }
      >*{
        margin-left: 10px;
        margin-right: 10px;
      }
    }
  }
  >.hide{
    display: none;
  }
`
function PayTagsSettings() {
  const {tags, IconMap} = useTags();
  const navigate = useNavigate();
  return (
    <Container>
      <div style={{
        background: '#e0c9a6',
        boxShadow: '0 4px 18px 0 rgba(224,201,166,0.13)',
        color: '#5a4322',
        fontWeight: 600,
        fontSize: 20,
        letterSpacing: 1,
        minHeight: 56,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        padding: '0 0 0 0',
        height: 56,
        marginBottom: 8,
        position: 'relative',
      }}>
        <span
          onClick={() => {
            window.localStorage.setItem('lastCategory', '-');
            navigate('/count');
          }}
          style={{color: '#5a4322', display: 'flex', alignItems: 'center', fontSize: 22, textDecoration: 'none', marginLeft: 18, marginRight: 0, height: 56, minWidth: 36, borderRadius: 12, transition: 'background 0.2s', cursor: 'pointer'}}
        >
          <Icon name='return' style={{width: 27, height: 27}} />
        </span>
        <div style={{flex: 1, textAlign: 'center', fontWeight: 600, fontSize: 20, letterSpacing: 1, marginRight: 36, userSelect: 'none'}}>
          Tag List
        </div>
      </div>
      <TagsList>
        {tags.filter(tag => tag.category === '-').map(tag => (
          <li key={tag.id}>
            <Link to={'/PayTagsSettings/' + tag.id}>
              <Icon name={IconMap[tag.iconId].name || 'cat'} />
              <span>{tag.name}{' >'}</span>
            </Link>
          </li>
        ))}
      </TagsList>
      <Link to='/addTag'>
        <AddTagBar>Add Tag</AddTagBar>
      </Link>
    </Container>
  );
}
export default  PayTagsSettings;