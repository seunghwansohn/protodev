import React, { useState, useEffect }           from 'react'
import { connect, useSelector, useDispatch }    from 'react-redux';

import { actDialogOpen }                 from '../modules/dialogs'


import {
    actUpdate, 
    actUpdateChange, 
    actClickedTableCol,
    actAdd,
    actDelete
}                                       from '../modules/maker'

import DialogST     from '../components/dialogs/DialogST'
import Table        from '../components/table/Table1'

import {generateRandom}                         from '../lib/funcs/fCommon';


import Query        from '../components/query/Query'
import Button           from '@material-ui/core/Button';


import axios                from '../lib/api/axios'
import {getIncludingKeys,
    withoutKeys }  from '../lib/funcs/fCommon'



const MakerContainer = ({
    motherFrameNo, 
    motherType, 
    motherNo, 
    subTableAttr
}) => {
    const dispatch = useDispatch();

    //개체 기본 속성
    const [frameNo, setFrameNo]      = useState(motherFrameNo ? motherFrameNo : generateRandom())
    const [currentNo, setCurrentNo]  = useState(generateRandom())

    const currentType = 'supplierList'
    const containerNo = currentType + '_' + frameNo
    const dataType = 'maker'

    console.log('프레임넘버는 ', frameNo, ' 현Comp는 (', currentType, ', ', currentNo, ')', ', 마더comp는 ', motherType, ', ', motherNo, ')')


    //테이블 관련
    const [tableRawData, 
        setTableRawData]                = useState([])    
    const [includingKeys, 
        setIncludingKeys]               = useState([]);
    const [findingKeys, 
        setFindingKeys]                 = useState([]);
    const [primaryKey, setPrimaryKey]   = useState('');


    //테이블 업데이트
    const [fixedVals, setFixedVals]             = useState([]);
    const [updated, setUpdated]                 = useState(false);

    const {update} = useSelector(({ maker }) => ({ update : maker.table.update }));

    //테이블 클릭
    const [clickedCol, 
        setClickedCol]      = useState({});
    const clicked           = useSelector(state => state.maker.table.clicked)

    useEffect(() => {
      if (Object.keys(clickedCol).length > 0) {
          dispatch(actClickedTableCol(clickedCol))
      } 
    },[clickedCol])

    //테이블값 새로 추가
    const [addedNew, setAddedNew]               = useState([]);
    const onSubmitNewAdded = async () => {
        await addedNew.map(obj => {
            dispatch(actAdd(obj, primaryKey, includingKeys, findingKeys))
        })
        await getRawData()
        await setAddedNew([])
    }


    //테이블 셀렉트
    const [selected, setSelected]         = useState([]);

    //테이블 필터
    const [filterKeyword, setFilterKeyword]     = useState('');
    const [filteredData, setFilteredData]       = useState(tableRawData);
    
    //테이블 로드
    const getRawData = async () => {
        await axios.get('/api/' + dataType + '/load').then(res => {
            setPrimaryKey(res.data.primaryKey)
            setIncludingKeys(res.data.includingKeys)
            setTableRawData(withoutKeys(res.data.vals))
            setFindingKeys(res.data.findingKeys)
        })
    }
    useEffect(() => {
        getRawData()
    },[])

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


    //뭐지?
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
        actDialogOpen : actDialogOpen,
        onDelete : setDelete,
        onSubmitNewAdded : onSubmitNewAdded
    }
    let tableAttr = {
        flagAble : true,
        fixModable : true,
        colAttr : {
            supplierCode : {
                primary : true,
                fixable : false,
                defaultHided : true,
                validate : ['code'],
                dataType : dataType,
                clickType : 'supplierQuery',
                queryType : 'simpleQuery'

            },
            supplierName : {
                fixable : true,
                defaultHided : false,
                nameKey : true,
                dialog : getAsStrByColName('supplierName'),
                validate : ['string'],
                dataType : dataType,
                clickType : 'supplierQuery',
                queryType : 'simpleQuery'
            },
            country : {
                fixable : true,
                defaultHided : false,
                validate : ['string'],
                dataType : dataType,
                clickType : 'supplierQuery',
                queryType : 'simpleQuery'
            },
            province : {
                fixable : true,
                defaultHided : false,
                validate : ['string'],
                dataType : dataType,
                clickType : 'supplierQuery',
                queryType : 'simpleQuery'
            },
            ceo : {
                fixable : true,
                defaultHided : false,
                validate : ['string'],
                dataType : dataType,
                clickType : 'supplierQuery',
                queryType : 'simpleQuery'
            },
            taxCode : {
                fixable : true,
                defaultHided : false,
                validate : ['string'],
                dataType : dataType,
                clickType : 'supplierQuery',
                queryType : 'simpleQuery'
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
    
    //다이얼로그 관련
    const dialogOpened   = useSelector(state => state.dialogs.opened)
    const [dialogInfo, setDialogInfo]   = useState({})
    const simpleQuery = 'simpleQuery'
    const detailQuery = 'detailQuery'


    const checkOpened = (type) => {
        console.log(type)
        let result = ''
        dialogOpened.map(obj => {
          if (
            obj.frameNo     == frameNo && 
            obj.currentNo   == currentNo && 
            obj.currentType == currentType && 
            obj.motherNo    == motherNo &&
            obj.motherType  == motherType &&
            obj.clickedType == type 
          ) {
            result = true
          }
        })
        return result
    }
    const DialogsAttr = {
        detailQuery : {
            title : detailQuery,
            dialogType : detailQuery,
            maxWidth : 'md' ,
            open : checkOpened(detailQuery),
            scroll : 'paper'
        },
        simpleQuery : {
            title : simpleQuery,
            dialogType : simpleQuery,
            maxWidth : 'xl' ,
            open : checkOpened(simpleQuery)
        }
    }
    useEffect(()=> {
    dialogOpened.map(obj => {
        if (
        obj.frameNo     == frameNo && 
        obj.currentNo   == currentNo && 
        obj.motherNo    == motherNo &&
        obj.motherType  == motherType
        ) {
        setDialogInfo(obj)
        }
    })
    },[dialogOpened])

  

  //      테이블 클릭시 가격 클릭이랑 나머지 클릭이랑 따로 나눔
  useEffect(() => {
    let   keys = clicked ? Object.keys(clicked) : []
    const {colAttr} = tableAttr
    const colAttrKeys = Object.keys(colAttr)

    const {header, row, value, dataType, primaryCode, queryType} = clicked ? clicked : ''
    const {clickType} = tableAttr.colAttr[header] ? tableAttr.colAttr[header] : ''
    if (keys.length > 0) {
      let aColAttr = tableAttr.colAttr[clicked.header]
      let {clickType, dataType} = aColAttr
      let queryType = ''
      colAttrKeys.map(key => {
        if (key == header) {
          queryType = colAttr[key].queryType
        }
      })
      let tempObj = {
        frameNo     : frameNo,
        currentNo   : currentNo,
        currentType : currentType, 
        motherNo    : motherNo, 
        motherType  : motherType,

        clickedHeader       : header,
        clickedIndex        : row,
        clickedVal          : value,
        clickedType         : queryType,
        clickedPrimaryCode  : primaryCode,

        dataType      : dataType, 
        initialFilter : '',
      }
      dispatch(actDialogOpen(tempObj))
    }
    dialogOpened.map(obj => {
      if(obj.frameNo == frameNo && obj.currentNo == currentNo) {
        setDialogInfo(obj)
      }
    })
  },[clicked])


  const test = () => {
    // dispatch(loadAccount())
    // dispatch(actDialogOpen(true, detailQuery, clickedCol))
    // console.log(checkOpened('itemName'))
    checkOpened()
  }


  if (update) {
    getRawData()
    dispatch(actUpdateChange(false))
    setUpdated(true)
  }




  return(
      <>
        <Button onClick = {test}>푸하하</Button>
        <DialogST motherFrameNo = {frameNo} motherNo = {currentNo} motherType = {currentType} attr = {DialogsAttr.simpleQuery}>
          <Query 
            title       = {DialogsAttr.simpleQuery.title} 

            motherType  = {currentType}
            motherFrameNo = {frameNo} 
            motherNo    = {currentNo}

            reqKey      = {primaryKey}
            attr        = {dialogInfo}
          ></Query>
        </DialogST>

        <Table 
            motherFrameNo = {frameNo}
            motherType    = {currentType}
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

export default MakerContainer
