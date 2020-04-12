import React, {useState, useEffect, useCallback, useMemo}           from 'react'
import { useSelector, useDispatch }  from 'react-redux';

import styled, {createGlobalStyle} from 'styled-components';

import clsx from 'clsx';

import Typography       from '@material-ui/core/Typography';
import Slider           from '@material-ui/core/Slider';
import TextField        from '@material-ui/core/TextField'
import { makeStyles }   from '@material-ui/core/styles';
import Grid             from '@material-ui/core/Grid';
import Button           from '@material-ui/core/Button';
import Paper            from '@material-ui/core/Paper';
import Box              from '@material-ui/core/Box';
import InputAdornment   from '@material-ui/core/InputAdornment';
import IconButton       from '@material-ui/core/IconButton';
import EditIcon         from '@material-ui/icons/Edit';

import { ToastContainer, toast } from 'react-toastify';

import * as calST   from '../lib/calSTValues'
import axios        from 'axios';

import {setSubmitAddItem}   from '../modules/itemList'
import {getExchangeRate}    from '../modules/basicInfo'

const StyledTextField = styled(TextField)`
  background-color: #6772e5;
  display : 'flex';
  &:hover {
    background-color: #5469d4;
  }
`;

const styledGrid = styled(Grid)`
  
`
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
      alignContent: 'center',
      justifyContent : 'center',
      display: 'flex',
      backgroundColor : '#ecdfed',
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
  textField : {
    width: '100%',
    padding: theme.spacing(0),
    justifyContent: 'center',
    display: 'flex',
    fontSize : '18px',

  },
  iconButton : {
    padding: theme.spacing(0),
    justifyContent: 'center',
    alignContent: 'center',
    display: 'flex',
    fontSize : '18px',

  },

}));

// const StyledPapar = styled.textFiend``

let ItemQuery = props => {
  const { initVal, handleSubmit, pristine, reset, submitting, fieldsAttr, onLoad} = props
  const classes = useStyles();
  const dispatch = useDispatch()

  const exchangeRate = useSelector(state => state.basicInfo.exchangeRate)

  const [itemCode, setItemCode]       = React.useState(null);
  const [itemName, setItemName]       = React.useState(null);

  const [supplier, setSupplier]        = React.useState(null);
  const [description, setDescription]  = React.useState(null);

  const [maker, setMaker]                 = React.useState(null);
  const [makerModelNo, setMakerModelNo]   = React.useState(null);

  const [importTaxRate, setImportTaxRate]  = React.useState(0);
  const [importPrice, setImportPrice]      = React.useState(0);
  
  const [buyingPrice, setBuyingPrice]   = React.useState(0);
  const [importTax, setImportTax]       = React.useState(0);

  const [width, setWidth]   = React.useState(0);
  const [depth, setDepth]   = React.useState(0);
  const [height, setHeight] = React.useState(0);
  const [weight, setWeight] = React.useState(0);

  const [CBM, setCBM]                       = React.useState(0);
  const [deliveryKorea, setDeliveryKorea]   = React.useState(0);
  const [seaFreight, setSeaFreight]         = React.useState(0);
  const [airFreight, setAirFreight]         = React.useState(0);
  const [handCarryFee, setHandCarryFee]     = React.useState(0);

  const [STKVPrice, setSTKVPrice]     = React.useState(0);
  const [segeroPay, setSegeroPay]     = React.useState(0);
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

  const [type, setType]               = React.useState({});

  const [disabledForms, setDisabledForms] = React.useState([])

  const [stkCVar, setStkCVar] = React.useState(1.02)
  const [stkVVar, setStkVVar] = React.useState(1.10)

  useEffect(() => {
    axios.post('/api/item/query', {itemName : initVal}).then(res => {
        setItemCode(res.data[0].itemCode)
        setItemName(res.data[0].itemName)
    })
  },[])

  useEffect(() => {
    const CBM             = calST.CBM(width, depth, height)
    const seaFreight      = calST.seaFreight(CBM)
    const airFreight      = calST.airFreight(weight)
    const deliveryKorea   = calST.deliveryKorea(weight)
    const packingFee      = calST.packingFee(CBM)
    const defaultFreight  = calST.defaultFreight(seaFreight, packingFee, exchangeRate.KRW)
    
    setCBM(CBM)
    setSeaFreight(seaFreight)
    setAirFreight(airFreight)
    setDeliveryKorea(deliveryKorea)
    setPackingFee(packingFee)
    setDefaultFreight(defaultFreight)
  },[width, depth, height, weight])

  useEffect(() => {
        const STKVPrice         = calST.STKVPrice(stkVVar, buyingPrice)
        const segeroPay         = calST.segeroPay(STKVPrice)
        const importTax         = calST.importTax(importTaxRate, STKVPrice)
        const VNSellingP        = calST.VNSellingP(STKVPrice, importTax, stkCVar)
        const buyingPriceUSD    = calST.buyingPriceUSD(buyingPrice, exchangeRate.KRW)
        const costKR            = calST.costKR(defaultFreight, segeroPay, buyingPriceUSD)
        const costVN            = calST.costVN(importTax, STKVPrice)
        const profitKR          = calST.profitKR(STKVPrice, costKR)
        const profitVN          = calST.profitKR(VNSellingP, costVN)
        const profitCostKR      = calST.profitCost(profitKR, costKR)
        const profitCostVN      = calST.profitCost(profitVN, costVN)
        const totalProfit       = profitKR + profitVN
        const totalProfitCost   = Math.round(totalProfit/(costKR+costVN - STKVPrice) *10000) /100

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
  },[stkVVar, stkCVar, buyingPrice, importTaxRate, defaultFreight])
  
  useEffect(() => {
    dispatch(getExchangeRate())
  },[])

  function onSetSTKCVar(value) {
    setStkCVar(value)
  }

  function onSetSTKVVar(value) {
    setStkVVar(value)
  }

  const handleChange = useCallback(prop => event => {
    event.preventDefault()
    setType({ ...type, [prop]: event.target.value });
  },[])

  const onSubmit = useCallback(() => {
    let submitValues = {}
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
  }, [])

  const disabledCheck = useCallback((title) => {
    let checkAlready = disabledForms.includes(title)
    if (checkAlready) {
      return false
    }
    else {
      return true
    }
  },[disabledForms])

  const onKeyPressOnForms = useCallback((e, title) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setDisabledForms(disabledForms.filter(title => title !== title))
    }
  },[])
  
  const buttonClicked = useCallback((title) => {
    (function() {
      let checkAlready = disabledForms.includes(title)
      if (checkAlready) {
        setDisabledForms(disabledForms.filter(title => title !== title))
      } else {
        setDisabledForms(disabledForms => [...disabledForms, title])
      }
    }())
  }, [])

  const createInput = (title, state, setState, unit, unitPosition) => {
    let input = 
      <React.Fragment>
        <Grid container item xs = {12}>
          <Grid item xs = {11}>
            <TextField
              disabled = {disabledCheck(title)}
              label={title}
              id={title}
              className={classes.textField}
              InputProps={unitPosition == 'end' ? {
                endAdornment: 
                  <InputAdornment position={unitPosition ? unitPosition : "start"}>
                    <IconButton className = {classes.iconButton} onClick = {() => buttonClicked(title)}>
                      <EditIcon fontSize = {'small'}></EditIcon>
                    </IconButton>
                    {unit}
                  </InputAdornment>,
                } : {
                startAdornment: 
                  <InputAdornment position={unitPosition ? 
                    unitPosition : "start"}>
                    <IconButton className = {classes.iconButton} onClick = {() => buttonClicked(title)}>
                      <EditIcon fontSize = {'small'}></EditIcon>
                    </IconButton>
                    {unit}
                  </InputAdornment>,
                }
              }
              value={state == 0 ? null : state} 
              onChange={(e) => setState(e.target.value)}
              onKeyPress = {function(e) {onKeyPressOnForms(e,title)}}
            />
          </Grid>
        </Grid>
      </React.Fragment>
    return input
  }

  return (
    <React.Fragment>
      <Grid 
      container className = {classes.grid} spacing={0}>
        <Grid item xs = {12}>
          <Grid container className = {classes.grid} spacing={0}>
            <Grid item xs = {3}> {createInput('itemCode', itemCode, setItemCode)}</Grid>
            <Grid item xs = {9}> {createInput('itemName', itemName, setItemName)} </Grid>
          </Grid>
        </Grid>
        <Grid item xs = {12}>
          <Grid container className = {classes.grid} spacing={0}>
            <Grid item xs = {3}> {createInput('supplier', supplier, setSupplier)} </Grid>
            <Grid item xs = {9}> {createInput('description', description, setDescription)} </Grid>
          </Grid>
        </Grid>
        <Grid item xs = {12}>
          <Grid container className = {classes.grid} spacing={0}>
            <Grid item xs = {3}> {createInput('maker', maker, setMaker)} </Grid>
            <Grid item xs = {9}> {createInput('makerModelNo', makerModelNo, setMakerModelNo)} </Grid>
          </Grid>
        </Grid>
    
        <Grid container item xs = {3} className = {classes.gridPrice} spacing={0}>
            <Grid item xs ={12}> {createInput('buyingPrice', buyingPrice, setBuyingPrice, 'KRW')} </Grid>
            <Grid item xs ={12}> {createInput('importTaxRate', importTaxRate, setImportTaxRate, '%', 'end')}</Grid>
            <Grid item xs ={12}> 
              <Typography id="discrete-slider-small-steps" gutterBottom>
                STK V Var
              </Typography>
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
            {createInput('width', width, setWidth, '(cm)', 'start')}
            {createInput('depth', depth, setDepth, '(cm)', 'start')}
            {createInput('height', height, setHeight, '(cm)', 'start')}
            {createInput('weight', weight, setWeight, '(kg)', 'start')}
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
        {/* <Grid item xs = {12}>{createField('note', renderTextField, 'fieledNote')} </Grid> */}
      </Grid>
      <Button variant="contained" onClick = {onSubmit}>Submit</Button>
    </React.Fragment>
  )
}

export default ItemQuery