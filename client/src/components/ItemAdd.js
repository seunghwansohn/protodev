import React, {useState, useEffect}           from 'react'
import { connect, useSelector, useDispatch }  from 'react-redux';
import { Field, reduxForm, Fields }           from 'redux-form'

import axios                          from 'axios';


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
import Box from '@material-ui/core/Box';
import { ToastContainer, toast } from 'react-toastify';

import {generateRandom}               from '../lib/common';

import { getExchangeRate } from '../modules/basicInfo'

import {load, sliderStKVVar, sliderStKCVar} from '../modules/reduxForm'

import spacelize  from '../lib/spacelize'
import * as cal   from '../lib/calSTValues'

import InputST          from './common/Input'

import {actSubmitAddItem} from '../modules/itemList'

toast.configure()

const useStyles = makeStyles(theme => ({
  root: {
      flexGrow: 1,
      display: 'flex'
  },
  fieldItem: {
      padding: theme.spacing(0.5),
      textAlign: 'left',
      display: 'flex',
      backgroundColor: '#ebf2f5',
      verticalAlign:'top'
  },
  fieldInfo: {
      padding: theme.spacing(0.5),
      textAlign: 'left',
      display: 'flex',
      backgroundColor: '#e0eddf'
  },
  fieldPrice: {
      padding: theme.spacing(0),
      textAlign: 'left',
      display: 'flex',
      backgroundColor: '#ecdfed'
  },
  fieledDimension: {
      padding: theme.spacing(0.5),
      textAlign: 'left',
      display: 'flex',
      backgroundColor: '#f4faca'
  },
  fieledFreight: {
      padding: theme.spacing(0),
      textAlign: 'left',
      display: 'flex',
      backgroundColor: '#ffdbfd'
  },
  fieledNote: {
      padding: theme.spacing(0),
      textAlign: 'left',
      display: 'flex',
      backgroundColor: '#dbffe4'
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
  paperAlignLeft: {
    padding: theme.spacing(1),
    textAlign: 'left',
    color : 'black',
    alignItems: 'left',
    justifyContent: 'left',
    backgroundColor: '#ffdbfd',
    display: 'flex',
    fontSize : '18px'
  },
  revenueTitle: {
    padding: theme.spacing(1),
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    color : 'black',
    backgroundColor: '#cce6ff',
    display: 'flex',
    fontSize : '18px'
  },
  revenueAmount: {
    padding: theme.spacing(1),
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    color : 'black',
    backgroundColor: '#cce6ff',
    display: 'flex',
    fontSize : '18px'
  },

  paperAlignRight: {
    padding: theme.spacing(1),
    textAlign: 'right',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    color : 'black',
    backgroundColor: '#ffdbfd',
    display: 'flex',
    fontSize : '18px'
  },
  paperAlignCenter : {
    padding: theme.spacing(0),
    color : 'black',
    backgroundColor: '#efdbfd',
    justifyContent: 'center',
    display: 'flex',
    fontSize : '18px'
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
  paperDeliveryInfo : {
    padding: theme.spacing(0.3),
    color : 'black',
    backgroundColor: '#ffcc99',
    justifyContent: 'flex-start',
    display: 'flex',
    fontSize : '18px',
    textIndent : '20px'
  },
  importantFactor : {
    padding: theme.spacing(0),
    // textAlign: 'center',
    color : 'black',
    backgroundColor: '#efdbfd',
    display: 'flex',
    fontSize : '23px'
  },
  paperProfitTitle : {
    padding: theme.spacing(1),
    color : 'black',
    backgroundColor: '#ffff66',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    display: 'flex',
    fontSize : '18px',
  },
  paperProfitAmount : {
    padding: theme.spacing(1),
    color : 'black',
    backgroundColor: '#ffff66',
    justifyContent: 'flex-start',
    display: 'flex',
    fontSize : '18px',
  },
  paperProfitTotal : {
    padding: theme.spacing(1),
    color : 'black',
    backgroundColor: '#66ff66',
    justifyContent: 'center',
    display: 'flex',
    fontSize : '23px',
  },

}));

const validate = values => {
  const errors = {}
  const requiredFields = [
    'itemCode',
    'itemName',
  ]
  requiredFields.forEach(field => {
    if (!values[field]) {
        errors[field] = 'Required'
    }
  })
  return errors
}

const required = value => value ? undefined : 'Required'
const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined
const maxLength15 = maxLength(15)
const number = value => value && isNaN(Number(value)) ? 'Must be a number' : undefined
const minValue = min => value =>
  value && value < min ? `Must be at least ${min}` : undefined
const minValue18 = minValue(18)

const renderTextField = ({
  label,
  input,
  meta: { touched, invalid, error },
  ...custom
}) => {
  return (
    <TextField
        label={label}
        placeholder={label}
        error={touched && invalid}
        helperText={touched && error}
        {...input}
        {...custom}
    />
  )
}
const renderCheckbox = ({ input, label }) => {
  return (
    <div>
      <FormControlLabel
      control={
        <Checkbox
          checked={input.value ? true : false}
          onChange={input.onChange}
        />
      }
      label={label}
      />
    </div>
  )
}
const radioButton = ({ input, ...rest }) => {
  return (
    <FormControl>
        <RadioGroup {...input} {...rest}>
        <FormControlLabel value="female" control={<Radio />} label="Female" />
        <FormControlLabel value="male" control={<Radio />} label="Male" />
        <FormControlLabel value="other" control={<Radio />} label="Other" />
        </RadioGroup>
    </FormControl>
  )
}
const renderFromHelper = ({ touched, error }) => {
  if (!(touched && error)) {
      return
  } else {
      return <FormHelperText>{touched && error}</FormHelperText>
  }
}

const renderSelectField = ({
  input,
  label,
  meta: { touched, error },
  children,
  ...custom
}) => 
{ 
  return (
    <FormControl error={touched && error}>
      <InputLabel htmlFor="color-native-simple">{label}</InputLabel>
      <Select
      native
      {...input}
      {...custom}
      inputProps={{
          name: input.name,
          id: 'color-native-simple'
      }}
      >
      {children}
      </Select>
      {renderFromHelper({ touched, error })}
    </FormControl>
  )
}


let ItemAdd = ({motherType, motherNo, reqKey, reqCode}) => {
  const [fixMode, setFixMode]         = useState(false)
  const [fixedData, setFixedData]     = useState([])

  const [loadedData, setLoadedData]     = useState([])

  const [primaryKey, setPrimaryKey]   = useState('')
  const [primaryCode, setPrimaryCode] = useState('')

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


  console.log(loadedData)

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

  console.log(exchangeRate)

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
      console.log(loadedData)
      if (loadedData.hasOwnProperty(obj.title)) {
        console.log('값있음')
        obj.setState(loadedData[obj.title])
      }
    })
    priceInfoProps.map(obj => {
      console.log(loadedData)
      if (loadedData.hasOwnProperty(obj.title)) {
        console.log('값있음')
        obj.setState(loadedData[obj.title])
      }
    })
    dimensionInfoProps.map(obj => {
      console.log(loadedData)
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

  const onFixedVal = (fixedArr) => {
    let tempObj = {}
    tempObj.ref = {}
    tempObj.vals = {}
    tempObj.ref[primaryKey] = primaryCode
    Object.keys(fixedData).map(key => {
      tempObj.vals[key] = fixedData[key]
    })
    // onUpdate(tempObj)
  }




  const createField = (name, component,style, normalize) => {
    let field = <Field name={name} component={renderTextField} label={spacelize(name)} value = {'fe'} className = {classes[style]}  normalize={normalize} validate={[ required ]}/>
    return field
  }
  // const onSubmit = () => {
  //   let submitValues = formValues
  //   submitValues.stkCVar = stkCVar
  //   submitValues.stkVVar = stkVVar
  //   const required = ['itemCode', 'itemName', 'supplier', 'maker' ]
  //   const error = []
  //   required.map(item => {
  //       if (submitValues[item] == '' || submitValues[item] == null || submitValues[item] == undefined) {
  //         error.push(item + ' is required')
  //       }
  //   })
  //   if (error.length !== 0) {
  //     error.map(error => {
  //       toast(error)
  //     })
  //   } else {
  //     dispatch(actSubmitAddItem(submitValues))
  //   }
  // }

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
    {type : 'fixable', newRow : false, size : 5, title: 'buyingPrice', state : buyingPrice, setState : setBuyingPrice, style:'regular'},
    {type : 'fixable', newRow : false, size : 7, title: 'importTaxRate', state : importTaxRate, setState : setImportTaxRate, style:'regular'},

  ]

  const dimensionInfoProps = [
    {type : 'fixable', newRow : false, size : 4, title: 'width', state : width, setState : setWidth, style:'regular'},
    {type : 'fixable', newRow : false, size : 4, title: 'depth', state : depth, setState : setDepth, style:'regular'},
    {type : 'fixable', newRow : false, size : 4, title: 'height', state : height, setState : setHeight, style:'regular'},
    {type : 'fixable', newRow : false, size : 6, title: 'CBM', state : CBM, setState : setCBM, style:'regular'},
    {type : 'fixable', newRow : false, size : 6, title: 'weight', state : weight, setState : setWeight, style:'regular'},
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


  return (
    <>
      <Button className = {classes.right} onClick = {onModeChange}>Fix</Button>

        
      <Grid container>
      {basicInfoProps.map(obj => {
        if(obj.type !== 'divider') {
          return(
            <Grid item xs ={obj.size} className = {classes.root}>
              <InputST
                title         = {obj.title}
                attr          = {'regular'}
                type          = {obj.type}
                fixMode       = {fixMode}
                state         = {obj.state}
                setState      = {obj.setState}
                fixedData     = {fixedData}
                setFixedData  = {setFixedData}
                onFixedVal    = {onFixedVal}
                loadedData     = {loadedData ? loadedData : null}
              ></InputST>
            </Grid>
          )
        }
      })}
      </Grid>

      <Grid container>
        <Grid xs = {3}>
          <Grid container>
            {priceInfoProps.map(obj => {
              if(obj.type !== 'divider') {
                return(
                  <InputST
                    title         = {obj.title}
                    attr          = {'regular'}
                    type          = {obj.type}
                    fixMode       = {fixMode}
                    state         = {obj.state}
                    setState      = {obj.setState}
                    fixedData     = {fixedData}
                    setFixedData  = {setFixedData}
                    onFixedVal    = {onFixedVal}
                    loadedData     = {loadedData ? loadedData : null}
                  ></InputST>
                )
              }
            })}
            <Slider
              defaultValue={1.02}
              getAriaValueText={onSetSTKVVar}
              aria-labelledby="discrete-slider-small-steps"
              step={0.01}
              marks
              min={1}
              max={1.3}
              valueLabelDisplay="auto"
            />
            <Slider
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
        </Grid>

        <Grid xs = {9}>
          <Grid container>
            <Grid xs = {6}>
              <Paper className={classes.paperKorea}>Korea</Paper>

              <Grid container className={classes.root}>
                <Grid xs = {6}>
                  <Paper className={classes.revenueTitle}>STK-V Price:</Paper>
                </Grid>
                <Grid xs = {6}>
                  <Paper className={classes.revenueTitle}>{STKVPrice}USD</Paper>
                </Grid>
              </Grid>

              <Grid container className={classes.root}>
                <Grid xs = {6}>
                  <Paper className={classes.revenueTitle}>Default Freight</Paper>
                </Grid>
                <Grid xs = {6}>
                  <Paper className={classes.revenueTitle}>{defaultFreight}USD</Paper>
                </Grid>
              </Grid>

              <Grid container className={classes.root}>
                <Grid xs = {6}>
                  <Paper className={classes.revenueTitle}>BuyingPrice</Paper>
                </Grid>
                <Grid xs = {6}>
                  <Paper className={classes.revenueTitle}>{buyingPrice}USD</Paper>
                </Grid>
              </Grid>

              <Grid container className={classes.root}>
                <Grid xs = {6}>
                  <Paper className={classes.revenueTitle}>To Segero</Paper>
                </Grid>
                <Grid xs = {6}>
                  <Paper className={classes.revenueTitle}>{segeroPay}USD</Paper>
                </Grid>
              </Grid>

              <Grid container className={classes.root}>
                <Grid xs = {6}>
                  <Paper className={classes.revenueTitle}>Profit</Paper>
                </Grid>
                <Grid xs = {6}>
                  <Paper className={classes.revenueTitle}>{profitKR}USD</Paper>
                </Grid>
              </Grid>

              <Grid container className={classes.root}>
                <Grid xs = {6}>
                  <Paper className={classes.revenueTitle}>Profit/Cost</Paper>
                </Grid>
                <Grid xs = {6}>
                  <Paper className={classes.revenueTitle}>{profitCostKR}%</Paper>
                </Grid>
              </Grid>

            </Grid>

            <Grid xs = {6}>
              <Paper className={classes.paperKorea}>Korea</Paper>

              <Grid container className={classes.root}>
                <Grid xs = {6}>
                  <Paper className={classes.revenueTitle}>VN Selling Price:</Paper>
                </Grid>
                <Grid xs = {6}>
                  <Paper className={classes.revenueTitle}>{VNSellingP}USD</Paper>
                </Grid>
              </Grid>

              <Grid container className={classes.root}>
                <Grid xs = {6}>
                  <Paper className={classes.revenueTitle}>Import Tax</Paper>
                </Grid>
                <Grid xs = {6}>
                  <Paper className={classes.revenueTitle}>{importTax}USD</Paper>
                </Grid>
              </Grid>

              <Grid container className={classes.root}>
                <Grid xs = {6}>
                  <Paper className={classes.revenueTitle}>STK-V Price</Paper>
                </Grid>
                <Grid xs = {6}>
                  <Paper className={classes.revenueTitle}>{STKVPrice}USD</Paper>
                </Grid>
              </Grid>

              <Grid container className={classes.root}>
                <Grid xs = {6}>
                  <Paper className={classes.revenueTitle}></Paper>
                </Grid>
                <Grid xs = {6}>
                  <Paper className={classes.revenueTitle}></Paper>
                </Grid>
              </Grid>

              <Grid container className={classes.root}>
                <Grid xs = {6}>
                  <Paper className={classes.revenueTitle}>Profit</Paper>
                </Grid>
                <Grid xs = {6}>
                  <Paper className={classes.revenueTitle}>{profitVN}USD</Paper>
                </Grid>
              </Grid>

              <Grid container className={classes.root}>
                <Grid xs = {6}>
                  <Paper className={classes.revenueTitle}>Profit/Cost</Paper>
                </Grid>
                <Grid xs = {6}>
          <Paper className={classes.revenueTitle}>{profitCostVN}%</Paper>
                </Grid>
              </Grid>

            </Grid>

            <Grid xs = {6}></Grid>
          </Grid>
        </Grid>

        <Grid xs = {3}>
          <Grid container>
            {dimensionInfoProps.map(obj => {
              if(obj.type == 'fixable') {
                return(
                    <InputST
                      title         = {obj.title}
                      attr          = {'regular'}
                      type          = {obj.type}
                      fixMode       = {fixMode}
                      state         = {obj.state}
                      setState      = {obj.setState}
                      fixedData     = {fixedData}
                      setFixedData  = {setFixedData}
                      onFixedVal    = {onFixedVal}
                      loadedData     = {loadedData ? loadedData : null}
                    ></InputST>
                )
              }
            })}
          </Grid>
        </Grid>

        <Grid xs = {5}>
            {dimensionReportProps.map(obj => {
              if(obj.type == 'paper') {
                return(
                <Grid container>

                  <Grid item xs = {6}>
                    <Paper className={classes.revenueTitle}>
                      {obj.title}
                    </Paper>
                  </Grid>
                  <Grid item xs = {6}>
                    <Paper className={classes.revenueTitle}>
                      {obj.state}
                    </Paper>
                  </Grid>
                </Grid>
                )
              }
            })}
        </Grid>

      </Grid>

      <Grid container xs = {12}>
        <Grid item xs = {5}>
          
        </Grid>
      </Grid>
    </>
    
  )

        
}

export default ItemAdd