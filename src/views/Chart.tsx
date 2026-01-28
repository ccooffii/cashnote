import Layout from "../components/Layout";
import React, {useEffect, useRef, useState} from "react";
import * as echarts from 'echarts'
import styled from "styled-components";
import {RecordItem, useRecords} from "../hooks/useRecords";
import {useDate} from "../hooks/useDate";
import {TopBar} from "./AddTag";
import {useTags} from "../hooks/useTags";
import _ from 'lodash'
import day from 'dayjs'
import {CategorySelectBox} from "./RecordsEdit";
const TableBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 10px;
    >div{
            >h3{
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding-bottom: 5px;
                border-bottom: 2px solid black;
                margin-top: 5px;
                margin-left: 5px;
                line-height: 1.2;
                min-height: 40px;
                font-size: 1.15rem;
                font-family: 'Segoe UI', Arial, sans-serif;
                font-weight: 700;
                overflow: visible;
                >span{
                    overflow: visible;
                }
                ul {
                    display: flex;
                    align-items: center;
                    margin-left: 0px;
                      gap: 1px;
                    li {
                        font-size: 0.8rem;
                        font-family: inherit;
                        font-weight: 700;
                        min-width: 60px;
                        max-width: 120px;
                        text-align: center;
                        margin-right: 2px;
                        color: #bbb;
                        cursor: pointer;
                        padding: 0 6px 2px 6px;
                        letter-spacing: 0.5px;
                        white-space: nowrap;
                        overflow: visible;
                        text-overflow: unset;
                        transition: color 0.2s, border-bottom 0.2s;
                        border-radius: 6px;
                        &.selected {
                            color: #222;
                            border-bottom: 2.5px solid #d94a4a;
                            background: none;
                        }
                    }
                }
            }
    }
`
const OverViewBox = styled.div`
  border: 2px solid black;
  border-radius: 10px;
  margin-bottom: 10px;
  height: auto;
  >div{
    height: 50px;
  }
`
const  LineBox = styled.div`
  border: 2px solid black;
  border-radius: 10px;
  margin-bottom: 10px;
  height: auto;
  >div{
    height: 150px;
    width: 100%;
  }
`
const PieBox = styled.div`
  border: 2px solid black;
  border-radius: 10px;
  margin-bottom: 10px;
  height: auto;
  >div{
    height: 150px;
    width: 100%;
  }
`
const MyTopBar = styled(TopBar)`
    background: #f6d0a0;
    height: 46px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 22px;
    letter-spacing: 1.5px;
    color: #b85c38;
    // border-radius: 0 0 12px 12px;
    box-shadow: 0 2px 8px 0 rgba(246,208,160,0.10);
    margin-bottom: 12px;
    border-bottom: 1.5px solid #e88393;
`
function Chart() {
    const line = useRef<any>(null)
    const bar = useRef<any>(null)
    const pie = useRef<any>(null)
    const [category,setCategory] = useState<('-'|'+')>('-')
    const [categoryList] = useState<('-'|'+')[]>(['-','+'])
    const [newCategory,setNewCategory] = useState<('-'|'+')>('-')
    const [newCategoryList] = useState<('-'|'+')[]>(['-','+'])
    const {findDay} = useDate()
    const {records} = useRecords()
    const {getName} = useTags()
    const today = new Date()
    const payArray = []
    const incomeArray = []
    for(let i=0;i<7;i++){
        const date = findDay(day(today).subtract(i,'day').toISOString())
        payArray.push({
            date:date,
            value:_.filter(records,{
                createdAt:date,
                category:'-'
            }).map(record=>{
                return record.amount
            }).reduce((sum,item)=>{
                return sum + item
            },0)
        })
    }
    for(let i=0;i<7;i++){
        const date = findDay(day(today).subtract(i,'day').toISOString())
        incomeArray.push({
            date:date,
            value:_.filter(records,{
                createdAt:date,
                category:'+'
            }).map(record=>{
                return record.amount
            }).reduce((sum,item)=>{
                return sum + item
            },0)
        })
    }
    const payHashTag: {[tag:string]:number} = {};
    records.map(record => {
        if(record.category==='-') {
            let key = getName(record.tagId)
            if(!(key in payHashTag)){
                payHashTag[key] = 0
            }
            payHashTag[key] += record.amount
        }
    })
    const piePayData:any = []
    let tempArr1 = Object.keys(payHashTag)
    let tempArr2 = Object.values(payHashTag)
    for(let i=0;i <tempArr1.length;i++){
        piePayData.push({
            name:tempArr1[i],
            value:tempArr2[i]
        })
    }
    const incomeHashTag: {[tag:string]:number} = {};
    records.map(record => {
        if(record.category==='+') {
            let key = getName(record.tagId)
            if(!(key in incomeHashTag)){
                incomeHashTag[key] = 0
            }
            incomeHashTag[key] += record.amount
        }
    })
    let tempArr3 = Object.keys(incomeHashTag)
    let tempArr4 = Object.values(incomeHashTag)
    const pieIncomeData:any = []
    for(let i=0;i <tempArr3.length;i++){
        pieIncomeData.push({
            name:tempArr3[i],
            value:tempArr4[i]
        })
    }
    const weekCost:number = payArray.reduce((sum:number,item)=>{
      return  sum + item.value
    },0)
    const weekIncome:number = incomeArray.reduce((sum:number,item)=>{
        return  sum + item.value
    },0)
    payArray.sort((a,b)=>{
        if(a.date>b.date) {
            return 1
        }else if(a.date === b.date){
            return 0
        }else {
            return -1
        }
    })
    incomeArray.sort((a,b)=>{
        if(a.date>b.date) {
            return 1
        }else if(a.date === b.date){
            return 0
        }else {
            return -1
        }
    })
    const payLineKey = payArray.map(item=>item.date)
    const payLineValue = payArray.map(item=>item.value)
    const incomeLineKey = incomeArray.map(item=>item.date)
    const incomeLineValue = incomeArray.map(item=>item.value)
    const linePayOption = {
        grid:{
                left:0,
                right:0,
                top:10,
                bottom:20,
        },
        xAxis: {
            type: 'category',
                data: payLineKey,
                axisTick:{
                alignWithLabel:true,
            },
            axisLabel:{
                formatter:function (value:string,index:number){
                    return value.substr(5)
                }
            }
        },
        yAxis: {
            type: 'value',
                show:false,
        },
        tooltip:{
            show:true,
                triggerOn:'click'
        },
        series: [
            {
                symbolSize:12,
                symbol: 'circle',
                data: payLineValue,
                type: 'line',
                color:'rgb(232,131,147)',
                itemStyle: {
                    normal: {
                        color: "rgb(246,208,110)",
                        lineStyle: {
                            color: "rgb(232,131,147)"
                        }
                    },
                }
            },
        ]
    }
    const lineIncomeOption = {
        xAxis: {
            data: incomeLineKey,
        },
        series: [
            {
                data: incomeLineValue,
            }
        ]
    }
    const piePayOption = {
        tooltip:{
            trigger: 'item'
        },
        legend: {
            orient: 'vertical',
            left: 5,
            top:'middle',
            itemWidth:5,
            itemHeight:5,
            itemGap:2,
        },
        series: [
            {
                name: '',
                type: 'pie',
                radius: '60%',
                data: piePayData,
                label:{
                    position:'outside'
                },
                labelLine:{
                    length:10,
                    length2:10,
                },
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                },
                left:'30%',
                top:'5%'
            }
        ]
    }
    const pieIncomeOption = {series: [{data: pieIncomeData,}]}
    useEffect(()=>{
        let lineChart = echarts.init(line.current)
        let barChart = echarts.init(bar.current)
        let pieChart = echarts.init(pie.current)
        if(category==='-'){
            lineChart.setOption(linePayOption)
        }else if(category==='+'){
            lineChart.setOption(lineIncomeOption)
        }
        if(newCategory==='-'){
            pieChart.setOption(piePayOption)
        }else if(newCategory==='+'){
            pieChart.setOption(pieIncomeOption)
        }
        barChart.setOption({
                grid: {
                    top:0,
                    left:10,
                    right:50,
                    bottom:0,
                },
                xAxis: {
                    type: 'value',
                    show:false,
                },
                yAxis: {
                    type: 'category',
                    show:false,
                },
                series: [
                    {
                        type: 'bar',
                        data: [weekIncome],
                        barGap:0,
                        barWidth:20,
                        color:'rgb(246,209,105)',
                        label:{
                            show:true,
                            position:`right`,
                        }
                    },
                    {
                        type: 'bar',
                        data: [weekCost],
                        barWidth:20,
                        barGap:0,
                        color:'rgb(232,131,147)',
                        label:{
                            show:true,
                            position:`right`,
                        }
                    },

                ]
        })
    })
    return (
        <Layout>
            <MyTopBar>
               Analysis
            </MyTopBar>
            <TableBox>
                <OverViewBox>
                    <h3>Last 7 Days Overview: <span style={{fontWeight:600}}>{(weekIncome-weekCost)>0?`Income: ￥${weekIncome-weekCost}`:`Spend: ￥${-(weekIncome-weekCost)}`}</span></h3>
                    <div ref={bar}></div>
                </OverViewBox>
                <LineBox>
                    <h3>Last 7 Days Trend:
                        <CategorySelectBox>
                            {categoryList.map(_category=>
                                <li key={_category}
                                    className={_category === category ? 'selected':''}
                                    onClick={()=> {
                                        setCategory(_category)
                                    }}
                                >{_category==='-'?'Spend':'Income'}
                                </li>
                            )}
                        </CategorySelectBox>
                    </h3>
                    <div ref={line}></div>
                </LineBox>
                <PieBox>
                    <h3>
                        Last 7 Days Breakdown:
                        <CategorySelectBox>
                            {newCategoryList.map(__category=>
                                <li key={__category}
                                    className={__category === newCategory ? 'selected':''}
                                    onClick={()=> {
                                        setNewCategory(__category)
                                    }}
                                >{__category==='-'?'Spend':'Income'}
                                </li>
                            )}
                        </CategorySelectBox>
                    </h3>
                    <div ref={pie}></div>
                </PieBox>
            </TableBox>
        </Layout>
    );
}
export default Chart;