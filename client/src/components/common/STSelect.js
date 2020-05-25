import React, { useState, useEffect } from "react";
import Select from "react-select";
import Dialog from "@material-ui/core/Dialog";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";

import styled from "styled-components";
import produce  from 'immer'

import axios                from '../../lib/api/axios'


const StyledGrid = styled(Grid)`
  text-align: right;
  vertical-align: middle;
  justify-content: center;
  align-items: center;
`;

const styles = {
    control: styles => ({ ...styles, backgroundColor: "white" }),
    option: styles => ({ ...styles, fontSize : '10px'}),
}

const SelectComp = ({
   options, 
   onChangeVal,
   attr
}) => {

  const {dataType, code, name} = attr
  const [hasExtraValue, setHasExtraValue] = useState(false);
  const [fixedOptions, setFixedOptions] = useState([{ label: "Add New Sort", value: "addNewSort" }]);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [noResult, setNoResult] = useState(false);
  const [selected, setSelected] = useState({});
  const [newSortVal, setNewSortVal] = useState({});


  console.log(dataType)
  const onChange = value => {
    setSelected(value);
  };

  useEffect(() => {
    axios.get('/api/' + dataType + '/load').then(res => {
      let tempArr = fixedOptions
      let vals = res.data.vals
      vals.map(obj => {
        let tempObj = {}
        tempObj.value = obj[code]
        tempObj.label = obj[name]
        tempArr.push(tempObj)

      })
      setFixedOptions(tempArr)
    })
  },[dataType])

  useEffect(() => {
    if (selected.value == 'addNewSort') {
      setDialogOpen(true);
    }
  }, [selected]);


  const filterOption = (option, inputValue) => {
    if (option.label === "Add New Sort") {
      console.log("결과없음");
      const result = options.filter(opt => opt.label.includes(inputValue));
      setHasExtraValue(!result.length);
      setNoResult(true);
      return !result.length;
    }
    return option.label.includes(inputValue);
  };

  const onClickAdd = () => {
    console.log(newSortVal);
  };

  console.log(noResult);
  const onChangeNewSort = event => {
    const { value } = event.target;
    console.log(value);
    let tempObj = {};
    tempObj.label = value;
    tempObj.value = value;
    setNewSortVal(tempObj);
  };

  const onClickClose = () => {
    setDialogOpen(false);
  };

  const onClickAddNClose = () => {
    onClickAdd()
    setDialogOpen(false);
  }

  return (
    <>
      <Select
        key={"color"}
        defaultValue={""}
        isClearable
        isSearchable
        name="dog"
        options={fixedOptions}
        onChange={value => onChange(value)}
        getOptionValue={option => option["id"]}
        menuPlacement = 'top'
        styles = {styles}
        pageSize = {3}
        maxMenuHeight = {80}
        filterOption={filterOption}
      />

      <Dialog open={dialogOpen} maxWidth={"xs"} fullWidth="xs">
        add new Sort
        <Grid container>
          <Grid container style={{ paddingBottom: "20px", paddingTop: "20px" }}>
            <StyledGrid item xs={2}>
              Label
            </StyledGrid>
            <StyledGrid item xs={1}>
              :
            </StyledGrid>
            <Grid
              item
              xs={9}
              style={{ paddingLeft: "20px", textAlign: "left" }}
            >
              <Input value={newSortVal.label} onChange={onChangeNewSort} />
            </Grid>
          </Grid>
          <StyledGrid item xs={2}>
            Value
          </StyledGrid>
          <StyledGrid item xs={1}>
            :
          </StyledGrid>
          <Grid item xs={9} style={{ paddingLeft: "20px", textAlign: "left" }}>
            메롱
          </Grid>
          <Button onClick={onClickAdd}>Add</Button>
          <Button onClick={onClickAddNClose}>Add & Close</Button>

          <Button onClick={onClickClose}>Close</Button>
        </Grid>
      </Dialog>

    </>
  );
};

export default SelectComp;