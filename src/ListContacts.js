import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
class ListContacts extends React.Component{
    static propTypes = {
        contacts:PropTypes.array.isRequired,
        deleteContact:PropTypes.func.isRequired
    }

    state = {
        query: '',
    }
    handleChange(query){
        return this.setState({
            query:query.trim(),
        })
    }
    clearQuery = () => {
        this.handleChange('')
      }
    render(){
        const {query} = this.state;
        const {contacts,deleteContact} = this.props;
        const showContacts = query === ''? 
        contacts : 
        contacts.filter((c)=>(c.name.toLowerCase()).includes(query.toLowerCase()))

        return(
            <div className="list-contacts">
                <div className="list-contacts-top">
                    <input
                        type='text'
                        className="search-contacts"
                        name='search'
                        value={query}
                        onChange={(event)=>this.handleChange(event.target.value)}
                    />
                    <Link to="/create" className="add-contact" >Add Contact </Link>
                </div>
                {showContacts.length !== contacts.length && (
                    <div className='showing-contacts'>
                        <span>Now showing {showContacts.length} of {contacts.length}</span>
                        <button className='showing-contacts' onClick={this.clearQuery}>Show all</button>
                    </div>
                )}

                <ol className='contact-list'>
                    {showContacts.map( (contact) => (
                        <li key={contact.name} className='contact-list-item'>
                            <img className="contact-avatar" src={contact.avatarURL} width="50" height="50" alt={contact.id}/>
                            <div className='contact-details'>
                                <p>{contact.name}</p>
                                <p>{contact.handle}</p>
                                <button 
                                onClick={()=>deleteContact(contact)}
                                className="contact-remove">X</button>
                            </div>
                        </li>
                    ))}
                </ol>
            </div>
        )
    }
}
export default ListContacts;