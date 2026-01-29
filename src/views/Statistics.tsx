
import Layout from "../components/Layout";
import React from "react";
import styled from "styled-components";
import {RecordItem, useRecords} from "../hooks/useRecords";
import {useTags} from "../hooks/useTags";
import Icon from "../components/Icon";
import {useDate} from "../hooks/useDate";
import {Link} from "react-router-dom";

const StatisticsMain = styled.div`
  background: linear-gradient(135deg, #fefbf0 70%, #f6d0a0 100%);
  min-height: 100vh;
  .sticky-header {
    background: #f6d0a0;
    height: 46px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 22px;
    letter-spacing: 1.5px;
    color: #b85c38;
    box-shadow: 0 2px 8px 0 rgba(246,208,160,0.10);
    border-bottom: 1.5px solid #e88393;
    position: sticky;
    top: 0;
    z-index: 20;
  }
  .day-group {
    margin-bottom: 16px;
    padding: 0 8px;
  }
  .day-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 15px;
    color: #b85c38;
    margin-bottom: 6px;
    font-weight: bold;
    padding: 0 2px;
  }
  .record-list {
    display: flex;
    flex-direction: column;
    gap: 7px;
  }
  .record-card {
    display: flex;
    align-items: center;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 2px 8px 0 rgba(246,208,160,0.10);
    padding: 7px 12px;
    min-height: 36px;
    border: 1px solid #f6d0a0;
    transition: box-shadow 0.2s;
    &:hover {
      box-shadow: 0 4px 12px rgba(246,208,160,0.13);
      border-color: #e88393;
    }
    .icon {
      padding: 0.5px;
      width: 20px;
      height: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #fefbf0;
      border-radius: 50%;
      box-shadow: 0 1px 4px #f6d0a0;
    }
    .info {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-left: 12px;
      gap: 1px;
      font-size: 15px;
      color: #222;
      font-weight: 500;
      .note {
        color: #888;
        font-size: 12px;
        margin-top: 1px;
      }
    }
    .amount {
      text-align: right;
      min-width: 60px;
      font-weight: bold;
      color: #b85c38;
      font-size: 15px;
      letter-spacing: 0.5px;
    }
  }
`;

const Statistics = () => {
  const {records} = useRecords();
  const {IconMap, getName, findTag} = useTags();
  const {findToday, findDay} = useDate();
  // Group by day
  const hashDay: {[date: string]: RecordItem[]} = {};
  records.forEach(record => {
    const key = findDay(record.createdAt);
    if (!hashDay[key]) hashDay[key] = [];
    hashDay[key].push(record);
  });
  const array: [string, RecordItem[]][] = Object.entries(hashDay).sort((a, b) => b[0].localeCompare(a[0]));
  const getAmount = (date: string) => {
    let amount = 0;
    (hashDay[date] || []).forEach(record => {
      amount += record.category === '+' ? record.amount : -record.amount;
    });
    return amount;
  };

  return (
    <StatisticsMain>
      <div className="sticky-header">Bill Details</div>
      <div style={{flex: 1, overflowY: 'auto', minHeight: 0, paddingBottom: 60}}>
        {array.length === 0 && (
          <div style={{
            textAlign: 'center',
            color: '#e88393',
            marginTop: 60,
            fontWeight: 'bold',
            fontSize: 22,
            letterSpacing: 1.5
          }}>
            No details yet
          </div>
        )}
        {array.map(([date, records]) => (
          <div className="day-group" key={date}>
            <div className="day-header">
              <span>{date} {findToday(date) === '周一' ? 'Mon' : findToday(date) === '周二' ? 'Tue' : findToday(date) === '周三' ? 'Wed' : findToday(date) === '周四' ? 'Thu' : findToday(date) === '周五' ? 'Fri' : findToday(date) === '周六' ? 'Sat' : findToday(date) === '周日' ? 'Sun' : ''}</span>
              <span>{getAmount(date) >= 0 ? `Income: $${getAmount(date)}` : `Spend: $${-getAmount(date)}`}</span>
            </div>
            <div className="record-list">
              {records.map(record => {
                let tag = findTag(record.tagId);
                let iconName = 'cat';
                let tagName = tag ? tag.name : 'Unknown';
                if (tag && IconMap[tag.iconId]) {
                  iconName = IconMap[tag.iconId].name || 'cat';
                }
                return (
                  <Link to={'/recordsEdit/' + record.recordId} key={record.recordId} style={{textDecoration: 'none'}}>
                    <div className="record-card">
                      <div className="icon"><Icon name={iconName} /></div>
                      <div className="info">
                        <span>{tagName}</span>
                        {record.note && <span className="note">{record.note}</span>}
                      </div>
                      <div className="amount">
                        {record.category === '-' ? 'Spend ' : 'Income '}
                        ${record.amount}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </StatisticsMain>
  );
};

export default Statistics;