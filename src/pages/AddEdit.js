import React, {useState, useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import './AddEdit.css';
import fireDb from '../firebase';
import {toast} from 'react-toastify';

const initialState = {
  name:'',
  email: '',
  contact: ''
}

const AddEdit = () =>{
  const [state, setState] = useState(initialState);
  const [data, setData] = useState({});

  const {name, email, contact} = state;
  const history = useNavigate();

  const {id} = useParams();

  useEffect(() => {
    fireDb.child('contacts').on('value', (snapshot) => {
      if(snapshot.val() !== null){
        setData({ ...snapshot.val()});
      }else{
        setData({});
      }
    });

    return() => {
      setData({});
    };
  }, [id]);

  useEffect(() => {
    if(id){
      setState({...data[id]})
    }else{
      setState({...initialState})
    }

    return () =>{
      setState({ ...initialState});
    }
  }, [id, data])



  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setState({ ...state, [name]:value})
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if(!name || !email || !contact){
      toast.error('Por favor insira o valor certo em cada campo!')
    }else{
      if(!id){
        fireDb.child('contacts').push(state, (err) => {
          if(err){
            toast.error(err);
          }else{
            toast.success('Contato adcionado com sucesso')
          }
        })
      }else{
        fireDb.child(`contacts/${id}`).set(state, (err) => {
          if(err){
            toast.error(err);
          }else{
            toast.success('Contato atualizado com sucesso')
          }
        })
      }

      setTimeout(() => history.push('/'), 500);
    }
  };

  
  return(
    <div style={{marginTop: '100px'}}>
      <form style={{margin: 'auto', padding: '30px 15px', maxWidth: '400px', alignContent: 'left',}} onSubmit={handleSubmit}>
        <label htmlFor='name'>Nome</label>
        <input type='text' id='name' name='name' placeholder='Seu nome...' value={name || ''} onChange={handleInputChange}></input>

        <label htmlFor='email'>Email</label>
        <input type='text' id='email' name='email' placeholder='Seu Email...' value={email || ''} onChange={handleInputChange}></input>

        <label htmlFor='contact'>Contato</label>
        <input type='number' id='contact' name='contact' placeholder='Seu Número...' value={contact || ''} onChange={handleInputChange}></input>

        <input type='submit' value={id ? 'Atualizar' : 'Salvar'}/>
      </form>

      
    </div>
  )
}

export default AddEdit;