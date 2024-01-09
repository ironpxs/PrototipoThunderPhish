import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  detallesBotonWrapperD: {
    color: '#f5f5f5',
    padding: 10,
    fontSize: '0.9em',
    marginLeft: '3%',
    marginRight: '3%',
    textAlign: 'justify',
  },
  botonCircularD: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
   
    backgroundColor: '#2196F3',
    color: 'white',
    boxShadow: '0 8px #004eb3, 0 15px 25px rgba(0, 0, 0, 0.7)',
    border: 'none',
    padding: '15px 30px',
    fontSize: '1em',
    borderRadius: 30,
    cursor: 'pointer',
    
  },
  contenedorBotonD : {
    display: 'flex',
    justifyContent: 'center',
    marginTop:'4%',
  },
  botonCircularActiveD: {
    '&:active': {
      transform: 'translateY(7px)', // Mueve el botón hacia abajo
      boxShadow: '0 4px #000000, 0 5px 15px rgba(0, 0, 0, 0.2)', // Sombra más pequeña al presionar
    }
    },
});


const DetallesBoton = ({ classes }) => {
  return (
    <div className={classes.detallesBotonWrapperD}>
      Presiona el botón para leer la explicación generada por OpenAI.
      <div className={classes.contenedorBotonD}>
        <button className={`${classes.botonCircularD} ${classes.botonCircularActiveD}`}>Detalles</button>
      </div>
    </div>
  );
};

export default withStyles(styles)(DetallesBoton);
