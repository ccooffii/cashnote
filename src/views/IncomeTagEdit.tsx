import {useTags} from "../hooks/useTags";
import {Link, useParams} from "react-router-dom";
import React from "react";
import Icon from "../components/Icon";
import {AddButton, DeleteButton, EditWrapper, Params} from "./PayTagEdit";
import {TopBar} from "./AddTag";
export const IncomeTagEdit: React.FC = () => {
    const {findTag, updateTag, deleteTag} = useTags();
    let {id} = useParams<Params>();
    const tag = findTag(parseInt(id));
    const [inputValue, setInputValue] = React.useState(tag ? tag.name : "");
    if (tag) {
        return (
            <EditWrapper>
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
                    <Link to='/IncomeTagsSettings' style={{color: '#5a4322', display: 'flex', alignItems: 'center', fontSize: 22, textDecoration: 'none', marginLeft: 18, marginRight: 0, height: 56, minWidth: 36, borderRadius: 12, transition: 'background 0.2s'}}><Icon name='return' style={{width: 27, height: 27}} /></Link>
                    <div style={{flex: 1, textAlign: 'center', fontWeight: 600, fontSize: 20, letterSpacing: 1, marginRight: 36, userSelect: 'none'}}>
                        Edit Tag
                    </div>
                </div>
                <label style={{display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '40px 0 0 0', fontSize: 18, fontWeight: 600, color: '#7c5c36'}}>
                    <span style={{marginRight: 10}}>Edit tag name:</span>
                    <input
                        type="text"
                        placeholder="Enter tag name"
                        value={inputValue}
                        onChange={e => setInputValue(e.target.value)}
                        style={{
                            fontSize: 18,
                            border: '1.5px solid #e0c9a6',
                            borderRadius: 8,
                            padding: '6px 12px',
                            background: '#faf8f4',
                            color: '#7c5c36',
                            fontWeight: 500,
                            outline: 'none',
                            minWidth: 120,
                            maxWidth: 180,
                        }}
                    />
                </label>
                <div style={{marginTop: 40, display: 'flex', justifyContent: 'center', gap: 18}}>
                    <AddButton onClick={() => {
                        if (inputValue.trim() === tag.name || inputValue.trim() === '') {
                            window.alert('Please enter a new tag name');
                        } else {
                            updateTag(tag.id, tag.iconId, {name: inputValue.trim(), category: '+'});
                            window.alert('Tag updated successfully!');
                        }
                    }}>Save</AddButton>
                    <DeleteButton onClick={() => {
                        deleteTag(tag.id);
                        window.location.assign('./');
                    }}>Delete</DeleteButton>
                </div>
            </EditWrapper>
        );
    } else {
        return (
            <EditWrapper>
                <TopBar>
                    <Link to='/IncomeTagsSettings'><Icon name='return'></Icon></Link>
                    <span>Tag not found</span>
                </TopBar>
            </EditWrapper>
        );
    }
}