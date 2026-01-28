import {useTags} from "../hooks/useTags";
import {Link, useParams} from "react-router-dom";
import React from "react";
import Icon from "../components/Icon";
import styled from "styled-components";
import {TopBar} from "./AddTag";
export type Params = {
    id:any
}
export const EditWrapper = styled.div`
  font-weight: bolder;
  display: flex;
  flex-direction: column;
  background-color:rgb(254,251,240) ;
  height: 100vh;
  user-select: text;
  >label{
    display: flex;
    height: 100px;
    text-align: center;
    flex-direction: row;
    align-items: center;
    padding-right: 15px;
    padding-left: 15px;
    flex-wrap: nowrap;
    font-size: 20px;
    background: #e0c9a6;
    border:1.5px solid black;
    margin-right: 50px;
    margin-left: 50px;
    margin-top: 30px;
    border-radius: 10px;
    box-shadow: inset -2px -2px 0px rgba(0,0,0,0.25);
    >input{
      font-size: inherit;
      overflow-x: hidden;
      height: 100%;
      margin-right: 5px;
      margin-left: 5px;
      background: none;
      border:none;
      max-width: 50%;
      user-select: text;
      -webkit-user-select: text;
    }
  }
  >div{
    margin-top: 50px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
  }
`
const ButtonBase = styled.button`
    width: 120px;
    height: 56px;
    border-radius: 16px;
    font-size: 20px;
    font-weight: bold;
    color: #fff;
    border: none;
    box-shadow: 2px 4px 0px rgba(200, 150, 150, 0.18);
    margin: 0 4px;
    transition: background 0.2s, box-shadow 0.2s;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
`;
export const AddButton = styled(ButtonBase)`
    background-color: #eba7b5;
    &:active { background: #e88393; }
`;
export const DeleteButton = styled(ButtonBase)`
    background-color: #e88383;
    &:active { background: #d94a4a; }
`;
export const PayTagEdit: React.FC = () => {
    const {findTag, updateTag, deleteTag} = useTags();
    let {id} = useParams<Params>();
    const tag = findTag(parseInt(id));
    const [inputValue, setInputValue] = React.useState(tag ? tag.name : "");
    if (tag) {
        // 统一输入框样式
        const inputStyle: React.CSSProperties = {
            fontSize: 20,
            border: '1.5px solid #e0c9a6',
            borderRadius: 8,
            padding: '10px 16px',
            background: '#faf8f4',
            color: '#7c5c36',
            fontWeight: 500,
            outline: 'none',
            width: 220,
            height: 44,
            boxSizing: 'border-box' as const,
            margin: 0,
            display: 'block',
        };
        return (
            <div style={{background: 'linear-gradient(135deg, #f7f4ed 70%, #e0c9a6 100%)', minHeight: '100vh'}}>
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
                    <Link to='/PayTagsSettings' style={{color: '#5a4322', display: 'flex', alignItems: 'center', fontSize: 22, textDecoration: 'none', marginLeft: 18, marginRight: 0, height: 56, minWidth: 36, borderRadius: 12, transition: 'background 0.2s'}}><Icon name='return' style={{width: 27, height: 27}} /></Link>
                    <div style={{flex: 1, textAlign: 'center', fontWeight: 600, fontSize: 20, letterSpacing: 1, marginRight: 36, userSelect: 'none'}}>
                        Edit {tag.name}
                    </div>
                </div>
                <label style={{display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '40px 0 0 0', fontSize: 18, fontWeight: 600, color: '#7c5c36'}}>
                    <span style={{marginRight: 10}}>Edit tag name:</span>
                    <input
                        type="text"
                        placeholder="Enter tag name"
                        value={inputValue}
                        onChange={e => setInputValue(e.target.value)}
                        style={inputStyle}
                    />
                </label>
                <div style={{marginTop: 40, display: 'flex', justifyContent: 'center', gap: 18}}>
                    <AddButton style={{height: 44, width: 120, fontSize: 20}} onClick={() => {
                        if (inputValue.trim() === tag.name || inputValue.trim() === '') {
                            window.alert('Please enter a new tag name');
                        } else {
                            updateTag(tag.id, tag.iconId, {name: inputValue.trim(), category: '-'});
                            window.alert('Tag updated successfully!');
                        }
                    }}>Save</AddButton>
                    <DeleteButton style={{height: 44, width: 120, fontSize: 20}} onClick={() => {
                        deleteTag(tag.id);
                        window.location.assign('./');
                    }}>Delete</DeleteButton>
                </div>
            </div>
        );
    } else {
        return (
            <div>
                <TopBar>
                    <Link to='/PayTagsSettings'><Icon name='return'></Icon></Link>
                    <span>Tag not found</span>
                </TopBar>
            </div>
        );
    }
}