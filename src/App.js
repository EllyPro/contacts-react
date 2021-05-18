import React, { Component } from 'react';
import ListContacts from './ListContacts';
import * as contactApi from './utils/ContactsAPI';
import ContactCreate from './ContactCreate';
import {Route} from 'react-router-dom';
class App extends Component {
  state = {
    contacts:[],
  }
  componentDidMount(){
    contactApi.getAll().then((contats)=>{
      this.setState({contacts:contats})
    })
  }
  removeContact = (contact) =>{
     this.setState( (prev) =>({
      contacts:prev.contacts.filter((c)=>{
        return c.id !== contact.id
      })
    }));
    contactApi.remove(contact);
  }
  createContact = (contact) =>{
    contactApi.create(contact)
      .then((contact)=>{
        this.setState((prev)=>({
          contacts:prev.contacts.concat([contact])
        }))
      })
  }
  render() {
    return (
      <div>
        <h1>Contacts App</h1>
        <Route exact path='/' render={()=>(<ListContacts 
                                  deleteContact={this.removeContact}
                                  contacts={this.state.contacts}/>)} />
        <Route path='/create' render={({ history }) => (
          <ContactCreate
            onCreateContact={(contact) => {
              this.createContact(contact)
              history.push('/')
            }}
          />
        )} /> 
      </div>
    );
  }
}

export default App;
