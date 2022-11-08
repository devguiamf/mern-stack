import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useForm } from "react-hook-form";
import { editTask } from '../services/TaskService'

export default function EditTaskModal({task, taskEdited}) {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const { register, handleSubmit } = useForm();
    const onSubmit = data => {
      editTask(data).then(response => {
        taskEdited(response);
        setShow(false);
    });
    };
  
    return (
      <>
        <Button variant="secondary" onClick={handleShow}>
          Editar
        </Button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Editar Tarefa</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
                <div className="form-group col-md-3">
                  <label htmlFor="taskId">Id</label>
                  <input {...register("id")} type="text" className="form-control" defaultValue={task.id} name="id" id="id" disabled />
                </div>
            </div>
            <br/>
            <div className="row">
                <div className="form-group col-md-6">
                    <label htmlFor="task">Tarefa</label>
                    <input {...register("task")} type="text" className="form-control" defaultValue={task.task} name="task" id="task" placeholder="Tarefa editada" />
                </div>
            </div>
            <br/>
            <div className="row">
                <div className="form-group col-md-6">
                    <label htmlFor="assignee">Responsável</label>
                    <input {...register("assignee")} type="text" className="form-control" defaultValue={task.assignee} name="assignee" id="assignee" placeholder="Novo responsável" />
                </div>
            </div>
            <br/>
            <div className="row">
                <div className="form-group col-md-6">
                    <label htmlFor="status">Status:</label>
                    <select {...register("status")} name="status" defaultValue={task.status} className="form-control" id="status">
                        <option>A Ser Feito</option>
                        <option>Em Andamento</option>
                        <option>Finalizado</option>
                    </select>
                </div>
            </div>
            <div className="btncenter">
              <br/>
              <input type="submit" className="btn btn-dark" />
            </div>
            </form>
          </Modal.Body>
          
        </Modal>
      </>
    );
}