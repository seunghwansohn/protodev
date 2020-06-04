import React from 'react'
import { Field, reduxForm, Fields } from 'redux-form'
import TextField from '@material-ui/core/TextField'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import FormHelperText from '@material-ui/core/FormHelperText'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';


const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      display: 'flex'
    },
    field: {
        padding: theme.spacing(1),
        textAlign: 'left',
        display: 'flex'
    },
    grid: {
        padding: theme.spacing(1),
        textAlign: 'left',
        color : 'white',
        backgroundColor :'#68869A',
        display: 'flex'

    },
}));

const validate = values => {
  const errors = {}
  const requiredFields = [
    'firstName',
    'lastName',
    'email',
    'favoriteColor',
    'notes'
  ]
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required'
    }
  })
  if (
    values.email &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  ) {
    errors.email = 'Invalid email address'
  }
  return errors
}

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

const MaterialUiForm = props => {
  const { handleSubmit, pristine, reset, submitting, fieldsAttr} = props
  const classes = useStyles();

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

  return (
    <form onSubmit={handleSubmit} width={1}>
      <div>
          
        {fields().map(field => {
            return (
                <Field
                    name={field.name}
                    component={field.component}
                    label={field.label}
                    className = {classes.field}
                />

            )
        })}
      </div>
    </form>
  )
}

export default reduxForm({
  form: 'MaterialUiForm', // a unique identifier for this form
  validate,
})(MaterialUiForm)