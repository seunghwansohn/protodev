import React, {useState, useEffect}           from 'react'
import { connect, useSelector, useDispatch }  from 'react-redux';
import { Field, reduxForm, Fields }           from 'redux-form'

import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
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


import { getExchangeRate } from '../modules/basicInfo'

import {load, sliderStKVVar, sliderStKCVar} from '../modules/reduxForm'

import spacelize  from '../lib/spacelize'
import * as cal   from '../lib/calSTValues'

import {setSubmitAddItem} from '../modules/itemList'

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
      backgroundColor: '#ebf2f5'
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


let ItemAdd = props => {
  const { handleSubmit, pristine, reset, submitting, fieldsAttr, onLoad, onSetStkVVar, onSetStkCVar} = props
  const classes = useStyles();
  const dispatch = useDispatch()
  const formValues = useSelector(state => state.form.itemAdd.values)
  const {
    buyingPrice, 
    importTaxRate, 
    importPrice, 
    width,
    depth,
    height,
    weight
  } = formValues

  const {stkVVar, stkCVar} = useSelector(state => state.reduxFormInit)

  const exchangeRate = useSelector(state => state.basicInfo.exchangeRate)

  const [CBM, setCBM]                       = React.useState(0);
  const [deliveryKorea, setDeliveryKorea]   = React.useState(0);
  const [seaFreight, setSeaFreight]         = React.useState(0);
  const [airFreight, setAirFreight]         = React.useState(0);
  const [handCarryFee, setHandCarryFee]     = React.useState(0);
  const [STKVPrice, setSTKVPrice]     = React.useState(0);
  const [segeroPay, setSegeroPay]     = React.useState(0);
  const [importTax, setImportTax]     = React.useState(0);
  const [packingFee, setPackingFee]     = React.useState(0);
  const [defaultFreight, setDefaultFreight]     = React.useState();
  const [VNSellingP, setVNSellingP]     = React.useState(0);
  const [buyingPriceUSD, setBuyingPriceUSD] = React.useState(0);
  const [profitKR, setProfitKR] = React.useState(0);
  const [profitVN, setProfitVN] = React.useState(0);
  const [costKR, setCostKR] = React.useState(0);
  const [costVN, setCostVN] = React.useState(0);
  const [profitCostKR, setProfitCostKR] = React.useState(0);
  const [profitCostVN, setProfitCostVN] = React.useState(0);
  const [totalProfit, setTotalProfit] = React.useState(0);
  const [totalProfitCost, setTotalProfitCost] = React.useState(0);


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

  const fields = () => {
    let fields = []
    if(Array.isArray(fieldsAttr) && fieldsAttr.length > 0) {
      fieldsAttr.map(field => {
        let newObj = {}
        newObj = field
        newObj.component = eval(field.component)
        fields.push(newObj)
      })
    }
    return fields
  }

  function valuetext(value) {
    dispatch(sliderStKVVar(value))
  }

  function onSetSTKCVar(value) {
    dispatch(sliderStKCVar(value))
  }


  const onCheck = () => { 
    let submitValues = formValues
    submitValues.stkCVar = stkCVar
    submitValues.stkVVar = stkVVar
  }

  const createField = (name, component,style, normalize) => {
    let field = <Field name={name} component={renderTextField} label={spacelize(name)} className = {classes[style]}  normalize={normalize} validate={[ required ]}/>
    return field
  }
  const onSubmit = () => {
    let submitValues = formValues
    submitValues.stkCVar = stkCVar
    submitValues.stkVVar = stkVVar
    const required = ['itemCode', 'itemName', 'supplier', 'maker' ]
    const error = []
    required.map(item => {
        if (submitValues[item] == '' || submitValues[item] == null || submitValues[item] == undefined) {
          error.push(item + ' is required')
        }
    })
    if (error.length !== 0) {
      error.map(error => {
        toast(error)
      })
    } else {
      dispatch(setSubmitAddItem(submitValues))
    }
  }

  return (
    <div>
      <Grid container xs = {12} className = {classes.grid} spacing={0}>
        <Grid item xs = {12}>
          <Grid container className = {classes.grid} spacing={0}>
            <Grid item xs = {3}> {createField('itemCode', renderTextField,'fieldItem')} </Grid>
            <Grid item xs = {9}> {createField('itemName', renderTextField, 'fieldItem')} </Grid>
          </Grid>
        </Grid>
        <Grid item xs = {12}>
          <Grid container className = {classes.grid} spacing={0}>
            <Grid item xs = {3}> {createField('supplier', renderTextField, 'fieldInfo')} </Grid>
            <Grid item xs = {9}> 
              <Field name={'description'} 
                component={renderTextField} 
                label={spacelize('description')} 
                className = {classes.fieldPrice} 
                placeholder = 'description'>
              </Field>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs = {12}>
          <Grid container className = {classes.grid} spacing={0}>
            <Grid item xs = {3}> {createField('maker', renderTextField, 'fieldInfo')} </Grid>
            <Grid item xs = {9}> 
              <Field name={'makerModelNo'} 
                component={renderTextField} 
                label={spacelize('makerModelNo')} 
                className = {classes.fieldPrice} 
                placeholder = {spacelize('makerModelNo')}>
              </Field>
            </Grid>
          </Grid>
        </Grid>
    
        <Grid container item xs = {3} className = {classes.gridPrice} spacing={0}>
            <Grid item xs ={12}> 
              <Field name={'buyingPrice'} 
                  component={renderTextField} 
                  label={spacelize('buyingPrice') + ' (KRW)'} 
                  className = {classes.fieldPrice} 
                  validate={[ number ]}
                  placeholder = 'buyingPrice (KRW)'>
              </Field>
            </Grid>
            <Grid item xs ={12}> 
              <Field name={'importTaxRate'} 
                  component={renderTextField} 
                  label={spacelize('importTaxRate') + ' (%)'} 
                  className = {classes.fieldPrice} 
                  validate={[ number ]}
                  placeholder = 'Import Tax Rate (%)'>
                    cm
              </Field>
            </Grid>
            <Grid item xs ={12}> 
              <Typography id="discrete-slider-small-steps" gutterBottom>
                STK V Var
              </Typography>
              <Slider
                defaultValue={1.02}
                getAriaValueText={valuetext}
                aria-labelledby="discrete-slider-small-steps"
                step={0.01}
                marks
                min={1}
                max={1.3}
                valueLabelDisplay="auto"
              />
            </Grid>
            <Grid item xs ={12}> 
              <Typography id="discrete-slider-small-steps" gutterBottom>
                STK C Var
              </Typography>
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
        
        <Grid container item xs = {9} spacing={0}>
          <Grid container item xs = {6} spacing={0}>
            <Grid item xs = {12}>
              <Paper className={classes.paperKorea}>
                Korea
              </Paper>
            </Grid>
            <Grid item xs = {6}>
              <Paper className={classes.revenueTitle}>
                STK-V Price: <br></br>
              </Paper>
              <Paper className={classes.paperAlignRight}>
                Default Freight: <br/> 
                Buying Price: <br/> 
                To Segero: <br/>
              </Paper>
              <Paper className={classes.paperProfitTitle}>
                Profit: <br></br>
                Profit/Cost: <br></br>
              </Paper>
            </Grid>
            <Grid item xs = {6}>
              <Paper className={classes.revenueAmount}>
                {STKVPrice} USD <br></br>
              </Paper>
              <Paper className={classes.paperAlignLeft}>
                {defaultFreight} USD <br/> 
                {buyingPriceUSD} USD <br/> 
                {segeroPay} USD<br/> 
              </Paper>
              <Paper className={classes.paperProfitAmount}>
                {profitKR} USD <br></br>
                {profitCostKR} % <br></br>
              </Paper>
            </Grid>
          </Grid>
          <Grid container item xs = {6} spacing={0}>
            <Grid item xs = {12}>
              <Paper className={classes.paperVietnam}>
               Vietnam
              </Paper>
            </Grid>
            <Grid item xs = {6}>
              <Paper className={classes.revenueTitle}>
                VN Selling Price: <br></br>
              </Paper>
              <Paper className={classes.paperAlignRight}>
                Import Tax: <br/> 
                STK-V Price: <br/> 
                <br></br>
              </Paper>
              <Paper className={classes.paperProfitTitle}>
                Profit: <br></br>
                Profit/Cost: <br></br>
              </Paper>
            </Grid>
            <Grid item xs = {6}>
              <Paper className={classes.revenueAmount}>
                {VNSellingP} USD <br></br>
              </Paper>
              <Paper className={classes.paperAlignLeft}>
                {importTax} USD <br/> 
                {STKVPrice} USD<br/>
                <br></br>
              </Paper>
              <Paper className={classes.paperProfitAmount}>
                {profitVN} USD <br></br>
                {profitCostVN} % <br></br>
              </Paper>
            </Grid>

          </Grid>
          <Grid item xs = {12}>
            <Paper className={classes.paperProfitTotal}>
              Total Profit: {totalProfit} USD <br></br>
              Total Profit/Cost = {totalProfitCost} % 
            </Paper>
          </Grid>
          <Grid item xs = {3}>
          </Grid>
            <br></br>
            <br></br>
        </Grid>

        <Grid item xs = {3}> 
            <Field name={'width'} 
              component={renderTextField} 
              label={spacelize('width') + ' (cm)'} 
              className = {classes.fieledDimension} 
              validate={[ number ]}
              placeholder = 'width (cm)'>
                cm
            </Field>
            <Field name={'depth'} 
              component={renderTextField} 
              label={spacelize('depth') + ' (cm)'} 
              className = {classes.fieledDimension} 
              validate={[ number ]}
              placeholder = 'depth (cm)'>
                cm
            </Field>
            <Field name={'height'} 
              component={renderTextField} 
              label={spacelize('height') + ' (cm)'} 
              className = {classes.fieledDimension} 
              validate={[ number ]}
              placeholder = 'height (cm)'>
                cm
            </Field>
            <Field name={'weight'} 
              component={renderTextField} 
              label={spacelize('weight') + ' (kg)'} 
              className = {classes.fieledDimension} 
              validate={[ number ]}
              placeholder = 'weight (kg)'>
                cm
            </Field>
        </Grid>
        <Grid item xs = {6}> 
          <Paper className={classes.paperDeliveryInfo}> CBM: {CBM} </Paper>
          <Paper className={classes.paperDeliveryInfo}> Delivery Korea: {deliveryKorea}</Paper>
          <Paper className={classes.paperDeliveryInfo}> Packing Fee {packingFee} </Paper>
          <Paper className={classes.paperDeliveryInfo}> Sea Freight: {seaFreight}      </Paper>
          <Paper className={classes.paperDeliveryInfo}> Air Freight: {airFreight}      </Paper>
          <Paper className={classes.paperDeliveryInfo}> Hand Carry Fee: {handCarryFee} </Paper>
        </Grid>

        <Grid item xs = {3}>
              <Box bgcolor="secondary.main" color="secondary.contrastText" p={0}>
                ExchangeRate <br></br>
                $ 1 = KRW {Math.round(exchangeRate.KRW * 100)/100} <br></br>               
                $ 1 = VND {Math.round(exchangeRate.VND * 100)/100}
              </Box>
        </Grid>
        <Grid item xs = {12}>{createField('note', renderTextField, 'fieledNote')} </Grid>
      </Grid>
      <Button variant="contained" onClick = {onSubmit}>Submit</Button>
      <Button variant="contained" onClick = {onCheck}>Check</Button>

    </div>
  )
}

ItemAdd = reduxForm({
  form: 'itemAdd', // a unique identifier for this form
  validate,
})(ItemAdd)

ItemAdd = connect(
  state => ({
    initialValues: state.reduxFormInit // pull initial values from account reducer
  }),
  {
    onLoad : load,
  }
)(ItemAdd)

export default ItemAdd