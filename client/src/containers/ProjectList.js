import React, { useState, useEffect }           from 'react'
import { connect, useSelector, useDispatch }    from 'react-redux';

import { setAuthReset }                 from '../modules/auth'
import { actDialogOpen }                 from '../modules/dialogs'
import { getExchangeRate }              from '../modules/basicInfo'
import {
    actUpdate, 
    actUpdateChange, 
    actClickedTableCol,
    actAdd,
    actDelete
}                                       from '../modules/project'

import {load as loadAccount} from '../modules/reduxForm'


import DialogST     from '../components/dialogs/DialogST'
import Table        from '../components/table/Table1'

import {spacelize}                    from '../lib/funcs/fString'
import {generateRandom}               from '../lib/funcs/fCommon';

import Button           from '@material-ui/core/Button';


import axios                from '../lib/api/axios'
import {getIncludingKeys,
    withoutKeys }  from '../lib/funcs/fCommon'



const ProjectList = ({motherType, motherNo, subTableAttr}) => {
    const dispatch = useDispatch();

    //개체 기본 속성
    const [frameNo, setFrameNo]  = useState(motherNo ? motherNo : generateRandom())
    const [currentNo, setCurrentNo]   = useState(generateRandom())

    const type = 'projectList'
    const currentType = 'projectList'

    const containerNo = type + '_' + frameNo
    const dataType = 'project'

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
    const [includingKeys, 
        setIncludingKeys]               = useState([]);
    const [findingKeys, 
        setFindingKeys]               = useState([]);

    //테이블 업데이트
    const [fixedVals, setFixedVals]             = useState([]);
    const [updated, setUpdated]                 = useState(false);
    const {update} = useSelector(({ project }) => ({ update : project.table.update }));

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
        if (includingKeys.price.includes(clicked.header)) {
          dispatch(actClickedTableCol(clickedCol))
          dispatch(loadAccount(clickedCol))
          dispatch(actDialogOpen(true, detailQuery, clickedCol))
        }else{
          dispatch(actClickedTableCol(clickedCol))
          dispatch(actDialogOpen(true, simpleQuery, clickedCol))
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
            setTableRawData(withoutKeys(res.data.vals))
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
        // dispatch(actDialogOpen(true, detailQuery, clickedCol))
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
        actDialogOpen : actDialogOpen,
        onDelete : setDelete,
        onSubmitNewAdded : onSubmitNewAdded
    }
    let tableAttr = {
        flagAble : true,
        fixModable : true,
        colAttr : {
            projectCode : {
                primary : true,
                fixable : false,
                defaultHided : true,
                validate : ['string'],
                dataType : dataType,
                clickType : 'expenseQuery',
                queryType : 'simpleQuery',
                size : '50px'

            },
            projectName : {
                fixable : true,
                defaultHided : false,
                validate : ['string'],
                dataType : dataType,
                clickType : 'expenseQuery',
                queryType : 'simpleQuery',
                size : '200px'

            },
            client : {
                fixable : true,
                defaultHided : false,
                validate : ['string'],
                dataType : 'client',
                clickType : 'expenseQuery',
                queryType : 'simpleQuery',
                size : '80px'
            },
            shortDesc : {
                fixable : true,
                defaultHided : false,
                validate : ['string'],
                size : '100px'
            },
            estimatedAmount : {
                fixable : true,
                defaultHided : false,
                validate : ['maxValue5', 'number'],
                dataType : dataType,
                clickType : 'expenseQuery',
                queryType : 'simpleQuery',
                size : '200px'
            },
            estimatedTime : {
                fixable : true,
                defaultHided : false,
                validate : ['maxValue5', 'number'],
                dataType : dataType,
                clickType : 'expenseQuery',
                queryType : 'simpleQuery',
                size : '100px'
            },
            desc : {
                fixable : true,
                defaultHided : false,
                validate : ['number', 'max15'],
                size : '400px'
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
        tableButton : [
            {
                title : 'insert',
                func : function(selected){
                    // dispatch(onAlreadyPickedCheck(selected.value))
                    console.log('버튼눌림')
                },
                mother : containerNo
            },
        ],
    }

    tableAttr = Object.assign(tableAttr, subTableAttr)

    console.log(dataType)
    
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
              motherType  = {type}
              motherNo    = {frameNo}
              dataType    = {dataType}
              states      = {tableStates}
              setStates   = {setTableStates}
              attr        = {tableAttr}
              funcs       = {funcs}
          ></Table>
{/* 
          <DialogST attr = {DialogsAttr.itemQuery}>
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

export default ProjectList
