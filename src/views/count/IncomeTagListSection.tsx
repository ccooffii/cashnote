
import React from "react";
import Icon from "../../components/Icon";
import {Link} from "react-router-dom";
import classnames from 'classnames';
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
            <Link to='/IncomeTagsSettings'>
                <span className="icon"><Icon name="settings"/></span>
                <span>Settings</span>
            </Link>
            </div>
        </TagListSection>
    );
}
export {IncomeTagListSection};
