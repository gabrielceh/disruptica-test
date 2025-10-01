import { Router } from "express";
import { DbPatientsDatasource  } from "@modules/patients/infrastructure/datasources";
import { PatientRepositoryImpl } from "@modules/patients/infrastructure/repositories";
import { PatientController } from "@modules/patients/controllers/Patient.controller";
import {validateCreatePatient, validateFindByName, validateUpdatePatient, validateAddConsultation, validatePatientId } from "@modules/patients/infrastructure/middlewares";
import { requireAdmin, validateToken, validateUser } from "@src/core/shared/middlewares";

const router = Router();

const patientDatasource = new DbPatientsDatasource();
const patientRepository = new PatientRepositoryImpl(patientDatasource);
const patientController = new PatientController(patientRepository);

router.get('/',
  validateToken,
  validateUser, 
  patientController.getActive
);

router.get('/patient/:id',
  validateToken,
  validateUser, 
  patientController.getPatientById
);

router.get('/search/:name', 
  validateToken,
  validateUser, 
  validateFindByName,
  patientController.findByName
);

router.post('/create', 
  validateToken,
  validateUser, 
  requireAdmin,
  validateCreatePatient, 
  patientController.create
);

router.put('/update/:id', 
  validateToken,
  validateUser, 
  validateUpdatePatient,
  patientController.update
);

router.post('/consultation/:id', 
  validateToken,
  validateUser, 
  validateAddConsultation,
  patientController.addConsultation
);

router.patch('/activate/:id', 
  validateToken,
  validateUser, 
  requireAdmin,
  validatePatientId, 
  patientController.activate
);

router.delete('/:id', 
  validateToken,
  validateUser, 
  requireAdmin,
  validatePatientId, 
  patientController.deactivate
);

export default router;