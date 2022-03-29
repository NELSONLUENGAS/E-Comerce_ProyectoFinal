import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

export default function AddressForm() {
  return (
    <React.Fragment>
      <Typography variant="h4" gutterBottom>
        Configurá tu Perfil
      </Typography>
      <Typography variant="h6" gutterBottom>
        Esta informacion debe ser correcta
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <TextField
            required
            id="Dirección de correo electronico"
            name="Dirección de correo electronico"
            label="Dirección de correo electronico"
            fullWidth
            autoComplete="given-name"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="Nombre"
            name="Nombre"
            label="Nombre"
            fullWidth
            autoComplete="family-name"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="Segundo Nombre"
            name="Segundo Nombre"
            label="Segundo Nombre"
            fullWidth
            autoComplete="family-name"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="Apellido"
            name="Apellido"
            label="Apellido"
            fullWidth
            autoComplete="family-name"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="Contraseña"
            name="Contraseña"
            label="Contraseña"
            fullWidth
            autoComplete="family-name"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="Confirmar Contraseña"
            name="Confirmar Contraseña"
            label="Confirmar Contraseña"
            fullWidth
            autoComplete="family-name"
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
            label="Acepto los terminos"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}