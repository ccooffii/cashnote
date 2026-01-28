import Layout from "../components/Layout";
import React, {useState} from "react";
import styled from "styled-components";
import {CategorySection} from "./count/CategorySection";
import {NumberPadSection} from "./count/NumberPad";
import {PayTagsSection} from "./count/PayTagListSection";
import {useRecords} from "../hooks/useRecords";
import {IncomeTagListSection} from "./count/IncomeTagListSection";

export const MyLayout = styled(Layout)`
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
    min-height: 0;
    background: #fefbf0;
    .category-fixed {
        position: sticky;
        top: 0;
        z-index: 10;
        background: #fefbf0;
        box-shadow: 0 2px 6px -4px rgba(0,0,0,0.08);
    }
    .content-scroll {
        flex: 1 1 0;
        min-height: 0;
        overflow-y: auto;
        padding-bottom: 8px;
    }
`
const defaultFormData = {
    tagId: 0 as number,
    note: ''as string,
    category:'-' as ('-'|'+'),
    amount: 0 as number,
}
function Count() {
    const [selected,setSelected] = useState(defaultFormData)
    const onChange = (obj:Partial<typeof selected>) => {
        setSelected({
            ...selected,
            ...obj
        })
    }
    const {addRecord} = useRecords()
    const submit = () => {
        if(selected.amount === 0){
            return alert('Please enter an amount');
        }else if(selected.tagId===0){
            return alert('Please select a tag');
        }else {
            addRecord(selected)
            alert('Submitted successfully')
            setSelected(defaultFormData)
        }
    }
        return (
            <MyLayout>
                <div style={{height: '100%', minHeight: 0, display: 'flex', flexDirection: 'column'}}>
                    <div className="category-fixed">
                        <CategorySection
                            value={selected.category}
                            onChange={category => onChange({category})}
                        />
                    </div>
                    <div className="content-scroll" style={{flex: 1, minHeight: 0, overflowY: 'auto'}}>
                        {selected.category === '-' ? (
                            <PayTagsSection
                                idValue={selected.tagId}
                                idValueOnChange={tagId => onChange({tagId})}
                            />
                        ) : (
                            <IncomeTagListSection
                                value={selected.tagId}
                                onChange={tagId => onChange({tagId})}
                            />
                        )}
                    </div>
                    <NumberPadSection
                        className="number-pad-section"
                        noteValue={selected.note}
                        noteValueOnChange={note => onChange({note})}
                        padValue={selected.amount}
                        padValueOnChange={amount => onChange({amount})}
                        onOK={submit}
                    />
                </div>
            </MyLayout>
        );
}
export default Count;