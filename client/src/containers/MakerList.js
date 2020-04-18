import React, { useState, useEffect }           from 'react'
import { connect, useSelector, useDispatch }    from 'react-redux';

import {checkedItem, IsThereSelected}   from '../modules/maker'
import { setAuthReset }                 from '../modules/auth'
import { onDialogOpen }                 from '../modules/dialogs'
import { getExchangeRate }              from '../modules/basicInfo'

import {
    actUpdate, 
    actUpdateChange, 
    actClickedTableCol,
    actAdd,
    actDelete
}                                       from '../modules/maker'

import {load as loadAccount} from '../modules/reduxForm'


import DialogST     from '../components/common/dialogs/DialogST'
import Table        from '../components/common/Table1'
import ButtonHeader from '../components/common/ButtonHeader'



import spacelize                      from '../lib/spacelize'
import {generateRandom}               from '../lib/common';

import MakerQuery   from '../containers/MakerQuery'

import Button           from '@material-ui/core/Button';


import axios                from '../lib/api/axios'
import {getIncludingKeys,
    withoutIncludingKeys }  from '../lib/common'



const MakerList = ({motherType, motherFrameNo, motherNo, subTableAttr}) => {
    const dispatch = useDispatch();

    //개체 기본 속성
    const [frameNo, setFrameNo]  = useState(motherFrameNo ? motherFrameNo : generateRandom())
    const [currentNo, setCurrentNo]  = useState(generateRandom())

    const currentType = 'makerList'
    const containerNo = currentType + '_' + frameNo
    const dataType = 'maker'

    console.log('프레임넘버는 ', frameNo, ' 현Comp는 (', currentType, ', ', currentNo, ')', ', 마더comp는 ', motherType, ', ', motherNo, ')')


    //다이얼로그 관련
    const opened         = useSelector(state => state.dialogs.opened)
    const dialogOpened   = useSelector(state => state.dialogs.opened)
    const simpleQuery = 'simple'
    const detailQuery = 'detail'

    const checkOpened = (title) => {
        let result = ''
        dialogOpened.map(array => {
            if (array.type == title){
                result = array.ox
            }
        })
        return result
    }
    const DialogsAttr = {
      itemAdd : {
        title : detailQuery,
        maxWidth : 'md' ,
        // funcs : funcs,
        open : checkOpened(detailQuery),
        scroll : 'paper'
        
      },
      MakerQuery : {
          title : simpleQuery,
          maxWidth : 'xl' ,
          // funcs : funcs,
          open : checkOpened(simpleQuery)
      }
    }


    //테이블 관련
    const [tableRawData, 
        setTableRawData]                = useState([])
    const [primaryKey, setPrimaryKey]   = useState('');
    const [includingKeys, 
        setIncludingKeys]               = useState([]);
    const [findingKeys, 
        setFindingKeys]               = useState([]);

    //테이블 업데이트
    const [fixedVals, setFixedVals]             = useState([]);
    const [updated, setUpdated]                 = useState(false);
    const {update} = useSelector(({ maker }) => ({ update : maker.table.update }));

    //테이블값 새로 추가
    const [addedNew, setAddedNew]               = useState([]);
    const onSubmitNewAdded = async () => {
        await addedNew.map(obj => {
            dispatch(actAdd(obj, primaryKey, includingKeys, findingKeys))
        })
        // await dispatch(actAdd(addedNew, primaryKey, includingKeys))
        await getRawData()
        await setAddedNew([])
    }


    //테이블값 수정
    const onSubmitUpdatedVals = async (fixedVals) => {
        await fixedVals.map(arr => {
            dispatch(actUpdate(arr))
        })
        await setFixedVals([])
    }


    //테이블값 삭제
    const setDelete = async (codes) =>{
        await codes.map(code => {
            dispatch(actDelete(dataType, code[primaryKey]))
        })
        await setUpdated(true)
        await setSelected([])
    }

    //테이블 셀렉트
    const [selected, setSelected]         = useState([]);


    //테이블 클릭
    const [clickedCol, 
      setClickedCol]     = useState({});
    const clicked        = useSelector(state => state.maker.table.clicked)
    const reqQueryCode   = tableRawData[clicked.row] ? tableRawData[clicked.row][primaryKey] : ""

    useEffect(() => {
      if (Object.keys(clickedCol).length > 0) {
          dispatch(actClickedTableCol(clickedCol))
      } 
    },[clickedCol])
    //      테이블 클릭시 가격 클릭이랑 나머지 클릭이랑 따로 나눔
    useEffect(() => {
      let keys = Object.keys(clicked)
      if (keys.length > 0) {
        if (includingKeys) {
          dispatch(actClickedTableCol(clickedCol))
          dispatch(loadAccount(clickedCol))
          dispatch(onDialogOpen(true, detailQuery, clickedCol))
        }else{
          dispatch(actClickedTableCol(clickedCol))
          dispatch(onDialogOpen(true, simpleQuery, clickedCol))
        }
      } 
    },[clicked])


    //테이블 필터
    const [filterKeyword, setFilterKeyword]     = useState('');
    const [filteredData, setFilteredData]       = useState(tableRawData);


    //테이블 로드
    const getRawData = async () => {
        await axios.get('/api/' + dataType + '/load').then(res => {
            setPrimaryKey(res.data.primaryKey)
            setIncludingKeys(res.data.includingKeys)
            setTableRawData(withoutIncludingKeys(res.data.vals))
            setFindingKeys(res.data.findingKeys)
        })
    }
    useEffect(() => {
        getRawData()
    },[])


    
    //Api로부터 findingKeys를 받은 뒤
    //input을 query창으로 형성할 컬럼의 목록을 arr로
    const [findingCols, 
        setFindingCols]                = useState([])
    useEffect(() => {
        let tempArr = []
        findingKeys.map(obj => {
            Object.keys(obj).map(asStr => {
                Object.keys(obj[asStr]).map(codeKey => {
                    tempArr.push(obj[asStr][codeKey])
                })
            })
        })
        setFindingCols(tempArr)
    },[findingKeys])


    const getAsStrByColName = (colName) => {
        let tempAsStr = ''
        findingKeys.map(obj => {
            Object.keys(obj).map(asStr => {
                Object.keys(obj[asStr]).map(codeKey => {
                    tempAsStr = asStr
                })
            })
        })
        return tempAsStr
    }

    const test = () => {
        // dispatch(loadAccount())
        // dispatch(onDialogOpen(true, detailQuery, clickedCol))
        console.log(getAsStrByColName('itemName'))
    }


    if (update) {
        getRawData()
        dispatch(actUpdateChange(false))
        setUpdated(true)
    }



    //table 관련 속성들
    const tableStates = {
        rawData         : tableRawData,
        updated         : updated,
        clickedCol      : clickedCol,
        addedNew        : addedNew,
        selected        : selected,
        filterKeyword   : filterKeyword,
        filteredData    : filteredData
    }
    const setTableStates = {
        setTableRawData     : setTableRawData,
        setUpdated          : setUpdated,
        setClickedCol       : setClickedCol,
        setAddedNew         : setAddedNew,
        setSelected         : setSelected,
        setFilterKeyword    : setFilterKeyword,
        setFilteredData     : setFilteredData
    }
    const funcs = {
        load : getRawData,
        onSubmitUpdatedVals : onSubmitUpdatedVals,
        onDialogOpen : onDialogOpen,
        onDelete : setDelete,
        onSubmitNewAdded : onSubmitNewAdded
    }
    let tableAttr = {
        flagAble : true,
        fixModeAble : true,
        colAttr : {
            makerCode : {
                primary : true,
                fixable : false,
                defaultHided : false,
                validate : ['code']
            },
            makerName : {
                fixable : true,
                defaultHided : false,
                validate : ['string']
            },
            description : {
                fixable : true,
                defaultHided : true,
                validate : ['string']
            },
            weight : {
                fixable : true,
                defaultHided : true,
                validate : ['maxValue5', 'number']
            },
            width : {
                fixable : true,
                defaultHided : true,
                validate : ['maxValue5', 'number']
            },
            depth : {
                fixable : true,
                defaultHided : true,
                validate : ['maxValue5', 'number']
            },
            height : {
                fixable : true,
                defaultHided : true,
                validate : ['maxValue5', 'number']
            },
            importTaxRate : {
                fixable : true,
                defaultHided : false,
                validate : ['percent', 'plus', 'decimal2', 'number']
            },
            maker : {
                fixable : true,
                defaultHided : false,
                validate : ['string']
            },
            makerModelNo : {
                fixable : true,
                defaultHided : false,
                validate : ['string']
            },
            supplierName : {
                fixable : true,
                defaultHided : false,
                query : true,
                dialog : getAsStrByColName('supplierName'),
                validate : ['string']
            },
            VNPrice : {
                fixable : true,
                defaultHided : false,
                validate : ['number', 'max15'],
            },
            buyingPKR : {
                fixable : true,
                defaultHided : false,
                validate : ['number'],
            },
            stkVVar : {
                fixable : true,
                defaultHided : true,
                validate : ['decimal2', 'max1', 'number'],
            },
            stkCVar : {
                fixable : true,
                defaultHided : true,
                validate : ['decimal2', 'max1', 'number'],
            },
            createdAt : {
                fixable : false,
                defaultHided : true
            },
            updatedAt : {
                fixable : false,
                defaultHided : true
            },
        },
    }
    tableAttr = Object.assign(tableAttr, subTableAttr)


    
    const arrFunc = () => {
      let Arr = []
      const makeFieldAttrArr = (name, component) => {
          const obj = {
              name : name,
              component : component,
              label : spacelize(name)
          }
          Arr.push(obj)
      }
      makeFieldAttrArr('firstName', 'renderTextField')
      makeFieldAttrArr('secondName', 'renderTextField')
      return Arr
    }

    return(
        <>
          <Button onClick = {test}>푸하하</Button>
          {/* <DialogST attr = {DialogsAttr.itemAdd}>
            <ItemAdd 
              title       = {DialogsAttr.itemAdd.title} 
              fieldsAttr  = {arrFunc()}
              motherType  = {type}
              motherNo    = {frameNo}
              reqKey      = {primaryKey}
              reqCode     = {reqQueryCode}
            ></ItemAdd>
          </DialogST> */}

          <Table 
              motherType    = {currentType}
              motherNo      = {currentNo}
              motherFrameNo = {frameNo}
              states        = {tableStates}
              setStates     = {setTableStates}
              attr          = {tableAttr}
              funcs         = {funcs}
          ></Table>

          <DialogST motherFrameNo = {frameNo} motherNo = {currentNo} motherType = {currentType} attr = {DialogsAttr.MakerQuery}>
            <MakerQuery 
              motherFrameNo = {frameNo}
              motherType  = {currentType}
              motherNo    = {frameNo}
              reqKey      = {primaryKey}
              reqCode     = {reqQueryCode}
            ></MakerQuery>
          </DialogST>
        </>
    )
}   

export default MakerList
