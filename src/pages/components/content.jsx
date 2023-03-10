import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table'
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import { BiEdit, BiTrash, BiPlusMedical } from "react-icons/bi";
import Swal from 'sweetalert2';

export default function Modals() {
  // fungsi modal 
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // fungsi tabel 
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [activity, setActivity] = useState('');
  const [data, setData] = useState([]);

  const [selectedIndex, setSelectedIndex] = useState(null);
  const [editedData, setEditedData] = useState({
    name: '',
    age: '',
    gender: '',
    activity: '',
  });

// fungsi menyimpan data
  const handleSubmit = (event) => {
    event.preventDefault();
    if (selectedIndex === null) {
      // Jika selectedIndex masih null, berarti ini adalah penambahan data baru
      const newData = { name, age, gender, activity };
      setData([...data, newData]);
    } else {
      // Jika selectedIndex sudah diisi, berarti ini adalah pengeditan data
      const newData = [...data];
      newData[selectedIndex] = { ...editedData, name, age, gender, activity };
      setData(newData);
      setSelectedIndex(null);
    }
    setName('');
    setAge('');
    setGender('');
    setActivity('');
    setShow(false);
  };
  
  //fungsi untuk menghapus isi data pada tabel
  const handleDelete = (index) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger me-2'
      },
      buttonsStyling: false
    })
    //sweet alert
    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        setData(data.filter((_, i) => i !== index));
        swalWithBootstrapButtons.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Your data is safe :)',
          'error'
        )
      }
    })
  }
//akhir dari sweet alert

//fungsi untuk mengedit data pada tabel
const handleEdit = (index) => {
  setSelectedIndex(index);
  setEditedData(data[index]);
  setShow(true);
};

  return (
    <>
    <Container>
      <div className='col-10'>
      <div className="d-flex justify-content-end mt-3">
        <Button variant="primary" onClick={handleShow}>
         Tambah < BiPlusMedical style={{marginTop:"-3px"}}/>
        </Button>
      </div>
      
      {/* isi tabel */}
        <Table striped bordered hover className=
        "mt-3 text-center shadow p-3 mb-5 bg-body-tertiary rounded"
        >
          <thead style={{ display: data.length > 0 ? "table-header-group" : "none" }}>
            <tr>
              <th>Nama</th>
              <th>Usia</th>
              <th>Jenis Kelamin</th>
              <th>Kegiatan</th>
              <th>aksi</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.age}</td>
                <td>{item.gender}</td>
                <td>{item.activity}</td>
                <td>
                  <Button className='me-3' variant='danger' onClick={() => handleDelete(index)}>
                    <BiTrash/>
                  </Button>
                  <Button variant="warning" onClick={() => handleEdit(index)}>
                    <BiEdit/> 
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        </div>

      {/* isi modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Masukan Data Diri Anda</Modal.Title>
        </Modal.Header>
        <Modal.Body>
    
    {/* isi form */}
    <div className='col-10'>
      <Form onSubmit={handleSubmit} className="mt-1">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Nama : </Form.Label>
          <Form.Control type="text" placeholder="Masukan Nama Anda" required value={name} onChange={(e) => setName(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="Masukan Usia Anda">
          <Form.Label>Usia : </Form.Label>
          <Form.Control type="number" placeholder="Masukan Usia Anda" require value={age} onChange={(e) => setAge(e.target.value)} />
        </Form.Group>
        <Form.Label>Pilih Jenis Kelamin : </Form.Label>
        <Form.Select aria-label="Default select example" require value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="">Jenis Kelamin</option>
          <option value="Laki-Laki">Laki - Laki</option>
          <option value="Perempuan">Perempuan</option>
          <option value="Tidak Keduanya...">Tidak Keduanya...</option>
        </Form.Select>
        <Form.Label className='mt-3'>Pilih Kegiatan Anda: </Form.Label>
        <Form.Select aria-label="Default select example" require value={activity} onChange={(e) => setActivity(e.target.value)}>
          <option value="">Kegiatan</option>
          <option value="Bekerja">Bekerja</option>
          <option value="Kuliah">Kuliah</option>
          <option value="Sekolah">Sekolah</option>
          <option value="Tiduran">Tiduran</option>
        </Form.Select>
        <div className="d-flex justify-content-end" style={{marginRight:"-75px"}}>
          <Button variant="secondary" className="mt-3 me-3" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit" className="mt-3" onClick={handleClose}>
            Simpan
          </Button>
        </div>
      </Form>
    </div>
      {/* akhir dari form  */}
  </Modal.Body>
</Modal>
{/* akhir dari modal  */}
</Container>
    </>
  );
}

