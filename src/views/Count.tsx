import Layout from "../components/Layout";
import React, {useState} from "react";
import Alert from '../components/Alert';
import styled from "styled-components";
import {CategorySection} from "./count/CategorySection";
import {NumberPadSection} from "./count/NumberPad";
import {PayTagsSection} from "./count/PayTagListSection";
import {useRecords} from "../hooks/useRecords";
import {IncomeTagListSection} from "./count/IncomeTagListSection";

const StickyCategory = styled.div`
    position: sticky;
    top: 0;
    z-index: 10;
    background: #fefbf0;
    box-shadow: 0 2px 6px -4px rgba(0,0,0,0.08);
`;

const ContentWrapper = styled.div`
  flex: 1;
  overflow: auto;
  padding-bottom: 8px;
`;

function getDefaultFormData() {
    const lastCategory = window.localStorage.getItem('lastCategory');
    return {
        tagId: 0 as number,
        note: '' as string,
        category: lastCategory === '+' ? '+' : '-',
        amount: 0 as number,
    };
}
function Count() {
    const [selected, setSelected] = useState(getDefaultFormData())
    const onChange = (obj:Partial<typeof selected>) => {
        // Detect category change and write to localStorage
        if (obj.category && obj.category !== selected.category) {
            window.localStorage.setItem('lastCategory', obj.category);
        }
        setSelected({
            ...selected,
            ...obj
        })
    }
    const {addRecord} = useRecords()
    const [alert, setAlert] = useState<{open: boolean, message: string}>({open: false, message: ''});
    const submit = () => {
        if(selected.amount === 0){
            setAlert({open: true, message: 'Please enter an amount'});
            return;
        }else if(selected.tagId===0){
            setAlert({open: true, message: 'Please select a tag'});
            return;
        }else {
            addRecord(selected)
            setAlert({open: true, message: 'Submitted successfully'});
            setSelected(getDefaultFormData())
        }
    }
        return (
            <Layout>
                <Alert open={alert.open} message={alert.message} onClose={() => setAlert({open: false, message: ''})} />
                <StickyCategory>
                    <CategorySection
                        value={selected.category}
                        onChange={category => onChange({category})}
                    />
                </StickyCategory>
                <ContentWrapper>
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
                </ContentWrapper>
                <NumberPadSection
                    className="number-pad-section"
                    noteValue={selected.note}
                    noteValueOnChange={note => onChange({note})}
                    padValue={selected.amount}
                    padValueOnChange={amount => onChange({amount})}
                    onOK={submit}
                />
            </Layout>
        );
}
export default Count;