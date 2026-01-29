import React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Icon from '../components/Icon';
import Alert from '../components/Alert';
import { useTags } from '../hooks/useTags';
import styled from 'styled-components';

const EditWrapper = styled.div`
  font-weight: bolder;
  display: flex;
  flex-direction: column;
  background-color:rgb(254,251,240) ;
  height: 100vh;
  user-select: text;
`;
const AddButton = styled.button`
  background-color: rgba(232,130,148,0.7);
  padding: 8px;
  border-radius: 14px;
  color: white;
  font-weight: bolder;
  text-align: center;
  width: 100px;
  height: 50px;
  font-size: 20px;
  border:none;
  box-shadow: inset -2px -3px 0px rgba(0,0,0,0.25);
`;
const DeleteButton = styled.button`
  background-color: rgba(232,50,40,0.7);
  border:none;
  padding: 8px;
  border-radius: 14px;
  color: white;
  font-weight: bolder;
  width: 100px;
  height: 50px;
  font-size: 20px;
  text-align: center;
  box-shadow: inset -2px -3px 0px rgba(0,0,0,0.25);
`;

export type TagEditProps = {
  category: '+' | '-';
  settingsPath: string;
};

export const TagEdit: React.FC<TagEditProps> = ({ category, settingsPath }) => {
  const { findTag, updateTag, deleteTag } = useTags();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const tag = findTag(parseInt(id));
  const [inputValue, setInputValue] = React.useState(tag ? tag.name : '');
  const [alert, setAlert] = React.useState<{ open: boolean; message: string }>({ open: false, message: '' });

  React.useEffect(() => {
    setInputValue(tag ? tag.name : '');
  }, [tag]);

  if (!tag || tag.category !== category) {
    return (
      <EditWrapper>
        <div style={{ padding: 32, textAlign: 'center', color: '#7c5c36', fontWeight: 600 }}>
          <Link to={settingsPath} style={{ color: '#5a4322', textDecoration: 'none', fontSize: 18 }}>
            <Icon name="return" style={{ width: 24, height: 24, marginRight: 8 }} />
            Back
          </Link>
          <div style={{ marginTop: 24 }}>Tag not found or category mismatch.</div>
        </div>
      </EditWrapper>
    );
  }

  return (
    <EditWrapper>
      <Alert open={alert.open} message={alert.message} onClose={() => setAlert({ open: false, message: '' })} />
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
        <Link to={settingsPath} style={{ color: '#5a4322', display: 'flex', alignItems: 'center', fontSize: 22, textDecoration: 'none', marginLeft: 18, marginRight: 0, height: 56, minWidth: 36, borderRadius: 12, transition: 'background 0.2s' }}>
          <Icon name="return" style={{ width: 27, height: 27 }} />
        </Link>
        <div style={{ flex: 1, textAlign: 'center', fontWeight: 600, fontSize: 20, letterSpacing: 1, marginRight: 36, userSelect: 'none' }}>
          Edit Tag
        </div>
      </div>
      <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '40px 0 0 0', fontSize: 18, fontWeight: 600, color: '#7c5c36' }}>
        <span style={{ marginRight: 10 }}>Edit tag name:</span>
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
      <div style={{ marginTop: 40, display: 'flex', justifyContent: 'center', gap: 18 }}>
        <AddButton onClick={() => {
          if (inputValue.trim() === tag.name || inputValue.trim() === '') {
            setAlert({ open: true, message: 'Please enter a new tag name' });
          } else {
            updateTag(tag.id, tag.iconId, { name: inputValue.trim(), category });
            setAlert({ open: true, message: 'Tag updated successfully!' });
            setTimeout(() => navigate(settingsPath), 800);
          }
        }}>Save</AddButton>
        <DeleteButton onClick={() => {
          deleteTag(tag.id);
          navigate(settingsPath);
        }}>Delete</DeleteButton>
      </div>
    </EditWrapper>
  );
};
