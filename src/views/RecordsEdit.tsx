import {Link, useParams} from "react-router-dom";
import React, {useEffect, useLayoutEffect, useRef, useState} from "react";
import styled from "styled-components";
import {TopBar} from "./AddTag";
import Icon from "../components/Icon";
import {useRecords} from "../hooks/useRecords";
import {useTags} from "../hooks/useTags";
import {useDate} from "../hooks/useDate";
import {AddButton, DeleteButton} from "./PayTagEdit";
import {set} from "lodash";
type Params = {
    id:any
}

// Prevent scroll on html/body for this page
if (typeof document !== 'undefined') {
    document.documentElement.style.overflowY = 'hidden';
    document.body.style.overflowY = 'hidden';
}
export const CategorySelectBox = styled.ul`
    display: flex;
    >li{
      margin-right: 10px;
      color: darkgrey;
    }
    .selected{
      color:black;
      border-bottom: 2px solid rgb(246,50,50);
    }
`

export const RecordsEdit:React.FC = () => {
    const {id} = useParams<Params>();
    const {getName,findTag,IconMap} = useTags();
    const {findRecord,deleteRecord,updateRecord} = useRecords()
    const {findDay} = useDate()
    let record = findRecord(parseInt(id))
    const [category,setCategory] = useState<('-'|'+')>('-')
    const [categoryList] = useState<('-'|'+')[]>(['-','+'])
    const [newAmount,setNewAmount] = useState(0)
    const [newNote,setNewNote] = useState('')
    const [newDate, setNewDate] = useState(record ? record.createdAt : '')
    const count = useRef(0);
    useEffect(() => {
        count.current += 1;
    })
    useEffect(() => {
        if (count.current > 1 && record) {
            setNewAmount(record.amount);
            setCategory(record.category);
            setNewNote(record.note);
            setNewDate(record.createdAt);
        }
    }, [record]);
    const submit = () => {
        if(newAmount === 0){
            window.alert('Please enter a new amount')
            return;
        }else if(category!=='-'&&category!=='+') {
            window.alert('Please select a category')
        }else {
            // update createdAt field directly before calling updateRecord
            record.createdAt = newDate;
            updateRecord(record.recordId,category,newAmount,newNote)
            window.alert('Record updated successfully!')
        }
    }
    if(record){
        // Always show tag name for custom and built-in tags
        let tag = findTag(record.tagId);
        let tagLabel = tag ? tag.name : 'Unknown';
        let iconName = 'cat';
        if (tag && IconMap[tag.iconId]) {
            iconName = IconMap[tag.iconId].name || 'cat';
        }
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
                    <Link to='/statistics' style={{color: '#5a4322', display: 'flex', alignItems: 'center', fontSize: 22, textDecoration: 'none', marginLeft: 18, marginRight: 0, height: 56, minWidth: 36, borderRadius: 12, transition: 'background 0.2s'}}>
                        <Icon name='return' style={{width: 22, height: 22}} />
                    </Link>
                    <div style={{flex: 1, textAlign: 'center', fontWeight: 600, fontSize: 20, letterSpacing: 1, marginRight: 36, userSelect: 'none'}}>
                        Record Details
                    </div>
                </div>
                <div style={{
                    background: '#f7f4ed',
                    borderRadius: 18,
                    boxShadow: '0 6px 32px 0 rgba(224,201,166,0.18)',
                    margin: '32px 12px 0 12px',
                    padding: '32px 20px 22px 20px',
                    maxWidth: 360,
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    position: 'relative',
                }}>
                    <div style={{display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24}}>
                        <div style={{width: 44, height: 44, borderRadius: '50%', background: '#f6d0a0', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px #f6d0a0'}}>
                            <Icon name={iconName} style={{width: 32, height: 32, fontSize: 32}}/>
                        </div>
                        <span style={{fontWeight: 700, fontSize: 22, color: '#7c5c36', letterSpacing: 1}}>{tagLabel}</span>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 10}}>
                        <div style={{display: 'flex', alignItems: 'center'}}>
                            <span style={{color: '#bfa16a', width: 70, fontWeight: 600, fontSize: 15}}>Type</span>
                            <span style={{fontWeight: 600, color: '#222', fontSize: 15}}>{category === '-' ? 'Spend' : 'Income'}</span>
                        </div>
                        <div style={{display: 'flex', alignItems: 'center'}}>
                            <span style={{color: '#bfa16a', width: 70, fontWeight: 600, fontSize: 15}}>Amount</span>
                            <input
                                type="number"
                                min="0"
                                step="0.01"
                                style={{
                                    color: '#d94a4a',
                                    fontWeight: 700,
                                    fontSize: 18,
                                    letterSpacing: 1,
                                    border: '1.5px solid #e0c9a6',
                                    borderRadius: 8,
                                    padding: '4px 10px',
                                    width: 120,
                                    background: '#faf8f4',
                                    outline: 'none',
                                    marginLeft: 0,
                                    marginRight: 0,
                                    transition: 'border 0.2s',
                                }}
                                value={newAmount === 0 ? '' : newAmount}
                                onChange={e => {
                                    let val = e.target.value.replace(/[^\d.]/g, '');
                                    if (val === '' || Number(val) < 0) {
                                        setNewAmount(0);
                                    } else {
                                        setNewAmount(Number(val));
                                    }
                                }}
                            />
                        </div>
                        <div style={{display: 'flex', alignItems: 'center'}}>
                            <span style={{color: '#bfa16a', width: 70, fontWeight: 600, fontSize: 15}}>Date</span>
                            <input
                                type="date"
                                style={{
                                    color: '#444',
                                    fontWeight: 500,
                                    fontSize: 15,
                                    border: '1.5px solid #e0c9a6',
                                    borderRadius: 8,
                                    padding: '4px 10px',
                                    width: 140,
                                    background: '#faf8f4',
                                    outline: 'none',
                                    marginLeft: 0,
                                    marginRight: 0,
                                    transition: 'border 0.2s',
                                }}
                                value={newDate}
                                max={new Date().toISOString().split('T')[0]}
                                onChange={e => setNewDate(e.target.value)}
                                readOnly={false}
                            />
                        </div>
                        <div style={{display: 'flex', alignItems: 'center'}}>
                            <span style={{color: '#bfa16a', width: 70, fontWeight: 600, fontSize: 15}}>Note</span>
                            <input
                                style={{
                                    color: '#444',
                                    fontSize: 15,
                                    border: '1.5px solid #e0c9a6',
                                    borderRadius: 8,
                                    padding: '4px 10px',
                                    marginLeft: 0,
                                    width: 160,
                                    fontWeight: 500,
                                    background: '#faf8f4',
                                    outline: 'none',
                                    transition: 'border 0.2s',
                                }}
                                value={newNote}
                                placeholder={record.note || '-'}
                                onChange={e => setNewNote(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <div style={{marginTop: 18, display: 'flex', justifyContent: 'space-between', maxWidth: 320, marginLeft: 'auto', marginRight: 'auto', gap: 10}}>
                    <button
                        style={{background: '#e0c9a6', color: '#fff', fontWeight: 600, fontSize: 14, borderRadius: 7, boxShadow: '0 2px 8px #e0c9a6', border: 'none', padding: '7px 0', cursor: 'pointer', flex: 1, letterSpacing: 1}}
                        onClick={()=>submit()}
                    >
                        Save Changes
                    </button>
                    <button
                        style={{background: '#d94a4a', color: '#fff', fontWeight: 600, fontSize: 14, borderRadius: 7, boxShadow: '0 2px 8px #d94a4a', border: 'none', padding: '7px 0', cursor: 'pointer', flex: 1, letterSpacing: 1}}
                        onClick={() => {
                            deleteRecord(record.recordId);
                            window.alert('Record deleted successfully!');
                            window.location.replace('/statistics');
                        }}
                    >
                        Delete Record
                    </button>
                </div>
            </div>
        );
    } else {
        // Beautified fallback for missing record
        return (
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', background: '#fefbf0'}}>
                <div style={{
                    background: 'white',
                    borderRadius: '18px',
                    boxShadow: '0 4px 24px 0 rgba(217,74,74,0.10), 0 1.5px 0 #e88393',
                    padding: '48px 32px 32px 32px',
                    minWidth: '320px',
                    maxWidth: '90vw',
                    textAlign: 'center',
                    marginTop: '-10vh',
                    position: 'relative'
                }}>
                    <div style={{
                        width: 60, height: 60, borderRadius: '50%', background: '#f6d0a0',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        margin: '0 auto 18px auto', boxShadow: '0 2px 8px #f6d0a0'
                    }}>
                        <svg width="36" height="36" fill="#d94a4a" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"/></svg>
                    </div>
                    <div style={{fontWeight: 'bold', fontSize: 22, color: '#d94a4a', marginBottom: 8}}>
                        Record Not Found
                    </div>
                    <div style={{color: '#888', fontSize: 16, marginBottom: 24}}>
                        This record was already deleted or does not exist.<br/>
                        You will be redirected shortly.
                    </div>
                    <a href="/statistics" style={{
                        display: 'inline-block',
                        background: 'linear-gradient(90deg, #f6d0a0 0%, #e88393 100%)',
                        color: '#fff',
                        fontWeight: 'bold',
                        borderRadius: '12px',
                        padding: '10px 32px',
                        textDecoration: 'none',
                        fontSize: 18,
                        boxShadow: '0 2px 8px #e88393',
                        marginTop: 8
                    }}>Back to Statistics</a>
                </div>
            </div>
        );
    }
}