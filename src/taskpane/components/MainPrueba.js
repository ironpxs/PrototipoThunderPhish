import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import Encabezado from './Encabezado';
import IndicadorNivelSeguridad from './IndicadorNivelSeguridad';
import DetallesBoton from './DetallesBoton';
import EnviarRevisionBoton from './EnviarRevisionBoton';

import Authentication from "./Authentication";
import Content from "./Content";
import Sender from "./Sender";
import Link from "./Links";
import Attachment from "./Attachments";

const styles = theme => ({
  mainPruebaContainer: {
    margin: 0,
    padding: 0,
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#000000',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  h2: {
    marginLeft: '3%',
    marginRight: '3%',
  },
  notShown: {
    display: 'none',
  }
});

class MainPrueba extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      Authentication: '',
      authScore: 0,
      sendScore: 0,
      messageScore: 0,
      linkScore: 0,
      attachmentScore: 0,
      totVal: 0,
      safetyType: '',
    };
  }

  componentDidMount(){
    this.getData();
  }

  //handlers that fetches percent score evaluation from the other components:
  handleMessage = (messageValue) => {
    this.setState({messageScore: messageValue});
    // this.progBar(messageValue, "content");
  }

  handleSender = (senderValue) => {
    this.setState({sendScore: senderValue});
    // this.progBar(senderValue, "send");
  }
  handleLink = (linkValue) => {
    this.setState({linkScore: linkValue});
    // this.progBar(linkValue, "links");
  }
  handleAttachment = (attachmentValue) => {
    this.setState({attachmentScore: attachmentValue});
    // this.progBar(attachmentValue, "attach");
  }

  handleAttributeValues = (messageValue, senderValue, linkValue,attachmentValue) => {
    this.setState({
      messageScore: messageValue,
      senderScore: senderValue,
      linkScore: linkValue,
      attachmentScore: attachmentValue,
    });
  }

    //Delaying fetching the data to get the right calculation.
    getData = async () => {
      setTimeout(() => {
        this.totEvaluation(this.state.messageScore, this.state.sendScore, this.state.linkScore,this.state.attachmentScore);
      }, 800)
    }

    //Total evaluation of all the fetched evaluation percent scores
    totEvaluation = async (a,b,c,d) => {
      console.log(a,b,c,d);
      var numA = parseInt(a);
      var numB = parseInt(b);
      var numC = parseInt(c);
      var numD = parseInt(d);
      var value = ((numA + numB + numC + numD)/4);
      let self = this;
      var roundedScore = value.toFixed(0);
      self.setState({
        totVal: roundedScore,
      });
      self.progBar(roundedScore, "tot_ev");
      self.progBar(roundedScore, "safetyLevel");
      console.log(this.state.totVal);
    }

    //Giving colour to percent bar based on percent score.
    progBar = async (c, text) => {
      var elem = document.getElementById(text);
      var width = c;
      elem.style.width = "100%";
        if(width <= 25){
          elem.style.backgroundColor = "#f44336";
          this.setState({safetyType: 'NO'});

        } else if(width > 25 && width <= 50){
          elem.style.backgroundColor = "#ff9800";
          this.setState({safetyType: 'LOW'});

        } else if(width > 50 && width <= 75){
          elem.style.backgroundColor = "#e0ca00";
          this.setState({safetyType: 'MEDIUM'});

        } else if(width > 75){
          elem.style.backgroundColor = "#4CAF50";
          this.setState({safetyType: 'HIGH'});
      }
    }
    render(){
        const { classes } = this.props;
      return (
        <div className={classes.mainPruebaContainer}>
          
          <Encabezado />
          <h1>Nivel de seguridad</h1>
          <IndicadorNivelSeguridad 
          scoreRemitente={this.state.sendScore} 
          scoreMensaje={this.state.messageScore} 
          scoreLinks={this.state.linkScore}
          scoreArchivos={this.state.attachmentScore}/>
    
          <h2 className={classes.h2}>Detalles</h2>
          <DetallesBoton />
          <h2 className={classes.h2}>Reportar</h2>
          <EnviarRevisionBoton />
          <div className={classes.notShown}>
            <Authentication onAuthScore={this.handleAuth}/>
            <Content onMessageScore={this.handleMessage}/>
            <Sender onSenderScore={this.handleSender}/>
            <Link onLinkScore={this.handleLink}/>
            <Attachment onAttachmentScore={this.handleAttachment}/>
          </div>
        </div>

      );
    }

}

MainPrueba.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MainPrueba);