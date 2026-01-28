import {useEffect, useRef, useState} from "react";
import {createId} from "../lib/createId";
const useTags =() => {
    const [Tags, setTags] = useState<{ id:number;name:string;category:('+'|'-');iconId:number}[]>([]);
    useEffect(()=>{
        let localTags = JSON.parse(window.localStorage.getItem('tags')||'[]')
        if(localTags.length === 0){
            localTags = [
                {id:createId(),name:'Food',category:'-',iconId:0},
                {id:createId(),name:'Rent',category:'-',iconId:1},
                {id:createId(),name:'Clothes',category:'-',iconId:2},
                {id:createId(),name:'Entertainment',category:'-',iconId:3},
                {id:createId(),name:'Travel',category:'-',iconId:4},
                {id:createId(),name:'Beauty',category:'-',iconId:5},
                {id:createId(),name:'Car',category:'-',iconId:6},
                {id:createId(),name:'Drink',category:'-',iconId:7},
                {id:createId(),name:'Pet',category:'-',iconId:8},
                {id:createId(),name:'Shopping',category:'-',iconId:9},
                {id:createId(),name:'Vacation',category:'-',iconId:10},
                {id:createId(),name:'Medical',category:'-',iconId:11},
                {id:createId(),name:'Salary',category:'+',iconId:12},
                {id:createId(),name:'Bonus',category:'+',iconId:13},
                {id:createId(),name:'Part-time',category:'+',iconId:14},
                {id:createId(),name:'Investment',category:'+',iconId:15},
                {id:createId(),name:'Transfer',category:'+',iconId:16},
            ]
        }
        setTags(localTags)
    },[])
    const count = useRef(0);
    useEffect(() =>{
        count.current += 1;
        }
    )
    useEffect(()=>{
        if(count.current > 1){
            window.localStorage.setItem('tags',JSON.stringify(Tags))
        }
    },[Tags])
    const IconMap:{id:number;name:string; label:string}[] =[
        {id:0, name:'food', label:'Food'},
        {id:1, name:'rent', label:'Rent'},
        {id:2, name:'clothes', label:'Clothes'},
        {id:3, name:'entertainment', label:'Entertainment'},
        {id:4, name:'travel', label:'Travel'},
        {id:5, name:'beauty', label:'Beauty'},
        {id:6, name:'car', label:'Car'},
        {id:7, name:'drink', label:'Drink'},
        {id:8, name:'pet', label:'Pet'},
        {id:9, name:'shopping', label:'Shopping'},
        {id:10, name:'vacation', label:'Vacation'},
        {id:11, name:'medical', label:'Medical'},
        {id:12, name:'salary', label:'Salary'},
        {id:13, name:'bonus', label:'Bonus'},
        {id:14, name:'parttime', label:'Part-time'},
        {id:15, name:'investment', label:'Investment'},
        {id:16, name:'transfer', label:'Transfer'}
    ];
    const findTag = (id:number) => Tags.filter(tag => tag.id === id)[0];
    const findTagIndex = (id:number) => {
        let result = -1;
        for(let i=0; i<Tags.length; i++) {
            if(Tags[i].id === id){
                result = i;
                break;
            }
        }
        return result;
    }
    const updateTag = (id:number,iconId:number,obj:{name:string;category:('+'|'-')}) => {
        setTags(Tags.map(tag => {
            if(tag.id === id){
                return {id:id,name:obj.name,category:obj.category,iconId:iconId};
            }else {
                return tag;
            }
        }))
    }
    const deleteTag = (id:number) => {
        setTags(Tags.filter(tag=>tag.id !== id))
    }
    const addTag = (name:string, iconId:number, category:'-'|'+') => {
        setTags([...Tags,{id:createId(),name:name,category:category,iconId:iconId}]);
    }
    const getName = (id:number) => {
        const tag = Tags.filter(tag=>tag.id===id)[0]
        if(tag){
            return tag.name
        }else {
            return ''
        }
    }
    return{tags: Tags,IconMap,getName,setTags,addPayTag: addTag,updateTag,findTag,findTagIndex,deleteTag}
}
export {useTags};