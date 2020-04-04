import React, {useState, useEffect}           from 'react'
import { connect, useSelector, useDispatch }  from 'react-redux';
import { Field, reduxForm, Fields }           from 'redux-form'

import axios                          from 'axios';

import Table from '@material-ui/core/Table'; //material-ui의 Table ui를 불러와서 프론트엔드에 쓰이는 모든 테이블 스타일을 이 스타일로 함.
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';

import Typography       from '@material-ui/core/Typography';
import Slider           from '@material-ui/core/Slider';
import TextField        from '@material-ui/core/TextField'
import Checkbox         from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl      from '@material-ui/core/FormControl'
import Select           from '@material-ui/core/Select'
import InputLabel       from '@material-ui/core/InputLabel'
import FormHelperText   from '@material-ui/core/FormHelperText'
import Radio            from '@material-ui/core/Radio'
import RadioGroup       from '@material-ui/core/RadioGroup'
import { makeStyles }   from '@material-ui/core/styles';
import Grid             from '@material-ui/core/Grid';
import Button           from '@material-ui/core/Button';
import Paper            from '@material-ui/core/Paper';
import Box              from '@material-ui/core/Box';
import { ToastContainer, toast } from 'react-toastify';

import {
  actUpdate, 
  actUpdateChange, 
  actClickedTableCol,
  actAdd,
  actDelete
}                                       from '../modules/itemList'

import {generateRandom}               from '../lib/common';

import { getExchangeRate } from '../modules/basicInfo'

import {load, sliderStKVVar, sliderStKCVar} from '../modules/reduxForm'

import spacelize  from '../lib/spacelize'
import * as cal   from '../lib/calSTValues'

import InputST          from './common/Input'

import {actSubmitAddItem} from '../modules/itemList'

import TableWithColon from './common/TableWithColon'

toast.configure()

const useStyles = makeStyles(theme => ({
  root: {
      flexGrow: 1,
      display: 'flex'
  },
  marginBottom: {
    flexGrow: 1,
    display: 'flex',
    marginBottom: '8px'
  },
  grid: {
      padding: theme.spacing(0),
      textAlign: 'left',
      display: 'flex',
      backgroundColor : '#ecdfed'
  },
  gridPrice: {
    padding: theme.spacing(0),
    textAlign: 'left',
    display: 'flex',
    backgroundColor : '#ecdfed'
  },
  paperKorea : {
    padding: theme.spacing(1),
    color : 'white',
    backgroundColor: '#3385ff',
    justifyContent: 'center',
    display: 'flex',
    fontSize : '23px',
  },
  paperVietnam : {
    padding: theme.spacing(1),
    color : 'white',
    backgroundColor: '#ff4d4d',
    justifyContent: 'center',
    display: 'flex',
    fontSize : '23px',
  },
  temp : {
    padding: theme.spacing(0),
    color : 'white',
    backgroundColor: '#ff4d4d',
    justifyContent: 'center',
    display: 'flex',
    fontSize : '23px',
  },

}));


const ProppedInput = ({infoProps, fixMode, fixedData, setFixedData}) => {
  const classes = useStyles();
  return (
    <Grid container>
      {infoProps.map(obj => {
        if(obj.type !== 'divider') {
          return(
            <Grid className = {classes.marginBottom}>
              <InputST
                title         = {obj.title}
                attr          = {'regular'}
                type          = {obj.type}
                fixMode       = {fixMode}
                state         = {obj.state}
                setState      = {obj.setState}
                fixedData     = {fixedData}
                setFixedData  = {setFixedData}
                validation    = {obj.validation}
              ></InputST>
            </Grid>

          )
        }
      })}
    </Grid>
  )
}


let ItemAdd = ({motherType, motherNo, reqKey, reqCode}) => {
  const [fixMode, setFixMode]         = useState(false)
  const [fixedData, setFixedData]     = useState({})

  const [loadedData, setLoadedData]     = useState([])

  const [primaryKey, setPrimaryKey]   = useState(reqKey)
  const [primaryCode, setPrimaryCode] = useState(reqCode)

  const classes = useStyles();
  const dispatch = useDispatch()

  const [stkVVar, setStkVVar] = useState(1.02)
  const [stkCVar, setStkCvar] = useState(1.2)

  const exchangeRate = useSelector(state => state.basicInfo.exchangeRate)

  const [CBM, setCBM]                         = useState(0);
  const [deliveryKorea, setDeliveryKorea]     = useState(0);
  const [seaFreight, setSeaFreight]           = useState(0);
  const [airFreight, setAirFreight]           = useState(0);
  const [handCarryFee, setHandCarryFee]       = useState(0);
  const [STKVPrice, setSTKVPrice]             = useState(0);
  const [segeroPay, setSegeroPay]             = useState(0);
  const [importTax, setImportTax]             = useState(0);
  const [packingFee, setPackingFee]           = useState(0);
  const [defaultFreight, setDefaultFreight]   = useState();
  const [VNSellingP, setVNSellingP]           = useState(0);
  const [buyingPriceUSD, setBuyingPriceUSD]   = useState(0);
  const [profitKR, setProfitKR]               = useState(0);
  const [profitVN, setProfitVN]               = useState(0);
  const [costKR, setCostKR]                   = useState(0);
  const [costVN, setCostVN]                   = useState(0);
  const [profitCostKR, setProfitCostKR]       = useState(0);
  const [profitCostVN, setProfitCostVN]       = useState(0);
  const [totalProfit, setTotalProfit]         = useState(0);
  const [totalProfitCost, setTotalProfitCost] = useState(0);

  const [itemCode, setItemCode]               = useState('')
  const [itemName, setItemName]               = useState('')
  const [supplier, setSupplier]               = useState('')
  const [description, setDescription]         = useState('')
  const [maker, setMaker]                     = useState('')
  const [makerModelNo, setMakerModelNo]       = useState('')
  const [buyingPrice, setBuyingPrice]         = useState('')
  const [width, setWidth]                     = useState('')
  const [height, setHeight]                   = useState('')
  const [depth, setDepth]                     = useState('')
  const [weight, setWeight]                   = useState('')
  const [importTaxRate, setImportTaxRate]     = useState('')



  //픽스모드 설정
  const onModeChange = () => {
    fixMode == false ? setFixMode(true) : setFixMode(false)
  }

  //개체 기본 속성
  const [frameNo, setFrameNo]  = useState(motherNo ? motherNo : generateRandom())
  const type = 'itemDetailQuery'
  const containerNo = type + '_' + frameNo
  const dataType = 'item'


  useEffect(() => {
    const CBM = cal.CBM(width, depth, height)
    const seaFreight = cal.seaFreight(CBM)
    const airFreight = cal.airFreight(weight)
    const deliveryKorea = cal.deliveryKorea(weight)
    const packingFee = cal.packingFee(CBM)
    const defaultFreight= cal.defaultFreight(seaFreight, packingFee, exchangeRate.KRW)

    setCBM(CBM)
    setSeaFreight(seaFreight)
    setAirFreight(airFreight)
    setDeliveryKorea(deliveryKorea)
    setPackingFee(packingFee)
    setDefaultFreight(defaultFreight)
  },[width, depth, height, weight])

  useEffect(() => {
        const STKVPrice= cal.STKVPrice(stkVVar, buyingPrice)
        const segeroPay= cal.segeroPay(STKVPrice)
        const importTax= cal.importTax(importTaxRate, STKVPrice)
        const VNSellingP= cal.VNSellingP(STKVPrice, importTax, stkCVar)
        const buyingPriceUSD= cal.buyingPriceUSD(buyingPrice, exchangeRate.KRW)
        const costKR = cal.costKR(defaultFreight, segeroPay, buyingPriceUSD)
        const costVN = cal.costVN(importTax, STKVPrice)
        const profitKR = cal.profitKR(STKVPrice, costKR)
        const profitVN = cal.profitKR(VNSellingP, costVN)
        const profitCostKR = cal.profitCost(profitKR, costKR)
        const profitCostVN = cal.profitCost(profitVN, costVN)
        const totalProfit = profitKR + profitVN
        const totalProfitCost = Math.round(totalProfit/(costKR+costVN - STKVPrice) *10) *10

        setSTKVPrice(STKVPrice)
        setSegeroPay(segeroPay)
        setImportTax(importTax)
        setVNSellingP(VNSellingP)
        setBuyingPriceUSD(buyingPriceUSD)
        setProfitKR(profitKR)
        setProfitVN(profitVN)
        setCostVN(costVN)
        setCostKR(costKR)
        setProfitCostKR(profitCostKR)
        setProfitCostVN(profitCostVN)
        setTotalProfit(totalProfit)
        setTotalProfitCost(totalProfitCost)
  },[stkVVar, stkCVar, buyingPrice, importTaxRate])
  
  useEffect(() => {
    dispatch(getExchangeRate())
  },[])




    //-- api로드 부분
  //req값을 obj값으로 만들어서 post로 api 요청하여 값을 받아옴.
  const reqWhere = () =>{
    let tempObj = {}
    tempObj[reqKey] = reqCode
    return tempObj
  }
  useEffect(() => {
    axios.post('/api/' + dataType + '/query', reqWhere()).then(res => {
        setLoadedData(res.data[0])
    })
  },[])



  useEffect(() => {
    basicInfoProps.map(obj => {
      if (loadedData.hasOwnProperty(obj.title)) {
        console.log('값있음')
        obj.setState(loadedData[obj.title])
      }
    })
    priceInfoProps.map(obj => {
      if (loadedData.hasOwnProperty(obj.title)) {
        console.log('값있음')
        obj.setState(loadedData[obj.title])
      }
    })
    dimensionInfoProps.map(obj => {
      if (loadedData.hasOwnProperty(obj.title)) {
        console.log('값있음')
        obj.setState(loadedData[obj.title])
      }
    })
  },[loadedData])





  //슬라이더부분
  const onSetSTKVVar = (value) => {
    setStkVVar(value)
  }
  const onSetSTKCVar = (value) => {
    setStkCvar(value)
  }



  const basicInfoProps = [
    {type : 'primary', newRow : true, size : 5, title: 'itemCode', state : itemCode, setState : setItemCode, style:'regular'},
    {type : 'fixable', newRow : true, size : 7, title: 'itemName', state : itemName, setState : setItemName, style:'regular'},
    {type : 'fixable', newRow : false, size : 5, title: 'supplier', state : supplier, setState : setSupplier, style:'regular'},
    {type : 'fixable', newRow : false, size : 7, title: 'description', state : description, setState : setDescription, style:'regular'},
    {type : 'fixable', newRow : false, size : 5, title: 'maker', state : maker, setState : setMaker, style:'regular'},
    {type : 'fixable', newRow : false, size : 7, title: 'makerModelNo', state : makerModelNo, setState : setMakerModelNo, style:'regular'},
    {type : 'divider', typoGraphy : 'basicInfo'},
    // {type : 'fixable', newRow : false, size : 5, title: 'ceo', state : ceo, setState : setCeo, style:'regular'},
]


  const priceInfoProps = [
    {type : 'fixable', newRow : false, size : 5, title: 'buyingPrice', state : buyingPrice, setState : setBuyingPrice, style:'regular', validation : "number"},
    {type : 'fixable', newRow : false, size : 7, title: 'importTaxRate', state : importTaxRate, setState : setImportTaxRate, style:'regular', validation : "number"},

  ]

  const dimensionInfoProps = [
    {type : 'fixable', newRow : false, size : 4, title: 'width', state : width, setState : setWidth, style:'regular', validation : "number"},
    {type : 'fixable', newRow : false, size : 4, title: 'depth', state : depth, setState : setDepth, style:'regular', validation : "number"},
    {type : 'fixable', newRow : false, size : 4, title: 'height', state : height, setState : setHeight, style:'regular', validation : "number"},
    {type : 'fixable', newRow : false, size : 6, title: 'weight', state : weight, setState : setWeight, style:'regular', validation : "number"},
  ]

  const dimensionReportProps = [
    {type : 'paper', newRow : false, size : 4, title: 'CBM', state : CBM, setState : setCBM, style:'regular'},
    {type : 'paper', newRow : false, size : 4, title: 'deliveryKorea', state : deliveryKorea, setState : setDeliveryKorea, style:'regular'},
    {type : 'paper', newRow : false, size : 4, title: 'packingFee', state : packingFee, setState : setPackingFee, style:'regular'},
    {type : 'paper', newRow : false, size : 4, title: 'seaFreight', state : seaFreight, setState : setSeaFreight, style:'regular'},
    {type : 'paper', newRow : false, size : 4, title: 'airFreight', state : airFreight, setState : setAirFreight, style:'regular'},
    {type : 'paper', newRow : false, size : 4, title: 'handCarryFee', state : handCarryFee, setState : setHandCarryFee, style:'regular'},

    // {type : 'fixable', newRow : false, size : 6, title: 'CBM', state : CBM, setState : setCBM, style:'regular'},
    // {type : 'fixable', newRow : false, size : 6, title: 'weight', state : weight, setState : setWeight, style:'regular'},
  ]


  const reportInfoProps = [
    {type : 'paper', newRow : false, size : 6, title: 'Korea'},
    {type : 'paper', newRow : false, size : 6, title: 'Vietnam'},

    {type : 'paper', newRow : false, size : 3, title: 'STK-V Price:', value : STKVPrice},
    {type : 'paper', newRow : false, size : 3, title: 'USD'},
    {type : 'paper', newRow : false, size : 3, title: 'VN Selling Price:'},
    {type : 'paper', newRow : false, size : 3, title: 'USD'},

    {type : 'fixable', newRow : false, size : 4, title: 'depth', state : depth, setState : setDepth, style:'regular'},
    {type : 'fixable', newRow : false, size : 4, title: 'height', state : height, setState : setHeight, style:'regular'},
    {type : 'fixable', newRow : false, size : 6, title: 'CBM', state : CBM, setState : setCBM, style:'regular'},
    {type : 'fixable', newRow : false, size : 6, title: 'weight', state : weight, setState : setWeight, style:'regular'},
  ]


  const onSubmitUpdated = () => {
    let tempObj1 = {}
    tempObj1[primaryKey] = primaryCode

    let tempObj = {ref : tempObj1, vals : fixedData}
    
    dispatch(actUpdate(tempObj))
  }

  return (
    <>
      <Button className = {classes.right} onClick = {onModeChange}>Fix</Button>
      <Button className = {classes.right} onClick = {onSubmitUpdated}>제출</Button>


      <Grid container>
        {basicInfoProps.map(obj => {
          if(obj.type !== 'divider') {
            return(
              <Grid item xs ={obj.size} className = {classes.marginBottom}>
                <InputST
                  title         = {obj.title}
                  attr          = {'regular'}
                  type          = {obj.type}
                  fixMode       = {fixMode}
                  state         = {obj.state}
                  setState      = {obj.setState}
                  fixedData     = {fixedData}
                  setFixedData  = {setFixedData}
                ></InputST>
              </Grid>
            )
          }
        })}
      </Grid>



      <Grid container>


        <Grid xs = {3}>

          <ProppedInput
            infoProps     = {priceInfoProps}
            fixMode       = {fixMode}
            fixedData     = {fixedData}
            setFixedData  = {setFixedData}
          >
          </ProppedInput>

          <Grid container>
            <Typography id="discrete-slider-small-steps" gutterBottom>
                STK V Var
            </Typography>

            <Slider 
              className = {classes.marginBottom}
              defaultValue={1.02}
              getAriaValueText={onSetSTKVVar}
              aria-labelledby="discrete-slider-small-steps"
              step={0.01}
              marks
              min={1}
              max={1.3}
              valueLabelDisplay="auto"
            />
            <Typography id="discrete-slider-small-steps" gutterBottom>
              STK C Var
            </Typography>
            <Slider
              className = {classes.marginBottom}
              defaultValue={1.2}
              getAriaValueText={onSetSTKCVar}
              aria-labelledby="discrete-slider-small-steps"
              step={0.01}
              marks
              min={1}
              max={1.5}
              valueLabelDisplay="auto"
            />
          </Grid>


          <ProppedInput
            infoProps     = {dimensionInfoProps}
            fixMode       = {fixMode}
            fixedData     = {fixedData}
            setFixedData  = {setFixedData}
          >
          </ProppedInput>


        </Grid>

        <Grid xs = {9}>
          <Grid container>



            <Grid xs = {6}>
              <Paper className={classes.paperKorea}>Korea</Paper>
              <Table>
                <TableContainer>
                  <TableBody>
                    <TableWithColon
                      subject = {'Revenue'}
                      arr = {[
                        ['STK-V Price', ':', STKVPrice, ' USD'],
                      ]}
                      styleAttr = {['150px', '2px,', '150px', '30px']}
                    ></TableWithColon>

                    <TableWithColon
                      subject = {'Cost'}
                      arr = {[
                        ['Default Freight', ':', defaultFreight, ' USD'],
                        ['Buying Price', ':', buyingPrice, ' USD'],
                        ['To Segero', ':', segeroPay, ' USD'],
                      ]}
                      styleAttr = {['150px', '2px,', '150px', '30px']}
                    ></TableWithColon>

                    <TableWithColon
                      subject = {'Summary'}
                      arr = {[
                        ['Profit', ':', profitKR, ' USD'],
                        ['Profit/Cost', ':', profitCostKR, ' USD']
                      ]}
                      styleAttr = {['150px', '2px,', '150px', '30px']}
                    ></TableWithColon>

                  </TableBody>
                </TableContainer>
              </Table>

            </Grid>


            <Grid xs = {6}>
              <Paper className={classes.paperVietnam}>Vietnam</Paper>
              <Table>
                <TableContainer>
                  <TableBody>
                    <TableWithColon
                      subject = {'Revenue'}
                      arr = {[
                        ['VN Selling Price', ':', VNSellingP, ' USD'],
                      ]}
                      styleAttr = {['150px', '2px,', '150px', '30px']}
                    ></TableWithColon>

                    <TableWithColon
                      subject = {'Cost'}
                      arr = {[
                        ['Import Tax', ':', importTax, ' USD'],
                        ['STK-V Price', ':', STKVPrice, ' USD'],
                        ['　', '', '', ''],
                      ]}
                      styleAttr = {['150px', '2px,', '150px', '30px']}
                    ></TableWithColon>

                    <TableWithColon
                      subject = {'Summary'}
                      arr = {[
                        ['Profit', ':', profitVN, ' USD'],
                        ['Profit/Cost', ':', profitCostVN, ' USD']
                      ]}
                      styleAttr = {['150px', '2px,', '150px', '30px']}
                    ></TableWithColon>

                  </TableBody>
                </TableContainer>
              </Table>
            </Grid> 

          </Grid>
        </Grid>





      </Grid>

    </>
    
  )
}

export default ItemAdd