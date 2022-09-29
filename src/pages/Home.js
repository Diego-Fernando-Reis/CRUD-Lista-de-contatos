import React, {useState, useEffect} from 'react';
import fireDb from '../firebase';
import {Link} from 'react-router-dom';
import './Home.css';
import {toast} from 'react-toastify';
import { RiPencilFill } from 'react-icons/ri';
import { BiTrash } from 'react-icons/bi';

const Home = () =>{
  const [data, setData] = useState({});

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
  }, []);

  const onDelete = (id) =>{
    if(window.confirm('Tem certeza que você quer deletar esse contatao?')){
      fireDb.child(`contacts/${id}`).remove((err) =>{
        if(err){
          toast.error(err);
        }else{
          toast.success('Contato deletado com sucesso');
        }
      })
    }
  }
  return(
    <div style={{marginTop: '100px'}}>
      <table className='styled-table'>
        <thead>
          <tr>
            <th style={{textAlign: 'center'}}>No.</th>
            <th style={{textAlign: 'center'}}>Nome</th>
            <th style={{textAlign: 'center'}}>Email</th>
            <th style={{textAlign: 'center'}}>Contato</th>
            <th style={{textAlign: 'center'}}>Ação</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(data).map((id, index)=>{
            return(
              <tr key={id}>
                <th scope='row'>{index + 1}</th>
                <td>{data[id].name}</td>
                <td>{data[id].email}</td>
                <td>{data[id].contact}</td>
                <td className='td'>
                  <Link to={`/update/${id}`}>
                    <div className=' btn-edit'><RiPencilFill className='pencil'/></div>
                  </Link>
                  <div className=' btn-delete' onClick={() => onDelete(id)}><BiTrash className='trash' /></div>
                  <Link to={`/view/${id}`}>
                    <button className='btn btn-view'>Detalhes</button>
                  </Link>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Home