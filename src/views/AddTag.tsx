import {TagListSection} from "./count/PayTagListSection";
import {useTags} from "../hooks/useTags";
import Icon from "../components/Icon";
import styled from "styled-components";
import {Link} from "react-router-dom";
import React, {useRef, useState} from "react";
import {AddButton} from "./PayTagEdit";
const TagAddBox = styled.div`
  font-weight: bolder;
  display: flex;
  flex-direction: column;
  background-color:rgb(254,251,240) ;
  height: 100vh;
  user-select: text;
  -webkit-user-select: text;
  align-items: center;
  >button{
    margin-left: 60%;
    margin-top: 10px;
  }
`
export const TopBar = styled.header`
    background-color: rgb(246, 208, 164);
    height: 40px;
    box-shadow: inset -2px -2px 5px rgba(0, 0, 0, 0.25);
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
    overflow: hidden;
    padding-left: 10px;
    > a {
      > svg {
        height: 50px;
        width: 50px;
      }
    }   
    >span{
      margin-right: 50vw;
      font-size: 15px;
      transform: translateX(50%);
    }
`
export const SelectBox = styled.header`
  width: 330px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 20px 20px 0px 20px;
  font-size: 20px;
  >ul{
    display: flex;
    >li{
      margin-right: 5px;
      margin-left: 5px;
      color: grey;
    }
    .selected{
     color:rgb(246,50,50); 
    }
  }
`
export const InputBox = styled.header`
  width: 330px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 80px;
  margin: 0px 20px;
  border: 2px solid black;
  border-radius: 10px;
  padding-left: 10px;
  background-color: white;
  margin: 20px 20px;
  >input{
    height: 50%;
    font-size: 20px;
    background: none;
    border: none;
    -webkit-user-select:text !important;
  }
`
const TagSelectBox = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  background-color: rgb(254,251,240);
  align-content:flex-start;
  margin: 10px 20px;
  width: 330px;
  >span{
    margin-bottom: 15px;
  }
  >div {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-right: -12px;
    > li {
      background-color: rgb(246, 208, 160);
      width: 45px;
      height: 45px;
      margin-right: 20px;
      margin-bottom: 20px;
      border: 1.5px solid black;
      border-radius: 50%;
      display: flex;
      align-items: center;
      margin-right:12px;
      > svg {
        height: 25px;
      }
      &.selected {
        border: 3px solid rgb(246, 100, 100);
        background-color: rgb(246, 209, 181);
      }

      .icon {
        display: inline-block;
        margin-top: 2px;
        fill: none;
      }
    }
  }
`
export const AddTag = () => {
    const {IconMap,addPayTag} = useTags();
    const [category,setCategory] = useState<('-'|'+')>('-')
    const [categoryList] = useState<('-'|'+')[]>(['-','+'])
    const [tagName,setTagName] = useState('')
    const [selectedIconId,setSelectedIconId] = useState(-1)
    const onToggle = (iconId:number) => {
        if (iconId === selectedIconId){
            setSelectedIconId(-1)
        }else {
            setSelectedIconId(iconId)
        }
    }
    const myInput = useRef(null)
    const submit = () => {
        if(tagName===''){
          window.alert('Please enter a tag name')
        }else if(selectedIconId < 0){
          window.alert('Please select an icon')
        }else if(category!=='-'&&category!=='+'){
          window.alert('Please select a tag category')
        }else {
          addPayTag(tagName,selectedIconId,category)
          setTagName('')
          setSelectedIconId(-1)
          window.alert('Added successfully')
        }
    }
    return(
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
              <Link to='../' style={{color: '#5a4322', display: 'flex', alignItems: 'center', fontSize: 22, textDecoration: 'none', marginLeft: 18, marginRight: 0, height: 56, minWidth: 36, borderRadius: 12, transition: 'background 0.2s'}}><Icon name='return' style={{width: 27, height: 27}} /></Link>
              <div style={{flex: 1, textAlign: 'center', fontWeight: 600, fontSize: 20, letterSpacing: 1, marginRight: 36, userSelect: 'none'}}>
                  New Tag
              </div>
          </div>
          <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
           <SelectBox>
               <span>Add Custom Tag</span>
               <ul>
                   {categoryList.map(_category=>
                        <li key = {_category}
                            className={_category === category ? 'selected':''}
                            onClick={()=>setCategory(_category)}
                        >{_category==='-'?'Spend':'Income'}
                        </li>
                   )}
               </ul>
           </SelectBox>
            <InputBox>
                <span>Custom Tag Name</span>
                <input
                    placeholder="Enter a tag name"
                    type="text"
                    ref={myInput}
                    value={tagName}
                    onChange={(e)=>{setTagName(e.target.value)}}
                />
            </InputBox>
            <TagSelectBox>
                <span>Please select an icon</span>
               <div>
                   {IconMap.map(
                       item=><li
                                key={item.id}
                                onClick={()=>{onToggle(item.id)}}
                                className={selectedIconId===item.id ? 'selected': ''}
                            >
                           <Icon name={item.name}></Icon>
                       </li>
                   )}
               </div>
            </TagSelectBox>
            <div style={{display:'flex',justifyContent:'center',marginBottom:'20px'}}>
              <AddButton onClick={()=>submit()}>Save</AddButton>
            </div>
          </div>
        </div>
   )
}