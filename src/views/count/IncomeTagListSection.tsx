
import React from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../../components/Icon";
// import {Link} from "react-router-dom"; // 未使用，移除
// import classnames from 'classnames'; // 未使用，移除
import {TagListSection} from "./PayTagListSection";
import {useTags} from "../../hooks/useTags";

interface IncomeTagProps {
    children?:React.ReactNode | React.ReactNode[];
    value:number;
    onChange: (selected:number) => void;
}
const IncomeTagListSection: React.FC<IncomeTagProps> = (props:IncomeTagProps) => {
    const selectedTagId = props.value;
    const onToggleTag = (tagId:number) => {
        if (selectedTagId === tagId){
            props.onChange(0);
        }else {
            props.onChange(tagId)
        }
    }
    const {tags,IconMap} = useTags();
    const navigate = useNavigate();
    return(
        <TagListSection>
            <div>
            {tags.map(tag=>
                tag.category==='+' ? (
                    <li key={tag.id}
                        onClick={() => {onToggleTag(tag.id)}}
                        className={selectedTagId===tag.id ? 'selected': ''}
                    >
                        <span className="icon"><Icon name={IconMap[tag.iconId]?.name || 'cat'}/></span>
                        <span>{tag.name}</span>
                    </li>
                ) : null
            )}
            <li
                style={{display:'flex',alignItems:'center',cursor:'pointer'}}
                onClick={()=>navigate('/IncomeTagsSettings')}
            >
                <span className="icon"><Icon name="settings"/></span>
                <span>Settings</span>
            </li>
            </div>
        </TagListSection>
    );
}
export {IncomeTagListSection};
