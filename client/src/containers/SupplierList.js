import React, { useState, useEffect }           from 'react'
import { connect, useSelector, useDispatch }    from 'react-redux';

import {checkedItem, IsThereSelected}   from '../modules/itemList'
import { setSearchKeyword }             from '../modules/mainSearch'
import { onAlreadyPickedCheck }         from '../modules/quote'
import { setAuthReset }                 from '../modules/auth'
import { onDialogOpen }                 from '../modules/dialogs'
import { getExchangeRate }              from '../modules/basicInfo'
import {
    actUpdate, 
    actUpdateChange, 
    actClickedTableCol,
    actAdd,
    actDelete
}                                       from '../modules/itemList'

import {load as loadAccount} from '../modules/reduxForm'


import DialogST     from '../components/common/dialogs/DialogST'
import Table        from '../components/common/Table1'
import ButtonHeader from '../components/common/ButtonHeader'



import spacelize                                from '../lib/spacelize'
import {generateRandom}                         from '../lib/common';

// import ItemAdd      from '../components/ItemAdd'
// import ItemQuery from '../components/ItemQuery'
// import SupplierAdd from '../components/supplierAdd'

// import ItemQuery    from '../containers/ItemQuery'

import Button           from '@material-ui/core/Button';


import axios                from '../lib/api/axios'
import {getIncludingKeys,
    withoutIncludingKeys }  from '../lib/common'



const SupplierContainer = ({motherFrameNo, motherType, motherNo, subTableAttr}) => {
    const dispatch = useDispatch();


    //개체 기본 속성
    const [frameNo, setFrameNo]  = useState(motherFrameNo ? motherFrameNo : generateRandom())
    const [currentNo, setCurrentNo]  = useState(generateRandom())

    const type = 'supplierList'
    const containerNo = type + '_' + frameNo
    const dataType = 'supplier'

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
      itemQuery : {
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
    const [nameKey, setNameKey]   = useState('');
    const [includingKeys, 
        setIncludingKeys]               = useState([]);
    const [findingKeys, 
        setFindingKeys]               = useState([]);

          

    //테이블 업데이트
    const [fixedVals, setFixedVals]             = useState([]);
    const [updated, setUpdated]                 = useState(false);
    const {update} = useSelector(({ item }) => ({ update : item.table.update }));

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
            dispatch(actDelete(type, code.itemCode))
        })
        await setUpdated(true)
        await setSelected([])
    }

    //테이블 셀렉트
    const [selected, setSelected]         = useState([]);


    //테이블 클릭
    const [clickedCol, 
      setClickedCol]     = useState({});
    const clicked        = useSelector(state => state.item.table.clicked)
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
        dispatch(actClickedTableCol(clickedCol))
        dispatch(onDialogOpen(true, simpleQuery, clickedCol))
      } 
    },[clicked])


    //테이블 필터
    const [filterKeyword, setFilterKeyword]     = useState('');
    const [filteredData, setFilteredData]       = useState(tableRawData);


    //테이블 로드
    const getRawData = async () => {
        await axios.get('/api/' + dataType + '/load').then(res => {
            console.log(res)
            setPrimaryKey(res.data.primaryKey)
            setNameKey('supplierName')
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
        console.log(getAsStrByColName('supplierName'))
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
            supplierCode : {
                primary : true,
                fixable : false,
                defaultHided : true,
                validate : ['code']
            },
            supplierName : {
                fixable : true,
                defaultHided : false,
                nameKey : true,
                dialog : getAsStrByColName('supplierName'),
                validate : ['string']
            },
            country : {
                fixable : true,
                defaultHided : false,
                validate : ['string']
            },
            province : {
                fixable : true,
                defaultHided : false,
                validate : ['string']
            },
            ceo : {
                fixable : true,
                defaultHided : false,
                validate : ['string']
            },
            taxCode : {
                fixable : true,
                defaultHided : false,
                validate : ['string']
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
    게를를
          <Table 
              motherFrameNo = {frameNo}
              motherType    = {type}
              motherNo      = {currentNo}
              states        = {tableStates}
              setStates     = {setTableStates}
              attr          = {tableAttr}
              funcs         = {funcs}
          ></Table>

          {/* <DialogST attr = {DialogsAttr.itemQuery}>
            <ItemQuery 
              motherType  = {type}
              motherNo    = {frameNo}
              reqKey      = {primaryKey}
              reqCode     = {reqQueryCode}
            ></ItemQuery>
          </DialogST> */}
        </>
    )
}   

export default SupplierContainer
