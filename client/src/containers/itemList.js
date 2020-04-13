import React, { useState, useEffect }           from 'react'
import { connect, useSelector, useDispatch }    from 'react-redux';

import {checkedItem, IsThereSelected}   from '../modules/itemList'
import { setSearchKeyword }             from '../modules/mainSearch'
import { onAlreadyPickedCheck }         from '../modules/quote'
import { setAuthReset }                 from '../modules/auth'
import {onDialogOpen, onDialogClose}    from '../modules/dialogs'
import { getExchangeRate }              from '../modules/basicInfo'
import {
    actUpdate, 
    actUpdateChange, 
    actClickedTableCol,
    actAdd,
    actDelete
}                                       from '../modules/itemList'

import DialogST     from '../components/common/dialogs/DialogST'
import Table        from '../components/common/Table1'
import ButtonHeader from '../components/common/ButtonHeader'



import spacelize                      from '../lib/spacelize'
import {generateRandom}               from '../lib/common';

import ItemAdd      from '../components/ItemAdd'
// import SupplierAdd from '../components/supplierAdd'

import MakerQuery   from '../containers/MakerQuery'
import ItemQuery    from '../containers/ItemQuery'
import Query        from '../components/Query'


import Button           from '@material-ui/core/Button';


import axios                from '../lib/api/axios'
import {getIncludingKeys,
    withoutIncludingKeys }  from '../lib/common'



const ItemListContainer = ({motherType, motherNo, subTableAttr}) => {
    const dispatch = useDispatch();

    //개체 기본 속성
    const [frameNo, setFrameNo]  = useState(motherNo ? motherNo : generateRandom())
    const [currentNo, setCurrentNo]  = useState(generateRandom())

    console.log(frameNo, currentNo )

    const type = 'itemList'
    const containerNo = type + '_' + frameNo
    const dataType = 'item'
    // console.log('현Comp는 (', type, ', ', frameNo, ')', ', 마더comp는 ', motherType, ', ', motherNo, ')')


    //다이얼로그 관련
    const dialogOpened                  = useSelector(state => state.dialogs.opened)
    const [dialogInfo, setDialogInfo]   = useState({})
    const simpleQuery = 'simpleQuery'
    const detailQuery = 'detailQuery'
    const checkOpened = (type) => {
        let result = ''
        dialogOpened.map(obj => {
            if(obj.frameNo == frameNo && obj.currentNo == currentNo && obj.type == type) {
              result = obj.open
            }
        })
        return result
    }
    const DialogsAttr = {
      itemAdd : {
        title : detailQuery,
        type : detailQuery,
        maxWidth : 'md' ,
        // funcs : funcs,
        open : checkOpened(detailQuery),
        scroll : 'paper'
        
      },
      itemQuery : {
        title : simpleQuery,
        type : simpleQuery,
        maxWidth : 'xl' ,
        // funcs : funcs,
        open : checkOpened(simpleQuery)
      }
    }
    useEffect(()=> {
      dialogOpened.map(obj => {
        if(obj.frameNo == frameNo && obj.currentNo == currentNo) {
          setDialogInfo(obj)
        }
      })
    },[dialogOpened])


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

    console.log(primaryKey, includingKeys, findingKeys)

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
    const clicked        = useSelector(state => state.item.table.clicked)
    // const reqQueryCode   = tableRawData[clicked.row] ? tableRawData[clicked.row][primaryKey] : ""
    const [reqQueryCode, setReqQueryCode]  = useState('BF-50A')


    useEffect(() => {
      if (Object.keys(clickedCol).length > 0) {
          dispatch(actClickedTableCol(clickedCol))
      } 
    },[clickedCol])
    //      테이블 클릭시 가격 클릭이랑 나머지 클릭이랑 따로 나눔
    useEffect(() => {
      console.log('클릭드발동')
      let keys = Object.keys(clicked)
      const {header, row, value} = clicked
      const {clickType} = tableAttr.colAttr[header] ? tableAttr.colAttr[header] : ''
    //   const primaryCode = getPrimaryCode
      if (keys.length > 0) {
        if (includingKeys.price.includes(clicked.header)) {
          dispatch(actClickedTableCol(clickedCol))
          let aColAttr = tableAttr.colAttr[clickedCol.header]
          let {clickType, dataType} = aColAttr
          let tempObj = {frameNo : frameNo, currentNo : currentNo, type : simpleQuery, open : true, dataType : dataType, data : clickedCol, clickType : clickType}
          dispatch(onDialogOpen(tempObj))

        }else{
          dispatch(actClickedTableCol(clickedCol))
          let aColAttr = tableAttr.colAttr[clickedCol.header]
          let {clickType, dataType} = aColAttr
          let tempObj = {frameNo : frameNo, currentNo : currentNo, type : simpleQuery, open : true, dataType : dataType, data : clickedCol, clickType : clickType}
          dispatch(onDialogOpen(tempObj))
        }
      }
      dialogOpened.map(obj => {
        console.log(obj)
        if(obj.frameNo == frameNo && obj.currentNo == currentNo) {
          console.log('일치함 ㅋㅋ')
          setDialogInfo(obj)
        }
      })
    },[clicked])


    console.log(clickedCol)



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
        // console.log(checkOpened('itemName'))
        checkOpened()
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
    const tableAttr = {
        flagAble : true,
        fixModeAble : true,
        colAttr : {
            itemCode : {
                primary : true,
                fixable : false,
                defaultHided : false,
                validate : ['code'],
                dataType : dataType,
                clickType : 'itemQuery'
            },
            itemName : {
                fixable : true,
                defaultHided : false,
                validate : ['string'],
                dataType : dataType,
                clickType : 'itemQuery'

            },
            description : {
                fixable : true,
                defaultHided : true,
                validate : ['string'],
                dataType : dataType,
                clickType : 'itemQuery'
            },
            weight : {
                fixable : true,
                defaultHided : true,
                validate : ['maxValue5', 'number'],
                dataType : dataType,
            },
            width : {
                fixable : true,
                defaultHided : true,
                validate : ['maxValue5', 'number'],
                dataType : dataType,
            },
            depth : {
                fixable : true,
                defaultHided : true,
                validate : ['maxValue5', 'number'],
                dataType : dataType,
            },
            height : {
                fixable : true,
                defaultHided : true,
                validate : ['maxValue5', 'number'],
                dataType : dataType,
            },
            importTaxRate : {
                fixable : true,
                defaultHided : false,
                validate : ['percent', 'plus', 'decimal2', 'number'],
                dataType : dataType,
            },
            makerName : {
                fixable : true,
                defaultHided : false,
                validate : ['string'],
                dataType : 'maker',
                clickType : 'makerQuery'
            },
            makerModelNo : {
                fixable : true,
                defaultHided : false,
                validate : ['string'],
                dataType : dataType,
            },
            supplierName : {
                fixable : true,
                defaultHided : false,
                query : true,
                dataType : 'supplier',
                dialog : getAsStrByColName('supplierName'),
                validate : ['string'],
            },
            VNPrice : {
                fixable : true,
                defaultHided : false,
                validate : ['number', 'max15'],
                dataType : dataType,
            },
            buyingPKR : {
                fixable : true,
                defaultHided : false,
                validate : ['number'],
                dataType : dataType,
            },
            stkVVar : {
                fixable : true,
                defaultHided : true,
                validate : ['decimal2', 'max1', 'number'],
                dataType : dataType,
            },
            stkCVar : {
                fixable : true,
                defaultHided : true,
                validate : ['decimal2', 'max1', 'number'],
                dataType : dataType,
            },
            createdAt : {
                fixable : false,
                defaultHided : true,
                dataType : dataType,
            },
            updatedAt : {
                fixable : false,
                defaultHided : true,
                dataType : dataType,
            },
        },
        tableButton : [
            {
                title : 'insert',
                func : function(selected){
                    dispatch(onAlreadyPickedCheck(selected.value))
                },
                mother : containerNo
            },
        ],
    }

    
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
          <DialogST frameNo = {frameNo} motherNo = {currentNo} attr = {DialogsAttr.itemAdd}>
              아이템에디디
            <ItemAdd 
              title       = {DialogsAttr.itemAdd.title} 
              fieldsAttr  = {arrFunc()}
              motherType  = {type}
              motherNo    = {frameNo}
              reqKey      = {primaryKey}
              reqCode     = {reqQueryCode}
            ></ItemAdd>
          </DialogST>

          <Table 
              motherType  = {type}
              motherNo    = {frameNo}
              states      = {tableStates}
              setStates   = {setTableStates}
              attr        = {tableAttr}
              funcs       = {funcs}
          ></Table>

          <DialogST frameNo = {frameNo} motherNo = {currentNo} attr = {DialogsAttr.itemQuery}>
            <Query 
              motherType  = {type}
              motherNo    = {frameNo}
              reqKey      = {primaryKey}
              reqCode     = {reqQueryCode}
              attr        = {dialogInfo}
            ></Query>
          </DialogST>
        </>
    )
}   

export default ItemListContainer
