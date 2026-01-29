import React from "react";
import {Link, useNavigate} from "react-router-dom";
import Icon from "../components/Icon";
import {useTags} from "../hooks/useTags";
import {AddTagBar, Container, TagsList} from "./PayTagsSettings";


export function IncomeTagsSettings() {
    const {tags, IconMap} = useTags();
    const navigate = useNavigate();
    return (
        <Container style={{position: 'relative'}}>
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
                        window.localStorage.setItem('lastCategory', '+');
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
                {tags.filter(tag => tag.category === '+').map(tag => (
                    <li key={tag.id}>
                        <Link to={'/IncomeTagsSettings/' + tag.id}>
                            <Icon name={IconMap[tag.iconId]?.name || 'cat'} />
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