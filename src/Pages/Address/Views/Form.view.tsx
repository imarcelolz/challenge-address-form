import { Button, Grid, TextField, Typography } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import React, { ChangeEvent, useState } from 'react';
import { FormViewProps } from './Form.types';

const FormView = (props: FormViewProps) => {
  const { user, validation } = props;
  const submitDisabled = !(user.name && user.address);
  const [cities, setCities] = useState([]);

  const onKeyPress = async (event) => { // this method should be debounced for proper usage
    const query = event.target.value + event.key;
    const result = await props.onSearch(query);

    setCities(result);
  };

  const onChange = (propName: string) => (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    props.onChange({ [propName]: event.target.value });
  };

  const onPostalCodeBlur = () => {
    props.validate(user);
  };

  const renderInput = (params) => (
    <TextField
      {...params}
      className="city"
      label="City"
      variant="outlined"
      onKeyPress={onKeyPress}
    />
  );

  return (
    <Grid container direction="row" spacing={2}>
      <Grid item md={12}>
        <Typography variant="h4">Pincamp Address Form</Typography>
        <Typography variant="caption">
          Please fill all the fields bellow
        </Typography>
      </Grid>

      <Grid item md={12}>
        <TextField
          className="name"
          fullWidth
          label="Name"
          onChange={onChange('name')}
          required
          value={user.name}
          variant="outlined"
        />
      </Grid>

      <Grid item md={12}>
        <TextField
          className="address"
          fullWidth
          label="Address"
          onChange={onChange('address')}
          required
          value={user.address}
          variant="outlined"
        />
      </Grid>

      <Grid item md={6}>
        <TextField
          className="postalCode"
          error={!!validation?.postalCode}
          fullWidth
          helperText={validation?.postalCode}
          label="PostalCode"
          onBlur={onPostalCodeBlur}
          onChange={onChange('postalCode')}
          value={user.postalCode}
          variant="outlined"
        />
      </Grid>

      <Grid item md={6}>
        <Autocomplete
          fullWidth
          value={user.city}
          options={cities}
          renderInput={renderInput}
        />
      </Grid>

      <Grid item>
        <Button
          onClick={props.onSubmit}
          disabled={submitDisabled}
          variant="contained"
          className="submit"
        >
          Submit
        </Button>
      </Grid>
    </Grid>
  );
};

FormView.defaultProps = {
  user: { name: '', address: '', postalCode: '', city: '' },
  onChange: () => {},
  onSearch: () => Promise.resolve([]),
  onSubmit: () => {},
  validate: () => Promise.resolve(true),
};

export default FormView;
